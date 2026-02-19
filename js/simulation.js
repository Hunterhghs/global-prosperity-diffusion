// ============================================================
// SIMULATION.JS — Core simulation engine
// Prosperity Diffusion: 2025–2100
// ============================================================

const Simulation = (() => {
    let state = {};
    let year = 2025;
    let drivers = { infrastructure: 50, digitalConnectivity: 55, tradeOpenness: 50, institutionalCapacity: 45, humanCapital: 50, demographics: 50 };
    let policies = { education: false, broadband: false, tradeAgreements: false, climateShocks: false, governance: false };
    let scenarioMultiplier = 1.0;

    function init() {
        year = 2025;
        state = {};
        Object.entries(DATA.countries).forEach(([iso, c]) => {
            state[iso] = {
                extremePoverty: c.extremePoverty,
                moderatePoverty: c.moderatePoverty,
                gdpPerCapita: c.gdpPerCapita,
                gini: c.gini,
                agriShare: c.agriShare,
                industryShare: c.industryShare,
                servicesShare: c.servicesShare,
                urbanization: c.urbanization,
                population: c.population,
                employment: { agriculture: c.agriShare * 1.1, industry: c.industryShare * 0.95, services: c.servicesShare * 0.95 }
            };
        });
        // Initialize node strengths
        DATA.growthNodes.forEach(n => { n.currentStrength = n.strength; });
    }

    // ── Driver composite score (0–100) ──────────────────────────
    function driverComposite() {
        const w = { infrastructure: 0.20, digitalConnectivity: 0.20, tradeOpenness: 0.15, institutionalCapacity: 0.20, humanCapital: 0.15, demographics: 0.10 };
        let score = 0;
        for (const k in w) score += (drivers[k] / 100) * w[k];
        return score; // 0–1
    }

    // ── Growth node evolution ───────────────────────────────────
    function evolveNodes() {
        const dc = driverComposite();
        DATA.growthNodes.forEach(node => {
            let growth = 0;
            if (node.type === "core") {
                growth = 0.3 + dc * 0.4;
            } else if (node.type === "regional") {
                growth = 0.5 + dc * 0.8;
            } else {
                growth = 0.8 + dc * 1.5;
            }

            // Policy boosts
            if (policies.broadband) growth += 0.3;
            if (policies.governance) growth += 0.2;

            // Agglomeration effect — stronger nodes grow faster (diminishing returns)
            const agglomeration = Math.log(1 + node.currentStrength / 50) * 0.2;
            growth += agglomeration;

            // Climate shock penalty
            if (policies.climateShocks) growth -= 0.4;

            node.currentStrength = Math.min(100, node.currentStrength + growth * scenarioMultiplier * 0.1);
        });
    }

    // ── Diffusion intensity calculation ─────────────────────────
    function calcDiffusionIntensity(flow) {
        const fromNode = DATA.growthNodes.find(n => n.id === flow.from);
        const toNode = DATA.growthNodes.find(n => n.id === flow.to);
        if (!fromNode || !toNode) return 0;

        let intensity = (fromNode.currentStrength - toNode.currentStrength * 0.3) / 100;

        // Channel-specific multipliers
        flow.channels.forEach(ch => {
            switch (ch) {
                case "trade": intensity *= 1 + (drivers.tradeOpenness / 100) * 0.3; break;
                case "digital": intensity *= 1 + (drivers.digitalConnectivity / 100) * 0.4; break;
                case "fdi": intensity *= 1 + (drivers.institutionalCapacity / 100) * 0.3; break;
                case "migration": intensity *= 1 + (drivers.demographics / 100) * 0.2; break;
                case "infrastructure": intensity *= 1 + (drivers.infrastructure / 100) * 0.35; break;
                case "knowledge": intensity *= 1 + (drivers.humanCapital / 100) * 0.35; break;
            }
        });

        if (policies.tradeAgreements && flow.channels.includes("trade")) intensity *= 1.3;
        if (policies.broadband && flow.channels.includes("digital")) intensity *= 1.4;

        if (flow.intensity === "strong") intensity *= 1.0;
        else if (flow.intensity === "moderate") intensity *= 0.6;
        else intensity *= 0.3;

        return Math.max(0, Math.min(1, intensity * scenarioMultiplier));
    }

    // ── Country poverty reduction model ─────────────────────────
    function stepCountry(iso) {
        const c = state[iso];
        const base = DATA.countries[iso];
        const dc = driverComposite();

        // Find relevant nodes for this country
        let nodeInfluence = 0;
        const region = base.region;
        const regionData = Object.values(DATA.regions).find(r => r.countries && r.countries.includes(iso));
        if (regionData) {
            regionData.nodes.forEach(nid => {
                const node = DATA.growthNodes.find(n => n.id === nid);
                if (node) nodeInfluence += node.currentStrength / 100;
            });
            nodeInfluence = Math.min(1, nodeInfluence / regionData.nodes.length);
        }

        // ── GDP growth ──────────────────────────────────────────
        let gdpGrowthRate;
        if (c.gdpPerCapita < 3000) {
            gdpGrowthRate = 0.02 + dc * 0.06 + nodeInfluence * 0.03;
        } else if (c.gdpPerCapita < 10000) {
            gdpGrowthRate = 0.025 + dc * 0.05 + nodeInfluence * 0.025;
        } else if (c.gdpPerCapita < 25000) {
            gdpGrowthRate = 0.02 + dc * 0.035 + nodeInfluence * 0.02;
        } else {
            gdpGrowthRate = 0.01 + dc * 0.02 + nodeInfluence * 0.01;
        }

        // Policy effects on GDP
        if (policies.education) gdpGrowthRate += 0.008;
        if (policies.broadband) gdpGrowthRate += 0.005;
        if (policies.tradeAgreements) gdpGrowthRate += 0.004;
        if (policies.governance) gdpGrowthRate += 0.006;
        if (policies.climateShocks) gdpGrowthRate -= 0.015;

        gdpGrowthRate *= scenarioMultiplier;
        gdpGrowthRate = Math.max(-0.02, gdpGrowthRate);
        c.gdpPerCapita *= (1 + gdpGrowthRate);

        // ── Poverty reduction ───────────────────────────────────
        // Poverty elasticity of growth (varies by initial poverty level and inequality)
        const povertyElasticity = -(1.5 + dc * 1.2) * (1 - c.gini / 120);
        const extremeReduction = gdpGrowthRate * povertyElasticity * (c.extremePoverty > 1 ? 1 : 0.3);
        const moderateReduction = gdpGrowthRate * povertyElasticity * 0.7 * (c.moderatePoverty > 2 ? 1 : 0.3);

        c.extremePoverty = Math.max(0, c.extremePoverty + c.extremePoverty * extremeReduction);
        c.moderatePoverty = Math.max(0, c.moderatePoverty + c.moderatePoverty * moderateReduction);

        // Floor effects — poverty cannot go below certain thresholds easily
        if (c.extremePoverty < 0.5) c.extremePoverty *= 0.97;
        if (c.moderatePoverty < 2) c.moderatePoverty *= 0.98;

        // ── Inequality dynamics ─────────────────────────────────
        let giniChange = 0;
        if (gdpGrowthRate > 0.04) giniChange += 0.1; // Rapid growth can increase inequality initially
        if (policies.education) giniChange -= 0.15;
        if (policies.governance) giniChange -= 0.1;
        if (c.gdpPerCapita > 15000) giniChange -= 0.08; // Kuznets curve descent
        if (c.gdpPerCapita < 5000 && gdpGrowthRate > 0.03) giniChange += 0.05; // Kuznets ascent
        c.gini = Math.max(20, Math.min(65, c.gini + giniChange));

        // ── Structural transformation ───────────────────────────
        const transformRate = (dc * 0.3 + nodeInfluence * 0.2) * scenarioMultiplier;
        if (c.agriShare > 5) {
            const agriDecline = Math.min(c.agriShare - 3, transformRate * 0.5);
            c.agriShare -= agriDecline;
            c.industryShare += agriDecline * 0.4;
            c.servicesShare += agriDecline * 0.6;
        }
        if (c.gdpPerCapita > 15000 && c.industryShare > 20) {
            const deindustrialize = transformRate * 0.15;
            c.industryShare -= deindustrialize;
            c.servicesShare += deindustrialize;
        }

        // Normalize shares
        const total = c.agriShare + c.industryShare + c.servicesShare;
        c.agriShare = (c.agriShare / total) * 100;
        c.industryShare = (c.industryShare / total) * 100;
        c.servicesShare = (c.servicesShare / total) * 100;

        // ── Employment shifts ───────────────────────────────────
        c.employment.agriculture = Math.max(3, c.agriShare * 1.1);
        c.employment.industry = c.industryShare * 0.95;
        c.employment.services = 100 - c.employment.agriculture - c.employment.industry;

        // ── Urbanization ────────────────────────────────────────
        let urbanGrowth = 0.2 + gdpGrowthRate * 3 + nodeInfluence * 0.3;
        urbanGrowth *= scenarioMultiplier;
        if (c.urbanization > 80) urbanGrowth *= 0.2;
        else if (c.urbanization > 60) urbanGrowth *= 0.5;
        c.urbanization = Math.min(95, c.urbanization + urbanGrowth * 0.1);
    }

    // ── Main simulation step ────────────────────────────────────
    function step() {
        if (year >= 2100) return false;
        year++;

        evolveNodes();

        // Calculate all diffusion intensities (for visualization)
        DATA.diffusionFlows.forEach(f => {
            f.currentIntensity = calcDiffusionIntensity(f);
        });

        // Step each country
        Object.keys(state).forEach(iso => stepCountry(iso));

        return true;
    }

    // ── Aggregate metrics ───────────────────────────────────────
    function getGlobalMetrics() {
        let totalPop = 0, weightedExtreme = 0, weightedModerate = 0, weightedGini = 0, weightedGDP = 0;
        let weightedAgri = 0, weightedIndustry = 0, weightedServices = 0, weightedUrban = 0;

        Object.entries(state).forEach(([iso, c]) => {
            const pop = c.population;
            totalPop += pop;
            weightedExtreme += c.extremePoverty * pop;
            weightedModerate += c.moderatePoverty * pop;
            weightedGini += c.gini * pop;
            weightedGDP += c.gdpPerCapita * pop;
            weightedAgri += c.agriShare * pop;
            weightedIndustry += c.industryShare * pop;
            weightedServices += c.servicesShare * pop;
            weightedUrban += c.urbanization * pop;
        });

        return {
            extremePoverty: (weightedExtreme / totalPop).toFixed(1),
            moderatePoverty: (weightedModerate / totalPop).toFixed(1),
            gini: (weightedGini / totalPop).toFixed(1),
            gdpPerCapita: Math.round(weightedGDP / totalPop),
            agriShare: (weightedAgri / totalPop).toFixed(1),
            industryShare: (weightedIndustry / totalPop).toFixed(1),
            servicesShare: (weightedServices / totalPop).toFixed(1),
            urbanization: (weightedUrban / totalPop).toFixed(1)
        };
    }

    function getRegionalMetrics(regionName) {
        const regionData = DATA.regions[regionName];
        if (!regionData) return null;

        let totalPop = 0, weightedExtreme = 0, weightedModerate = 0, weightedGDP = 0, weightedGini = 0;
        regionData.countries.forEach(iso => {
            const c = state[iso];
            if (c) {
                totalPop += c.population;
                weightedExtreme += c.extremePoverty * c.population;
                weightedModerate += c.moderatePoverty * c.population;
                weightedGDP += c.gdpPerCapita * c.population;
                weightedGini += c.gini * c.population;
            }
        });

        if (totalPop === 0) return null;
        return {
            extremePoverty: (weightedExtreme / totalPop).toFixed(1),
            moderatePoverty: (weightedModerate / totalPop).toFixed(1),
            gdpPerCapita: Math.round(weightedGDP / totalPop),
            gini: (weightedGini / totalPop).toFixed(1)
        };
    }

    return {
        init,
        step,
        getYear: () => year,
        getState: () => state,
        getGlobalMetrics,
        getRegionalMetrics,
        setDrivers: (d) => { drivers = { ...drivers, ...d }; },
        getDrivers: () => ({ ...drivers }),
        setPolicies: (p) => { policies = { ...policies, ...p }; },
        getPolicies: () => ({ ...policies }),
        setScenarioMultiplier: (m) => { scenarioMultiplier = m; },
        setYear: (y) => { year = y; },
        resetToYear: (targetYear) => {
            init();
            while (year < targetYear) { step(); }
        }
    };
})();
