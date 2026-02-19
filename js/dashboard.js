// ============================================================
// DASHBOARD.JS — Metrics dashboard
// Prosperity Diffusion: 2025–2100
// ============================================================

const Dashboard = (() => {
    let sparklines = {};
    let history = [];

    function init() {
        history = [];
        sparklines = {};
    }

    function update() {
        const metrics = Simulation.getGlobalMetrics();
        const year = Simulation.getYear();

        // Store history for sparklines
        history.push({ year, ...metrics });
        if (history.length > 76) history.shift();

        // Update metric cards
        updateMetric("extreme-poverty", metrics.extremePoverty, "%", "down");
        updateMetric("moderate-poverty", metrics.moderatePoverty, "%", "down");
        updateMetric("gini", metrics.gini, "", "down");
        updateMetric("gdp-capita", "$" + Number(metrics.gdpPerCapita).toLocaleString(), "", "up");
        updateMetric("urbanization", metrics.urbanization, "%", "up");

        // Structural transformation bar
        updateStructureBar(metrics.agriShare, metrics.industryShare, metrics.servicesShare);

        // Sparklines
        drawSparkline("extreme-poverty-spark", history.map(h => parseFloat(h.extremePoverty)));
        drawSparkline("moderate-poverty-spark", history.map(h => parseFloat(h.moderatePoverty)));
        drawSparkline("gini-spark", history.map(h => parseFloat(h.gini)));
        drawSparkline("gdp-spark", history.map(h => h.gdpPerCapita));

        // Regional panel
        updateRegionalPanel();
    }

    function updateMetric(id, value, suffix, goodDir) {
        const el = document.getElementById(`metric-${id}`);
        if (!el) return;
        const valEl = el.querySelector(".metric-value");
        if (valEl) {
            const displayVal = typeof value === 'string' ? value : value;
            valEl.textContent = displayVal + suffix;
        }

        // Trend indicator
        if (history.length >= 2) {
            const trendEl = el.querySelector(".metric-trend");
            if (trendEl) {
                const prev = history[history.length - 2];
                const curr = history[history.length - 1];
                let key = id.replace(/-/g, '');
                if (id === "extreme-poverty") key = "extremePoverty";
                if (id === "moderate-poverty") key = "moderatePoverty";
                if (id === "gdp-capita") key = "gdpPerCapita";

                const diff = parseFloat(curr[key]) - parseFloat(prev[key]);
                if (Math.abs(diff) > 0.01) {
                    const isGood = (goodDir === "down" && diff < 0) || (goodDir === "up" && diff > 0);
                    trendEl.textContent = diff > 0 ? "▲" : "▼";
                    trendEl.className = `metric-trend ${isGood ? "trend-good" : "trend-bad"}`;
                }
            }
        }
    }

    function updateStructureBar(agri, industry, services) {
        const bar = document.getElementById("structure-bar");
        if (!bar) return;
        bar.innerHTML = `
      <div class="struct-seg struct-agri" style="width:${agri}%" title="Agriculture: ${parseFloat(agri).toFixed(1)}%"></div>
      <div class="struct-seg struct-industry" style="width:${industry}%" title="Industry: ${parseFloat(industry).toFixed(1)}%"></div>
      <div class="struct-seg struct-services" style="width:${services}%" title="Services: ${parseFloat(services).toFixed(1)}%"></div>
    `;
        const labels = document.getElementById("structure-labels");
        if (labels) {
            labels.innerHTML = `
        <span class="struct-label"><span class="struct-dot struct-agri-dot"></span>Agri ${parseFloat(agri).toFixed(0)}%</span>
        <span class="struct-label"><span class="struct-dot struct-ind-dot"></span>Ind ${parseFloat(industry).toFixed(0)}%</span>
        <span class="struct-label"><span class="struct-dot struct-svc-dot"></span>Svc ${parseFloat(services).toFixed(0)}%</span>
      `;
        }
    }

    function drawSparkline(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container || data.length < 2) return;

        const w = container.clientWidth || 80;
        const h = container.clientHeight || 24;

        let svgEl = container.querySelector("svg");
        if (!svgEl) {
            svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgEl.setAttribute("width", w);
            svgEl.setAttribute("height", h);
            container.appendChild(svgEl);
        }

        const min = Math.min(...data) * 0.9;
        const max = Math.max(...data) * 1.1 || 1;
        const xScale = (i) => (i / (data.length - 1)) * w;
        const yScale = (v) => h - ((v - min) / (max - min)) * h;

        const points = data.map((v, i) => `${xScale(i)},${yScale(v)}`).join(" ");

        svgEl.innerHTML = `<polyline points="${points}" fill="none" stroke="rgba(0,229,255,0.6)" stroke-width="1.5"/>`;
    }

    function updateRegionalPanel() {
        const panel = document.getElementById("regional-metrics");
        if (!panel) return;

        const regionNames = ["Sub-Saharan Africa", "South Asia", "Southeast Asia", "Latin America"];
        let html = "";
        regionNames.forEach(r => {
            const m = Simulation.getRegionalMetrics(r);
            if (m) {
                const color = DATA.regions[r]?.color || "#fff";
                html += `
          <div class="regional-row">
            <span class="regional-name" style="border-left: 3px solid ${color}; padding-left: 6px;">${r}</span>
            <span class="regional-stat">${m.extremePoverty}%</span>
            <span class="regional-stat">$${Number(m.gdpPerCapita).toLocaleString()}</span>
            <span class="regional-stat">${m.gini}</span>
          </div>
        `;
            }
        });
        panel.innerHTML = `
      <div class="regional-header">
        <span>Region</span><span>Extreme Poverty</span><span>GDP/cap</span><span>Gini</span>
      </div>
      ${html}
    `;
    }

    return { init, update };
})();
