/* ===================== Chart Helpers (pure SVG) ===================== */

const SVG_NS = "http://www.w3.org/2000/svg";

function svgEl(tag, attrs) {
  const element = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs || {}).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function heatColor(ratio) {
  const bounded = Math.max(0, Math.min(1, ratio));
  const lerp = (from, to, t) => from.map((value, index) => Math.round(value + (to[index] - value) * t));
  const channels = bounded < 0.5
    ? lerp([198, 40, 40], [249, 168, 37], bounded / 0.5)
    : lerp([249, 168, 37], [46, 125, 50], (bounded - 0.5) / 0.5);
  return "rgb(" + channels[0] + "," + channels[1] + "," + channels[2] + ")";
}

function appendLegend(container, series) {
  const legend = document.createElement("div");
  legend.className = "chart-legend";
  series.forEach((item) => {
    const entry = document.createElement("span");
    entry.className = "legend-item";
    entry.innerHTML = '<i style="background:' + item.color + '"></i>' + item.name;
    legend.appendChild(entry);
  });
  container.appendChild(legend);
}

/* Grouped bar chart with optional rotated x-axis labels. */
function renderBarChart(container, categories, series, opts) {
  opts = opts || {};
  const chartHost = document.createElement("div");
  container.appendChild(chartHost);

  const width = opts.width || 720;
  const height = opts.height || 380;
  const pad = 64;
  const maxValue = Math.max(1, ...series.flatMap((item) => item.values));
  const svg = svgEl("svg", { viewBox: "0 0 " + width + " " + height, width: "100%", height: String(height) });

  const chartWidth = width - pad * 1.5;
  const chartHeight = height - pad * 1.6;
  const groupWidth = chartWidth / Math.max(1, categories.length);
  const barWidth = (groupWidth * 0.68) / series.length;

  svg.appendChild(svgEl("line", { x1: pad, y1: height - pad, x2: width - pad * 0.5, y2: height - pad, stroke: "#94a3b8" }));
  svg.appendChild(svgEl("line", { x1: pad, y1: pad * 0.5, x2: pad, y2: height - pad, stroke: "#94a3b8" }));

  for (let tick = 0; tick <= 4; tick++) {
    const value = (maxValue / 4) * tick;
    const y = (height - pad) - (value / maxValue) * chartHeight;
    svg.appendChild(svgEl("line", { x1: pad, y1: y, x2: width - pad * 0.5, y2: y, stroke: "#eef2f7" }));
    const label = svgEl("text", { x: pad - 8, y: y + 4, "font-size": "10px", fill: "#64708a", "text-anchor": "end" });
    label.textContent = opts.yFormat ? opts.yFormat(value) : Math.round(value);
    svg.appendChild(label);
  }

  categories.forEach((category, categoryIndex) => {
    const groupX = pad + categoryIndex * groupWidth + groupWidth * 0.16;
    series.forEach((item, seriesIndex) => {
      const value = item.values[categoryIndex] || 0;
      const barHeight = (value / maxValue) * chartHeight;
      const x = groupX + seriesIndex * barWidth;
      const y = (height - pad) - barHeight;
      const fill = item.colorFor ? item.colorFor(categoryIndex) : item.color;
      const bar = svgEl("rect", { x: x, y: y, width: barWidth * 0.85, height: Math.max(0, barHeight), fill: fill, rx: 2 });
      const title = svgEl("title", {});
      title.textContent = category + " — " + item.name + ": " + (opts.yFormat ? opts.yFormat(value) : value);
      bar.appendChild(title);
      svg.appendChild(bar);
    });

    const labelX = groupX + (groupWidth * 0.68) / 2;
    const labelY = height - pad + 22;
    const label = svgEl("text", {
      x: labelX, y: labelY, "font-size": opts.xLabelFontSize || "10px", fill: "#334155",
      "text-anchor": opts.xLabelRotation ? "end" : "middle"
    });
    if (opts.xLabelRotation) label.setAttribute("transform", "rotate(" + opts.xLabelRotation + " " + labelX + " " + labelY + ")");
    label.textContent = category;
    svg.appendChild(label);
  });

  chartHost.appendChild(svg);
  if (series.length > 1 || opts.showLegend) appendLegend(container, series);
}

/* Investment vs realised value bars with a cumulative net line. */
function renderPaybackChart(container, years) {
  const chartHost = document.createElement("div");
  container.appendChild(chartHost);

  const width = 720;
  const height = 360;
  const pad = 64;
  const svg = svgEl("svg", { viewBox: "0 0 " + width + " " + height, width: "100%", height: String(height) });
  const chartWidth = width - pad * 1.5;
  const chartHeight = height - pad * 1.6;
  const groupWidth = chartWidth / Math.max(1, years.length);
  const barWidth = groupWidth * 0.26;

  const maxBar = Math.max(1, ...years.map((year) => Math.max(year.realisedValue, year.investment)));
  const maxLine = Math.max(1, ...years.map((year) => Math.abs(year.cumulativeNet)));

  svg.appendChild(svgEl("line", { x1: pad, y1: height - pad, x2: width - pad * 0.5, y2: height - pad, stroke: "#94a3b8" }));
  svg.appendChild(svgEl("line", { x1: pad, y1: pad * 0.5, x2: pad, y2: height - pad, stroke: "#94a3b8" }));

  years.forEach((year, index) => {
    const groupX = pad + index * groupWidth + groupWidth * 0.2;
    const investmentHeight = (year.investment / maxBar) * chartHeight;
    const valueHeight = (year.realisedValue / maxBar) * chartHeight;
    svg.appendChild(svgEl("rect", { x: groupX, y: (height - pad) - investmentHeight, width: barWidth, height: Math.max(0, investmentHeight), fill: "#c62828", rx: 2 }));
    svg.appendChild(svgEl("rect", { x: groupX + barWidth + 6, y: (height - pad) - valueHeight, width: barWidth, height: Math.max(0, valueHeight), fill: "#0f766e", rx: 2 }));

    const label = svgEl("text", { x: groupX + barWidth, y: height - pad + 20, "font-size": "11px", fill: "#334155", "text-anchor": "middle" });
    label.textContent = "Year " + year.year;
    svg.appendChild(label);
  });

  const points = years.map((year, index) => {
    const x = pad + index * groupWidth + groupWidth / 2;
    const y = (height - pad) - ((year.cumulativeNet / (2 * maxLine)) + 0.5) * chartHeight;
    return { x: x, y: y };
  });
  svg.appendChild(svgEl("polyline", {
    points: points.map((point) => point.x + "," + point.y).join(" "),
    fill: "none", stroke: "#2f6fed", "stroke-width": 2
  }));
  points.forEach((point) => svg.appendChild(svgEl("circle", { cx: point.x, cy: point.y, r: 4, fill: "#2f6fed" })));

  chartHost.appendChild(svg);
  appendLegend(container, [
    { name: "Investment", color: "#c62828" },
    { name: "Realised Value", color: "#0f766e" },
    { name: "Cumulative Net (scaled)", color: "#2f6fed" }
  ]);
}
