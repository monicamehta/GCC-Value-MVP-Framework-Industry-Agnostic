/* ===================== App / UI Layer ===================== */

let state = loadState();
const uiState = { editing: {}, showAddForm: {}, showGuide: {} };

function el(tag, attrs, children) {
  const element = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([key, value]) => {
    if (key === "class") element.className = value;
    else if (key.startsWith("on") && typeof value === "function") element.addEventListener(key.slice(2), value);
    else element.setAttribute(key, value);
  });
  (children || []).forEach((child) => element.appendChild(typeof child === "string" ? document.createTextNode(child) : child));
  return element;
}

function fmtUSD(value) {
  const amount = Math.round(num(value));
  return (amount < 0 ? "-$" : "$") + Math.abs(amount).toLocaleString();
}

function fmtPct(value, digits) {
  return num(value).toFixed(digits === undefined ? 0 : digits) + "%";
}

function plural(count, singular, pluralForm) {
  return count + " " + (count === 1 ? singular : (pluralForm || singular + "s"));
}

function goalOptions(currentState) {
  return [{ value: "", label: "(not linked)" }].concat(
    currentState.strategicGoals.map((goal) => ({ value: goal.id, label: goal.goal }))
  );
}

function goalLabel(goalId) {
  const goal = state.strategicGoals.find((item) => item.id === goalId);
  return goal ? goal.goal : "";
}

function lobOptions(currentState) {
  return [{ value: "", label: "(select line of business)" }]
    .concat(lineOfBusinessNames(currentState).map((name) => ({ value: name, label: name })))
    .concat([{ value: "Enterprise-wide", label: "Enterprise-wide" }]);
}

