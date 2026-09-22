/* ===================== Seed Dataset =====================
 * Generated from the workshop input files:
 *   Voiceofbusiness/voiceOfBusiness.csv
 *   WorkshopCapture/workshopCandidatesmain.csv
 *   GCCvsPowerhouse/Lobplacementimport.xlsx
 * Agreed placement decisions are captured per capability: the
 * "GCC Owns" column holds the capability name, not a sub-scope.
 * ====================================================== */

const SEED_META = {
  "engagementName": "Integrated Energy Operator - GCC Value MVP",
  "client": "Integrated Energy Operator (illustrative)",
  "facilitator": "GCC Advisory Team",
  "workshopDate": "2026-09-18"
};

const SEED_STRATEGIC_GOALS = [
  {
    "id": "goal_g6os4b7",
    "goal": "Improve production reliability and asset uptime across operated assets",
    "owner": "Chief Operating Officer",
    "horizon": "Medium (1-2y)",
    "successMeasure": "Production efficiency from 88% to 94%",
    "valueType": "Productivity"
  },
  {
    "id": "goal_8u7v4du",
    "goal": "Reduce unit operating cost and cost-to-serve across the portfolio",
    "owner": "Chief Financial Officer",
    "horizon": "Short (0-12m)",
    "successMeasure": "Unit opex reduced 20% per barrel of oil equivalent",
    "valueType": "Cost"
  },
  {
    "id": "goal_uy1zrj4",
    "goal": "Create trusted, reusable subsurface and operations data products",
    "owner": "Chief Data Officer",
    "horizon": "Medium (1-2y)",
    "successMeasure": "Single source of truth for 80% of production and subsurface KPIs",
    "valueType": "Capability"
  },
  {
    "id": "goal_a4dc6eb",
    "goal": "Accelerate project and digital delivery to first value",
    "owner": "Chief Technology Officer",
    "horizon": "Long (2-3y)",
    "successMeasure": "Project delivery cycle from quarterly to monthly releases",
    "valueType": "Speed"
  },
  {
    "id": "goal_hse5r2k",
    "goal": "Strengthen safety, asset integrity, and regulatory assurance",
    "owner": "Chief HSE & Compliance Officer",
    "horizon": "Medium (1-2y)",
    "successMeasure": "Tier 1 process safety events reduced 50%; zero material compliance findings",
    "valueType": "Risk"
  }
];

const SEED_VOICE_OF_BUSINESS = [
  {
    "id": "vob_001",
    "stakeholder": "VP Operations",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "theme": "Manual effort",
    "painPoint": "Teams spend hours consolidating work queues and performance data from multiple tools before decisions are made.",
    "businessImpact": "High",
    "linkedGoal": "goal_g6os4b7",
    "quote": "We are data rich and insight poor at the exact moment we need to act."
  },
  {
    "id": "vob_002",
    "stakeholder": "Director Customer Operations",
    "lineOfBusiness": "Production Operations",
    "region": "Europe",
    "theme": "Cost pressure",
    "painPoint": "Tier-1 support volume grows faster than revenue and is handled by high-cost local teams.",
    "businessImpact": "High",
    "linkedGoal": "goal_8u7v4du",
    "quote": "Every new customer adds cost before it adds margin."
  },
  {
    "id": "vob_003",
    "stakeholder": "Head of Finance Operations",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "theme": "Reconciliation",
    "painPoint": "Billing and settlement reconciliation is manual and delays month-end close by five days.",
    "businessImpact": "Medium",
    "linkedGoal": "goal_8u7v4du",
    "quote": "We close late every month for reasons we already understand."
  },
  {
    "id": "vob_004",
    "stakeholder": "Chief Data Officer",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "theme": "Fragmented data",
    "painPoint": "Each region builds its own reports, so leadership debates numbers instead of decisions.",
    "businessImpact": "High",
    "linkedGoal": "goal_uy1zrj4",
    "quote": "We need one number, not five versions of it."
  },
  {
    "id": "vob_005",
    "stakeholder": "Director Platform Delivery",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "theme": "Delivery speed",
    "painPoint": "Change backlog keeps growing because delivery capacity is fixed and specialist skills are scarce.",
    "businessImpact": "Medium",
    "linkedGoal": "goal_a4dc6eb",
    "quote": "Good ideas wait in a queue for two quarters."
  }
];

const SEED_ORGANIZATION_STRUCTURE = [
  {
    "id": "org_001",
    "region": "North America",
    "lineOfBusiness": "Production Operations",
    "teamSizeFTE": 240,
    "revenueUSD": 5400000000,
    "operatingCostUSD": 3900000000,
    "notes": "Operated production base and the largest surveillance, reporting and planning footprint."
  },
  {
    "id": "org_002",
    "region": "Global",
    "lineOfBusiness": "Supply Chain",
    "teamSizeFTE": 150,
    "revenueUSD": 360000000,
    "operatingCostUSD": 250000000,
    "notes": "Global source-to-pay and materials management; highly standardised and rules based."
  },
  {
    "id": "org_003",
    "region": "North America",
    "lineOfBusiness": "Commercial & Partnerships",
    "teamSizeFTE": 133,
    "revenueUSD": 2400000000,
    "operatingCostUSD": 1850000000,
    "notes": "Marketing, trading support and joint-venture accounting for operated and partner assets."
  },
  {
    "id": "org_004",
    "region": "North America",
    "lineOfBusiness": "HSE & Sustainability",
    "teamSizeFTE": 126,
    "revenueUSD": 120000000,
    "operatingCostUSD": 78000000,
    "notes": "Safety, integrity assurance and emissions reporting across all operated assets."
  },
  {
    "id": "org_005",
    "region": "North America",
    "lineOfBusiness": "Maintenance & Integrity",
    "teamSizeFTE": 120,
    "revenueUSD": 840000000,
    "operatingCostUSD": 700000000,
    "notes": "Planning, scheduling and integrity engineering; execution stays at the asset."
  },
  {
    "id": "org_006",
    "region": "North America",
    "lineOfBusiness": "Facilities & Projects",
    "teamSizeFTE": 108,
    "revenueUSD": 720000000,
    "operatingCostUSD": 610000000,
    "notes": "Capital project engineering and FEED support across the portfolio."
  },
  {
    "id": "org_007",
    "region": "Global",
    "lineOfBusiness": "Digital, Data & Technology",
    "teamSizeFTE": 96,
    "revenueUSD": 180000000,
    "operatingCostUSD": 130000000,
    "notes": "Platform engineering, data products and application operations, including licences."
  },
  {
    "id": "org_008",
    "region": "Europe",
    "lineOfBusiness": "Finance",
    "teamSizeFTE": 80,
    "revenueUSD": 84000000,
    "operatingCostUSD": 48000000,
    "notes": "Transactional and statutory finance separated before transfer decisions."
  },
  {
    "id": "org_009",
    "region": "Europe",
    "lineOfBusiness": "People & Organisation",
    "teamSizeFTE": 63,
    "revenueUSD": 60000000,
    "operatingCostUSD": 38000000,
    "notes": "HR operations, payroll support and competency administration."
  },
  {
    "id": "org_010",
    "region": "Europe",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "teamSizeFTE": 28,
    "revenueUSD": 36000000,
    "operatingCostUSD": 22000000,
    "notes": "Internal audit, risk and compliance reporting; sign-off stays with the entity."
  },
  {
    "id": "org_011",
    "region": "North America",
    "lineOfBusiness": "Reservoir & Field Development",
    "teamSizeFTE": 20,
    "revenueUSD": 960000000,
    "operatingCostUSD": 520000000,
    "notes": "Reservoir management and development planning that sets future production."
  },
  {
    "id": "org_012",
    "region": "North America",
    "lineOfBusiness": "Exploration & Subsurface",
    "teamSizeFTE": 10,
    "revenueUSD": 240000000,
    "operatingCostUSD": 180000000,
    "notes": "Exploration screening and subsurface evaluation feeding the resource base."
  },
  {
    "id": "org_013",
    "region": "North America",
    "lineOfBusiness": "Wells & Drilling",
    "teamSizeFTE": 10,
    "revenueUSD": 600000000,
    "operatingCostUSD": 430000000,
    "notes": "Well delivery and real-time drilling support."
  }
];

