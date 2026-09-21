/* ===================== Model Layer =====================
 * Independent from the GCC Capability Assessment Model.
 * Owns schema, persistence, seed data, and every value
 * calculation used by the MVP business case.
 * ====================================================== */

const MVP_STORAGE_KEY = "gccValueMvp.industryAgnostic.v1";

function uid(prefix) {
  return (prefix || "id") + "_" + Math.random().toString(36).slice(2, 9);
}

function num(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

// Blank means "use the default"; an explicit 0 means "no parallel run".
function optionalNumber(value, fallback) {
  if (value === undefined || value === null || String(value).trim() === "") return fallback;
  return num(value);
}

function defaultAssumptions() {
  return {
    defaultOnshoreCostPerFTEUSD: 120000,
    defaultGccCostPerFTEUSD: 42000,
    setupCostPerFTEUSD: 9000,
    parallelRunMonths: 3,
    maxTransferSharePercent: 80,
    maxAutomationSavingPercent: 30,
    wave1ThresholdPercent: 65,
    wave2ThresholdPercent: 45,
    rampYear1Percent: 40,
    rampYear2Percent: 80,
    rampYear3Percent: 100,
    lobMoveThresholdPercent: 50,
    lobHybridThresholdPercent: 20
  };
}

function emptyState() {
  return {
    meta: {
      engagementName: "Industry-Agnostic GCC Value MVP",
      client: "",
      facilitator: "",
      workshopDate: "",
      lastUpdated: new Date().toISOString()
    },
    voiceOfBusiness: [],
    strategicGoals: [],
    organizationStructure: [],
    northStarMandates: [],
    workshopCandidates: [],
    lobPlacements: [],
    processAppMap: [],
    applications: [],
    dataFlows: [],
    successCriteria: [],
    assumptions: defaultAssumptions()
  };
}

/* ---------------- Value calculations ---------------- */

const READINESS_FACTORS = [
  { key: "standardization", label: "Process Standardization", invert: false },
  { key: "transferability", label: "Remote Transferability", invert: false },
  { key: "automationPotential", label: "Automation / AI Potential", invert: false },
  { key: "dataReadiness", label: "Data & Platform Readiness", invert: false },
  { key: "localConstraint", label: "Local / Regulatory Constraint", invert: true }
];

/* Readiness blends five 1-5 workshop scores into a 0-100% signal.
   The local-constraint score is inverted so high constraint lowers readiness. */
function computeReadinessPercent(candidate) {
  const scores = READINESS_FACTORS.map((factor) => {
    const raw = num(candidate[factor.key]);
    const bounded = Math.min(5, Math.max(1, raw || 1));
    return factor.invert ? 6 - bounded : bounded;
  });
  const average = scores.reduce((total, score) => total + score, 0) / scores.length;
  // Rounded so candidates sitting exactly on a wave threshold are not lost to float drift.
  return Math.round(((average - 1) / 4) * 1000) / 10;
}

function waveFor(readinessPercent, assumptions) {
  if (readinessPercent >= assumptions.wave1ThresholdPercent) return "MVP Wave 1";
  if (readinessPercent >= assumptions.wave2ThresholdPercent) return "Wave 2 / Hybrid";
  return "Retain / Improve First";
}

function computeCandidate(candidate, assumptions) {
  const onshoreCost = num(candidate.onshoreCostPerFTEUSD) || assumptions.defaultOnshoreCostPerFTEUSD;
  const gccCost = num(candidate.gccCostPerFTEUSD) || assumptions.defaultGccCostPerFTEUSD;
  const readinessPercent = computeReadinessPercent(candidate);
  const wave = waveFor(readinessPercent, assumptions);

  // Retained capabilities claim no value: nothing moves until the constraint is fixed.
  const isRetained = wave === "Retain / Improve First";
  const transferSharePercent = isRetained ? 0 : Math.min(readinessPercent, assumptions.maxTransferSharePercent);
  const transferredFTE = num(candidate.currentFTE) * (transferSharePercent / 100);

  const arbitrageValue = transferredFTE * Math.max(0, onshoreCost - gccCost);
  const automationSavingPercent = (Math.min(5, Math.max(0, num(candidate.automationPotential))) / 5) * assumptions.maxAutomationSavingPercent;
  const automationValue = transferredFTE * gccCost * (automationSavingPercent / 100);
  const riskAvoidanceValue = isRetained ? 0 : num(candidate.riskAvoidanceUSD);
  const revenueEnablementValue = isRetained ? 0 : num(candidate.revenueEnablementUSD);

  const annualValue = arbitrageValue + automationValue + riskAvoidanceValue + revenueEnablementValue;

  // During parallel run both teams are paid for the same work, so the GCC cost is incremental.
  const parallelRunMonths = optionalNumber(candidate.parallelRunMonths, assumptions.parallelRunMonths);
  const parallelRunCost = isRetained ? 0 : transferredFTE * gccCost * (parallelRunMonths / 12);
  const setupCost = isRetained ? 0 : transferredFTE * assumptions.setupCostPerFTEUSD;
  const oneTimeCost = isRetained ? 0 : num(candidate.oneTimeCostUSD);
  const investment = setupCost + oneTimeCost + parallelRunCost;

  return {
    readinessPercent,
    transferSharePercent,
    transferredFTE,
    arbitrageValue,
    automationValue,
    automationSavingPercent,
    riskAvoidanceValue,
    revenueEnablementValue,
    annualValue,
    parallelRunMonths,
    parallelRunCost,
    setupCost,
    oneTimeCost,
    investment,
    isRetained,
    wave
  };
}

function buildThreeYearCase(candidates, assumptions) {
  const totals = candidates.reduce((accumulator, candidate) => {
    const computed = computeCandidate(candidate, assumptions);
    accumulator.annualValue += computed.annualValue;
    accumulator.investment += computed.investment;
    accumulator.setupCost += computed.setupCost;
    accumulator.parallelRunCost += computed.parallelRunCost;
    accumulator.oneTimeCost += computed.oneTimeCost;
    accumulator.transferredFTE += computed.transferredFTE;
    accumulator.arbitrageValue += computed.arbitrageValue;
    accumulator.automationValue += computed.automationValue;
    accumulator.riskAvoidanceValue += computed.riskAvoidanceValue;
    accumulator.revenueEnablementValue += computed.revenueEnablementValue;
    return accumulator;
  }, {
    annualValue: 0, investment: 0, setupCost: 0, parallelRunCost: 0, oneTimeCost: 0, transferredFTE: 0,
    arbitrageValue: 0, automationValue: 0, riskAvoidanceValue: 0, revenueEnablementValue: 0
  });

  const rampPercents = [assumptions.rampYear1Percent, assumptions.rampYear2Percent, assumptions.rampYear3Percent];
  let cumulative = 0;
  let paybackYear = null;
  const years = rampPercents.map((rampPercent, index) => {
    const realisedValue = totals.annualValue * (rampPercent / 100);
    const investment = index === 0 ? totals.investment : 0;
    cumulative += realisedValue - investment;
    if (paybackYear === null && cumulative >= 0) paybackYear = index + 1;
    return { year: index + 1, rampPercent, realisedValue, investment, cumulativeNet: cumulative };
  });

  const totalValue = years.reduce((total, year) => total + year.realisedValue, 0);
  const netValue = totalValue - totals.investment;
  const roiPercent = totals.investment > 0 ? (netValue / totals.investment) * 100 : 0;

  return Object.assign(totals, { years, totalValue, netValue, roiPercent, paybackYear, candidateCount: candidates.length });
}

function mvpCandidates(state) {
  return state.workshopCandidates.filter((candidate) => computeCandidate(candidate, state.assumptions).wave === "MVP Wave 1");
}

/* ---------------- Line of business placement ---------------- */

const PLACEMENT_MOVE = "Move to GCC";
const PLACEMENT_HYBRID = "Hybrid / Shared";
const PLACEMENT_REMAIN = "Remain at Power House";

function placementFor(gccSharePercent, assumptions) {
  if (gccSharePercent >= assumptions.lobMoveThresholdPercent) return PLACEMENT_MOVE;
  if (gccSharePercent >= assumptions.lobHybridThresholdPercent) return PLACEMENT_HYBRID;
  return PLACEMENT_REMAIN;
}

/* Aggregates capability-level scores into a line-of-business view so the
   enterprise can see what moves to the GCC and what stays at the power house. */
function computeLobPlacements(state) {
  const groups = {};
  state.workshopCandidates.forEach((candidate) => {
    const lineOfBusiness = candidate.lineOfBusiness || "Unassigned";
    if (!groups[lineOfBusiness]) {
      groups[lineOfBusiness] = {
        lineOfBusiness: lineOfBusiness, totalFTE: 0, transferableFTE: 0, annualValue: 0, investment: 0,
        wave1: 0, wave2: 0, retained: 0, moving: [], staying: []
      };
    }
    const group = groups[lineOfBusiness];
    const computed = computeCandidate(candidate, state.assumptions);
    group.totalFTE += num(candidate.currentFTE);
    group.transferableFTE += computed.transferredFTE;
    group.annualValue += computed.annualValue;
    group.investment += computed.investment;
    if (computed.wave === "MVP Wave 1") {
      group.wave1 += 1;
      group.moving.push(candidate.capability);
    } else if (computed.wave === "Wave 2 / Hybrid") {
      group.wave2 += 1;
      group.moving.push(candidate.capability);
    } else {
      group.retained += 1;
      group.staying.push(candidate.capability);
    }
  });

  return Object.keys(groups).map((key) => {
    const group = groups[key];
    const gccSharePercent = group.totalFTE > 0 ? (group.transferableFTE / group.totalFTE) * 100 : 0;
    const decision = state.lobPlacements.find((entry) => entry.lineOfBusiness === group.lineOfBusiness);
    return Object.assign(group, {
      gccSharePercent: gccSharePercent,
      recommendation: placementFor(gccSharePercent, state.assumptions),
      agreedDecision: decision ? decision.decision : "",
      gccOwns: decision ? decision.gccOwns : "",
      powerHouseRetains: decision ? decision.powerHouseRetains : "",
      rationale: decision ? decision.rationale : ""
    });
  }).sort((left, right) => right.annualValue - left.annualValue);
}

function lineOfBusinessNames(state) {
  const names = []
    .concat(state.organizationStructure.map((row) => row.lineOfBusiness))
    .concat(state.workshopCandidates.map((candidate) => candidate.lineOfBusiness))
    .concat(state.processAppMap.map((row) => row.lineOfBusiness))
    .filter(Boolean);
  return [...new Set(names)];
}

/* ---------------- Persistence ---------------- */
function loadState() {
  try {
    const raw = localStorage.getItem(MVP_STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    const merged = Object.assign(emptyState(), parsed, {
      meta: Object.assign(emptyState().meta, parsed.meta || {}),
      assumptions: Object.assign(defaultAssumptions(), parsed.assumptions || {})
    });
    ["voiceOfBusiness", "strategicGoals", "organizationStructure", "northStarMandates", "workshopCandidates", "lobPlacements", "processAppMap", "applications", "dataFlows", "successCriteria"].forEach((key) => {
      if (!Array.isArray(merged[key])) merged[key] = [];
    });
    return merged;
  } catch (error) {
    console.error("Failed to load MVP framework state, starting fresh.", error);
    return emptyState();
  }
}

function saveState(state) {
  state.meta.lastUpdated = new Date().toISOString();
  localStorage.setItem(MVP_STORAGE_KEY, JSON.stringify(state));
}

/* ---------------- Export helpers ---------------- */
function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime || "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function arrayToCSV(rows, columns) {
  const escape = (value) => {
    if (value === null || value === undefined) return "";
    const text = String(value).replace(/"/g, '""');
    return /[",\n]/.test(text) ? '"' + text + '"' : text;
  };
  const header = columns.map((column) => escape(column.label)).join(",");
  const lines = rows.map((row) => columns.map((column) => escape(row[column.key])).join(","));
  return [header].concat(lines).join("\n");
}

function exportArrayAsCSV(filename, rows, columns) {
  downloadFile(filename, arrayToCSV(rows, columns), "text/csv");
}

/* ---------------- Seed data ---------------- */
function seedState() {
  const state = emptyState();
  state.meta.engagementName = "Industry-Agnostic GCC Value MVP";
  state.meta.client = "Enterprise Example (illustrative)";
  state.meta.facilitator = "GCC Advisory Team";
  state.meta.workshopDate = "2026-10-08";

  const goalService = uid("goal");
  const goalCost = uid("goal");
  const goalData = uid("goal");
  const goalSpeed = uid("goal");

  state.strategicGoals = [
    { id: goalService, goal: "Improve service reliability and cycle-time performance across regions", owner: "COO", horizon: "Medium (1-2y)", successMeasure: "Service SLA attainment from 82% to 94%", valueType: "Productivity" },
    { id: goalCost, goal: "Reduce cost-to-serve for repeatable enterprise operations", owner: "CFO", horizon: "Short (0-12m)", successMeasure: "Cost-to-serve reduced 20%", valueType: "Cost" },
    { id: goalData, goal: "Create trusted, reusable data and reporting products", owner: "Chief Data Officer", horizon: "Medium (1-2y)", successMeasure: "Single source of truth for 80% of KPIs", valueType: "Capability" },
    { id: goalSpeed, goal: "Accelerate product and change delivery to market", owner: "CTO", horizon: "Long (2-3y)", successMeasure: "Release cycle from quarterly to monthly", valueType: "Speed" }
  ];

  state.organizationStructure = [
    { id: uid("org"), region: "North America", lineOfBusiness: "Customer Operations", category: "Service Operations", teamSizeFTE: 520, revenueUSD: 1800000000, operatingCostUSD: 620000000, notes: "High-volume service work with material standardization opportunity." },
    { id: uid("org"), region: "Europe", lineOfBusiness: "Finance", category: "Corporate Functions", teamSizeFTE: 260, revenueUSD: 1200000000, operatingCostUSD: 280000000, notes: "Transactional and statutory work separated before transfer decisions." },
    { id: uid("org"), region: "Asia Pacific", lineOfBusiness: "Technology Platforms", category: "Digital & Technology", teamSizeFTE: 340, revenueUSD: 900000000, operatingCostUSD: 360000000, notes: "Platform engineering and application operations footprint." },
    { id: uid("org"), region: "Global", lineOfBusiness: "Data & Analytics", category: "Enterprise Capabilities", teamSizeFTE: 140, revenueUSD: 0, operatingCostUSD: 150000000, notes: "Shared data products and analytics services across business lines." }
  ];

  state.northStarMandates = [
    { id: uid("ns"), lineOfBusiness: "Customer Operations", outcomesOwned: "End-to-end Tier-1 service outcome: resolution rate, cost per contact, and customer effort.", decisionRights: "GCC decides staffing, scheduling, automation backlog, and tooling up to $250K without approval.", productsOwned: "Service desk platform and AI deflection assistant", successMeasure: "Cost per contact and first-contact resolution", gccOwnership: "Full ownership", powerHouseRetains: "Customer policy, pricing, complaint escalation, regulator commitments" },
    { id: uid("ns"), lineOfBusiness: "Technology Platforms", outcomesOwned: "Application stability and delivery throughput for owned platforms.", decisionRights: "GCC owns release engineering, technical debt backlog, and platform roadmap input.", productsOwned: "Application maintenance and CI/CD pipeline", successMeasure: "Change lead time and change failure rate", gccOwnership: "Full ownership", powerHouseRetains: "Enterprise architecture standards and investment approval" },
    { id: uid("ns"), lineOfBusiness: "Data & Analytics", outcomesOwned: "Trusted enterprise data products and the KPI layer leadership decides from.", decisionRights: "GCC owns the data product roadmap, modelling standards, and release cadence.", productsOwned: "Enterprise data platform, KPI and reporting products", successMeasure: "KPI coverage from a single source and time to insight", gccOwnership: "Full ownership", powerHouseRetains: "Data governance policy and regulatory data classification" },
    { id: uid("ns"), lineOfBusiness: "Finance", outcomesOwned: "Billing accuracy and close-cycle predictability for transactional finance.", decisionRights: "GCC owns reconciliation execution and exception handling within agreed tolerance.", productsOwned: "Reconciliation automation and exception workflow", successMeasure: "Days to close and reconciliation exception rate", gccOwnership: "Joint with Power House", powerHouseRetains: "Statutory sign-off, external audit, regulatory filings" },
    { id: uid("ns"), lineOfBusiness: "Supply Chain", outcomesOwned: "Planning analytics and supplier performance visibility for repeatable planning cycles.", decisionRights: "GCC owns analytics, reporting, and exception workflow improvements.", productsOwned: "Planning analytics workbench", successMeasure: "Forecast accuracy and planning cycle time", gccOwnership: "Joint with Power House", powerHouseRetains: "Supplier negotiations and market-sensitive decisions" }
  ];

  state.voiceOfBusiness = [
    { id: uid("vob"), stakeholder: "VP Operations", lineOfBusiness: "Customer Operations", region: "North America", theme: "Manual effort", painPoint: "Teams spend hours consolidating work queues and performance data from multiple tools before decisions are made.", businessImpact: "High", linkedGoal: goalService, quote: "We are data rich and insight poor at the exact moment we need to act." },
    { id: uid("vob"), stakeholder: "Director Customer Operations", lineOfBusiness: "Customer Operations", region: "Europe", theme: "Cost pressure", painPoint: "Tier-1 support volume grows faster than revenue and is handled by high-cost local teams.", businessImpact: "High", linkedGoal: goalCost, quote: "Every new customer adds cost before it adds margin." },
    { id: uid("vob"), stakeholder: "Head of Finance Operations", lineOfBusiness: "Finance", region: "Europe", theme: "Reconciliation", painPoint: "Billing and settlement reconciliation is manual and delays month-end close by five days.", businessImpact: "Medium", linkedGoal: goalCost, quote: "We close late every month for reasons we already understand." },
    { id: uid("vob"), stakeholder: "Chief Data Officer", lineOfBusiness: "Data & Analytics", region: "Global", theme: "Fragmented data", painPoint: "Each region builds its own reports, so leadership debates numbers instead of decisions.", businessImpact: "High", linkedGoal: goalData, quote: "We need one number, not five versions of it." },
    { id: uid("vob"), stakeholder: "Director Platform Delivery", lineOfBusiness: "Technology Platforms", region: "Asia Pacific", theme: "Delivery speed", painPoint: "Change backlog keeps growing because delivery capacity is fixed and specialist skills are scarce.", businessImpact: "Medium", linkedGoal: goalSpeed, quote: "Good ideas wait in a queue for two quarters." }
  ];

  state.workshopCandidates = [
    { id: uid("cand"), capability: "Operations triage & performance monitoring", lineOfBusiness: "Customer Operations", region: "North America", linkedGoal: goalService, currentFTE: 90, onshoreCostPerFTEUSD: 118000, gccCostPerFTEUSD: 40000, standardization: 4, transferability: 4, automationPotential: 4, dataReadiness: 4, localConstraint: 2, riskAvoidanceUSD: 400000, revenueEnablementUSD: 0, oneTimeCostUSD: 250000, notes: "Remote monitoring already proven; accountable customer decisions stay local." },
    { id: uid("cand"), capability: "Tier-1 customer support & service desk", lineOfBusiness: "Customer Operations", region: "Europe", linkedGoal: goalCost, currentFTE: 140, onshoreCostPerFTEUSD: 96000, gccCostPerFTEUSD: 34000, standardization: 5, transferability: 4, automationPotential: 5, dataReadiness: 4, localConstraint: 2, riskAvoidanceUSD: 150000, revenueEnablementUSD: 300000, oneTimeCostUSD: 300000, parallelRunMonths: 4, notes: "High volume and scripted; strong AI-deflection potential." },
    { id: uid("cand"), capability: "Billing & settlement reconciliation", lineOfBusiness: "Finance", region: "Europe", linkedGoal: goalCost, currentFTE: 60, onshoreCostPerFTEUSD: 104000, gccCostPerFTEUSD: 36000, standardization: 4, transferability: 4, automationPotential: 4, dataReadiness: 3, localConstraint: 3, riskAvoidanceUSD: 250000, revenueEnablementUSD: 0, oneTimeCostUSD: 180000, parallelRunMonths: 5, notes: "Rules-based once interfaces are stabilised; longer parallel run for close-cycle assurance." },
    { id: uid("cand"), capability: "Enterprise reporting & data products", lineOfBusiness: "Data & Analytics", region: "Global", linkedGoal: goalData, currentFTE: 45, onshoreCostPerFTEUSD: 132000, gccCostPerFTEUSD: 46000, standardization: 3, transferability: 5, automationPotential: 4, dataReadiness: 3, localConstraint: 2, riskAvoidanceUSD: 0, revenueEnablementUSD: 900000, oneTimeCostUSD: 220000, notes: "Anchor capability for a Data & AI CoE." },
    { id: uid("cand"), capability: "Application maintenance & release engineering", lineOfBusiness: "Technology Platforms", region: "Asia Pacific", linkedGoal: goalSpeed, currentFTE: 75, onshoreCostPerFTEUSD: 112000, gccCostPerFTEUSD: 38000, standardization: 4, transferability: 5, automationPotential: 3, dataReadiness: 4, localConstraint: 1, riskAvoidanceUSD: 120000, revenueEnablementUSD: 400000, oneTimeCostUSD: 200000, notes: "Clear runway to own platform roadmaps." },
    { id: uid("cand"), capability: "Regulatory and management reporting", lineOfBusiness: "Finance", region: "Europe", linkedGoal: goalData, currentFTE: 30, onshoreCostPerFTEUSD: 126000, gccCostPerFTEUSD: 44000, standardization: 3, transferability: 3, automationPotential: 3, dataReadiness: 3, localConstraint: 4, riskAvoidanceUSD: 600000, revenueEnablementUSD: 0, oneTimeCostUSD: 150000, notes: "Preparation can move; sign-off stays with the local entity." },
    { id: uid("cand"), capability: "Location-bound field execution", lineOfBusiness: "Supply Chain", region: "North America", linkedGoal: goalService, currentFTE: 210, onshoreCostPerFTEUSD: 94000, gccCostPerFTEUSD: 38000, standardization: 2, transferability: 1, automationPotential: 2, dataReadiness: 2, localConstraint: 5, riskAvoidanceUSD: 0, revenueEnablementUSD: 0, oneTimeCostUSD: 0, notes: "Physical or market proximity required; retain locally and support remotely." }
  ];

  state.processAppMap = [
    { id: uid("pam"), lineOfBusiness: "Customer Operations", capabilityDomain: "Service Management", businessCapability: "Customer Issue Resolution", subProcess: "Intake, triage, fulfilment, escalation", supportingApplications: "CRM, Workflow Platform, Knowledge Base", coverage: "Partial", notes: "Manual routing remains in priority queues." },
    { id: uid("pam"), lineOfBusiness: "Finance", capabilityDomain: "Record to Report", businessCapability: "Reconciliation & Close", subProcess: "Reconciliation, exception handling, close reporting", supportingApplications: "ERP, Reconciliation Tool", coverage: "Partial", notes: "Duplicate data entry across systems." },
    { id: uid("pam"), lineOfBusiness: "Data & Analytics", capabilityDomain: "Enterprise Data", businessCapability: "Data Products", subProcess: "Ingestion, modelling, KPI publishing", supportingApplications: "Data Platform, BI Suite", coverage: "Full", notes: "Reusable KPI layer is the target state." },
    { id: uid("pam"), lineOfBusiness: "Technology Platforms", capabilityDomain: "Platform Engineering", businessCapability: "Release Engineering", subProcess: "Build, test, deploy, observe", supportingApplications: "DevOps Platform, Monitoring Suite", coverage: "Full", notes: "Candidate for GCC product ownership." }
  ];

  state.applications = [
    { id: uid("app"), name: "CRM Platform", vendor: "Vendor A", domain: "Customer Operations", hosting: "Cloud", integration: "API", dataDomains: "Customers, Cases, Service History", criticality: "Critical", licenseCostUSD: 650000, supportCostUSD: 220000, renewalDate: "2027-03-31" },
    { id: uid("app"), name: "ERP Core", vendor: "Vendor B", domain: "Finance", hosting: "Hybrid", integration: "Batch", dataDomains: "Ledger, Cost Centers, Invoices", criticality: "Critical", licenseCostUSD: 900000, supportCostUSD: 360000, renewalDate: "2026-12-31" },
    { id: uid("app"), name: "Enterprise Data Platform", vendor: "Internal / Cloud", domain: "Data & Analytics", hosting: "Cloud", integration: "API", dataDomains: "Operational KPIs, Master Data", criticality: "High", licenseCostUSD: 300000, supportCostUSD: 180000, renewalDate: "" }
  ];

  state.dataFlows = [
    { id: uid("df"), sourceApp: "CRM Platform", dataDomain: "Customer Cases", targetApp: "Enterprise Data Platform", frequency: "Daily", method: "API", notes: "Feeds service performance dashboards." },
    { id: uid("df"), sourceApp: "ERP Core", dataDomain: "Cost Centers", targetApp: "Enterprise Data Platform", frequency: "Nightly Batch", method: "Batch", notes: "Supports cost-to-serve reporting." }
  ];

  state.lobPlacements = [
    { id: uid("lob"), lineOfBusiness: "Customer Operations", decision: "Move to GCC", gccOwns: "Tier-1 contact handling, triage, automation backlog, reporting", powerHouseRetains: "Policy, pricing, complaints escalation, regulator commitments", rationale: "High volume, high standardization, and proven remote delivery with strong AI deflection potential." },
    { id: uid("lob"), lineOfBusiness: "Technology Platforms", decision: "Move to GCC", gccOwns: "Application maintenance, release engineering, platform roadmap input", powerHouseRetains: "Enterprise architecture standards and investment approval", rationale: "Fully remote-deliverable with scarce local skills and a clear path to platform ownership." },
    { id: uid("lob"), lineOfBusiness: "Data & Analytics", decision: "Move to GCC", gccOwns: "Data products, KPI layer, reporting engineering, modelling standards", powerHouseRetains: "Data governance policy and regulatory classification", rationale: "Anchor capability for a Data and AI CoE with enterprise-wide reuse." },
    { id: uid("lob"), lineOfBusiness: "Finance", decision: "Hybrid / Shared", gccOwns: "Billing and settlement reconciliation, exception handling, reporting preparation", powerHouseRetains: "Statutory sign-off, external audit, regulatory filing accountability", rationale: "Execution is rules-based, but accountable sign-off must stay with the legal entity." },
    { id: uid("lob"), lineOfBusiness: "Supply Chain", decision: "Remain at Power House", gccOwns: "Analytics and performance reporting", powerHouseRetains: "Location-bound execution and supplier decisions", rationale: "Physical or market proximity constrains direct transfer." }
  ];

  state.successCriteria = [
    { id: uid("sc"), horizon: "Operate Better", metric: "Cost per Tier-1 customer contact", lineOfBusiness: "Customer Operations", baseline: "$11.40", targetYear1: "$8.50", targetYear3: "$6.00", owner: "Director Customer Operations", cadence: "Monthly" },
    { id: uid("sc"), horizon: "Operate Better", metric: "Service SLA attainment", lineOfBusiness: "Customer Operations", baseline: "82%", targetYear1: "88%", targetYear3: "94%", owner: "VP Operations", cadence: "Monthly" },
    { id: uid("sc"), horizon: "Operate Better", metric: "Days to close month-end", lineOfBusiness: "Finance", baseline: "9 days", targetYear1: "6 days", targetYear3: "4 days", owner: "Head of Finance Operations", cadence: "Monthly" },
    { id: uid("sc"), horizon: "Deliver Better", metric: "Change lead time", lineOfBusiness: "Technology Platforms", baseline: "11 weeks", targetYear1: "6 weeks", targetYear3: "3 weeks", owner: "Director Platform Delivery", cadence: "Quarterly" },
    { id: uid("sc"), horizon: "Deliver Better", metric: "KPI coverage from a single trusted source", lineOfBusiness: "Data & Analytics", baseline: "35%", targetYear1: "65%", targetYear3: "85%", owner: "Chief Data Officer", cadence: "Quarterly" },
    { id: uid("sc"), horizon: "Change the Game", metric: "Reusable automation and AI assets in production", lineOfBusiness: "Enterprise-wide", baseline: "2", targetYear1: "8", targetYear3: "20", owner: "GCC Managing Director", cadence: "Quarterly" },
    { id: uid("sc"), horizon: "Change the Game", metric: "Share of GCC roles in product and specialist positions", lineOfBusiness: "Enterprise-wide", baseline: "12%", targetYear1: "25%", targetYear3: "45%", owner: "GCC Managing Director", cadence: "Half-yearly" },
    { id: uid("sc"), horizon: "Operate Better", metric: "Voluntary attrition in GCC critical roles", lineOfBusiness: "Enterprise-wide", baseline: "", targetYear1: "below 15%", targetYear3: "below 12%", owner: "HR Business Partner", cadence: "Quarterly" }
  ];

  return state;
}