function normalizeHeader(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    const next = text[index + 1];
    if (quoted) {
      if (char === '"' && next === '"') { cell += '"'; index++; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(cell); cell = ""; }
    else if (char === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (char !== "\r") cell += char;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((items) => items.some((item) => String(item).trim()));
}

function tableRowsToObjects(rows, columns) {
  if (!rows.length) return [];
  const header = rows[0].map(normalizeHeader);
  const lookup = {};
  columns.forEach((column) => {
    lookup[normalizeHeader(column.key)] = column.key;
    lookup[normalizeHeader(column.label)] = column.key;
  });
  return rows.slice(1).map((items) => {
    const row = { id: uid("import") };
    header.forEach((name, index) => {
      const key = lookup[name];
      if (key) row[key] = items[index] === undefined ? "" : items[index];
    });
    return row;
  }).filter((row) => Object.keys(row).length > 1);
}

function importRowsFromFile(file, columns, onRows) {
  const extension = file.name.split(".").pop().toLowerCase();
  const finish = (rows) => {
    const imported = tableRowsToObjects(rows, columns);
    if (!imported.length) alert("No matching records found. Use the exported CSV/template headers for this tab.");
    else onRows(imported);
  };
  if (extension === "csv" || extension === "txt") {
    const reader = new FileReader();
    reader.onload = () => finish(parseCSV(String(reader.result || "")));
    reader.readAsText(file);
    return;
  }
  if ((extension === "xlsx" || extension === "xls") && window.XLSX) {
    const reader = new FileReader();
    reader.onload = () => {
      const workbook = XLSX.read(reader.result, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      finish(XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" }));
    };
    reader.readAsArrayBuffer(file);
    return;
  }
  alert("Excel import needs the XLSX parser to load. If you are offline, save the sheet as CSV and import it here.");
}

/* ---------------------------------------------------------------- */
/* Workshop facilitation guides                                      */
/* ---------------------------------------------------------------- */
const FACILITATION_GUIDES = {
  voiceOfBusiness: {
    method: "1:1 interviews with function leaders, followed by a cross-functional discovery workshop",
    participants: "Function heads, process owners, front-line supervisors, finance business partner",
    questions: [
      "What are the top three operational pain points in your area today?",
      "Where does your team spend effort that a customer would not pay for?",
      "Which decisions are delayed because data or capacity is missing?",
      "What have you already tried, and why did it not stick?",
      "What would visibly improve in 12 months if this were solved?",
      "Which strategic goal does this pain point block?"
    ]
  },
  strategicGoals: {
    method: "Executive alignment session using existing strategy papers and board commitments",
    participants: "CEO staff, COO, CFO, CTO, Chief Data Officer, regional leaders",
    questions: [
      "What are the three to five goals this transformation must serve?",
      "Who is the accountable executive for each goal?",
      "How is success measured today, and what is the target?",
      "Is the goal primarily cost, productivity, capability, speed, risk, or revenue?",
      "What time horizon is realistic for each goal?"
    ]
  },
  workshopCandidates: {
    method: "Structured capability workshop; score every candidate live with business and IT together",
    participants: "Process owners, delivery leads, finance, HR/talent, enterprise architecture",
    questions: [
      "Which capability or process are we scoring, and which line of business owns it?",
      "How many FTE perform this work today, and at what fully loaded cost?",
      "How standardized is the process across regions (1 = fragmented, 5 = standard)?",
      "Can the work be performed remotely and securely (1 = no, 5 = fully)?",
      "What is the automation or AI potential (1 = none, 5 = high)?",
      "How ready are data and platforms to support remote ownership?",
      "How strong are local, regulatory, or physical constraints (1 = none, 5 = blocking)?",
      "What quantified risk avoidance or revenue enablement does this capability unlock?",
      "What one-time transition, tooling, or knowledge-transfer cost is expected?",
      "How many months will both teams run in parallel before the retained team stands down?"
    ]
  },
  northStarMandates: {
    method: "Executive mandate workshop, run before any org design or headcount discussion",
    participants: "GCC sponsor, line-of-business leaders, power house function heads, finance",
    questions: [
      "What business outcome will the GCC own for this line of business, stated as an outcome and not an activity?",
      "Which decisions can the GCC make on its own, and up to what financial or risk threshold?",
      "Which products, platforms, or processes will the GCC own end to end?",
      "What stays with the power house, and why is that boundary necessary rather than habitual?",
      "How will success be judged, by whom, and how often?",
      "Is this full GCC ownership, joint ownership, or an advisory role only?"
    ]
  },
  successCriteria: {
    method: "Success criteria session with finance and the accountable business owners",
    participants: "CFO delegate, line-of-business owners, GCC leadership, PMO",
    questions: [
      "Which measure proves this part of the GCC is working?",
      "What is the verified baseline today, and where does that number come from?",
      "What is the year one and year three target?",
      "Who is accountable for the measure, on both the GCC and the power house side?",
      "How often is it reviewed, and in which governance forum?",
      "Does it sit in Deliver Better, Operate Better, or Change the Game?"
    ]
  }
};

function renderGuide(container, key) {
  const guide = FACILITATION_GUIDES[key];
  if (!guide) return;
  const isOpen = !!uiState.showGuide[key];
  const panel = el("div", { class: "guide-panel" }, [
    el("button", {
      class: "guide-toggle",
      onclick: () => { uiState.showGuide[key] = !isOpen; renderActiveTab(); }
    }, [(isOpen ? "\u25BE " : "\u25B8 ") + "Workshop Facilitation Guide"])
  ]);
  if (isOpen) {
    panel.appendChild(el("div", { class: "guide-body" }, [
      el("div", {}, [el("strong", {}, ["Method: "]), guide.method]),
      el("div", {}, [el("strong", {}, ["Participants: "]), guide.participants]),
      el("div", { style: "margin-top:8px" }, [el("strong", {}, ["Questions to ask"])]),
      el("ol", {}, guide.questions.map((question) => el("li", {}, [question]))),
      el("button", {
        class: "btn small",
        onclick: () => downloadFile(key + "-facilitation-guide.txt",
          ["WORKSHOP FACILITATION GUIDE", "", "Method: " + guide.method, "Participants: " + guide.participants, "", "Questions:"]
            .concat(guide.questions.map((question, index) => (index + 1) + ". " + question)).join("\n"), "text/plain")
      }, ["Download Guide (TXT)"])
    ]));
  }
  container.appendChild(panel);
}

/* ---------------------------------------------------------------- */
/* Generic register (CRUD) renderer                                  */
/* ---------------------------------------------------------------- */
function buildForm(config, existingRow) {
  const isEdit = !!existingRow;
  const form = el("div", { class: "inline-form" });
  const inputs = config.columns.map((column) => {
    let field;
    const value = existingRow ? existingRow[column.key] : (column.default !== undefined ? column.default : "");
    if (column.type === "textarea") {
      field = el("textarea", { rows: "2" });
      field.value = value === undefined ? "" : value;
    } else if (column.type === "select" || column.type === "select-dynamic") {
      field = el("select");
      const options = column.type === "select-dynamic" ? column.options(state) : column.options;
      options.forEach((option) => {
        const optionValue = option.value !== undefined ? option.value : option;
        const optionLabel = option.label !== undefined ? option.label : option;
        const optionEl = el("option", { value: optionValue }, [String(optionLabel)]);
        if (String(optionValue) === String(value)) optionEl.setAttribute("selected", "selected");
        field.appendChild(optionEl);
      });
    } else {
      field = el("input", { type: column.type === "number" ? "number" : "text" });
      field.value = value === undefined ? "" : value;
    }
    field.dataset.key = column.key;
    return el("label", { class: "form-field" }, [el("span", {}, [column.label]), field]);
  });

  form.appendChild(el("div", { class: "form-grid" }, inputs));
  form.appendChild(el("div", { class: "form-actions" }, [
    el("button", {
      class: "btn primary",
      onclick: () => {
        const row = existingRow ? Object.assign({}, existingRow) : { id: uid(config.key) };
        form.querySelectorAll("[data-key]").forEach((field) => { row[field.dataset.key] = field.value; });
        if (config.onSave) config.onSave(row);
        if (isEdit) {
          const index = state[config.key].findIndex((item) => item.id === existingRow.id);
          state[config.key][index] = row;
          uiState.editing[config.key] = null;
        } else {
          state[config.key].push(row);
          uiState.showAddForm[config.key] = false;
        }
        saveState(state);
        renderActiveTab();
      }
    }, [isEdit ? "Save Changes" : "Save"]),
    el("button", {
      class: "btn",
      onclick: () => {
        if (isEdit) uiState.editing[config.key] = null;
        else uiState.showAddForm[config.key] = false;
        renderActiveTab();
      }
    }, ["Cancel"])
  ]));
  return form;
}

function renderRegister(container, config) {
  const rows = state[config.key];
  container.appendChild(el("div", { class: "panel-header" }, [
    el(config.heading || "h2", {}, [config.title]),
    el("p", { class: "panel-desc" }, [config.description]),
    el("div", { class: "panel-actions" }, [
      el("button", {
        class: "btn primary",
        onclick: () => { uiState.showAddForm[config.key] = !uiState.showAddForm[config.key]; renderActiveTab(); }
      }, [uiState.showAddForm[config.key] ? "Cancel" : "+ Add " + config.singular]),
      el("button", {
        class: "btn",
        onclick: () => exportArrayAsCSV(config.key + ".csv", rows, config.columns.map((column) => ({ key: column.key, label: column.label })))
      }, ["Export CSV"]),
      el("label", { class: "btn file-btn" }, ["Import CSV/XLSX", el("input", {
        type: "file",
        accept: ".csv,.xlsx,.xls,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel",
        hidden: "hidden",
        onchange: (event) => {
          const file = event.target.files[0];
          if (!file) return;
          importRowsFromFile(file, config.columns, (imported) => {
            if (config.onImport) imported.forEach((row) => config.onImport(row));
            const existing = state[config.key].length;
            const replace = existing > 0 && confirm(
              imported.length + " records found.\n\nOK = replace the " + existing + " existing row(s).\nCancel = add them to the existing rows."
            );
            state[config.key] = replace ? imported : state[config.key].concat(imported);
            saveState(state);
            renderActiveTab();
            alert(imported.length + " records imported (" + (replace ? "replaced existing data" : "added to existing data") + ").");
          });
          event.target.value = "";
        }
      })])
    ])
  ]));

  renderGuide(container, config.key);
  if (uiState.showAddForm[config.key]) container.appendChild(buildForm(config, null));

  const displayColumns = config.displayColumns || config.columns;
  const table = el("table", { class: "data-table" });
  table.appendChild(el("thead", {}, [
    el("tr", {}, displayColumns.map((column) => el("th", {}, [column.label])).concat([el("th", {}, ["Actions"])]))
  ]));
  const tbody = el("tbody", {});
  if (!rows.length) {
    tbody.appendChild(el("tr", {}, [
      el("td", { colspan: String(displayColumns.length + 1), class: "empty-row" }, ["No entries yet. Click \u201c+ Add " + config.singular + "\u201d to begin."])
    ]));
  }
  rows.forEach((row) => {
    if (uiState.editing[config.key] === row.id) {
      tbody.appendChild(el("tr", {}, [el("td", { colspan: String(displayColumns.length + 1) }, [buildForm(config, row)])]));
      return;
    }
    const cells = displayColumns.map((column) => {
      if (column.render) return column.render(row);
      return el("td", {}, [String(row[column.key] === undefined ? "" : row[column.key])]);
    });
    cells.push(el("td", { class: "row-actions" }, [
      el("button", { class: "btn small", onclick: () => { uiState.editing[config.key] = row.id; renderActiveTab(); } }, ["Edit"]),
      el("button", {
        class: "btn small danger",
        onclick: () => {
          if (confirm("Delete this entry?")) {
            state[config.key] = state[config.key].filter((item) => item.id !== row.id);
            saveState(state);
            renderActiveTab();
          }
        }
      }, ["Delete"])
    ]));
    tbody.appendChild(el("tr", {}, cells));
  });
  table.appendChild(tbody);
  container.appendChild(el("div", { class: "table-wrap" }, [table]));
}

/* ---------------------------------------------------------------- */
/* Register configurations                                           */
/* ---------------------------------------------------------------- */
const CONFIG_VOB = {
  key: "voiceOfBusiness",
  title: "1. Voice of Business",
  singular: "Voice Entry",
  description: "Capture what the business actually says, in their words, before any solution is proposed. Each entry should link to the strategic goal it blocks so value can later be traced back to an executive priority.",
  columns: [
    { key: "stakeholder", label: "Stakeholder / Role", type: "text" },
    { key: "lineOfBusiness", label: "Line of Business", type: "text" },
    { key: "region", label: "Region", type: "text" },
    { key: "theme", label: "Theme", type: "select", options: ["Manual effort", "Cost pressure", "Reconciliation", "Fragmented data", "Delivery speed", "Talent & capacity", "Risk & compliance", "Customer experience"] },
    { key: "painPoint", label: "Pain Point / Aspiration", type: "textarea" },
    { key: "businessImpact", label: "Business Impact", type: "select", options: ["Low", "Medium", "High"] },
    { key: "linkedGoal", label: "Linked Strategic Goal", type: "select-dynamic", options: goalOptions },
    { key: "quote", label: "Verbatim Quote", type: "textarea" }
  ],
  displayColumns: [
    { key: "stakeholder", label: "Stakeholder" },
    { key: "lineOfBusiness", label: "Line of Business" },
    { key: "region", label: "Region" },
    { key: "theme", label: "Theme" },
    { key: "painPoint", label: "Pain Point" },
    {
      key: "businessImpact", label: "Impact",
      render: (row) => {
        const className = { High: "pill-red", Medium: "pill-amber", Low: "pill-grey" }[row.businessImpact] || "pill-grey";
        return el("td", {}, [el("span", { class: "pill " + className }, [row.businessImpact || "\u2014"])]);
      }
    },
    { key: "linkedGoal", label: "Linked Goal", render: (row) => el("td", { style: "font-size:12px;color:#64708a" }, [goalLabel(row.linkedGoal) || "(not linked)"]) }
  ]
};

const CONFIG_GOALS = {
  key: "strategicGoals",
  title: "2. Strategic Goals",
  singular: "Strategic Goal",
  description: "Record the executive goals the GCC must serve. Value in the MVP model is only credible when every candidate capability rolls up to one of these goals.",
  columns: [
    { key: "goal", label: "Strategic Goal", type: "textarea" },
    { key: "owner", label: "Accountable Executive", type: "text" },
    { key: "horizon", label: "Horizon", type: "select", options: ["Short (0-12m)", "Medium (1-2y)", "Long (2-3y)"] },
    { key: "successMeasure", label: "Success Measure", type: "text" },
    { key: "valueType", label: "Primary Value Type", type: "select", options: ["Cost", "Productivity", "Capability", "Speed", "Risk", "Revenue"] }
  ],
  displayColumns: [
    { key: "goal", label: "Strategic Goal" },
    { key: "owner", label: "Owner" },
    { key: "horizon", label: "Horizon" },
    { key: "successMeasure", label: "Success Measure" },
    { key: "valueType", label: "Value Type", render: (row) => el("td", {}, [el("span", { class: "pill pill-blue" }, [row.valueType || "\u2014"])]) }
  ]
};

const SCORE_OPTIONS = [1, 2, 3, 4, 5];

const CONFIG_NORTHSTAR = {
  key: "northStarMandates",
  title: "North Star mandate register",
  heading: "h3",
  singular: "Mandate",
  description: "Define what the GCC is accountable for before deciding what moves. A mandate is only real when the outcome, the decision rights, the owned products, and the boundary with the power house are all explicit.",
  columns: [
    { key: "lineOfBusiness", label: "Line of Business", type: "text" },
    { key: "outcomesOwned", label: "Business Outcome Owned", type: "textarea" },
    { key: "decisionRights", label: "Decisions Made Independently", type: "textarea" },
    { key: "productsOwned", label: "Products / Platforms Owned", type: "textarea" },
    { key: "successMeasure", label: "How Success Is Judged", type: "text" },
    { key: "gccOwnership", label: "Ownership Model", type: "select", options: ["Full ownership", "Joint with Power House", "Advisory only"] },
    { key: "powerHouseRetains", label: "Power House Retains", type: "textarea" }
  ],
  displayColumns: [
    { key: "lineOfBusiness", label: "Line of Business" },
    { key: "outcomesOwned", label: "Outcome Owned" },
    { key: "decisionRights", label: "Independent Decisions" },
    { key: "productsOwned", label: "Products / Platforms" },
    {
      key: "gccOwnership", label: "Ownership",
      render: (row) => {
        const className = { "Full ownership": "pill-green", "Joint with Power House": "pill-amber", "Advisory only": "pill-grey" }[row.gccOwnership] || "pill-grey";
        return el("td", {}, [el("span", { class: "pill " + className }, [row.gccOwnership || "\u2014"])]);
      }
    },
    { key: "powerHouseRetains", label: "Power House Retains" }
  ]
};

const CONFIG_LOB_DECISION = {
  key: "lobPlacements",
  title: "Placement decisions by capability",
  heading: "h3",
  singular: "Decision",
  description: "This list is generated from the workshop scores in Tab 5 and refreshes whenever scores or assumptions change. Edit a row to record a leadership decision that overrides the model; the row is then marked Leadership and is never recalculated. Delete an override to hand the capability back to the model.",
  onSave: (row) => { row.source = "leadership"; },
  onImport: (row) => { row.source = "leadership"; },
  columns: [
    { key: "gccOwns", label: "GCC Owns", type: "text" },
    { key: "lineOfBusiness", label: "Line of Business", type: "select-dynamic", options: lobOptions },
    { key: "decision", label: "Agreed Decision", type: "select", options: ["Move to GCC", "Hybrid / Shared", "Remain at Power House"] },
    { key: "powerHouseRetains", label: "Power House Retains", type: "textarea" },
    { key: "rationale", label: "Rationale", type: "textarea" }
  ],
  displayColumns: [
    { key: "gccOwns", label: "Capability (GCC Owns)" },
    { key: "lineOfBusiness", label: "Line of Business" },
    {
      key: "modelDecision", label: "Model Says",
      render: (row) => {
        const className = { "Move to GCC": "pill-green", "Hybrid / Shared": "pill-amber", "Remain at Power House": "pill-red" }[row.modelDecision] || "pill-grey";
        return el("td", {}, [el("span", { class: "pill " + className }, [row.modelDecision || "\u2014"])]);
      }
    },
    {
      key: "decision", label: "Agreed Decision",
      render: (row) => {
        const className = { "Move to GCC": "pill-green", "Hybrid / Shared": "pill-amber", "Remain at Power House": "pill-red" }[row.decision] || "pill-grey";
        return el("td", {}, [el("span", { class: "pill " + className }, [row.decision || "\u2014"])]);
      }
    },
    {
      key: "source", label: "Source",
      render: (row) => {
        const isOverride = row.source === "leadership";
        return el("td", {}, [el("span", { class: "pill " + (isOverride ? "pill-blue" : "pill-grey") }, [isOverride ? "Leadership" : "Model"])]);
      }
    },
    { key: "rationale", label: "Rationale" }
  ]
};

const CONFIG_SUCCESS = {
  key: "successCriteria",
  title: "Success criteria register",
  heading: "h3",
  singular: "Success Criterion",
  description: "The operating model is only accountable if success is defined in advance. Each criterion needs a verified baseline, a target, a named owner, and a review cadence, otherwise realised value cannot be proven later.",
  columns: [
    { key: "horizon", label: "Value Horizon", type: "select", options: ["Deliver Better", "Operate Better", "Change the Game"] },
    { key: "metric", label: "Success Measure", type: "text" },
    { key: "lineOfBusiness", label: "Line of Business", type: "select-dynamic", options: lobOptions },
    { key: "baseline", label: "Verified Baseline", type: "text" },
    { key: "targetYear1", label: "Year 1 Target", type: "text" },
    { key: "targetYear3", label: "Year 3 Target", type: "text" },
    { key: "owner", label: "Accountable Owner", type: "text" },
    { key: "cadence", label: "Review Cadence", type: "select", options: ["Monthly", "Quarterly", "Half-yearly", "Annual"] }
  ],
  displayColumns: [
    {
      key: "horizon", label: "Horizon",
      render: (row) => {
        const className = { "Deliver Better": "pill-blue", "Operate Better": "pill-green", "Change the Game": "pill-amber" }[row.horizon] || "pill-grey";
        return el("td", {}, [el("span", { class: "pill " + className }, [row.horizon || "\u2014"])]);
      }
    },
    { key: "metric", label: "Success Measure" },
    { key: "lineOfBusiness", label: "Line of Business" },
    {
      key: "baseline", label: "Baseline",
      render: (row) => row.baseline
        ? el("td", {}, [row.baseline])
        : el("td", {}, [el("span", { class: "pill pill-red" }, ["missing"])])
    },
    { key: "targetYear1", label: "Year 1 Target" },
    { key: "targetYear3", label: "Year 3 Target" },
    { key: "owner", label: "Owner" },
    { key: "cadence", label: "Cadence" }
  ]
};

const CONFIG_CANDIDATES = {
  key: "workshopCandidates",
  title: "5. Workshop Capture — Capability Candidates",
  singular: "Candidate",
  description: "Score each candidate capability live in the workshop. Readiness, transfer share, annual value, and the wave are calculated from these scores and the assumptions in Tab 9. Model Wave is the calculated result; MVP Wave is the same unless leadership recorded an override in Tab 6.",
  columns: [
    { key: "capability", label: "Capability / Process", type: "text" },
    { key: "lineOfBusiness", label: "Line of Business", type: "text" },
    { key: "region", label: "Region", type: "text" },
    { key: "linkedGoal", label: "Linked Strategic Goal", type: "select-dynamic", options: goalOptions },
    { key: "currentFTE", label: "Current FTE", type: "number" },
    { key: "onshoreCostPerFTEUSD", label: "Onshore Cost / FTE (USD)", type: "number" },
    { key: "gccCostPerFTEUSD", label: "GCC Cost / FTE (USD)", type: "number" },
    { key: "standardization", label: "Standardization (1-5)", type: "select", options: SCORE_OPTIONS },
    { key: "transferability", label: "Remote Transferability (1-5)", type: "select", options: SCORE_OPTIONS },
    { key: "automationPotential", label: "Automation / AI Potential (1-5)", type: "select", options: SCORE_OPTIONS },
    { key: "dataReadiness", label: "Data & Platform Readiness (1-5)", type: "select", options: SCORE_OPTIONS },
    { key: "localConstraint", label: "Local / Regulatory Constraint (1-5)", type: "select", options: SCORE_OPTIONS },
    { key: "riskAvoidanceUSD", label: "Annual Risk Avoidance (USD)", type: "number" },
    { key: "revenueEnablementUSD", label: "Annual Revenue Enablement (USD)", type: "number" },
    { key: "oneTimeCostUSD", label: "One-Time Transition Cost (USD)", type: "number" },
    { key: "parallelRunMonths", label: "Parallel Run (months, blank = default)", type: "number" },
    { key: "notes", label: "Notes", type: "textarea" }
  ],
  displayColumns: [
    { key: "capability", label: "Capability" },
    { key: "lineOfBusiness", label: "Line of Business" },
    { key: "currentFTE", label: "FTE", render: (row) => el("td", { style: "text-align:center" }, [String(num(row.currentFTE))]) },
    {
      key: "readiness", label: "Readiness",
      render: (row) => {
        const computed = computeCandidate(row, state.assumptions);
        return el("td", {
          style: "background:" + heatColor(computed.readinessPercent / 100) + ";color:#fff;text-align:center;font-weight:700;"
        }, [fmtPct(computed.readinessPercent)]);
      }
    },
    { key: "transferred", label: "Transferable FTE", render: (row) => el("td", { style: "text-align:center" }, [computeCandidate(row, state.assumptions).transferredFTE.toFixed(1)]) },
    { key: "annualValue", label: "Annual Value", render: (row) => el("td", { style: "font-weight:600" }, [fmtUSD(computeCandidate(row, state.assumptions).annualValue)]) },
    { key: "investment", label: "Investment", render: (row) => el("td", {}, [fmtUSD(computeCandidate(row, state.assumptions).investment)]) },
    {
      key: "modelWave", label: "Model Wave",
      render: (row) => {
        const computed = computeCandidate(row, state.assumptions);
        const className = { "MVP Wave 1": "pill-green", "Wave 2 / Hybrid": "pill-amber", "Retain / Improve First": "pill-red" }[computed.modelWave] || "pill-grey";
        return el("td", {}, [el("span", { class: "pill " + className }, [computed.modelWave])]);
      }
    },
    {
      key: "wave", label: "MVP Wave",
      render: (row) => {
        const computed = computeCandidate(row, state.assumptions);
        const className = { "MVP Wave 1": "pill-green", "Wave 2 / Hybrid": "pill-amber", "Retain / Improve First": "pill-red" }[computed.wave] || "pill-grey";
        const cell = el("td", {}, [el("span", { class: "pill " + className }, [computed.wave])]);
        if (computed.decisionVariance) {
          cell.appendChild(el("div", { style: "font-size:11px;color:#64708a;margin-top:4px" }, ["agreed: " + computed.agreedDecision]));
        }
        return cell;
      }
    }
  ]
};

const CONFIG_ORG_STRUCTURE = {
  key: "organizationStructure",
  title: "3. Organisation Structure",
  singular: "Structure Entry",
  description: "Capture region, line of business, team size, revenue, and operating cost. Team size is the workshop FTE baseline for that line of business, and contribution is calculated as revenue minus operating cost. This gives the value model a business-economic context before placement decisions are made.",
  columns: [
    { key: "region", label: "Region", type: "text" },
    { key: "lineOfBusiness", label: "Lines of Business", type: "text" },
    { key: "teamSizeFTE", label: "Team Size (FTE)", type: "number" },
    { key: "revenueUSD", label: "Revenue (USD)", type: "number" },
    { key: "operatingCostUSD", label: "Operating Cost (USD)", type: "number" },
    { key: "notes", label: "Notes", type: "textarea" }
  ],
  displayColumns: [
    { key: "region", label: "Region" },
    { key: "lineOfBusiness", label: "Lines of Business" },
    { key: "teamSizeFTE", label: "Team Size", render: (row) => el("td", { style: "text-align:center" }, [String(num(row.teamSizeFTE))]) },
    { key: "revenueUSD", label: "Revenue", render: (row) => el("td", {}, [fmtUSD(row.revenueUSD)]) },
    { key: "operatingCostUSD", label: "Operating Cost", render: (row) => el("td", {}, [fmtUSD(row.operatingCostUSD)]) },
    { key: "contribution", label: "Contribution", render: (row) => el("td", { style: num(row.revenueUSD) - num(row.operatingCostUSD) >= 0 ? "color:#2e7d32;font-weight:700" : "color:#c62828;font-weight:700" }, [fmtUSD(num(row.revenueUSD) - num(row.operatingCostUSD))]) }
  ]
};

const CONFIG_CAPABILITY_LANDSCAPE = {
  key: "processAppMap",
  title: "7. Capability Landscape",
  singular: "Capability Mapping",
  description: "Map business capabilities to line of business, process coverage, supporting applications, and manual workarounds.",
  columns: [
    { key: "lineOfBusiness", label: "Line of Business", type: "select-dynamic", options: lobOptions },
    { key: "capabilityDomain", label: "Capability Domain", type: "text" },
    { key: "businessCapability", label: "Business Capability", type: "text" },
    { key: "subProcess", label: "Sub-Process", type: "text" },
    { key: "supportingApplications", label: "Supporting Application(s)", type: "text" },
    { key: "coverage", label: "Coverage", type: "select", options: ["Full", "Partial", "Manual Workaround", "None"] },
    { key: "notes", label: "Notes", type: "textarea" }
  ]
};

const CONFIG_APPLICATIONS = {
  key: "applications",
  title: "Application Inventory",
  heading: "h3",
  singular: "Application",
  description: "Capture application ownership, hosting, integration, data domains, criticality, and run costs. Licence and support cost feed the MVP value model: each application is attributed to its line of business and split across that line's capabilities by FTE, so the primary domain must match a line of business to be counted.",
  columns: [
    { key: "name", label: "Application Name", type: "text" },
    { key: "vendor", label: "Vendor", type: "text" },
    { key: "domain", label: "Primary Domain", type: "select-dynamic", options: lobOptions },
    { key: "hosting", label: "Hosting", type: "select", options: ["On-Premise", "Cloud", "Hybrid"] },
    { key: "integration", label: "Integration Pattern", type: "select", options: ["API", "Batch", "Point-to-point", "File Transfer", "Manual"] },
    { key: "dataDomains", label: "Data Domains Owned", type: "text" },
    { key: "criticality", label: "Business Criticality", type: "select", options: ["Low", "Medium", "High", "Critical"] },
    { key: "licenseCostUSD", label: "Annual License Cost (USD)", type: "number" },
    { key: "supportCostUSD", label: "Annual Support/AMS Cost (USD)", type: "number" },
    { key: "renewalDate", label: "Contract Renewal Date", type: "text" }
  ]
};

const CONFIG_DATAFLOWS = {
  key: "dataFlows",
  title: "Information Architecture — Data Flows",
  heading: "h3",
  singular: "Data Flow",
  description: "Capture how information moves between applications: source, target, data domain, frequency, and integration method.",
  columns: [
    { key: "sourceApp", label: "Source Application", type: "text" },
    { key: "dataDomain", label: "Data Domain", type: "text" },
    { key: "targetApp", label: "Target Application", type: "text" },
    { key: "frequency", label: "Frequency", type: "select", options: ["Real-time", "Hourly", "Daily", "Nightly Batch", "Weekly", "Ad-hoc"] },
    { key: "method", label: "Integration Method", type: "select", options: ["API", "Batch", "Point-to-point", "File Transfer", "Manual"] },
    { key: "notes", label: "Notes", type: "textarea" }
  ]
};

/* ---------------------------------------------------------------- */
/* Tab renderers                                                     */
/* ---------------------------------------------------------------- */
function renderOverview(container) {
  const mvp = buildThreeYearCase(mvpCandidates(state), state.assumptions);
  const portfolio = buildThreeYearCase(state.workshopCandidates, state.assumptions);

  container.appendChild(el("div", { class: "panel-header" }, [
    el("h2", {}, ["GCC Value MVP Framework"]),
    el("p", { class: "panel-desc" }, [
      "A guided path from business evidence to a defensible MVP value case. Capture the Voice of Business, anchor it to strategic goals, score capability candidates in a workshop, then let the model produce the MVP scope, value, investment, and payback the enterprise needs to make a decision."
    ])
  ]));

  container.appendChild(el("div", { class: "card-grid" }, [
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(state.voiceOfBusiness.length)]), el("div", { class: "stat-label" }, ["Voice of Business entries"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(state.strategicGoals.length)]), el("div", { class: "stat-label" }, ["Strategic goals"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(state.northStarMandates.length)]), el("div", { class: "stat-label" }, ["North Star mandates"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(state.workshopCandidates.length)]), el("div", { class: "stat-label" }, ["Capability candidates scored"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(state.successCriteria.length)]), el("div", { class: "stat-label" }, ["Success criteria"])]),
    el("div", { class: "stat-card highlight" }, [el("div", { class: "stat-value" }, [String(mvp.candidateCount)]), el("div", { class: "stat-label" }, ["In MVP Wave 1"])]),
    el("div", { class: "stat-card highlight" }, [el("div", { class: "stat-value" }, [fmtUSD(mvp.annualValue)]), el("div", { class: "stat-label" }, ["MVP annual value at maturity"])])
  ]));

  if (portfolio.candidateCount) {
    const chartCard = el("div", { class: "chart-card" }, [el("h4", {}, ["MVP scope versus full candidate portfolio"])]);
    container.appendChild(chartCard);
    renderBarChart(chartCard, ["Annual Value", "Investment", "3-Year Net Value"], [
      { name: "MVP Wave 1", color: "#0f766e", values: [mvp.annualValue, mvp.investment, mvp.netValue] },
      { name: "Full Portfolio", color: "#2f6fed", values: [portfolio.annualValue, portfolio.investment, portfolio.netValue] }
    ], { yFormat: (value) => "$" + Math.round(value / 1000000) + "M", showLegend: true });
  }

  container.appendChild(el("div", { class: "panel-header" }, [el("h3", {}, ["How to run this framework"])]));
  container.appendChild(el("ol", { class: "step-list" }, [
    "Interview function leaders and record their words in Voice of Business (Tab 1).",
    "Agree the executive goals the GCC must serve and who owns each one (Tab 2).",
    "Set the North Star mandate: outcomes owned, decision rights, and the power house boundary (Tab 3).",
    "Run the workshop and score every capability candidate live (Tab 4).",
    "Decide which lines of business move to the GCC, which are shared, and which remain (Tab 5).",
    "Agree the commercial and delivery assumptions with finance (Tab 6).",
    "Review the calculated MVP value, investment, and payback (Tab 7).",
    "Define how success will be measured across the three value horizons (Tab 8).",
    "Sequence the MVP blueprint into waves with clear ownership (Tab 9).",
    "Use the generated executive storyline to brief the enterprise (Tab 10)."
  ].map((step) => el("li", {}, [step]))));

  container.appendChild(el("div", { class: "panel-header" }, [el("h3", {}, ["Engagement details"])]));
  const metaFields = [
    { key: "engagementName", label: "Engagement Name" },
    { key: "client", label: "Client / Enterprise" },
    { key: "facilitator", label: "Facilitator" },
    { key: "workshopDate", label: "Workshop Date" }
  ];
  const metaForm = el("div", { class: "settings-form" });
  metaFields.forEach((field) => {
    const input = el("input", { type: "text" });
    input.value = state.meta[field.key] || "";
    input.addEventListener("input", (event) => { state.meta[field.key] = event.target.value; });
    metaForm.appendChild(el("div", { class: "settings-row" }, [el("label", {}, [field.label]), input]));
  });
  metaForm.appendChild(el("div", { class: "form-actions" }, [
    el("button", { class: "btn primary", onclick: () => { saveState(state); renderActiveTab(); } }, ["Save Engagement Details"])
  ]));
  container.appendChild(metaForm);
}

