// ============================================================
// CONTROLS.JS — User controls panel
// Prosperity Diffusion: 2025–2100
// ============================================================

const Controls = (() => {
    let onDriverChange = null;
    let onPolicyChange = null;
    let onScenarioChange = null;
    let onRegionChange = null;
    let onPlayToggle = null;
    let onSpeedChange = null;
    let onYearChange = null;

    function init(callbacks) {
        onDriverChange = callbacks.onDriverChange;
        onPolicyChange = callbacks.onPolicyChange;
        onScenarioChange = callbacks.onScenarioChange;
        onRegionChange = callbacks.onRegionChange;
        onPlayToggle = callbacks.onPlayToggle;
        onSpeedChange = callbacks.onSpeedChange;
        onYearChange = callbacks.onYearChange;

        setupDriverSliders();
        setupPolicies();
        setupScenarios();
        setupRegions();
        setupPlayControls();
        setupTimeSlider();
    }

    function setupDriverSliders() {
        const driverDefs = [
            { key: "infrastructure", label: "Infrastructure Investment", icon: "🏗️" },
            { key: "digitalConnectivity", label: "Digital Connectivity", icon: "📡" },
            { key: "tradeOpenness", label: "Trade Openness", icon: "🚢" },
            { key: "institutionalCapacity", label: "Institutional Capacity", icon: "🏛️" },
            { key: "humanCapital", label: "Human Capital", icon: "🎓" },
            { key: "demographics", label: "Demographic Dividends", icon: "👥" }
        ];

        const container = document.getElementById("driver-sliders");
        if (!container) return;

        const currentDrivers = Simulation.getDrivers();

        driverDefs.forEach(def => {
            const div = document.createElement("div");
            div.className = "driver-slider";
            div.innerHTML = `
        <div class="driver-header">
          <span class="driver-icon">${def.icon}</span>
          <span class="driver-label">${def.label}</span>
          <span class="driver-value" id="driver-val-${def.key}">${currentDrivers[def.key]}</span>
        </div>
        <input type="range" min="0" max="100" value="${currentDrivers[def.key]}" 
               class="slider" id="driver-${def.key}" data-key="${def.key}">
      `;
            container.appendChild(div);

            const slider = div.querySelector("input");
            slider.addEventListener("input", (e) => {
                const val = parseInt(e.target.value);
                document.getElementById(`driver-val-${def.key}`).textContent = val;
                if (onDriverChange) onDriverChange(def.key, val);
            });
        });
    }

    function setupPolicies() {
        const policyDefs = [
            { key: "education", label: "Education Expansion", icon: "📚" },
            { key: "broadband", label: "Broadband Rollout", icon: "🌐" },
            { key: "tradeAgreements", label: "Trade Agreements", icon: "📜" },
            { key: "climateShocks", label: "Climate Shocks", icon: "🌡️" },
            { key: "governance", label: "Governance Reform", icon: "⚖️" }
        ];

        const container = document.getElementById("policy-toggles");
        if (!container) return;

        policyDefs.forEach(def => {
            const div = document.createElement("div");
            div.className = "policy-toggle";
            const isNegative = def.key === "climateShocks";
            div.innerHTML = `
        <label class="toggle-label ${isNegative ? 'negative' : ''}">
          <span class="policy-icon">${def.icon}</span>
          <span class="policy-name">${def.label}</span>
          <div class="toggle-switch">
            <input type="checkbox" id="policy-${def.key}" data-key="${def.key}">
            <span class="toggle-slider ${isNegative ? 'negative' : ''}"></span>
          </div>
        </label>
      `;
            container.appendChild(div);

            const checkbox = div.querySelector("input");
            checkbox.addEventListener("change", (e) => {
                if (onPolicyChange) onPolicyChange(def.key, e.target.checked);
            });
        });
    }

    function setupScenarios() {
        const container = document.getElementById("scenario-buttons");
        if (!container) return;

        Object.entries(DATA.scenarios).forEach(([key, scenario]) => {
            const btn = document.createElement("button");
            btn.className = `scenario-btn ${key === "baseline" ? "active" : ""}`;
            btn.dataset.scenario = key;
            btn.innerHTML = `<span class="scenario-name">${scenario.name}</span>`;
            btn.title = scenario.description;
            container.appendChild(btn);

            btn.addEventListener("click", () => {
                container.querySelectorAll(".scenario-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                if (onScenarioChange) onScenarioChange(key);
            });
        });
    }

    function setupRegions() {
        const container = document.getElementById("region-toggles");
        if (!container) return;

        const allBtn = document.createElement("button");
        allBtn.className = "region-btn active";
        allBtn.textContent = "Global";
        allBtn.dataset.region = "";
        container.appendChild(allBtn);
        allBtn.addEventListener("click", () => {
            container.querySelectorAll(".region-btn").forEach(b => b.classList.remove("active"));
            allBtn.classList.add("active");
            if (onRegionChange) onRegionChange(null);
        });

        Object.entries(DATA.regions).forEach(([name, region]) => {
            const btn = document.createElement("button");
            btn.className = "region-btn";
            btn.dataset.region = name;
            btn.style.borderColor = region.color;
            btn.innerHTML = `<span style="color:${region.color}">●</span> ${name.replace("Sub-Saharan ", "SS ").replace("Southeast ", "SE ")}`;
            container.appendChild(btn);

            btn.addEventListener("click", () => {
                container.querySelectorAll(".region-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                if (onRegionChange) onRegionChange(name);
            });
        });
    }

    function setupPlayControls() {
        const playBtn = document.getElementById("play-btn");
        const speedSelect = document.getElementById("speed-select");

        if (playBtn) {
            playBtn.addEventListener("click", () => {
                if (onPlayToggle) onPlayToggle();
            });
        }

        if (speedSelect) {
            speedSelect.addEventListener("change", (e) => {
                if (onSpeedChange) onSpeedChange(parseInt(e.target.value));
            });
        }
    }

    function setupTimeSlider() {
        const slider = document.getElementById("time-slider");
        if (slider) {
            slider.addEventListener("input", (e) => {
                if (onYearChange) onYearChange(parseInt(e.target.value));
            });
        }
    }

    function updateSliders(drivers) {
        Object.entries(drivers).forEach(([key, val]) => {
            const slider = document.getElementById(`driver-${key}`);
            const valEl = document.getElementById(`driver-val-${key}`);
            if (slider) slider.value = val;
            if (valEl) valEl.textContent = val;
        });
    }

    function setPlayState(isPlaying) {
        const btn = document.getElementById("play-btn");
        if (btn) {
            btn.innerHTML = isPlaying ? '<span class="play-icon">⏸</span> Pause' : '<span class="play-icon">▶</span> Play';
            btn.classList.toggle("playing", isPlaying);
        }
    }

    function updateYear(year) {
        const display = document.getElementById("year-display");
        const slider = document.getElementById("time-slider");
        if (display) display.textContent = year;
        if (slider) slider.value = year;

        // Progress bar
        const progress = ((year - 2025) / (2100 - 2025)) * 100;
        const progressBar = document.getElementById("time-progress");
        if (progressBar) progressBar.style.width = `${progress}%`;
    }

    return { init, updateSliders, setPlayState, updateYear };
})();
