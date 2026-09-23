/* ===================== Model Layer =====================
 * Independent from the GCC Capability Assessment Model.
 * Owns schema, persistence, seed data, and every value
 * calculation used by the MVP business case.
 * ====================================================== */

const MVP_STORAGE_KEY = "gccValueMvp.industryAgnostic.v1";

function uid(prefix) {
  return (prefix || "id") + "_" + Math.random().toString(36).slice(2, 9);
}

// Seed rows are copied so repeated sample loads never mutate the shared dataset.
function cloneRows(rows) {
  return (rows || []).map((row) => Object.assign({}, row));
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
    appSupportSavingPercent: 30,
    wave2AutomationRealisationPercent: 50,
    appLicenseSavingPercent: 0,
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
    valueActions: [],
    governanceForums: [],
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

/* Placement decisions are generated from the workshop scores. Leadership can override
   an individual capability, and only those overridden rows survive a recalculation. */
const PLACEMENT_SOURCE_MODEL = "model";
const PLACEMENT_SOURCE_LEADERSHIP = "leadership";

const AGREED_DECISION_WAVE = {
  "Move to GCC": "MVP Wave 1",
  "Hybrid / Shared": "Wave 2 / Hybrid",
  "Remain at Power House": "Retain / Improve First"
};

const WAVE_DECISION = {
  "MVP Wave 1": "Move to GCC",
  "Wave 2 / Hybrid": "Hybrid / Shared",
  "Retain / Improve First": "Remain at Power House"
};

function capabilityKey(value) {
  return String(value === undefined || value === null ? "" : value).trim().toLowerCase();
}

// The "GCC Owns" column of the placement register holds the capability name.
function syncPlacementRegister(state) {
  const existing = {};
  (state.lobPlacements || []).forEach((row) => {
    const key = capabilityKey(row.gccOwns);
    if (key) existing[key] = row;
  });

  const rows = [];
  (state.workshopCandidates || []).forEach((candidate) => {
    const key = capabilityKey(candidate.capability);
    if (!key) return;
    const modelDecision = WAVE_DECISION[waveFor(computeReadinessPercent(candidate), state.assumptions)];
    const row = existing[key] || { id: uid("lob"), gccOwns: candidate.capability };
    delete existing[key];
    row.lineOfBusiness = candidate.lineOfBusiness || "";
    row.modelDecision = modelDecision;
    if (row.source !== PLACEMENT_SOURCE_LEADERSHIP) {
      row.source = PLACEMENT_SOURCE_MODEL;
      row.decision = modelDecision;
    }
    rows.push(row);
  });

  // A leadership decision for a capability that is no longer scored is kept rather than silently dropped.
  Object.keys(existing).forEach((key) => {
    if (existing[key].source === PLACEMENT_SOURCE_LEADERSHIP) rows.push(existing[key]);
  });

  state.lobPlacements = rows;
  return state;
}

function syncAgreedDecisions(state) {
  const index = {};
  (state.lobPlacements || []).forEach((entry) => {
    const key = capabilityKey(entry.gccOwns);
    if (key && entry.source === PLACEMENT_SOURCE_LEADERSHIP) index[key] = String(entry.decision || "").trim();
  });
  (state.workshopCandidates || []).forEach((candidate) => {
    candidate.agreedDecision = index[capabilityKey(candidate.capability)] || "";
  });
  return state;
}

/* Application run costs are held per application, so they are allocated down to the
   capabilities that consume them: an application is attributed to its line of business,
   then spread across that line's capabilities in proportion to FTE. */
function syncApplicationCosts(state) {
  const fteByLob = {};
  (state.workshopCandidates || []).forEach((candidate) => {
    const lob = candidate.lineOfBusiness || "Unassigned";
    fteByLob[lob] = (fteByLob[lob] || 0) + num(candidate.currentFTE);
  });

  const licenseByLob = {};
  const supportByLob = {};
  (state.applications || []).forEach((application) => {
    const lob = application.domain || "Unassigned";
    licenseByLob[lob] = (licenseByLob[lob] || 0) + num(application.licenseCostUSD);
    supportByLob[lob] = (supportByLob[lob] || 0) + num(application.supportCostUSD);
  });

  (state.workshopCandidates || []).forEach((candidate) => {
    const lob = candidate.lineOfBusiness || "Unassigned";
    const lobFTE = fteByLob[lob] || 0;
    const share = lobFTE > 0 ? num(candidate.currentFTE) / lobFTE : 0;
    candidate.allocatedLicenseUSD = (licenseByLob[lob] || 0) * share;
    candidate.allocatedSupportUSD = (supportByLob[lob] || 0) * share;
  });
  return state;
}

/* Application cost that cannot reach a capability, because no scored capability sits in
   that line of business. Reported rather than silently dropped from the case. */
function unallocatedApplicationCost(state) {
  const lobsWithCandidates = new Set((state.workshopCandidates || []).map((row) => row.lineOfBusiness || "Unassigned"));
  return (state.applications || []).reduce((total, application) => {
    if (lobsWithCandidates.has(application.domain || "Unassigned")) return total;
    return total + num(application.licenseCostUSD) + num(application.supportCostUSD);
  }, 0);
}

// Everything downstream of the workshop scores is rebuilt here.
function refreshDerivedState(state) {
  syncApplicationCosts(state);
  syncPlacementRegister(state);
  return syncAgreedDecisions(state);
}

function computeCandidate(candidate, assumptions) {
  const onshoreCost = num(candidate.onshoreCostPerFTEUSD) || assumptions.defaultOnshoreCostPerFTEUSD;
  const gccCost = num(candidate.gccCostPerFTEUSD) || assumptions.defaultGccCostPerFTEUSD;
  const readinessPercent = computeReadinessPercent(candidate);
  const modelWave = waveFor(readinessPercent, assumptions);
  const agreedDecision = String(candidate.agreedDecision || "").trim();
  const agreedWave = AGREED_DECISION_WAVE[agreedDecision] || "";
  const wave = agreedWave || modelWave;
  const decisionVariance = !!agreedWave && agreedWave !== modelWave;

  // Retained capabilities claim no value: nothing moves until the constraint is fixed.
  const isRetained = wave === "Retain / Improve First";
  const transferSharePercent = isRetained ? 0 : Math.min(readinessPercent, assumptions.maxTransferSharePercent);
  const transferredFTE = num(candidate.currentFTE) * (transferSharePercent / 100);

  const arbitrageValue = transferredFTE * Math.max(0, onshoreCost - gccCost);
  const wave2AutomationFactor = wave === "Wave 2 / Hybrid"
    ? Math.max(0, Math.min(100, num(assumptions.wave2AutomationRealisationPercent))) / 100
    : 1;
  const automationSavingPercent = (Math.min(5, Math.max(0, num(candidate.automationPotential))) / 5) * assumptions.maxAutomationSavingPercent * wave2AutomationFactor;
  const automationValue = transferredFTE * gccCost * (automationSavingPercent / 100);

  // Only the transferred share of a capability's application run cost can be saved.
  const applicationLicenseValue = isRetained ? 0
    : num(candidate.allocatedLicenseUSD) * (transferSharePercent / 100) * (assumptions.appLicenseSavingPercent / 100);
  const applicationSupportValue = isRetained ? 0
    : num(candidate.allocatedSupportUSD) * (transferSharePercent / 100) * (assumptions.appSupportSavingPercent / 100);
  const applicationValue = applicationLicenseValue + applicationSupportValue;

  const riskAvoidanceValue = isRetained ? 0 : num(candidate.riskAvoidanceUSD);
  const revenueEnablementValue = isRetained ? 0 : num(candidate.revenueEnablementUSD);

  const annualValue = arbitrageValue + automationValue + applicationValue + riskAvoidanceValue + revenueEnablementValue;

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
    allocatedLicenseUSD: num(candidate.allocatedLicenseUSD),
    allocatedSupportUSD: num(candidate.allocatedSupportUSD),
    applicationLicenseValue,
    applicationSupportValue,
    applicationValue,
    riskAvoidanceValue,
    revenueEnablementValue,
    annualValue,
    parallelRunMonths,
    parallelRunCost,
    setupCost,
    oneTimeCost,
    investment,
    isRetained,
    modelWave,
    agreedDecision,
    decisionVariance,
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
    accumulator.currentFTE += num(candidate.currentFTE);
    accumulator.transferredFTE += computed.transferredFTE;
    accumulator.arbitrageValue += computed.arbitrageValue;
    accumulator.automationValue += computed.automationValue;
    accumulator.applicationValue += computed.applicationValue;
    accumulator.allocatedLicenseUSD += computed.allocatedLicenseUSD;
    accumulator.allocatedSupportUSD += computed.allocatedSupportUSD;
    accumulator.riskAvoidanceValue += computed.riskAvoidanceValue;
    accumulator.revenueEnablementValue += computed.revenueEnablementValue;
    return accumulator;
  }, {
    annualValue: 0, investment: 0, setupCost: 0, parallelRunCost: 0, oneTimeCost: 0, currentFTE: 0, transferredFTE: 0,
    arbitrageValue: 0, automationValue: 0, applicationValue: 0, allocatedLicenseUSD: 0, allocatedSupportUSD: 0,
    riskAvoidanceValue: 0, revenueEnablementValue: 0
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
/* The model recommendation is scored from workshop data alone, while the agreed
   decision is a capability-level business judgement. Both shares are aggregated
   separately so the variance between them can be reported rather than hidden. */
function computeLobPlacements(state) {
  const groups = {};
  state.workshopCandidates.forEach((candidate) => {
    const lineOfBusiness = candidate.lineOfBusiness || "Unassigned";
    if (!groups[lineOfBusiness]) {
      groups[lineOfBusiness] = {
        lineOfBusiness: lineOfBusiness, totalFTE: 0, transferableFTE: 0, modelTransferableFTE: 0,
        annualValue: 0, investment: 0, capabilityCount: 0,
        wave1: 0, wave2: 0, retained: 0, agreedMove: 0, agreedHybrid: 0, agreedRemain: 0,
        overrides: 0, varianceCount: 0, moving: [], staying: []
      };
    }
    const group = groups[lineOfBusiness];
    const computed = computeCandidate(candidate, state.assumptions);
    const modelOnly = computeCandidate(Object.assign({}, candidate, { agreedDecision: "" }), state.assumptions);

    group.capabilityCount += 1;
    group.totalFTE += num(candidate.currentFTE);
    group.transferableFTE += computed.transferredFTE;
    group.modelTransferableFTE += modelOnly.transferredFTE;
    group.annualValue += computed.annualValue;
    group.investment += computed.investment;
    if (computed.decisionVariance) group.varianceCount += 1;

    if (modelOnly.wave === "MVP Wave 1") group.wave1 += 1;
    else if (modelOnly.wave === "Wave 2 / Hybrid") group.wave2 += 1;
    else group.retained += 1;

    const effective = WAVE_DECISION[computed.wave];
    if (effective === PLACEMENT_MOVE) group.agreedMove += 1;
    else if (effective === PLACEMENT_HYBRID) group.agreedHybrid += 1;
    else group.agreedRemain += 1;
    if (computed.agreedDecision) group.overrides += 1;

    if (computed.wave === "Retain / Improve First") group.staying.push(candidate.capability);
    else group.moving.push(candidate.capability);
  });

  return Object.keys(groups).map((key) => {
    const group = groups[key];
    const gccSharePercent = group.totalFTE > 0 ? (group.transferableFTE / group.totalFTE) * 100 : 0;
    const modelSharePercent = group.totalFTE > 0 ? (group.modelTransferableFTE / group.totalFTE) * 100 : 0;
    const agreedCount = group.agreedMove + group.agreedHybrid + group.agreedRemain;
    let agreedDecision = "";
    if (agreedCount) {
      if (group.agreedMove && !group.agreedHybrid && !group.agreedRemain) agreedDecision = PLACEMENT_MOVE;
      else if (!group.agreedMove && !group.agreedHybrid) agreedDecision = PLACEMENT_REMAIN;
      else agreedDecision = PLACEMENT_HYBRID;
    }
    return Object.assign(group, {
      gccSharePercent: gccSharePercent,
      modelSharePercent: modelSharePercent,
      recommendation: placementFor(modelSharePercent, state.assumptions),
      agreedDecision: agreedDecision
    });
  }).sort((left, right) => right.annualValue - left.annualValue);
}

/* Capability-level roll-up. Every capability has a decision: the model's, unless
   leadership recorded an override. */
function agreedPlacementSummary(state) {
  const summary = { move: 0, hybrid: 0, remain: 0, overrides: 0, variance: 0, total: 0, movingFTE: 0,
    modelMove: 0, modelHybrid: 0, modelRemain: 0 };
  state.workshopCandidates.forEach((candidate) => {
    const computed = computeCandidate(candidate, state.assumptions);
    summary.total += 1;
    if (computed.agreedDecision) summary.overrides += 1;
    if (computed.decisionVariance) summary.variance += 1;

    const modelDecision = WAVE_DECISION[computed.modelWave];
    if (modelDecision === PLACEMENT_MOVE) summary.modelMove += 1;
    else if (modelDecision === PLACEMENT_HYBRID) summary.modelHybrid += 1;
    else summary.modelRemain += 1;

    const effective = WAVE_DECISION[computed.wave];
    if (effective === PLACEMENT_MOVE) {
      summary.move += 1;
      summary.movingFTE += num(candidate.currentFTE);
    } else if (effective === PLACEMENT_HYBRID) summary.hybrid += 1;
    else summary.remain += 1;
  });
  return summary;
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
    ["voiceOfBusiness", "strategicGoals", "organizationStructure", "northStarMandates", "workshopCandidates", "lobPlacements", "processAppMap", "applications", "dataFlows", "successCriteria", "valueActions", "governanceForums"].forEach((key) => {
      if (!Array.isArray(merged[key])) merged[key] = [];
    });
    return refreshDerivedState(merged);
  } catch (error) {
    console.error("Failed to load MVP framework state, starting fresh.", error);
    return emptyState();
  }
}

function saveState(state) {
  refreshDerivedState(state);
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
/* The dataset lives in js/seedData.js, generated from the workshop input files. */
function seedState() {
  const state = emptyState();
  Object.assign(state.meta, SEED_META);
  state.strategicGoals = cloneRows(SEED_STRATEGIC_GOALS);
  state.organizationStructure = cloneRows(SEED_ORGANIZATION_STRUCTURE);
  state.northStarMandates = cloneRows(SEED_NORTHSTAR_MANDATES);
  state.voiceOfBusiness = cloneRows(SEED_VOICE_OF_BUSINESS);
  state.workshopCandidates = cloneRows(SEED_WORKSHOP_CANDIDATES);
  state.lobPlacements = [];
  state.processAppMap = cloneRows(SEED_PROCESS_APP_MAP);
  state.applications = cloneRows(SEED_APPLICATIONS);
  state.dataFlows = cloneRows(SEED_DATA_FLOWS);
  state.successCriteria = cloneRows(SEED_SUCCESS_CRITERIA);
  state.valueActions = cloneRows(SEED_VALUE_ACTIONS);
  state.governanceForums = cloneRows(SEED_GOVERNANCE_FORUMS);
  return refreshDerivedState(state);
}