function renderAssumptions(container) {
  container.appendChild(el("div", { class: "panel-header" }, [
    el("h2", {}, ["9. Value Assumptions"]),
    el("p", { class: "panel-desc" }, [
      "Every number in the MVP business case is derived from these assumptions plus the workshop scores. Agree them with finance before the value model is shown to executives, so the case is transparent rather than asserted."
    ])
  ]));

  const fields = [
    { key: "defaultOnshoreCostPerFTEUSD", label: "Default onshore cost per FTE (USD)", hint: "Used when a candidate has no specific onshore cost." },
    { key: "defaultGccCostPerFTEUSD", label: "Default GCC cost per FTE (USD)", hint: "Fully loaded GCC cost including facilities and management." },
    { key: "setupCostPerFTEUSD", label: "Setup cost per transferred FTE (USD)", hint: "Hiring, knowledge transfer, and onboarding per FTE." },
    { key: "parallelRunMonths", label: "Default parallel run (months)", hint: "Months both teams are paid for the same work. Override per capability in Tab 5; set to 0 to exclude." },
    { key: "maxTransferSharePercent", label: "Maximum transfer share (%)", hint: "Caps how much of a capability can ever move, even at perfect readiness." },
    { key: "maxAutomationSavingPercent", label: "Maximum automation saving (%)", hint: "Saving applied at automation potential 5 of 5." },
    { key: "appSupportSavingPercent", label: "Application support saving (%)", hint: "Share of the allocated application support and AMS cost saved when a capability transfers, because the GCC runs it at lower cost." },
    { key: "appLicenseSavingPercent", label: "Application licence saving (%)", hint: "Share of the allocated licence cost saved through rationalisation. Defaults to 0 because licences are usually still paid to the vendor after a transfer." },
    { key: "wave1ThresholdPercent", label: "MVP Wave 1 readiness threshold (%)", hint: "At or above this readiness the model places a capability in the MVP. Changing it updates Tab 5, Tab 6, and the value model." },
    { key: "wave2ThresholdPercent", label: "Wave 2 readiness threshold (%)", hint: "Below this the model keeps the capability at the power house until foundations are fixed." },
    { key: "rampYear1Percent", label: "Year 1 value realisation (%)", hint: "Share of steady-state value realised in year one." },
    { key: "rampYear2Percent", label: "Year 2 value realisation (%)", hint: "Share of steady-state value realised in year two." },
    { key: "rampYear3Percent", label: "Year 3 value realisation (%)", hint: "Share of steady-state value realised in year three." },
    { key: "lobMoveThresholdPercent", label: "Line of business move threshold (%)", hint: "Share of a line of business that must be transferable before it is recommended to move to the GCC." },
    { key: "lobHybridThresholdPercent", label: "Line of business hybrid threshold (%)", hint: "Below this share the line of business is recommended to remain at the power house." }
  ];

  const form = el("div", { class: "settings-form" });
  fields.forEach((field) => {
    const input = el("input", { type: "number" });
    input.value = state.assumptions[field.key];
    input.addEventListener("input", (event) => { state.assumptions[field.key] = num(event.target.value); });
    // Recalculate on blur so every downstream tab reflects the new assumption immediately.
    input.addEventListener("change", () => { saveState(state); });
    form.appendChild(el("div", { class: "settings-row" }, [el("label", {}, [field.label]), input]));
    form.appendChild(el("div", { class: "settings-hint" }, [field.hint]));
  });
  form.appendChild(el("div", { class: "form-actions" }, [
    el("button", { class: "btn primary", onclick: () => { saveState(state); renderActiveTab(); } }, ["Save Assumptions"]),
    el("button", { class: "btn", onclick: () => { state.assumptions = defaultAssumptions(); saveState(state); renderActiveTab(); } }, ["Restore Defaults"])
  ]));
  container.appendChild(form);

  container.appendChild(el("div", { class: "panel-header" }, [el("h3", {}, ["How the value is calculated"])]));
  const formulas = [
    ["Readiness %", "Average of standardization, transferability, automation potential, and data readiness, with local constraint inverted, rescaled to 0-100%."],
    ["Transferable FTE", "Current FTE x min(readiness %, maximum transfer share %)."],
    ["Labour arbitrage", "Transferable FTE x (onshore cost per FTE - GCC cost per FTE)."],
    ["Automation value", "Transferable FTE x GCC cost per FTE x (automation potential / 5 x maximum automation saving %)."],
    ["Application cost allocation", "Each application's licence and support cost is attributed to its line of business, then split across that line's capabilities in proportion to FTE."],
    ["Application saving", "Allocated support cost x transfer share % x application support saving %, plus the same calculation on licence cost at the licence saving %."],
    ["Risk avoidance & revenue enablement", "Entered directly per candidate; not derived, so each figure needs a named owner."],
    ["Parallel run cost", "Transferable FTE x GCC cost per FTE x (parallel run months / 12). This is the period both teams are paid for the same work."],
    ["Investment", "Setup cost + one-time transition cost + parallel run cost."],
    ["Payback", "First year where cumulative realised value exceeds cumulative investment."],
    ["Line of business placement", "Transferable FTE divided by total FTE for the line of business, compared against the move and hybrid thresholds."],
    ["MVP wave", "Derived from readiness against the thresholds above, unless leadership recorded an override for that capability in Tab 6."]
  ];
  const table = el("table", { class: "data-table" });
  table.appendChild(el("thead", {}, [el("tr", {}, [el("th", {}, ["Measure"]), el("th", {}, ["Calculation"])])]));
  table.appendChild(el("tbody", {}, formulas.map((row) => el("tr", {}, [
    el("td", { style: "font-weight:600" }, [row[0]]),
    el("td", {}, [row[1]])
  ]))));
  container.appendChild(el("div", { class: "table-wrap" }, [table]));
}