const SEED_NORTHSTAR_MANDATES = [
  {
    "id": "ns_001",
    "lineOfBusiness": "Digital, Data & Technology",
    "outcomesOwned": "Platform stability and delivery throughput for owned products.",
    "decisionRights": "GCC owns release engineering, data product roadmap, and technical debt backlog.",
    "productsOwned": "Enterprise data platform, application operations, and CI/CD pipeline",
    "successMeasure": "Change lead time and change failure rate",
    "gccOwnership": "Full ownership",
    "powerHouseRetains": "Enterprise architecture standards and investment approval"
  },
  {
    "id": "ns_002",
    "lineOfBusiness": "Supply Chain",
    "outcomesOwned": "End-to-end source-to-pay outcome: cost per purchase order, supplier cycle time, and materials availability.",
    "decisionRights": "GCC owns category analytics, tender preparation, and purchase-to-pay execution up to $500K without approval.",
    "productsOwned": "Source-to-pay platform and supplier performance analytics",
    "successMeasure": "Cost per purchase order and supplier on-time delivery",
    "gccOwnership": "Full ownership",
    "powerHouseRetains": "Final supplier award above threshold, contract signature, and market-sensitive negotiations"
  },
  {
    "id": "ns_003",
    "lineOfBusiness": "Finance",
    "outcomesOwned": "Transactional finance outcome: close predictability and reconciliation accuracy.",
    "decisionRights": "GCC owns reconciliation execution, accounts processing, and reporting preparation within agreed tolerance.",
    "productsOwned": "Reconciliation automation and exception workflow",
    "successMeasure": "Days to close and reconciliation exception rate",
    "gccOwnership": "Joint with Power House",
    "powerHouseRetains": "Statutory sign-off, external audit, and regulatory filings"
  },
  {
    "id": "ns_004",
    "lineOfBusiness": "People & Organisation",
    "outcomesOwned": "HR operations outcome: service accuracy and employee query resolution.",
    "decisionRights": "GCC owns payroll support, competency records, and HR reporting execution.",
    "productsOwned": "HR service workflow and competency data products",
    "successMeasure": "Query resolution time and payroll accuracy",
    "gccOwnership": "Joint with Power House",
    "powerHouseRetains": "Employee relations, reward policy, and local labour compliance"
  },
  {
    "id": "ns_005",
    "lineOfBusiness": "Maintenance & Integrity",
    "outcomesOwned": "Maintenance planning and integrity assurance outcome: schedule compliance and backlog health.",
    "decisionRights": "GCC owns turnaround planning, work-pack preparation, and integrity data management.",
    "productsOwned": "Maintenance planning workbench and integrity data platform",
    "successMeasure": "Schedule compliance and overdue integrity backlog",
    "gccOwnership": "Full ownership",
    "powerHouseRetains": "Field execution, permit to work, and on-asset technical authority"
  },
  {
    "id": "ns_006",
    "lineOfBusiness": "HSE & Sustainability",
    "outcomesOwned": "Assurance and emissions reporting outcome: barrier status visibility and reporting accuracy.",
    "decisionRights": "GCC owns barrier assurance analytics, incident data quality, and emissions reporting preparation.",
    "productsOwned": "Barrier assurance dashboard and emissions reporting products",
    "successMeasure": "Barrier health index and reporting timeliness",
    "gccOwnership": "Full ownership",
    "powerHouseRetains": "Site safety accountability, regulator interface, and incident command"
  },
  {
    "id": "ns_007",
    "lineOfBusiness": "Commercial & Partnerships",
    "outcomesOwned": "Commercial evaluation and joint-venture reporting outcome: cycle time and accuracy.",
    "decisionRights": "GCC owns commercial modelling, partner reporting, and contract administration within tolerance.",
    "productsOwned": "Commercial evaluation models and JV reporting suite",
    "successMeasure": "Evaluation cycle time and partner billing accuracy",
    "gccOwnership": "Full ownership",
    "powerHouseRetains": "Deal approval, partner negotiation, and price exposure decisions"
  },
  {
    "id": "ns_008",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "outcomesOwned": "Risk and assurance reporting outcome: coverage and timeliness of the control view.",
    "decisionRights": "GCC owns control testing preparation, risk data aggregation, and assurance reporting.",
    "productsOwned": "Risk register analytics and assurance reporting pack",
    "successMeasure": "Control testing coverage and reporting timeliness",
    "gccOwnership": "Advisory only",
    "powerHouseRetains": "Audit opinion, risk acceptance, and board reporting accountability"
  }
];

