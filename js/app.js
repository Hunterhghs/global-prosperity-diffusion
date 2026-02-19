// ============================================================
// APP.JS — Application orchestrator
// Prosperity Diffusion: 2025–2100
// ============================================================

const App = (() => {
    let isPlaying = false;
    let speed = 500; // ms per year
    let animationInterval = null;

    async function init() {
        // Initialize simulation
        Simulation.init();

        // Initialize map
        await MapViz.init("map-container");

        // Initialize dashboard
        Dashboard.init();

        // Initialize controls
        Controls.init({
            onDriverChange: handleDriverChange,
            onPolicyChange: handlePolicyChange,
            onScenarioChange: handleScenarioChange,
            onRegionChange: handleRegionChange,
            onPlayToggle: handlePlayToggle,
            onSpeedChange: handleSpeedChange,
            onYearChange: handleYearChange
        });

        // Initial render
        MapViz.update();
        Dashboard.update();
        Controls.updateYear(2025);

        // Resize handler
        window.addEventListener("resize", () => {
            MapViz.resize();
        });

        // Loading complete
        document.getElementById("loading-overlay")?.classList.add("hidden");
    }

    function handleDriverChange(key, value) {
        const drivers = Simulation.getDrivers();
        drivers[key] = value;
        Simulation.setDrivers(drivers);
    }

    function handlePolicyChange(key, checked) {
        const policies = Simulation.getPolicies();
        policies[key] = checked;
        Simulation.setPolicies(policies);
    }

    function handleScenarioChange(scenarioKey) {
        const scenario = DATA.scenarios[scenarioKey];
        if (!scenario) return;

        Simulation.setDrivers({ ...scenario.drivers });
        Simulation.setScenarioMultiplier(scenario.policyMultiplier);
        Controls.updateSliders(scenario.drivers);
    }

    function handleRegionChange(region) {
        MapViz.setActiveRegion(region);
    }

    function handlePlayToggle() {
        isPlaying = !isPlaying;
        Controls.setPlayState(isPlaying);

        if (isPlaying) {
            startAnimation();
        } else {
            stopAnimation();
        }
    }

    function handleSpeedChange(newSpeed) {
        speed = newSpeed;
        if (isPlaying) {
            stopAnimation();
            startAnimation();
        }
    }

    function handleYearChange(targetYear) {
        const wasPlaying = isPlaying;
        if (isPlaying) {
            isPlaying = false;
            stopAnimation();
            Controls.setPlayState(false);
        }

        Simulation.resetToYear(targetYear);
        MapViz.update();
        Dashboard.update();
        Controls.updateYear(targetYear);
    }

    function startAnimation() {
        animationInterval = setInterval(() => {
            const continued = Simulation.step();
            if (!continued) {
                isPlaying = false;
                Controls.setPlayState(false);
                stopAnimation();
                return;
            }

            MapViz.update();
            Dashboard.update();
            Controls.updateYear(Simulation.getYear());
        }, speed);
    }

    function stopAnimation() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
    }

    return { init };
})();

// ── Bootstrap ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    App.init();
});