function renderNorthStar(container) {
  container.appendChild(el("div", { class: "panel-header" }, [
    el("h2", {}, ["4. North Star & Mandate"]),
    el("p", { class: "panel-desc" }, [
      "The North Star defines what the GCC is for. Agree the outcome it owns, the decisions it can take alone, the products it owns, and the boundary the power house keeps, before any capability is scored or moved."
    ])
  ]));

  const mandatedLobs = state.northStarMandates.map((mandate) => mandate.lineOfBusiness);
  const missing = lineOfBusinessNames(state).filter((name) => mandatedLobs.indexOf(name) === -1);
  const advisoryOnly = state.northStarMandates.filter((mandate) => mandate.gccOwnership === "Advisory only");

  container.appendChild(el("div", { class: "card-grid" }, [
    el("div", { class: "stat-card highlight" }, [el("div", { class: "stat-value" }, [String(state.northStarMandates.length)]), el("div", { class: "stat-label" }, ["Mandates defined"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(state.northStarMandates.filter((mandate) => mandate.gccOwnership === "Full ownership").length)]), el("div", { class: "stat-label" }, ["Full GCC ownership"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(state.northStarMandates.filter((mandate) => mandate.gccOwnership === "Joint with Power House").length)]), el("div", { class: "stat-label" }, ["Joint ownership"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(missing.length)]), el("div", { class: "stat-label" }, ["Lines of business without a mandate"])])
  ]));

  if (missing.length) {
    container.appendChild(el("div", { class: "story-block", style: "border-left-color:#c62828" }, [
      el("h4", {}, ["Mandate gap"]),
      el("p", {}, ["These lines of business have capabilities in the workshop but no agreed mandate: " + missing.join(", ") +
        ". Scoring work for transfer without an agreed outcome and decision right is how a GCC ends up as a cost centre taking instructions."])
    ]));
  }
  if (advisoryOnly.length) {
    container.appendChild(el("div", { class: "story-block", style: "border-left-color:#f9a825" }, [
      el("h4", {}, ["Advisory-only mandates"]),
      el("p", {}, [advisoryOnly.map((mandate) => mandate.lineOfBusiness).join(", ") +
        " are advisory only. Expect limited value capture here, because the GCC can recommend but cannot decide."])
    ]));
  }

  renderRegister(container, CONFIG_NORTHSTAR);
}