const SEED_WORKSHOP_CANDIDATES = [
  {
    "id": "cand_001",
    "capability": "Basin Screening",
    "lineOfBusiness": "Exploration & Subsurface",
    "region": "North America",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 10,
    "standardization": 2,
    "transferability": 2,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_002",
    "capability": "Development Scenario Definition",
    "lineOfBusiness": "Reservoir & Field Development",
    "region": "North America",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 10,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_003",
    "capability": "Investment Decision Support",
    "lineOfBusiness": "Reservoir & Field Development",
    "region": "North America",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 10,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 4,
    "dataReadiness": 3,
    "localConstraint": 2
  },
  {
    "id": "cand_004",
    "capability": "Well Objective Definition",
    "lineOfBusiness": "Wells & Drilling",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_005",
    "capability": "Real-time Drilling Monitoring",
    "lineOfBusiness": "Wells & Drilling",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 3,
    "dataReadiness": 3,
    "localConstraint": 2
  },
  {
    "id": "cand_006",
    "capability": "Facilities Concept Selection",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 2
  },
  {
    "id": "cand_007",
    "capability": "Process Design",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 3,
    "localConstraint": 1
  },
  {
    "id": "cand_008",
    "capability": "Flow Assurance",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 2,
    "transferability": 2,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_009",
    "capability": "Layout & Plot Planning",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_010",
    "capability": "FEED Management",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_011",
    "capability": "Mechanical Engineering",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_012",
    "capability": "Instrumentation & Control Engineering",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_013",
    "capability": "Civil & Structural Engineering",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 2,
    "transferability": 2,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_014",
    "capability": "Pipeline Engineering",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 5,
    "localConstraint": 1
  },
  {
    "id": "cand_015",
    "capability": "Project Planning & Controls",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_016",
    "capability": "Cost Engineering",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 2,
    "transferability": 4,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_017",
    "capability": "Contractor Management",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_018",
    "capability": "Construction Management",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 3,
    "localConstraint": 2
  },
  {
    "id": "cand_019",
    "capability": "Commissioning & Start-up",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_020",
    "capability": "Design Assurance",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 3,
    "localConstraint": 2
  },
  {
    "id": "cand_021",
    "capability": "Value Assurance",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_022",
    "capability": "Project Risk Management",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 2,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_023",
    "capability": "Technical Standards Management",
    "lineOfBusiness": "Facilities & Projects",
    "region": "North America",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_024",
    "capability": "Production Budgeting",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_025",
    "capability": "Production Scheduling",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_026",
    "capability": "Constraint Management",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_027",
    "capability": "Production Plan Optimisation",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 4,
    "transferability": 2,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_028",
    "capability": "Well Performance Monitoring",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 3,
    "localConstraint": 3
  },
  {
    "id": "cand_029",
    "capability": "Facility Performance Monitoring",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_030",
    "capability": "Production Loss Management",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_031",
    "capability": "Production Exception Management",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 3,
    "localConstraint": 1
  },
  {
    "id": "cand_032",
    "capability": "Well Optimisation",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_033",
    "capability": "Network Optimisation",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_034",
    "capability": "Chemical Treatment Optimisation",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_035",
    "capability": "Debottlenecking",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_036",
    "capability": "Daily Production Reporting",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 3,
    "localConstraint": 2
  },
  {
    "id": "cand_037",
    "capability": "Monthly Production Reporting",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 2,
    "transferability": 4,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_038",
    "capability": "Regulatory Production Reporting",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_039",
    "capability": "Production Variance Analysis",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_040",
    "capability": "Field Rounds & Inspections",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 3,
    "transferability": 4,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_041",
    "capability": "Permit-to-Work Administration",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_042",
    "capability": "Shift Handover Management",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 3,
    "transferability": 4,
    "automationPotential": 4,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_043",
    "capability": "Metering Management",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_044",
    "capability": "Production Allocation",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 2,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 2
  },
  {
    "id": "cand_045",
    "capability": "Volume Reconciliation",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 2,
    "transferability": 4,
    "automationPotential": 4,
    "dataReadiness": 3,
    "localConstraint": 3
  },
  {
    "id": "cand_046",
    "capability": "Loss Accounting",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 3,
    "transferability": 4,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_047",
    "capability": "Hydrocarbon Accounting",
    "lineOfBusiness": "Production Operations",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 10,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 1
  },
  {
    "id": "cand_048",
    "capability": "Maintenance Strategy Development",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_049",
    "capability": "Criticality Assessment",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_050",
    "capability": "Preventive Maintenance Planning",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_051",
    "capability": "Condition-based Maintenance",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 4,
    "transferability": 2,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_052",
    "capability": "Reliability-centred Maintenance",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 2,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 3,
    "localConstraint": 1
  },
  {
    "id": "cand_053",
    "capability": "Maintenance Scheduling",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 4,
    "transferability": 2,
    "automationPotential": 4,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_054",
    "capability": "Corrective Maintenance",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 5,
    "localConstraint": 1
  },
  {
    "id": "cand_055",
    "capability": "Preventive Maintenance Execution",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_056",
    "capability": "Maintenance Backlog Management",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_057",
    "capability": "Turnaround Scope Development",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 3,
    "localConstraint": 2
  },
  {
    "id": "cand_058",
    "capability": "Turnaround Planning",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_059",
    "capability": "Turnaround Execution",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 2
  },
  {
    "id": "cand_060",
    "capability": "Turnaround Closeout",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_061",
    "capability": "Inspection Planning",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 3,
    "localConstraint": 3
  },
  {
    "id": "cand_062",
    "capability": "Corrosion Management",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 4,
    "transferability": 2,
    "automationPotential": 4,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_063",
    "capability": "Static Equipment Integrity",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_064",
    "capability": "Rotating Equipment Integrity",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 3,
    "transferability": 4,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_065",
    "capability": "Pipeline Integrity",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 3,
    "localConstraint": 2
  },
  {
    "id": "cand_066",
    "capability": "Structural Integrity",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_067",
    "capability": "Reliability Analysis",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 2,
    "transferability": 2,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_068",
    "capability": "Root Cause Analysis",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_069",
    "capability": "Bad Actor Management",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 2
  },
  {
    "id": "cand_070",
    "capability": "Equipment Performance Monitoring",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 2
  },
  {
    "id": "cand_071",
    "capability": "Availability Improvement",
    "lineOfBusiness": "Maintenance & Integrity",
    "region": "North America",
    "linkedGoal": "goal_g6os4b7",
    "currentFTE": 5,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_072",
    "capability": "Safety Risk Assessment",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 3,
    "localConstraint": 2
  },
  {
    "id": "cand_073",
    "capability": "Behavioural Safety",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_074",
    "capability": "Incident Investigation",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 2,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_075",
    "capability": "Safety Performance Reporting",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_076",
    "capability": "Process Hazard Analysis",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 2,
    "transferability": 4,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_077",
    "capability": "Safety Critical Element Management",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 2,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_078",
    "capability": "Management of Change",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_079",
    "capability": "Barrier Assurance",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_080",
    "capability": "Emissions Monitoring",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 2,
    "transferability": 4,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_081",
    "capability": "Flaring Management",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_082",
    "capability": "Waste Management",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_083",
    "capability": "Water Management",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 2,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_084",
    "capability": "Spill Prevention & Response",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 2,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_085",
    "capability": "Environmental Reporting",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 4,
    "automationPotential": 2,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_086",
    "capability": "Emergency Response",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 5,
    "localConstraint": 1
  },
  {
    "id": "cand_087",
    "capability": "Crisis Management",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 2,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_088",
    "capability": "Oil Spill Response",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 2,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_089",
    "capability": "Business Continuity",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_090",
    "capability": "GHG Accounting",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 2,
    "dataReadiness": 3,
    "localConstraint": 1
  },
  {
    "id": "cand_091",
    "capability": "Methane Management",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_092",
    "capability": "Sustainability Reporting",
    "lineOfBusiness": "HSE & Sustainability",
    "region": "North America",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 6,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 3,
    "dataReadiness": 5,
    "localConstraint": 1
  },
  {
    "id": "cand_093",
    "capability": "Joint Operating Agreement Management",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 2,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_094",
    "capability": "Operating Committee Support",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_095",
    "capability": "Partner Coordination",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_096",
    "capability": "JV Performance Reporting",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_097",
    "capability": "Petroleum Contract Management",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 3,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_098",
    "capability": "Production Sharing Contract Management",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 2,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_099",
    "capability": "Commercial Evaluation",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_100",
    "capability": "Economic Modelling",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_101",
    "capability": "Obligation Tracking",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 3,
    "transferability": 4,
    "automationPotential": 2,
    "dataReadiness": 3,
    "localConstraint": 3
  },
  {
    "id": "cand_102",
    "capability": "Entitlement Management",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 2,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_103",
    "capability": "Royalty Calculation",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 3,
    "transferability": 2,
    "automationPotential": 3,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_104",
    "capability": "Revenue Accounting",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_105",
    "capability": "Crude & Gas Sales Accounting",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 2,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_106",
    "capability": "Invoice & Settlement",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 4,
    "transferability": 4,
    "automationPotential": 2,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_107",
    "capability": "Crude Marketing",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 2,
    "transferability": 2,
    "automationPotential": 3,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_108",
    "capability": "Gas Marketing",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 2,
    "transferability": 2,
    "automationPotential": 2,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_109",
    "capability": "Nominations Management",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_110",
    "capability": "Lifting Management",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 4,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_111",
    "capability": "Customer Contract Administration",
    "lineOfBusiness": "Commercial & Partnerships",
    "region": "North America",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 7,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 5,
    "localConstraint": 1
  },
  {
    "id": "cand_112",
    "capability": "Category Strategy",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_113",
    "capability": "Market Intelligence",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_114",
    "capability": "Tender Management",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 5,
    "localConstraint": 4
  },
  {
    "id": "cand_115",
    "capability": "Supplier Selection",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_116",
    "capability": "Contract Negotiation",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_117",
    "capability": "Requisition Management",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 5
  },
  {
    "id": "cand_118",
    "capability": "Purchase Order Management",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 4
  },
  {
    "id": "cand_119",
    "capability": "Expediting",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_120",
    "capability": "Goods Receipt",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_121",
    "capability": "Invoice Matching",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 4
  },
  {
    "id": "cand_122",
    "capability": "Materials Planning",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 4
  },
  {
    "id": "cand_123",
    "capability": "Inventory Control",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 4
  },
  {
    "id": "cand_124",
    "capability": "Spare Parts Management",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 4
  },
  {
    "id": "cand_125",
    "capability": "Warehouse Operations",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 5
  },
  {
    "id": "cand_126",
    "capability": "Inventory Optimisation",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 4
  },
  {
    "id": "cand_127",
    "capability": "Marine Logistics",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_128",
    "capability": "Aviation Logistics",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_129",
    "capability": "Road Transportation",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 5
  },
  {
    "id": "cand_130",
    "capability": "Personnel Logistics",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_131",
    "capability": "Freight Forwarding",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_132",
    "capability": "Logistics Scheduling",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_133",
    "capability": "Supplier Onboarding",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_134",
    "capability": "Supplier Risk Management",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_135",
    "capability": "Supplier Performance Management",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 4
  },
  {
    "id": "cand_136",
    "capability": "Contract Compliance Monitoring",
    "lineOfBusiness": "Supply Chain",
    "region": "Global",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 6,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 4
  },
  {
    "id": "cand_137",
    "capability": "General Ledger Accounting",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_138",
    "capability": "Fixed Asset Accounting",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 3
  },
  {
    "id": "cand_139",
    "capability": "Intercompany Accounting",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 4
  },
  {
    "id": "cand_140",
    "capability": "Period Close",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 4
  },
  {
    "id": "cand_141",
    "capability": "Financial Reporting",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 4,
    "dataReadiness": 3,
    "localConstraint": 3
  },
  {
    "id": "cand_142",
    "capability": "Budgeting",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_143",
    "capability": "Forecasting",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 4
  },
  {
    "id": "cand_144",
    "capability": "Cost Centre Accounting",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 5
  },
  {
    "id": "cand_145",
    "capability": "Asset Performance Reporting",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_146",
    "capability": "Management Reporting",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_147",
    "capability": "AFE Management",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_148",
    "capability": "Capital Project Accounting",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_149",
    "capability": "Asset Unitisation",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_150",
    "capability": "Depletion Depreciation & Amortisation",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_151",
    "capability": "Impairment Assessment",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 4
  },
  {
    "id": "cand_152",
    "capability": "Cash Management",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 4
  },
  {
    "id": "cand_153",
    "capability": "Liquidity Planning",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_154",
    "capability": "Tax Accounting",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 4
  },
  {
    "id": "cand_155",
    "capability": "Petroleum Tax Management",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 4
  },
  {
    "id": "cand_156",
    "capability": "Royalty Management",
    "lineOfBusiness": "Finance",
    "region": "Europe",
    "linkedGoal": "goal_8u7v4du",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_157",
    "capability": "Workforce Demand Planning",
    "lineOfBusiness": "People & Organisation",
    "region": "Europe",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 7,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 4
  },
  {
    "id": "cand_158",
    "capability": "Roster & Rotation Planning",
    "lineOfBusiness": "People & Organisation",
    "region": "Europe",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 7,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 4
  },
  {
    "id": "cand_159",
    "capability": "Contingent Workforce Management",
    "lineOfBusiness": "People & Organisation",
    "region": "Europe",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 7,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_160",
    "capability": "Workforce Analytics",
    "lineOfBusiness": "People & Organisation",
    "region": "Europe",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 7,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 5
  },
  {
    "id": "cand_161",
    "capability": "Technical Competency Management",
    "lineOfBusiness": "People & Organisation",
    "region": "Europe",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 7,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 4
  },
  {
    "id": "cand_162",
    "capability": "Learning & Certification",
    "lineOfBusiness": "People & Organisation",
    "region": "Europe",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 7,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 4
  },
  {
    "id": "cand_163",
    "capability": "Succession Planning",
    "lineOfBusiness": "People & Organisation",
    "region": "Europe",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 7,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 5
  },
  {
    "id": "cand_164",
    "capability": "Knowledge Management",
    "lineOfBusiness": "People & Organisation",
    "region": "Europe",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 7,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 4
  },
  {
    "id": "cand_165",
    "capability": "Talent Acquisition",
    "lineOfBusiness": "People & Organisation",
    "region": "Europe",
    "linkedGoal": "goal_a4dc6eb",
    "currentFTE": 7,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 3
  },
  {
    "id": "cand_166",
    "capability": "ERP Application Management",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_167",
    "capability": "EAM Application Management",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_168",
    "capability": "Subsurface Application Management",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 5
  },
  {
    "id": "cand_169",
    "capability": "Drilling Application Management",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_170",
    "capability": "Production Application Management",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_171",
    "capability": "Integration Platform Management",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_172",
    "capability": "Data Governance",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_173",
    "capability": "Master Data Management",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_174",
    "capability": "Metadata Management",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 5
  },
  {
    "id": "cand_175",
    "capability": "Data Quality Management",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 4
  },
  {
    "id": "cand_176",
    "capability": "Data Engineering",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 5
  },
  {
    "id": "cand_177",
    "capability": "Data Platform Operations",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 5
  },
  {
    "id": "cand_178",
    "capability": "Production Analytics",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 4,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_179",
    "capability": "Predictive Maintenance Analytics",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_180",
    "capability": "Reservoir Analytics",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 3,
    "localConstraint": 5
  },
  {
    "id": "cand_181",
    "capability": "Drilling Analytics",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 5
  },
  {
    "id": "cand_182",
    "capability": "AI Model Governance",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 3,
    "localConstraint": 4
  },
  {
    "id": "cand_183",
    "capability": "Business Intelligence",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_184",
    "capability": "Cloud & Infrastructure Operations",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_185",
    "capability": "Network & Connectivity",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_186",
    "capability": "OT / ICS Cybersecurity",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_187",
    "capability": "Identity & Access Management",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 3
  },
  {
    "id": "cand_188",
    "capability": "Security Operations",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 5,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 4,
    "localConstraint": 4
  },
  {
    "id": "cand_189",
    "capability": "IT Service Management",
    "lineOfBusiness": "Digital, Data & Technology",
    "region": "Global",
    "linkedGoal": "goal_uy1zrj4",
    "currentFTE": 4,
    "standardization": 4,
    "transferability": 5,
    "automationPotential": 5,
    "dataReadiness": 5,
    "localConstraint": 3
  },
  {
    "id": "cand_190",
    "capability": "Corporate Strategy",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 2,
    "dataReadiness": 3,
    "localConstraint": 3
  },
  {
    "id": "cand_191",
    "capability": "Portfolio Planning",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 2,
    "transferability": 2,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_192",
    "capability": "Investment Governance",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 2,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_193",
    "capability": "Performance Management",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 2,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_194",
    "capability": "Benefits Realisation",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_195",
    "capability": "Enterprise Risk Management",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 3,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_196",
    "capability": "Operational Risk Management",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 3,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_197",
    "capability": "Regulatory Compliance",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 3,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 5,
    "localConstraint": 2
  },
  {
    "id": "cand_198",
    "capability": "Internal Controls",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 2,
    "transferability": 4,
    "automationPotential": 2,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_199",
    "capability": "Internal Audit",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 4,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_200",
    "capability": "Data Architecture",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_201",
    "capability": "Technology Standards",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 4,
    "transferability": 3,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 2
  },
  {
    "id": "cand_202",
    "capability": "Decision Rights Management",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 4,
    "transferability": 4,
    "automationPotential": 4,
    "dataReadiness": 4,
    "localConstraint": 1
  },
  {
    "id": "cand_203",
    "capability": "Policy Management",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "region": "Europe",
    "linkedGoal": "goal_hse5r2k",
    "currentFTE": 2,
    "standardization": 3,
    "transferability": 4,
    "automationPotential": 3,
    "dataReadiness": 4,
    "localConstraint": 2
  }
];

