// ============================================================
// MAP.JS — D3 world map visualization
// Prosperity Diffusion: 2025–2100
// ============================================================

const MapViz = (() => {
    let svg, g, projection, path, tooltip;
    let width, height;
    let activeRegion = null;
    let worldData = null;
    let particleTimer = null;

    // Threshold-based poverty color scale with clear breakpoints
    // Uses blended poverty index: 40% extreme + 60% moderate
    // < 5%  → Deep Green  (very low poverty — high-income nations)
    // 5-10% → Green       (low poverty)
    // 10-20%→ Lime/Yellow-green (emerging middle income)
    // 20-30%→ Yellow      (moderate poverty)
    // 30-50%→ Orange      (high poverty)
    // 50-70%→ Dark Orange  (very high poverty)
    // 70%+  → Deep Red    (extreme poverty crisis)
    const povertyColorScale = d3.scaleThreshold()
        .domain([5, 10, 20, 30, 50, 70])
        .range(["#00C853", "#4CAF50", "#8BC34A", "#FDD835", "#FF9800", "#F44336", "#B71C1C"]);

    const nodeColors = { core: "#00E5FF", regional: "#FFD740", emerging: "#FF6E40" };
    const nodeRadii = { core: 7, regional: 5.5, emerging: 4 };
    const flowColors = { strong: "#00E5FF", moderate: "#FFD740", weak: "#FF6E40" };

    async function init(containerId) {
        const container = document.getElementById(containerId);
        width = container.clientWidth;
        height = container.clientHeight;

        svg = d3.select(`#${containerId}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`);

        // Defs for gradients and filters
        const defs = svg.append("defs");

        // Glow filter
        const glow = defs.append("filter").attr("id", "glow");
        glow.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
        const feMerge = glow.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        // Node pulse filter
        const pulse = defs.append("filter").attr("id", "nodePulse");
        pulse.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur");
        const feMerge2 = pulse.append("feMerge");
        feMerge2.append("feMergeNode").attr("in", "blur");
        feMerge2.append("feMergeNode").attr("in", "SourceGraphic");

        projection = d3.geoNaturalEarth1()
            .scale(width / 5.5)
            .translate([width / 2, height / 2]);

        path = d3.geoPath().projection(projection);

        g = svg.append("g");

        // Layers
        g.append("g").attr("class", "countries-layer");
        g.append("g").attr("class", "region-highlights-layer");
        g.append("g").attr("class", "flows-layer");
        g.append("g").attr("class", "nodes-layer");

        // Tooltip
        tooltip = d3.select("body").append("div")
            .attr("class", "map-tooltip")
            .style("opacity", 0);

        // Zoom
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });
        svg.call(zoom);

        // Load world topology
        try {
            const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
            worldData = await response.json();
            drawCountries();
        } catch (e) {
            console.error("Failed to load world map data:", e);
        }
    }

    function drawCountries() {
        if (!worldData) return;
        const countries = topojson.feature(worldData, worldData.objects.countries);

        g.select(".countries-layer").selectAll("path")
            .data(countries.features)
            .join("path")
            .attr("d", path)
            .attr("class", "country")
            .attr("fill", d => getCountryColor(d))
            .attr("stroke", "rgba(255,255,255,0.08)")
            .attr("stroke-width", 0.5)
            .on("mouseenter", (event, d) => showTooltip(event, d))
            .on("mouseleave", () => hideTooltip())
            .on("mousemove", (event) => moveTooltip(event));
    }

    // Map numeric country IDs to ISO3 codes
    const numericToISO = {
        4: "AFG", 8: "ALB", 12: "DZA", 24: "AGO", 32: "ARG", 36: "AUS", 40: "AUT",
        50: "BGD", 56: "BEL", 68: "BOL", 76: "BRA", 100: "BGR", 104: "MMR",
        116: "KHM", 120: "CMR", 124: "CAN", 144: "LKA", 152: "CHL", 156: "CHN",
        170: "COL", 178: "COG", 180: "COD", 188: "CRI", 191: "HRV", 192: "CUB",
        203: "CZE", 204: "BEN", 208: "DNK", 214: "DOM", 218: "ECU", 818: "EGY",
        222: "SLV", 231: "ETH", 242: "FJI", 246: "FIN", 250: "FRA", 266: "GAB",
        276: "DEU", 288: "GHA", 300: "GRC", 320: "GTM", 324: "GIN", 328: "GUY",
        332: "HTI", 340: "HND", 348: "HUN", 352: "ISL", 356: "IND", 360: "IDN",
        364: "IRN", 368: "IRQ", 372: "IRL", 376: "ISR", 380: "ITA", 384: "CIV",
        388: "JAM", 392: "JPN", 398: "KAZ", 404: "KEN", 408: "PRK", 410: "KOR",
        414: "KWT", 418: "LAO", 422: "LBN", 426: "LSO", 430: "LBR", 434: "LBY",
        450: "MDG", 454: "MWI", 458: "MYS", 466: "MLI", 478: "MRT",
        484: "MEX", 496: "MNG", 504: "MAR", 508: "MOZ", 516: "NAM", 524: "NPL",
        528: "NLD", 540: "NCL", 554: "NZL", 558: "NIC", 562: "NER", 566: "NGA",
        578: "NOR", 586: "PAK", 591: "PAN", 598: "PNG", 600: "PRY", 604: "PER",
        608: "PHL", 616: "POL", 620: "PRT", 630: "PRI", 634: "QAT",
        642: "ROU", 643: "RUS", 646: "RWA", 682: "SAU", 686: "SEN", 694: "SLE",
        702: "SGP", 703: "SVK", 704: "VNM", 705: "SVN", 706: "SOM",
        710: "ZAF", 716: "ZWE", 724: "ESP", 728: "SSD", 729: "SDN", 740: "SUR",
        748: "SWZ", 752: "SWE", 756: "CHE", 760: "SYR", 762: "TJK",
        764: "THA", 768: "TGO", 780: "TTO", 788: "TUN", 792: "TUR",
        800: "UGA", 804: "UKR", 818: "EGY", 826: "GBR", 834: "TZA",
        840: "USA", 854: "BFA", 858: "URY", 860: "UZB", 862: "VEN",
        887: "YEM", 894: "ZMB"
    };

    function getISO3(feature) {
        const id = parseInt(feature.id) || parseInt(feature.properties?.id);
        return numericToISO[id] || null;
    }

    function getCountryColor(feature) {
        const iso = getISO3(feature);
        if (!iso) return "#1a2332";
        const simState = Simulation.getState()[iso];
        if (!simState) return "#1a2332";
        // Blended poverty index: 40% extreme + 60% moderate for fuller picture
        const povertyIndex = simState.extremePoverty * 0.4 + simState.moderatePoverty * 0.6;
        return povertyColorScale(povertyIndex);
    }

    function showTooltip(event, d) {
        const iso = getISO3(d);
        const baseData = iso ? DATA.countries[iso] : null;
        const simState = iso ? Simulation.getState()[iso] : null;

        let content = "";
        if (baseData && simState) {
            content = `
        <div class="tooltip-title">${baseData.name}</div>
        <div class="tooltip-year">Year: ${Simulation.getYear()}</div>
        <div class="tooltip-grid">
          <span>Extreme Poverty:</span><span class="tooltip-val">${simState.extremePoverty.toFixed(1)}%</span>
          <span>Moderate Poverty:</span><span class="tooltip-val">${simState.moderatePoverty.toFixed(1)}%</span>
          <span>GDP/capita (PPP):</span><span class="tooltip-val">$${Math.round(simState.gdpPerCapita).toLocaleString()}</span>
          <span>Gini:</span><span class="tooltip-val">${simState.gini.toFixed(1)}</span>
          <span>Urbanization:</span><span class="tooltip-val">${simState.urbanization.toFixed(1)}%</span>
          <span>Structure:</span><span class="tooltip-val">${simState.agriShare.toFixed(0)}/${simState.industryShare.toFixed(0)}/${simState.servicesShare.toFixed(0)}</span>
        </div>
      `;
        } else {
            const name = d.properties?.name || "Unknown";
            content = `<div class="tooltip-title">${name}</div><div class="tooltip-year">No data available</div>`;
        }

        tooltip.html(content)
            .style("opacity", 1)
            .style("left", (event.pageX + 14) + "px")
            .style("top", (event.pageY - 10) + "px");
    }

    function hideTooltip() {
        tooltip.style("opacity", 0);
    }

    function moveTooltip(event) {
        tooltip.style("left", (event.pageX + 14) + "px")
            .style("top", (event.pageY - 10) + "px");
    }

    // ── Update map state ────────────────────────────────────────
    function update() {
        if (!worldData) return;

        // Update country fills
        g.select(".countries-layer").selectAll("path")
            .transition().duration(150)
            .attr("fill", d => getCountryColor(d));

        drawNodes();
        drawFlows();
        drawRegionHighlights();
    }

    // ── Growth Nodes ────────────────────────────────────────────
    function drawNodes() {
        const nodes = g.select(".nodes-layer").selectAll(".growth-node")
            .data(DATA.growthNodes, d => d.id);

        const enter = nodes.enter().append("g")
            .attr("class", "growth-node")
            .attr("transform", d => `translate(${projection([d.lng, d.lat])})`);

        // Outer glow ring
        enter.append("circle")
            .attr("class", "node-glow")
            .attr("r", d => nodeRadii[d.type] * 2)
            .attr("fill", "none")
            .attr("stroke", d => nodeColors[d.type])
            .attr("stroke-width", 1)
            .attr("opacity", 0.3)
            .attr("filter", "url(#glow)");

        // Main circle
        enter.append("circle")
            .attr("class", "node-main")
            .attr("r", d => nodeRadii[d.type])
            .attr("fill", d => nodeColors[d.type])
            .attr("opacity", 0.85)
            .attr("filter", "url(#nodePulse)");

        // Label
        enter.append("text")
            .attr("class", "node-label")
            .attr("dy", d => -(nodeRadii[d.type] + 6))
            .attr("text-anchor", "middle")
            .attr("fill", "rgba(255,255,255,0.7)")
            .attr("font-size", "8px")
            .attr("font-family", "Inter, sans-serif")
            .text(d => d.name);

        // Update
        const all = enter.merge(nodes);

        all.select(".node-main")
            .transition().duration(200)
            .attr("r", d => nodeRadii[d.type] * (0.7 + d.currentStrength / 250));

        all.select(".node-glow")
            .transition().duration(200)
            .attr("r", d => nodeRadii[d.type] * 2 * (0.7 + d.currentStrength / 250))
            .attr("opacity", d => 0.15 + d.currentStrength / 400);
    }

    // ── Diffusion Flows ─────────────────────────────────────────
    function drawFlows() {
        const flows = DATA.diffusionFlows.filter(f => f.currentIntensity > 0.05);

        const flowPaths = g.select(".flows-layer").selectAll(".flow-path")
            .data(flows, d => `${d.from}-${d.to}`);

        flowPaths.exit().remove();

        const enter = flowPaths.enter().append("path")
            .attr("class", "flow-path");

        enter.merge(flowPaths)
            .attr("d", d => {
                const fromNode = DATA.growthNodes.find(n => n.id === d.from);
                const toNode = DATA.growthNodes.find(n => n.id === d.to);
                if (!fromNode || !toNode) return "";
                const s = projection([fromNode.lng, fromNode.lat]);
                const e = projection([toNode.lng, toNode.lat]);
                const mid = [(s[0] + e[0]) / 2, (s[1] + e[1]) / 2 - Math.abs(s[0] - e[0]) * 0.15];
                return `M${s[0]},${s[1]} Q${mid[0]},${mid[1]} ${e[0]},${e[1]}`;
            })
            .attr("stroke", d => flowColors[d.intensity])
            .attr("stroke-width", d => 0.5 + (d.currentIntensity || 0) * 2.5)
            .attr("fill", "none")
            .attr("opacity", d => 0.15 + (d.currentIntensity || 0) * 0.5)
            .attr("stroke-dasharray", d => d.intensity === "weak" ? "4,4" : d.intensity === "moderate" ? "8,3" : "none")
            .attr("filter", "url(#glow)");

        // Animated particles along flows
        drawParticles(flows);
    }

    function drawParticles(flows) {
        const particleData = flows.filter(f => (f.currentIntensity || 0) > 0.15);

        const particles = g.select(".flows-layer").selectAll(".flow-particle")
            .data(particleData, d => `p-${d.from}-${d.to}`);

        particles.exit().remove();

        const enter = particles.enter().append("circle")
            .attr("class", "flow-particle")
            .attr("r", 1.5)
            .attr("fill", d => flowColors[d.intensity])
            .attr("opacity", 0.8);

        enter.merge(particles).each(function (d) {
            const fromNode = DATA.growthNodes.find(n => n.id === d.from);
            const toNode = DATA.growthNodes.find(n => n.id === d.to);
            if (!fromNode || !toNode) return;

            const s = projection([fromNode.lng, fromNode.lat]);
            const e = projection([toNode.lng, toNode.lat]);
            const el = d3.select(this);

            function animate() {
                const duration = 2000 + Math.random() * 2000;
                el.attr("cx", s[0]).attr("cy", s[1]).attr("opacity", 0.8)
                    .transition().duration(duration).ease(d3.easeLinear)
                    .attrTween("cx", () => {
                        const mid = (s[0] + e[0]) / 2;
                        return t => s[0] + (mid - s[0]) * 2 * t * (1 - t) + (e[0] - s[0]) * t * t + (t > 0.5 ? (e[0] - mid) * 2 * (t - 0.5) * (t - 0.5) : 0);
                    })
                    .attrTween("cy", () => {
                        const midY = (s[1] + e[1]) / 2 - Math.abs(s[0] - e[0]) * 0.15;
                        return t => s[1] + (midY - s[1]) * 2 * t * (1 - t) + (e[1] - s[1]) * t * t + (t > 0.5 ? (e[1] - midY) * 2 * (t - 0.5) * (t - 0.5) : 0);
                    })
                    .attr("opacity", t => t > 0.8 ? 0 : 0.8)
                    .on("end", animate);
            }
            animate();
        });
    }

    // ── Region Highlights ───────────────────────────────────────
    function drawRegionHighlights() {
        if (!activeRegion || !worldData) {
            g.select(".region-highlights-layer").selectAll("*").remove();
            return;
        }

        const regionData = DATA.regions[activeRegion];
        if (!regionData) return;

        const countries = topojson.feature(worldData, worldData.objects.countries);
        const regionFeatures = countries.features.filter(f => {
            const iso = getISO3(f);
            return iso && regionData.countries.includes(iso);
        });

        const highlights = g.select(".region-highlights-layer").selectAll(".region-highlight")
            .data(regionFeatures, d => d.id);

        highlights.exit().remove();

        highlights.enter().append("path")
            .attr("class", "region-highlight")
            .attr("d", path)
            .attr("fill", "none")
            .attr("stroke", regionData.color)
            .attr("stroke-width", 2)
            .attr("opacity", 0.7)
            .attr("filter", "url(#glow)");
    }

    function setActiveRegion(region) {
        activeRegion = region;
        drawRegionHighlights();
    }

    function resize() {
        const container = svg.node().parentElement;
        width = container.clientWidth;
        height = container.clientHeight;
        svg.attr("width", width).attr("height", height).attr("viewBox", `0 0 ${width} ${height}`);
        projection.scale(width / 5.5).translate([width / 2, height / 2]);
        if (worldData) {
            g.select(".countries-layer").selectAll("path").attr("d", path);
            drawRegionHighlights();
        }
    }

    return { init, update, setActiveRegion, resize };
})();