function renderOrganisationStructure(container) {
  const rows = state.organizationStructure;
  const totals = rows.reduce((accumulator, row) => {
    accumulator.teamSize += num(row.teamSizeFTE);
    accumulator.revenue += num(row.revenueUSD);
    accumulator.cost += num(row.operatingCostUSD);
    return accumulator;
  }, { teamSize: 0, revenue: 0, cost: 0 });
  container.appendChild(el("div", { class: "card-grid" }, [
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(totals.teamSize)]), el("div", { class: "stat-label" }, ["Total Team Size (FTE)"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [fmtUSD(totals.revenue)]), el("div", { class: "stat-label" }, ["Total Revenue"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [fmtUSD(totals.cost)]), el("div", { class: "stat-label" }, ["Total Operating Cost"])]),
    el("div", { class: "stat-card highlight" }, [el("div", { class: "stat-value" }, [fmtUSD(totals.revenue - totals.cost)]), el("div", { class: "stat-label" }, ["Contribution"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(new Set(rows.map((row) => row.lineOfBusiness).filter(Boolean)).size)]), el("div", { class: "stat-label" }, ["Lines of Business"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(new Set(rows.map((row) => row.region).filter(Boolean)).size)]), el("div", { class: "stat-label" }, ["Regions"])] )
  ]));
  renderRegister(container, CONFIG_ORG_STRUCTURE);
}

function renderCapabilityLandscape(container) {
  renderRegister(container, CONFIG_CAPABILITY_LANDSCAPE);
}

function renderArchitecture(container) {
  container.appendChild(el("div", { class: "panel-header" }, [
    el("h2", {}, ["8. Application & Information Architecture"]),
    el("p", { class: "panel-desc" }, ["Use the application inventory and data-flow map together to show which systems support each capability and where information is mastered, integrated, duplicated, or moved manually. Application run costs are allocated to capabilities and feed the MVP value model."])
  ]));

  const totals = state.applications.reduce((accumulator, application) => {
    accumulator.license += num(application.licenseCostUSD);
    accumulator.support += num(application.supportCostUSD);
    return accumulator;
  }, { license: 0, support: 0 });
  const unallocated = unallocatedApplicationCost(state);
  const mvp = buildThreeYearCase(mvpCandidates(state), state.assumptions);

  container.appendChild(el("div", { class: "card-grid" }, [
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(state.applications.length)]), el("div", { class: "stat-label" }, ["Applications"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [fmtUSD(totals.license)]), el("div", { class: "stat-label" }, ["Annual licence cost"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [fmtUSD(totals.support)]), el("div", { class: "stat-label" }, ["Annual support / AMS cost"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [fmtUSD(mvp.allocatedSupportUSD + mvp.allocatedLicenseUSD)]), el("div", { class: "stat-label" }, ["Allocated to MVP capabilities"])]),
    el("div", { class: "stat-card highlight" }, [el("div", { class: "stat-value" }, [fmtUSD(mvp.applicationValue)]), el("div", { class: "stat-label" }, ["Application saving in MVP value"])])
  ]));

  if (unallocated > 0) {
    container.appendChild(el("div", { class: "story-block", style: "border-left-color:#c62828" }, [
      el("h4", {}, ["Application cost that reaches no capability"]),
      el("p", {}, [fmtUSD(unallocated) + " of annual application cost sits in a primary domain with no scored capability, so it cannot be allocated and is excluded from the value model. Set the primary domain to a line of business that appears in Tab 5."])
    ]));
  }

  const appWrap = el("div", {});
  const flowWrap = el("div", { style: "margin-top:28px" });
  container.appendChild(appWrap);
  container.appendChild(flowWrap);
  renderRegister(appWrap, CONFIG_APPLICATIONS);
  renderRegister(flowWrap, CONFIG_DATAFLOWS);
}

function renderPlacement(container) {
  container.appendChild(el("div", { class: "panel-header" }, [
    el("h2", {}, ["6. GCC vs Power House — Line of Business Placement"]),
    el("p", { class: "panel-desc" }, [
      "This view answers the question the enterprise actually asks: which lines of business move to the GCC, which are shared, and which stay at the power house. The recommendation is aggregated from the capability scores, then leadership records the agreed decision and the retained boundary."
    ])
  ]));

  const placements = computeLobPlacements(state);
  if (!placements.length) {
    container.appendChild(el("p", { class: "panel-desc" }, ["Score capability candidates in Tab 5 to generate the placement view."]));
    return;
  }

  const agreed = agreedPlacementSummary(state);

  container.appendChild(el("div", { class: "card-grid" }, [
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(agreed.total)]), el("div", { class: "stat-label" }, ["Capabilities assessed"])]),
    el("div", { class: "stat-card highlight" }, [el("div", { class: "stat-value" }, [String(agreed.move)]), el("div", { class: "stat-label" }, ["Move to GCC"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(agreed.hybrid)]), el("div", { class: "stat-label" }, ["Hybrid / shared"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(agreed.remain)]), el("div", { class: "stat-label" }, ["Remain at power house"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(placements.length)]), el("div", { class: "stat-label" }, ["Lines of business assessed"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(agreed.overrides)]), el("div", { class: "stat-label" }, ["Leadership overrides"])])
  ]));

  container.appendChild(el("div", { class: "story-block" }, [
    el("h4", {}, ["How this view is produced"]),
    el("p", {}, [
      "Every placement starts from the workshop scores in Tab 5: readiness is scored, compared against the thresholds in Tab 9, and turned into a recommendation. " +
      "On the current assumptions the model recommends " + agreed.modelMove + " to move, " + agreed.modelHybrid + " hybrid, and " + agreed.modelRemain + " to remain. " +
      (agreed.overrides
        ? "Leadership has overridden " + plural(agreed.overrides, "capability", "capabilities") + " of " + agreed.total + ", of which " + agreed.variance + " changed the wave. Overrides are never recalculated; delete one to return that capability to the model."
        : "No leadership overrides are recorded, so the model result stands in full. Edit any row in the register below to record an override.")
    ]),
    el("p", {}, [
      "Move, Hybrid, and Remain always add up to the capability count for that line of business. " +
      "Move to GCC means readiness is at or above the Wave 1 threshold and the capability enters the MVP. " +
      "Hybrid / Shared means readiness sits between the Wave 2 and Wave 1 thresholds: part of the work can transfer, but local judgement, regulatory sign-off, or unfinished data foundations mean the GCC and the power house run it together rather than the GCC owning it outright. " +
      "Remain at Power House means readiness is below the Wave 2 threshold, so nothing transfers and no value is claimed until the constraint is fixed."
    ])
  ]));

  const shareCard = el("div", { class: "chart-card" }, [el("h4", {}, ["Share of effort that can move to the GCC, by line of business"])]);
  container.appendChild(shareCard);
  renderBarChart(shareCard, placements.map((row) => row.lineOfBusiness), [
    {
      name: "GCC share of FTE",
      color: "#0f766e",
      colorFor: (index) => heatColor(placements[index].gccSharePercent / 100),
      values: placements.map((row) => row.gccSharePercent)
    }
  ], { height: 400, yFormat: (value) => Math.round(value) + "%", xLabelFontSize: "10px", xLabelRotation: -28 });

  const disagreements = placements.filter((row) => row.agreedDecision && row.agreedDecision !== row.recommendation);
  if (disagreements.length) {
    container.appendChild(el("div", { class: "story-block", style: "border-left-color:#f9a825" }, [
      el("h4", {}, ["Lines of business where the agreed position differs from the model"]),
      el("p", {}, [disagreements.map((row) =>
        row.lineOfBusiness + " (model says " + row.recommendation + ", leadership agreed " + row.agreedDecision + ")"
      ).join("; ") + ". This is legitimate, but the rationale must be recorded so the decision survives later challenge."])
    ]));
  }

  const table = el("table", { class: "data-table" });
  table.appendChild(el("thead", {}, [el("tr", {},
    ["Line of Business", "Capabilities", "Total FTE", "Transferable FTE", "GCC Share", "Annual Value", "Move", "Hybrid", "Remain", "Overrides", "Model Recommendation", "Net Position"].map((heading) => el("th", {}, [heading]))
  )]));
  const tbody = el("tbody", {});
  placements.forEach((row) => {
    const recommendationClass = { "Move to GCC": "pill-green", "Hybrid / Shared": "pill-amber", "Remain at Power House": "pill-red" }[row.recommendation] || "pill-grey";
    const agreedClass = { "Move to GCC": "pill-green", "Hybrid / Shared": "pill-amber", "Remain at Power House": "pill-red" }[row.agreedDecision] || "pill-grey";
    tbody.appendChild(el("tr", {}, [
      el("td", { style: "font-weight:600" }, [row.lineOfBusiness]),
      el("td", { style: "text-align:center" }, [String(row.capabilityCount)]),
      el("td", { style: "text-align:center" }, [String(Math.round(row.totalFTE))]),
      el("td", { style: "text-align:center" }, [row.transferableFTE.toFixed(1)]),
      el("td", { style: "background:" + heatColor(row.gccSharePercent / 100) + ";color:#fff;text-align:center;font-weight:700;" }, [fmtPct(row.gccSharePercent)]),
      el("td", { style: "font-weight:600" }, [fmtUSD(row.annualValue)]),
      el("td", { style: "text-align:center;font-weight:600;color:#2e7d32" }, [String(row.agreedMove)]),
      el("td", { style: "text-align:center;font-weight:600;color:#a06b00" }, [String(row.agreedHybrid)]),
      el("td", { style: "text-align:center;font-weight:600;color:#c62828" }, [String(row.agreedRemain)]),
      el("td", { style: "text-align:center" }, [String(row.overrides)]),
      el("td", {}, [el("span", { class: "pill " + recommendationClass }, [row.recommendation])]),
      el("td", {}, [el("span", { class: "pill " + agreedClass }, [row.agreedDecision || "not agreed"])])
    ]));
  });
  table.appendChild(tbody);
  container.appendChild(el("div", { class: "table-wrap" }, [table]));

  container.appendChild(el("div", { class: "panel-actions" }, [
    el("button", {
      class: "btn",
      onclick: () => exportArrayAsCSV("gcc-vs-power-house-placement.csv", placements.map((row) => ({
        lineOfBusiness: row.lineOfBusiness,
        capabilityCount: row.capabilityCount,
        totalFTE: Math.round(row.totalFTE),
        transferableFTE: row.transferableFTE.toFixed(1),
        gccSharePercent: row.gccSharePercent.toFixed(1),
        modelSharePercent: row.modelSharePercent.toFixed(1),
        annualValue: Math.round(row.annualValue),
        agreedMove: row.agreedMove,
        agreedHybrid: row.agreedHybrid,
        agreedRemain: row.agreedRemain,
        overrides: row.overrides,
        moving: row.moving.join("; "),
        staying: row.staying.join("; "),
        recommendation: row.recommendation,
        agreedDecision: row.agreedDecision
      })), [
        { key: "lineOfBusiness", label: "Line of Business" }, { key: "capabilityCount", label: "Capabilities" },
        { key: "totalFTE", label: "Total FTE" },
        { key: "transferableFTE", label: "Transferable FTE" }, { key: "gccSharePercent", label: "GCC Share %" },
        { key: "modelSharePercent", label: "Model Share %" },
        { key: "annualValue", label: "Annual Value (USD)" },
        { key: "agreedMove", label: "Move" }, { key: "agreedHybrid", label: "Hybrid" }, { key: "agreedRemain", label: "Remain" },
        { key: "overrides", label: "Leadership Overrides" },
        { key: "moving", label: "Moves to GCC" },
        { key: "staying", label: "Stays at Power House" }, { key: "recommendation", label: "Model Recommendation" },
        { key: "agreedDecision", label: "Net Position" }
      ])
    }, ["Export Placement (CSV)"])
  ]));

  const decisionWrap = el("div", { style: "margin-top:28px" });
  container.appendChild(decisionWrap);
  renderRegister(decisionWrap, CONFIG_LOB_DECISION);
}