const SEED_LOB_PLACEMENTS = [
  {
    "id": "lob_001",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Move to GCC",
    "gccOwns": "Turnaround Planning",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_002",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Move to GCC",
    "gccOwns": "Barrier Assurance",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_003",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Move to GCC",
    "gccOwns": "Commercial Evaluation",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_004",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Category Strategy",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_005",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Market Intelligence",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_006",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Tender Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_007",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Supplier Selection",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_008",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Contract Negotiation",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_009",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Requisition Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_010",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Purchase Order Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_011",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Expediting",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_012",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Goods Receipt",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_013",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Invoice Matching",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_014",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Materials Planning",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_015",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Inventory Control",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_016",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Warehouse Operations",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_017",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Inventory Optimisation",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_018",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Marine Logistics",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_019",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Road Transportation",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_020",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Freight Forwarding",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_021",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Supplier Risk Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_022",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Supplier Performance Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_023",
    "lineOfBusiness": "Supply Chain",
    "decision": "Move to GCC",
    "gccOwns": "Contract Compliance Monitoring",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_024",
    "lineOfBusiness": "Finance",
    "decision": "Move to GCC",
    "gccOwns": "General Ledger Accounting",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_025",
    "lineOfBusiness": "Finance",
    "decision": "Move to GCC",
    "gccOwns": "Period Close",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_026",
    "lineOfBusiness": "Finance",
    "decision": "Move to GCC",
    "gccOwns": "Budgeting",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_027",
    "lineOfBusiness": "Finance",
    "decision": "Move to GCC",
    "gccOwns": "Forecasting",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_028",
    "lineOfBusiness": "Finance",
    "decision": "Move to GCC",
    "gccOwns": "Cost Centre Accounting",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_029",
    "lineOfBusiness": "Finance",
    "decision": "Move to GCC",
    "gccOwns": "Asset Performance Reporting",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_030",
    "lineOfBusiness": "Finance",
    "decision": "Move to GCC",
    "gccOwns": "Management Reporting",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_031",
    "lineOfBusiness": "Finance",
    "decision": "Move to GCC",
    "gccOwns": "AFE Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_032",
    "lineOfBusiness": "Finance",
    "decision": "Move to GCC",
    "gccOwns": "Capital Project Accounting",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_033",
    "lineOfBusiness": "Finance",
    "decision": "Move to GCC",
    "gccOwns": "Depletion Depreciation & Amortisation",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_034",
    "lineOfBusiness": "Finance",
    "decision": "Move to GCC",
    "gccOwns": "Impairment Assessment",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_035",
    "lineOfBusiness": "Finance",
    "decision": "Move to GCC",
    "gccOwns": "Cash Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_036",
    "lineOfBusiness": "People & Organisation",
    "decision": "Move to GCC",
    "gccOwns": "Workforce Demand Planning",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_037",
    "lineOfBusiness": "People & Organisation",
    "decision": "Move to GCC",
    "gccOwns": "Roster & Rotation Planning",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_038",
    "lineOfBusiness": "People & Organisation",
    "decision": "Move to GCC",
    "gccOwns": "Workforce Analytics",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_039",
    "lineOfBusiness": "People & Organisation",
    "decision": "Move to GCC",
    "gccOwns": "Technical Competency Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_040",
    "lineOfBusiness": "People & Organisation",
    "decision": "Move to GCC",
    "gccOwns": "Succession Planning",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_041",
    "lineOfBusiness": "People & Organisation",
    "decision": "Move to GCC",
    "gccOwns": "Knowledge Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_042",
    "lineOfBusiness": "People & Organisation",
    "decision": "Move to GCC",
    "gccOwns": "Talent Acquisition",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_043",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "ERP Application Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_044",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "EAM Application Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_045",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Drilling Application Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_046",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Production Application Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_047",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Integration Platform Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_048",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Data Governance",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_049",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Master Data Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_050",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Metadata Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_051",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Data Quality Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_052",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Data Platform Operations",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_053",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Production Analytics",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_054",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Predictive Maintenance Analytics",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_055",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Reservoir Analytics",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_056",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Drilling Analytics",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_057",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Business Intelligence",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_058",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Cloud & Infrastructure Operations",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_059",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Network & Connectivity",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_060",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "OT / ICS Cybersecurity",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_061",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Identity & Access Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_062",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "Security Operations",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_063",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Move to GCC",
    "gccOwns": "IT Service Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_064",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Move to GCC",
    "gccOwns": "Decision Rights Management",
    "powerHouseRetains": "Other Capabilities within Line of Business",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_065",
    "lineOfBusiness": "Exploration & Subsurface",
    "decision": "Remain at Power House",
    "gccOwns": "Basin Screening",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_066",
    "lineOfBusiness": "Reservoir & Field Development",
    "decision": "Remain at Power House",
    "gccOwns": "Development Scenario Definition",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_067",
    "lineOfBusiness": "Reservoir & Field Development",
    "decision": "Remain at Power House",
    "gccOwns": "Investment Decision Support",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_068",
    "lineOfBusiness": "Wells & Drilling",
    "decision": "Remain at Power House",
    "gccOwns": "Well Objective Definition",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_069",
    "lineOfBusiness": "Wells & Drilling",
    "decision": "Remain at Power House",
    "gccOwns": "Real-time Drilling Monitoring",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_070",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Facilities Concept Selection",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_071",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Process Design",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_072",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Flow Assurance",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_073",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Layout & Plot Planning",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_074",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "FEED Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_075",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Mechanical Engineering",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_076",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Instrumentation & Control Engineering",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_077",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Civil & Structural Engineering",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_078",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Pipeline Engineering",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_079",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Project Planning & Controls",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_080",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Cost Engineering",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_081",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Contractor Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_082",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Construction Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_083",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Commissioning & Start-up",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_084",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Design Assurance",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_085",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Value Assurance",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_086",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Project Risk Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_087",
    "lineOfBusiness": "Facilities & Projects",
    "decision": "Remain at Power House",
    "gccOwns": "Technical Standards Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_088",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Production Budgeting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_089",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Production Scheduling",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_090",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Constraint Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_091",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Production Plan Optimisation",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_092",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Well Performance Monitoring",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_093",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Facility Performance Monitoring",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_094",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Production Loss Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_095",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Production Exception Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_096",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Well Optimisation",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_097",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Network Optimisation",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_098",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Chemical Treatment Optimisation",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_099",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Debottlenecking",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_100",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Daily Production Reporting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_101",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Monthly Production Reporting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_102",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Regulatory Production Reporting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_103",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Production Variance Analysis",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_104",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Field Rounds & Inspections",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_105",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Permit-to-Work Administration",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_106",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Shift Handover Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_107",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Metering Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_108",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Production Allocation",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_109",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Volume Reconciliation",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_110",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Loss Accounting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_111",
    "lineOfBusiness": "Production Operations",
    "decision": "Remain at Power House",
    "gccOwns": "Hydrocarbon Accounting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_112",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Maintenance Strategy Development",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_113",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Criticality Assessment",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_114",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Preventive Maintenance Planning",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_115",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Condition-based Maintenance",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_116",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Reliability-centred Maintenance",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_117",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Maintenance Scheduling",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_118",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Corrective Maintenance",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_119",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Preventive Maintenance Execution",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_120",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Maintenance Backlog Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_121",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Turnaround Scope Development",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_122",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Turnaround Execution",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_123",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Turnaround Closeout",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_124",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Inspection Planning",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_125",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Corrosion Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_126",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Static Equipment Integrity",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_127",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Rotating Equipment Integrity",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_128",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Pipeline Integrity",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_129",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Structural Integrity",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_130",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Reliability Analysis",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_131",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Root Cause Analysis",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_132",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Bad Actor Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_133",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Equipment Performance Monitoring",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_134",
    "lineOfBusiness": "Maintenance & Integrity",
    "decision": "Remain at Power House",
    "gccOwns": "Availability Improvement",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_135",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Safety Risk Assessment",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_136",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Behavioural Safety",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_137",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Incident Investigation",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_138",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Safety Performance Reporting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_139",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Process Hazard Analysis",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_140",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Safety Critical Element Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_141",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Management of Change",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_142",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Emissions Monitoring",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_143",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Flaring Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_144",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Waste Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_145",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Water Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_146",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Spill Prevention & Response",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_147",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Environmental Reporting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_148",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Emergency Response",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_149",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Crisis Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_150",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Oil Spill Response",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_151",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Business Continuity",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_152",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "GHG Accounting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_153",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Methane Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_154",
    "lineOfBusiness": "HSE & Sustainability",
    "decision": "Remain at Power House",
    "gccOwns": "Sustainability Reporting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_155",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Joint Operating Agreement Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_156",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Operating Committee Support",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_157",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Partner Coordination",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_158",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "JV Performance Reporting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_159",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Petroleum Contract Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_160",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Production Sharing Contract Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_161",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Economic Modelling",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_162",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Obligation Tracking",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_163",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Entitlement Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_164",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Royalty Calculation",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_165",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Revenue Accounting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_166",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Crude & Gas Sales Accounting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_167",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Invoice & Settlement",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_168",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Crude Marketing",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_169",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Gas Marketing",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_170",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Nominations Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_171",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Lifting Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_172",
    "lineOfBusiness": "Commercial & Partnerships",
    "decision": "Remain at Power House",
    "gccOwns": "Customer Contract Administration",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_173",
    "lineOfBusiness": "Supply Chain",
    "decision": "Remain at Power House",
    "gccOwns": "Spare Parts Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_174",
    "lineOfBusiness": "Supply Chain",
    "decision": "Remain at Power House",
    "gccOwns": "Aviation Logistics",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_175",
    "lineOfBusiness": "Supply Chain",
    "decision": "Remain at Power House",
    "gccOwns": "Personnel Logistics",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_176",
    "lineOfBusiness": "Supply Chain",
    "decision": "Remain at Power House",
    "gccOwns": "Logistics Scheduling",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_177",
    "lineOfBusiness": "Supply Chain",
    "decision": "Remain at Power House",
    "gccOwns": "Supplier Onboarding",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_178",
    "lineOfBusiness": "Finance",
    "decision": "Remain at Power House",
    "gccOwns": "Fixed Asset Accounting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_179",
    "lineOfBusiness": "Finance",
    "decision": "Remain at Power House",
    "gccOwns": "Intercompany Accounting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_180",
    "lineOfBusiness": "Finance",
    "decision": "Remain at Power House",
    "gccOwns": "Financial Reporting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_181",
    "lineOfBusiness": "Finance",
    "decision": "Remain at Power House",
    "gccOwns": "Asset Unitisation",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_182",
    "lineOfBusiness": "Finance",
    "decision": "Remain at Power House",
    "gccOwns": "Liquidity Planning",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_183",
    "lineOfBusiness": "Finance",
    "decision": "Remain at Power House",
    "gccOwns": "Tax Accounting",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_184",
    "lineOfBusiness": "Finance",
    "decision": "Remain at Power House",
    "gccOwns": "Petroleum Tax Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_185",
    "lineOfBusiness": "Finance",
    "decision": "Remain at Power House",
    "gccOwns": "Royalty Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_186",
    "lineOfBusiness": "People & Organisation",
    "decision": "Remain at Power House",
    "gccOwns": "Contingent Workforce Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_187",
    "lineOfBusiness": "People & Organisation",
    "decision": "Remain at Power House",
    "gccOwns": "Learning & Certification",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_188",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Remain at Power House",
    "gccOwns": "Subsurface Application Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_189",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Remain at Power House",
    "gccOwns": "Data Engineering",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_190",
    "lineOfBusiness": "Digital, Data & Technology",
    "decision": "Remain at Power House",
    "gccOwns": "AI Model Governance",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_191",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Remain at Power House",
    "gccOwns": "Corporate Strategy",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_192",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Remain at Power House",
    "gccOwns": "Portfolio Planning",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_193",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Remain at Power House",
    "gccOwns": "Investment Governance",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_194",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Remain at Power House",
    "gccOwns": "Performance Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_195",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Remain at Power House",
    "gccOwns": "Benefits Realisation",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_196",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Remain at Power House",
    "gccOwns": "Enterprise Risk Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_197",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Remain at Power House",
    "gccOwns": "Operational Risk Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_198",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Remain at Power House",
    "gccOwns": "Regulatory Compliance",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_199",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Remain at Power House",
    "gccOwns": "Internal Controls",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_200",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Remain at Power House",
    "gccOwns": "Internal Audit",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_201",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Remain at Power House",
    "gccOwns": "Data Architecture",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_202",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Remain at Power House",
    "gccOwns": "Technology Standards",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  },
  {
    "id": "lob_203",
    "lineOfBusiness": "Governance, Risk & Assurance",
    "decision": "Remain at Power House",
    "gccOwns": "Policy Management",
    "powerHouseRetains": "Non Transferrable at moment",
    "rationale": "Business Value, Strategic Importance,Standardisation, Automation Potential, Data Readiness, Technology Sharedness"
  }
];