function renderSuccessCriteria(container) {
  container.appendChild(el("div", { class: "panel-header" }, [
    el("h2", {}, ["8. Operating Model Success Criteria"]),
    el("p", { class: "panel-desc" }, [
      "How the enterprise will judge whether the GCC is working, across three horizons: Deliver Better, Operate Better, and Change the Game. A criterion without a baseline or an owner cannot be proven, so it is flagged here rather than discovered a year later."
    ])
  ]));

  const rows = state.successCriteria;
  if (rows.length) {
    const withBaseline = rows.filter((row) => row.baseline && String(row.baseline).trim());
    const withOwner = rows.filter((row) => row.owner && String(row.owner).trim());
    container.appendChild(el("div", { class: "card-grid" }, [
      el("div", { class: "stat-card highlight" }, [el("div", { class: "stat-value" }, [String(rows.length)]), el("div", { class: "stat-label" }, ["Success criteria defined"])]),
      el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [fmtPct((withBaseline.length / rows.length) * 100)]), el("div", { class: "stat-label" }, ["Have a verified baseline"])]),
      el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [fmtPct((withOwner.length / rows.length) * 100)]), el("div", { class: "stat-label" }, ["Have a named owner"])]),
      el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [String(rows.length - withBaseline.length)]), el("div", { class: "stat-label" }, ["Cannot yet be proven"])])
    ]));

    const horizons = ["Deliver Better", "Operate Better", "Change the Game"];
    const horizonCard = el("div", { class: "chart-card" }, [el("h4", {}, ["Success criteria by value horizon"])]);
    container.appendChild(horizonCard);
    renderBarChart(horizonCard, horizons, [
      { name: "Criteria defined", color: "#0f766e", values: horizons.map((horizon) => rows.filter((row) => row.horizon === horizon).length) },
      { name: "With verified baseline", color: "#2f6fed", values: horizons.map((horizon) => rows.filter((row) => row.horizon === horizon && row.baseline).length) }
    ], { height: 320, yFormat: (value) => Math.round(value), xLabelFontSize: "11px", showLegend: true });

    const unprovable = rows.filter((row) => !row.baseline || !String(row.baseline).trim());
    if (unprovable.length) {
      container.appendChild(el("div", { class: "story-block", style: "border-left-color:#c62828" }, [
        el("h4", {}, ["Criteria that cannot be proven yet"]),
        el("p", {}, [unprovable.map((row) => row.metric).join("; ") +
          ". Capture the baseline before go-live, because a benefit with no starting point will be challenged by finance and cannot be claimed."])
      ]));
    }
  }

  renderRegister(container, CONFIG_SUCCESS);
}