const SEED_PROCESS_APP_MAP = [
  {
    "id": "pam_001",
    "lineOfBusiness": "Production Operations",
    "capabilityDomain": "Production Management",
    "businessCapability": "Production Surveillance & Optimisation",
    "subProcess": "Data capture, surveillance, deviation analysis, optimisation",
    "supportingApplications": "PI Historian, Production Accounting, BI Suite",
    "coverage": "Partial",
    "notes": "Surveillance is remote-capable; intervention decisions stay at the asset."
  },
  {
    "id": "pam_002",
    "lineOfBusiness": "Maintenance & Integrity",
    "capabilityDomain": "Asset Management",
    "businessCapability": "Maintenance Planning & Scheduling",
    "subProcess": "Work identification, planning, scheduling, close-out",
    "supportingApplications": "CMMS (Maximo), Scheduling Tool",
    "coverage": "Partial",
    "notes": "Planning transferable; execution and permits remain on site."
  },
  {
    "id": "pam_003",
    "lineOfBusiness": "Supply Chain",
    "capabilityDomain": "Source to Pay",
    "businessCapability": "Procurement & Materials Management",
    "subProcess": "Requisition, tender, purchase order, receipt, invoice match",
    "supportingApplications": "ERP (SAP MM), Sourcing Platform",
    "coverage": "Full",
    "notes": "Highest standardisation in the portfolio; strong automation candidate."
  },
  {
    "id": "pam_004",
    "lineOfBusiness": "Finance",
    "capabilityDomain": "Record to Report",
    "businessCapability": "Reconciliation & Close",
    "subProcess": "Reconciliation, exception handling, close reporting",
    "supportingApplications": "ERP (SAP FI), Reconciliation Tool",
    "coverage": "Partial",
    "notes": "Duplicate data entry across joint-venture entities."
  },
  {
    "id": "pam_005",
    "lineOfBusiness": "Digital, Data & Technology",
    "capabilityDomain": "Enterprise Data",
    "businessCapability": "Data Products & Reporting",
    "subProcess": "Ingestion, modelling, KPI publishing",
    "supportingApplications": "Data Platform, BI Suite",
    "coverage": "Full",
    "notes": "Reusable KPI layer is the target state."
  },
  {
    "id": "pam_006",
    "lineOfBusiness": "HSE & Sustainability",
    "capabilityDomain": "Assurance",
    "businessCapability": "Barrier & Emissions Assurance",
    "subProcess": "Barrier status, incident data, emissions reporting",
    "supportingApplications": "HSE Management System, Emissions Reporting",
    "coverage": "Partial",
    "notes": "Reporting transferable; regulator interface retained."
  }
];

const SEED_APPLICATIONS = [
  {
    "id": "app_001",
    "name": "ERP Core (SAP S/4HANA)",
    "vendor": "SAP",
    "domain": "Finance & Supply Chain",
    "hosting": "Hybrid",
    "integration": "API",
    "dataDomains": "Ledger, Materials, Vendors, Purchase Orders",
    "criticality": "Critical",
    "licenseCostUSD": 1400000,
    "supportCostUSD": 520000,
    "renewalDate": "2027-03-31"
  },
  {
    "id": "app_002",
    "name": "CMMS (IBM Maximo)",
    "vendor": "IBM",
    "domain": "Maintenance & Integrity",
    "hosting": "Cloud",
    "integration": "API",
    "dataDomains": "Assets, Work Orders, Maintenance Plans",
    "criticality": "Critical",
    "licenseCostUSD": 760000,
    "supportCostUSD": 280000,
    "renewalDate": "2026-12-31"
  },
  {
    "id": "app_003",
    "name": "PI Historian",
    "vendor": "AVEVA",
    "domain": "Production Operations",
    "hosting": "On-Premise",
    "integration": "Batch",
    "dataDomains": "Time-series Process Data, Equipment Tags",
    "criticality": "Critical",
    "licenseCostUSD": 540000,
    "supportCostUSD": 210000,
    "renewalDate": "2027-06-30"
  },
  {
    "id": "app_004",
    "name": "Enterprise Data Platform",
    "vendor": "Internal / Cloud",
    "domain": "Digital, Data & Technology",
    "hosting": "Cloud",
    "integration": "API",
    "dataDomains": "Production KPIs, Master Data, Emissions",
    "criticality": "High",
    "licenseCostUSD": 620000,
    "supportCostUSD": 340000,
    "renewalDate": ""
  },
  {
    "id": "app_005",
    "name": "HSE Management System",
    "vendor": "Vendor H",
    "domain": "HSE & Sustainability",
    "hosting": "Cloud",
    "integration": "API",
    "dataDomains": "Incidents, Barriers, Emissions",
    "criticality": "High",
    "licenseCostUSD": 310000,
    "supportCostUSD": 140000,
    "renewalDate": "2027-09-30"
  }
];