function renderValueModel(container) {
  const mvpRows = mvpCandidates(state);
  const mvp = buildThreeYearCase(mvpRows, state.assumptions);
  const portfolio = buildThreeYearCase(state.workshopCandidates, state.assumptions);

  container.appendChild(el("div", { class: "panel-header" }, [
    el("h2", {}, ["10. MVP Value Model"]),
    el("p", { class: "panel-desc" }, [
      "The MVP is the set of capabilities leadership agreed to move to the GCC, priced using the workshop readiness scores. This view answers the executive question directly: what value can the GCC create, what does it cost, and when does it pay back."
    ]),
    el("div", { class: "panel-actions" }, [
      el("button", {
        class: "btn",
        onclick: () => exportArrayAsCSV("gcc-mvp-value-model.csv", state.workshopCandidates.map((row) => {
          const computed = computeCandidate(row, state.assumptions);
          return {
            capability: row.capability,
            lineOfBusiness: row.lineOfBusiness,
            region: row.region,
            linkedGoal: goalLabel(row.linkedGoal),
            currentFTE: num(row.currentFTE),
            readinessPercent: computed.readinessPercent.toFixed(1),
            transferredFTE: computed.transferredFTE.toFixed(1),
            arbitrageValue: Math.round(computed.arbitrageValue),
            automationValue: Math.round(computed.automationValue),
            riskAvoidanceValue: Math.round(computed.riskAvoidanceValue),
            revenueEnablementValue: Math.round(computed.revenueEnablementValue),
            annualValue: Math.round(computed.annualValue),
            setupCost: Math.round(computed.setupCost),
            parallelRunMonths: computed.parallelRunMonths,
            parallelRunCost: Math.round(computed.parallelRunCost),
            oneTimeCost: Math.round(computed.oneTimeCost),
            investment: Math.round(computed.investment),
            wave: computed.wave
          };
        }), [
          { key: "capability", label: "Capability" }, { key: "lineOfBusiness", label: "Line of Business" }, { key: "region", label: "Region" },
          { key: "linkedGoal", label: "Linked Strategic Goal" }, { key: "currentFTE", label: "Current FTE" },
          { key: "readinessPercent", label: "Readiness %" }, { key: "transferredFTE", label: "Transferable FTE" },
          { key: "arbitrageValue", label: "Labour Arbitrage (USD)" }, { key: "automationValue", label: "Automation Value (USD)" },
          { key: "riskAvoidanceValue", label: "Risk Avoidance (USD)" }, { key: "revenueEnablementValue", label: "Revenue Enablement (USD)" },
          { key: "annualValue", label: "Annual Value (USD)" }, { key: "setupCost", label: "Setup Cost (USD)" },
          { key: "parallelRunMonths", label: "Parallel Run (months)" }, { key: "parallelRunCost", label: "Parallel Run Cost (USD)" },
          { key: "oneTimeCost", label: "One-Time Cost (USD)" }, { key: "investment", label: "Total Investment (USD)" }, { key: "wave", label: "Wave" }
        ])
      }, ["Export Value Model (CSV)"])
    ])
  ]));

  if (!state.workshopCandidates.length) {
    container.appendChild(el("p", { class: "panel-desc" }, ["No candidates scored yet. Capture candidates in Tab 5, or click Load Sample Data to see a worked example."]));
    return;
  }

  container.appendChild(el("div", { class: "card-grid" }, [
    el("div", { class: "stat-card highlight" }, [el("div", { class: "stat-value" }, [fmtUSD(mvp.annualValue)]), el("div", { class: "stat-label" }, ["MVP annual value at maturity"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [fmtUSD(mvp.investment)]), el("div", { class: "stat-label" }, ["MVP one-time investment"])]),
    el("div", { class: "stat-card highlight" }, [el("div", { class: "stat-value" }, [fmtUSD(mvp.netValue)]), el("div", { class: "stat-label" }, ["3-year net value"])]),
    el("div", { class: "stat-card highlight" }, [el("div", { class: "stat-value" }, [fmtPct(mvp.roiPercent)]), el("div", { class: "stat-label" }, ["3-year ROI"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [mvp.paybackYear ? "Year " + mvp.paybackYear : "Beyond year 3"]), el("div", { class: "stat-label" }, ["Payback"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [mvp.transferredFTE.toFixed(0)]), el("div", { class: "stat-label" }, ["FTE in MVP scope"])])
  ]));

  container.appendChild(el("div", { class: "panel-header" }, [
    el("h3", {}, ["What the investment is made of"]),
    el("p", { class: "panel-desc" }, [
      "Parallel run is the period both the retained team and the GCC are paid for the same work. It is the cost most often left out of a GCC case, so it is calculated here rather than assumed away. Set the months per capability in Tab 5, or change the default in Tab 9."
    ])
  ]));
  container.appendChild(el("div", { class: "card-grid" }, [
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [fmtUSD(mvp.setupCost)]), el("div", { class: "stat-label" }, ["Setup and onboarding"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [fmtUSD(mvp.parallelRunCost)]), el("div", { class: "stat-label" }, ["Parallel run (dual-running)"])]),
    el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [fmtUSD(mvp.oneTimeCost)]), el("div", { class: "stat-label" }, ["Other one-time transition"])]),
    el("div", { class: "stat-card highlight" }, [el("div", { class: "stat-value" }, [fmtUSD(mvp.investment)]), el("div", { class: "stat-label" }, ["Total MVP investment"])])
  ]));
  if (mvp.parallelRunCost === 0 && mvp.candidateCount) {
    container.appendChild(el("div", { class: "story-block", style: "border-left-color:#c62828" }, [
      el("h4", {}, ["No parallel run cost is included"]),
      el("p", {}, ["Parallel run months are set to zero, so this case assumes the retained team stands down the day the GCC goes live. That is rarely true and will be challenged in review."])
    ]));
  }

  const leverCard = el("div", { class: "chart-card" }, [el("h4", {}, ["Where the MVP value comes from"])]);
  container.appendChild(leverCard);
  renderBarChart(leverCard, ["Labour arbitrage", "Automation & AI", "Application savings", "Risk avoidance", "Revenue enablement"], [
    { name: "MVP annual value", color: "#0f766e", values: [mvp.arbitrageValue, mvp.automationValue, mvp.applicationValue, mvp.riskAvoidanceValue, mvp.revenueEnablementValue] }
  ], { yFormat: (value) => "$" + Math.round(value / 1000000) + "M", xLabelFontSize: "11px" });

  const candidateCard = el("div", { class: "chart-card" }, [el("h4", {}, ["Annual value by capability \u2014 top 20 (colour shows readiness)"])]);
  container.appendChild(candidateCard);
  const sorted = state.workshopCandidates.slice().sort((left, right) =>
    computeCandidate(right, state.assumptions).annualValue - computeCandidate(left, state.assumptions).annualValue);
  const charted = sorted.filter((row) => computeCandidate(row, state.assumptions).annualValue > 0).slice(0, 20);
  renderBarChart(candidateCard, charted.map((row) => row.capability), [
    {
      name: "Annual value",
      color: "#0f766e",
      colorFor: (index) => heatColor(computeCandidate(charted[index], state.assumptions).readinessPercent / 100),
      values: charted.map((row) => computeCandidate(row, state.assumptions).annualValue)
    }
  ], { height: 440, yFormat: (value) => "$" + Math.round(value / 1000000) + "M", xLabelFontSize: "10px", xLabelRotation: -32 });

  const paybackCard = el("div", { class: "chart-card" }, [el("h4", {}, ["MVP three-year investment, value, and payback"])]);
  container.appendChild(paybackCard);
  renderPaybackChart(paybackCard, mvp.years);

  container.appendChild(el("div", { class: "panel-header" }, [
    el("h3", {}, ["Value detail by capability"]),
    el("p", { class: "panel-desc" }, ["The MVP is the " + mvpRows.length + " capabilities leadership agreed to move. Capabilities retained at the power house claim no value until their constraints are resolved, so the full portfolio total is " + fmtUSD(portfolio.annualValue) + " against " + fmtUSD(portfolio.investment) + " investment. Value is never claimed for work that is not agreed to move."])
  ]));

  const table = el("table", { class: "data-table" });
  table.appendChild(el("thead", {}, [el("tr", {},
    ["Capability", "Linked Goal", "Arbitrage", "Automation", "Application", "Risk Avoidance", "Revenue", "Annual Value", "Investment", "Wave", "Actions"].map((heading) => el("th", {}, [heading]))
  )]));
  const tbody = el("tbody", {});
  sorted.forEach((row) => {
    if (uiState.editing.workshopCandidates === row.id) {
      tbody.appendChild(el("tr", {}, [el("td", { colspan: "11" }, [buildForm(CONFIG_CANDIDATES, row)])]));
      return;
    }
    const computed = computeCandidate(row, state.assumptions);
    const waveClass = { "MVP Wave 1": "pill-green", "Wave 2 / Hybrid": "pill-amber", "Retain / Improve First": "pill-red" }[computed.wave] || "pill-grey";
    tbody.appendChild(el("tr", {}, [
      el("td", { style: "font-weight:600" }, [row.capability]),
      el("td", { style: "font-size:12px;color:#64708a" }, [goalLabel(row.linkedGoal) || "(not linked)"]),
      el("td", {}, [fmtUSD(computed.arbitrageValue)]),
      el("td", {}, [fmtUSD(computed.automationValue)]),
      el("td", {}, [fmtUSD(computed.applicationValue)]),
      el("td", {}, [fmtUSD(computed.riskAvoidanceValue)]),
      el("td", {}, [fmtUSD(computed.revenueEnablementValue)]),
      el("td", { style: "font-weight:700" }, [fmtUSD(computed.annualValue)]),
      el("td", {}, [fmtUSD(computed.investment)]),
      el("td", {}, [el("span", { class: "pill " + waveClass }, [computed.wave])]),
      el("td", { class: "row-actions" }, [el("button", { class: "btn small", onclick: () => { uiState.editing.workshopCandidates = row.id; renderActiveTab(); } }, ["Edit"])])
    ]));
  });
  table.appendChild(tbody);
  container.appendChild(el("div", { class: "table-wrap" }, [table]));
}

function renderBlueprint(container) {
  container.appendChild(el("div", { class: "panel-header" }, [
    el("h2", {}, ["9. MVP Blueprint"]),
    el("p", { class: "panel-desc" }, [
      "The blueprint turns the value model into a sequenced delivery plan. Wave 1 is the MVP that proves value, Wave 2 is scaled once foundations are stable, and the retained set stays with the business until standardization or regulatory constraints change."
    ])
  ]));

  if (!state.workshopCandidates.length) {
    container.appendChild(el("p", { class: "panel-desc" }, ["Score capability candidates in Tab 5 to generate the blueprint."]));
    return;
  }

  const waves = [
    { name: "MVP Wave 1", intent: "Prove value in 2 to 3 quarters with high-readiness, low-constraint capabilities.", className: "pill-green" },
    { name: "Wave 2 / Hybrid", intent: "Scale after the MVP, using a hybrid model where local judgement is still required.", className: "pill-amber" },
    { name: "Retain / Improve First", intent: "Keep in the business. Standardize, digitize, or resolve constraints before reassessing.", className: "pill-red" }
  ];

  waves.forEach((wave) => {
    const rows = state.workshopCandidates.filter((row) => computeCandidate(row, state.assumptions).wave === wave.name);
    const summary = buildThreeYearCase(rows, state.assumptions);
    const block = el("div", { class: "story-block" }, [
      el("h4", {}, [wave.name + " \u2014 " + rows.length + " capabilities"]),
      el("p", {}, [wave.intent])
    ]);
    if (rows.length) {
      block.appendChild(el("div", { class: "card-grid" }, [
        el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [summary.transferredFTE.toFixed(0)]), el("div", { class: "stat-label" }, ["Transferable FTE"])]),
        el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [fmtUSD(summary.annualValue)]), el("div", { class: "stat-label" }, ["Annual value at maturity"])]),
        el("div", { class: "stat-card" }, [el("div", { class: "stat-value" }, [fmtUSD(summary.investment)]), el("div", { class: "stat-label" }, ["Investment"])])
      ]));
      const list = el("ul", {}, rows.map((row) => {
        const computed = computeCandidate(row, state.assumptions);
        return el("li", {}, [
          row.capability + " \u2014 " + (row.lineOfBusiness || "unassigned") + ", " + (row.region || "region not set") +
          " (readiness " + fmtPct(computed.readinessPercent) + ", annual value " + fmtUSD(computed.annualValue) + ")"
        ]);
      }));
      block.appendChild(list);
    } else {
      block.appendChild(el("p", { class: "panel-desc" }, ["No capabilities currently fall into this wave."]));
    }
    container.appendChild(block);
  });

  container.appendChild(el("div", { class: "panel-header" }, [el("h3", {}, ["MVP delivery sequence"])]));
  const sequence = [
    ["Weeks 0-4", "Mobilise", "Confirm MVP scope, decision rights, service baselines, and the benefit measurement method with finance."],
    ["Weeks 4-12", "Build", "Hire and onboard the MVP pod, run knowledge transfer, and stand up tooling, access, and reporting."],
    ["Weeks 12-24", "Operate in parallel", "Run shadow and dual operations, stabilise quality, and start publishing realised value against the baseline."],
    ["Weeks 24-36", "Prove and decide", "Report MVP value achieved versus plan, then decide whether to scale into Wave 2 or adjust scope."]
  ];
  const table = el("table", { class: "data-table" });
  table.appendChild(el("thead", {}, [el("tr", {}, ["Timeframe", "Stage", "Focus"].map((heading) => el("th", {}, [heading])))]));
  table.appendChild(el("tbody", {}, sequence.map((row) => el("tr", {}, [
    el("td", { style: "font-weight:600" }, [row[0]]),
    el("td", {}, [el("span", { class: "pill pill-blue" }, [row[1]])]),
    el("td", {}, [row[2]])
  ]))));
  container.appendChild(el("div", { class: "table-wrap" }, [table]));
}