const SEED_DATA_FLOWS = [
  {
    "id": "df_001",
    "sourceApp": "PI Historian",
    "dataDomain": "Time-series Process Data",
    "targetApp": "Enterprise Data Platform",
    "frequency": "Hourly",
    "method": "Batch",
    "notes": "Feeds production surveillance and efficiency dashboards."
  },
  {
    "id": "df_002",
    "sourceApp": "ERP Core (SAP S/4HANA)",
    "dataDomain": "Cost Centers & Purchase Orders",
    "targetApp": "Enterprise Data Platform",
    "frequency": "Nightly Batch",
    "method": "Batch",
    "notes": "Supports unit operating cost reporting."
  },
  {
    "id": "df_003",
    "sourceApp": "CMMS (IBM Maximo)",
    "dataDomain": "Work Orders & Asset Health",
    "targetApp": "Enterprise Data Platform",
    "frequency": "Daily",
    "method": "API",
    "notes": "Drives schedule compliance and backlog analytics."
  },
  {
    "id": "df_004",
    "sourceApp": "HSE Management System",
    "dataDomain": "Barriers & Emissions",
    "targetApp": "Enterprise Data Platform",
    "frequency": "Daily",
    "method": "API",
    "notes": "Feeds barrier assurance and sustainability reporting."
  }
];

const SEED_SUCCESS_CRITERIA = [
  {
    "id": "sc_001",
    "horizon": "Operate Better",
    "metric": "Unit operating cost per barrel of oil equivalent",
    "lineOfBusiness": "Production Operations",
    "baseline": "$14.20",
    "targetYear1": "$12.40",
    "targetYear3": "$10.80",
    "owner": "Chief Operating Officer",
    "cadence": "Monthly"
  },
  {
    "id": "sc_002",
    "horizon": "Operate Better",
    "metric": "Production efficiency",
    "lineOfBusiness": "Production Operations",
    "baseline": "88%",
    "targetYear1": "91%",
    "targetYear3": "94%",
    "owner": "VP Operations",
    "cadence": "Monthly"
  },
  {
    "id": "sc_003",
    "horizon": "Operate Better",
    "metric": "Maintenance schedule compliance",
    "lineOfBusiness": "Maintenance & Integrity",
    "baseline": "72%",
    "targetYear1": "85%",
    "targetYear3": "92%",
    "owner": "Head of Maintenance & Integrity",
    "cadence": "Monthly"
  },
  {
    "id": "sc_004",
    "horizon": "Operate Better",
    "metric": "Cost per purchase order",
    "lineOfBusiness": "Supply Chain",
    "baseline": "$118",
    "targetYear1": "$86",
    "targetYear3": "$62",
    "owner": "Chief Procurement Officer",
    "cadence": "Monthly"
  },
  {
    "id": "sc_005",
    "horizon": "Operate Better",
    "metric": "Days to close month-end",
    "lineOfBusiness": "Finance",
    "baseline": "9 days",
    "targetYear1": "6 days",
    "targetYear3": "4 days",
    "owner": "Head of Finance Operations",
    "cadence": "Monthly"
  },
  {
    "id": "sc_006",
    "horizon": "Deliver Better",
    "metric": "Change lead time for digital products",
    "lineOfBusiness": "Digital, Data & Technology",
    "baseline": "11 weeks",
    "targetYear1": "6 weeks",
    "targetYear3": "3 weeks",
    "owner": "Director Platform Delivery",
    "cadence": "Quarterly"
  },
  {
    "id": "sc_007",
    "horizon": "Deliver Better",
    "metric": "KPI coverage from a single trusted source",
    "lineOfBusiness": "Digital, Data & Technology",
    "baseline": "35%",
    "targetYear1": "65%",
    "targetYear3": "85%",
    "owner": "Chief Data Officer",
    "cadence": "Quarterly"
  },
  {
    "id": "sc_008",
    "horizon": "Deliver Better",
    "metric": "Barrier assurance reporting timeliness",
    "lineOfBusiness": "HSE & Sustainability",
    "baseline": "64%",
    "targetYear1": "85%",
    "targetYear3": "95%",
    "owner": "Chief HSE & Compliance Officer",
    "cadence": "Monthly"
  },
  {
    "id": "sc_009",
    "horizon": "Change the Game",
    "metric": "Reusable automation and AI assets in production",
    "lineOfBusiness": "Enterprise-wide",
    "baseline": "3",
    "targetYear1": "12",
    "targetYear3": "30",
    "owner": "GCC Managing Director",
    "cadence": "Quarterly"
  },
  {
    "id": "sc_010",
    "horizon": "Change the Game",
    "metric": "Share of GCC roles in product and specialist positions",
    "lineOfBusiness": "Enterprise-wide",
    "baseline": "12%",
    "targetYear1": "28%",
    "targetYear3": "45%",
    "owner": "GCC Managing Director",
    "cadence": "Half-yearly"
  },
  {
    "id": "sc_011",
    "horizon": "Operate Better",
    "metric": "Voluntary attrition in GCC critical roles",
    "lineOfBusiness": "Enterprise-wide",
    "baseline": "",
    "targetYear1": "below 15%",
    "targetYear3": "below 12%",
    "owner": "HR Business Partner",
    "cadence": "Quarterly"
  }
];