function renderStoryline(container) {
  const mvpRows = mvpCandidates(state);
  const mvp = buildThreeYearCase(mvpRows, state.assumptions);
  const portfolio = buildThreeYearCase(state.workshopCandidates, state.assumptions);
  const highImpactVoices = state.voiceOfBusiness.filter((row) => row.businessImpact === "High");

  container.appendChild(el("div", { class: "panel-header" }, [
    el("h2", {}, ["11. Executive Storyline"]),
    el("p", { class: "panel-desc" }, ["A generated narrative that connects business evidence to the MVP value case. Use it as the spine of the executive readout."])
  ]));

  if (!state.workshopCandidates.length) {
    container.appendChild(el("p", { class: "panel-desc" }, ["Add strategic goals and capability candidates to generate the storyline."]));
    return;
  }

  const topCapabilities = state.workshopCandidates.slice()
    .sort((left, right) => computeCandidate(right, state.assumptions).annualValue - computeCandidate(left, state.assumptions).annualValue)
    .slice(0, 3);
  const placements = computeLobPlacements(state);
  const agreed = agreedPlacementSummary(state);
  const movingLobs = placements.filter((row) => row.agreedDecision === PLACEMENT_MOVE);
  const hybridLobs = placements.filter((row) => row.agreedDecision === PLACEMENT_HYBRID);
  const remainingLobs = placements.filter((row) => row.agreedDecision === PLACEMENT_REMAIN);

  const blocks = [
    {
      title: "What the business told us",
      body: state.voiceOfBusiness.length
        ? "We captured " + state.voiceOfBusiness.length + " Voice of Business entries across " +
          new Set(state.voiceOfBusiness.map((row) => row.lineOfBusiness)).size + " lines of business, of which " +
          highImpactVoices.length + " were rated high impact. The recurring themes are " +
          [...new Set(state.voiceOfBusiness.map((row) => row.theme).filter(Boolean))].join(", ") + "."
        : "No Voice of Business evidence has been captured yet."
    },
    {
      title: "The goals this must serve",
      body: state.strategicGoals.length
        ? "The GCC is being assessed against " + state.strategicGoals.length + " executive goals owned by " +
          [...new Set(state.strategicGoals.map((goal) => goal.owner).filter(Boolean))].join(", ") +
          ". Every capability in the MVP is linked back to one of these goals so value is traceable."
        : "No strategic goals recorded yet."
    },
    {
      title: "The mandate we are giving the GCC",
      body: state.northStarMandates.length
        ? "The GCC is mandated across " + state.northStarMandates.length + " lines of business: " +
          state.northStarMandates.map((mandate) => mandate.lineOfBusiness + " (" + (mandate.gccOwnership || "ownership not set") + ")").join("; ") +
          ". Each mandate names the outcome owned, the decisions the GCC can take alone, and what the power house keeps."
        : "No North Star mandate has been agreed yet. Without it the GCC will be measured on activity rather than outcomes."
    },
    {
      title: "What moves and what stays",
      body: placements.length
        ? "Of " + agreed.total + " capabilities scored, " + agreed.move + " move to the GCC covering " +
          Math.round(agreed.movingFTE) + " FTE, " + agreed.remain + " remain at the power house" +
          (agreed.hybrid ? ", and " + agreed.hybrid + " are shared" : "") + ". " +
          "Lines of business moving wholly or partly to the GCC: " + (movingLobs.concat(hybridLobs).length ? movingLobs.concat(hybridLobs).map((row) => row.lineOfBusiness).join(", ") : "none") +
          ". Remaining entirely at the power house: " + (remainingLobs.length ? remainingLobs.map((row) => row.lineOfBusiness).join(", ") : "none") + ". " +
          (agreed.overrides
            ? "This is the model result adjusted by " + plural(agreed.overrides, "leadership decision") + ", " + agreed.variance +
              " of which changed the wave because business value, strategic importance, and technology sharedness were weighed alongside readiness."
            : "This is the model result in full, derived from the workshop readiness scores against the agreed thresholds. No leadership override has been applied.")
        : "No line of business placement has been produced yet."
    },
    {
      title: "What the MVP includes",
      body: mvpRows.length
        ? "The MVP covers " + mvpRows.length + " capabilities across " +
          new Set(mvpRows.map((row) => row.lineOfBusiness)).size + " lines of business. The largest blocks are " +
          Object.entries(mvpRows.reduce((acc, row) => { acc[row.lineOfBusiness] = (acc[row.lineOfBusiness] || 0) + 1; return acc; }, {}))
            .sort((left, right) => right[1] - left[1]).slice(0, 4)
            .map((entry) => entry[0] + " (" + entry[1] + ")").join(", ") +
          ". Scope is set by readiness against the Wave 1 threshold" + (agreed.overrides ? ", adjusted by the recorded leadership decisions" : "") + ", then priced using the workshop scores."
        : "No capability reaches the Wave 1 threshold, so there is no MVP scope to price yet."
    },
    {
      title: "The value the GCC can create",
      body: "At maturity the MVP is modelled to deliver " + fmtUSD(mvp.annualValue) + " of annual value for " +
        fmtUSD(mvp.investment) + " of one-time investment, of which " + fmtUSD(mvp.parallelRunCost) +
        " is parallel running while both teams are paid for the same work. That produces " + fmtUSD(mvp.netValue) +
        " of net value over three years, a " + fmtPct(mvp.roiPercent) + " three-year ROI and payback in " +
        (mvp.paybackYear ? "year " + mvp.paybackYear : "beyond year three") +
        ". Capabilities retained at the power house claim no value in this case, so the portfolio total stays at " +
        fmtUSD(portfolio.annualValue) + " until those constraints are resolved and they are reassessed."
    },
    {
      title: "Where the value comes from",
      body: "Labour arbitrage contributes " + fmtUSD(mvp.arbitrageValue) + ", automation and AI " + fmtUSD(mvp.automationValue) +
        ", application run cost " + fmtUSD(mvp.applicationValue) +
        ", risk avoidance " + fmtUSD(mvp.riskAvoidanceValue) + ", and revenue enablement " + fmtUSD(mvp.revenueEnablementValue) +
        ". The largest single contributors are " + topCapabilities.map((row) => row.capability).join(", ") + "."
    },
    {
      title: "What we are deliberately not moving",
      body: (function () {
        const retained = state.workshopCandidates.filter((row) => computeCandidate(row, state.assumptions).wave === "Retain / Improve First");
        if (!retained.length) return "Every scored capability has a transfer or hybrid path; none were assessed as requiring full retention.";
        const byLob = Object.entries(retained.reduce((acc, row) => { acc[row.lineOfBusiness] = (acc[row.lineOfBusiness] || 0) + 1; return acc; }, {}))
          .sort((left, right) => right[1] - left[1]);
        return plural(retained.length, "capability", "capabilities") + " stay with the business, concentrated in " +
          byLob.slice(0, 5).map((entry) => entry[0] + " (" + entry[1] + ")").join(", ") +
          ". They are retained because of physical presence, regulatory accountability, or low process standardization. Holding these back protects the credibility of the case rather than inflating it.";
      })()
    },
    {
      title: "How we will know it is working",
      body: (function () {
        if (!state.successCriteria.length) return "No success criteria have been agreed yet, so realised value cannot be proven.";
        const withBaseline = state.successCriteria.filter((row) => row.baseline && String(row.baseline).trim());
        return state.successCriteria.length + " success criteria are defined across Deliver Better, Operate Better, and Change the Game, of which " +
          withBaseline.length + " have a verified baseline. Examples include " +
          state.successCriteria.slice(0, 3).map((row) => row.metric).join("; ") +
          ". Criteria without a baseline must be measured before go-live or the benefit cannot be claimed.";
      })()
    },
    {
      title: "What we need to decide now",
      body: "Approve the MVP scope and investment of " + fmtUSD(mvp.investment) +
        ", confirm the benefit baseline and who validates realised value, and name the accountable business owner for each MVP capability."
    }
  ];

  blocks.forEach((block) => {
    container.appendChild(el("div", { class: "story-block" }, [
      el("h4", {}, [block.title]),
      el("p", {}, [block.body])
    ]));
  });

  container.appendChild(el("div", { class: "panel-actions" }, [
    el("button", {
      class: "btn primary",
      onclick: () => downloadFile("gcc-mvp-executive-storyline.txt",
        [state.meta.engagementName || "GCC Value MVP", state.meta.client || "", ""]
          .concat(blocks.map((block) => block.title.toUpperCase() + "\n" + block.body + "\n")).join("\n"), "text/plain")
    }, ["Download Storyline (TXT)"])
  ]));
}

/* ---------------------------------------------------------------- */
/* Tab wiring                                                        */
/* ---------------------------------------------------------------- */
const TAB_RENDERERS = {
  vob: (container) => renderRegister(container, CONFIG_VOB),
  goals: (container) => renderRegister(container, CONFIG_GOALS),
  orgstructure: renderOrganisationStructure,
  northstar: renderNorthStar,
  workshop: (container) => renderRegister(container, CONFIG_CANDIDATES),
  placement: renderPlacement,
  landscape: renderCapabilityLandscape,
  architecture: renderArchitecture,
  assumptions: renderAssumptions,
  valuemodel: renderValueModel,
  storyline: renderStoryline
};

let activeTab = "vob";

function renderActiveTab() {
  refreshDerivedState(state);
  const subtitle = document.getElementById("orgSubtitle");
  subtitle.textContent = (state.meta.client ? state.meta.client + " \u2014 " : "") + (state.meta.engagementName || "GCC Value MVP");
  const container = document.getElementById("tab-" + activeTab);
  container.innerHTML = "";
  TAB_RENDERERS[activeTab](container);
}

function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.tab === tab));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === "tab-" + tab));
  renderActiveTab();
}

document.getElementById("sideNav").addEventListener("click", (event) => {
  const button = event.target.closest(".nav-item");
  if (button) switchTab(button.dataset.tab);
});

document.getElementById("btnExportJSON").addEventListener("click", () => {
  downloadFile("gcc-value-mvp.json", JSON.stringify(state, null, 2), "application/json");
});

document.getElementById("importJSONInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      state = Object.assign(emptyState(), parsed, {
        meta: Object.assign(emptyState().meta, parsed.meta || {}),
        assumptions: Object.assign(defaultAssumptions(), parsed.assumptions || {})
      });
      saveState(state);
      renderActiveTab();
      alert("Import successful.");
    } catch (error) {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
});

document.getElementById("btnLoadSample").addEventListener("click", () => {
  if (confirm("This will replace current data with sample data. Continue?")) {
    state = seedState();
    saveState(state);
    renderActiveTab();
  }
});

document.getElementById("btnResetAll").addEventListener("click", () => {
  if (confirm("This will permanently clear all data in this browser. Continue?")) {
    state = emptyState();
    saveState(state);
    renderActiveTab();
  }
});

renderActiveTab();
