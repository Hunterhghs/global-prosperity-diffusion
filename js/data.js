// ============================================================
// DATA.JS — Embedded datasets calibrated from World Bank, IMF, UN, OECD
// Prosperity Diffusion: 2025–2100
// ============================================================

const DATA = (() => {

  // ── Country-level baseline data (2025 calibration) ──────────────
  // Sources: World Bank PovcalNet, IMF WEO, UN Population Division
  // extremePoverty: % living on < $2.15/day (2017 PPP)
  // moderatePoverty: % living on < $6.85/day (2017 PPP)
  // gdpPerCapita: GDP per capita PPP (current international $)
  // gini: Gini coefficient (0–100)
  // agriShare / industryShare / servicesShare: % of GDP
  // urbanization: % urban population
  // region: for regional filtering
  const countries = {
    "NGA": { name: "Nigeria", lat: 9.08, lng: 7.49, extremePoverty: 30.9, moderatePoverty: 71.0, gdpPerCapita: 5860, gini: 35.1, agriShare: 23, industryShare: 28, servicesShare: 49, urbanization: 54, population: 230, region: "Sub-Saharan Africa" },
    "ETH": { name: "Ethiopia", lat: 9.02, lng: 38.75, extremePoverty: 26.7, moderatePoverty: 78.2, gdpPerCapita: 3120, gini: 35.0, agriShare: 33, industryShare: 27, servicesShare: 40, urbanization: 23, population: 130, region: "Sub-Saharan Africa" },
    "COD": { name: "DR Congo", lat: -4.32, lng: 15.31, extremePoverty: 64.7, moderatePoverty: 91.0, gdpPerCapita: 1200, gini: 42.1, agriShare: 19, industryShare: 36, servicesShare: 45, urbanization: 47, population: 110, region: "Sub-Saharan Africa" },
    "TZA": { name: "Tanzania", lat: -6.16, lng: 35.75, extremePoverty: 44.9, moderatePoverty: 84.2, gdpPerCapita: 3200, gini: 40.5, agriShare: 26, industryShare: 28, servicesShare: 46, urbanization: 37, population: 67, region: "Sub-Saharan Africa" },
    "KEN": { name: "Kenya", lat: -1.29, lng: 36.82, extremePoverty: 29.4, moderatePoverty: 73.4, gdpPerCapita: 5970, gini: 40.8, agriShare: 22, industryShare: 17, servicesShare: 61, urbanization: 29, population: 56, region: "Sub-Saharan Africa" },
    "GHA": { name: "Ghana", lat: 5.55, lng: -0.2, extremePoverty: 23.4, moderatePoverty: 63.8, gdpPerCapita: 6500, gini: 43.5, agriShare: 19, industryShare: 30, servicesShare: 51, urbanization: 59, population: 34, region: "Sub-Saharan Africa" },
    "ZAF": { name: "South Africa", lat: -25.75, lng: 28.19, extremePoverty: 18.9, moderatePoverty: 45.5, gdpPerCapita: 16100, gini: 63.0, agriShare: 2, industryShare: 26, servicesShare: 72, urbanization: 68, population: 60, region: "Sub-Saharan Africa" },
    "MOZ": { name: "Mozambique", lat: -25.97, lng: 32.58, extremePoverty: 62.9, moderatePoverty: 90.1, gdpPerCapita: 1400, gini: 54.0, agriShare: 26, industryShare: 22, servicesShare: 52, urbanization: 38, population: 33, region: "Sub-Saharan Africa" },
    "SEN": { name: "Senegal", lat: 14.69, lng: -17.44, extremePoverty: 9.1, moderatePoverty: 64.3, gdpPerCapita: 4050, gini: 40.3, agriShare: 16, industryShare: 27, servicesShare: 57, urbanization: 49, population: 18, region: "Sub-Saharan Africa" },
    "UGA": { name: "Uganda", lat: 0.31, lng: 32.58, extremePoverty: 30.1, moderatePoverty: 78.9, gdpPerCapita: 2800, gini: 42.7, agriShare: 24, industryShare: 27, servicesShare: 49, urbanization: 26, population: 49, region: "Sub-Saharan Africa" },
    "RWA": { name: "Rwanda", lat: -1.94, lng: 29.87, extremePoverty: 52.0, moderatePoverty: 87.1, gdpPerCapita: 2700, gini: 43.7, agriShare: 25, industryShare: 20, servicesShare: 55, urbanization: 18, population: 14, region: "Sub-Saharan Africa" },

    "IND": { name: "India", lat: 28.61, lng: 77.21, extremePoverty: 12.0, moderatePoverty: 60.8, gdpPerCapita: 9500, gini: 35.7, agriShare: 17, industryShare: 26, servicesShare: 57, urbanization: 36, population: 1440, region: "South Asia" },
    "BGD": { name: "Bangladesh", lat: 23.81, lng: 90.41, extremePoverty: 5.0, moderatePoverty: 52.3, gdpPerCapita: 7800, gini: 32.4, agriShare: 11, industryShare: 35, servicesShare: 54, urbanization: 40, population: 175, region: "South Asia" },
    "PAK": { name: "Pakistan", lat: 33.69, lng: 73.04, extremePoverty: 4.9, moderatePoverty: 57.2, gdpPerCapita: 6400, gini: 29.6, agriShare: 22, industryShare: 19, servicesShare: 59, urbanization: 37, population: 240, region: "South Asia" },
    "NPL": { name: "Nepal", lat: 27.72, lng: 85.32, extremePoverty: 3.9, moderatePoverty: 48.3, gdpPerCapita: 4600, gini: 32.8, agriShare: 23, industryShare: 13, servicesShare: 64, urbanization: 22, population: 31, region: "South Asia" },
    "LKA": { name: "Sri Lanka", lat: 6.93, lng: 79.85, extremePoverty: 1.0, moderatePoverty: 17.4, gdpPerCapita: 14400, gini: 39.3, agriShare: 8, industryShare: 26, servicesShare: 61, urbanization: 19, population: 22, region: "South Asia" },
    "MMR": { name: "Myanmar", lat: 16.87, lng: 96.2, extremePoverty: 6.2, moderatePoverty: 57.1, gdpPerCapita: 4800, gini: 30.7, agriShare: 22, industryShare: 35, servicesShare: 43, urbanization: 32, population: 55, region: "South Asia" },

    "IDN": { name: "Indonesia", lat: -6.21, lng: 106.85, extremePoverty: 3.6, moderatePoverty: 40.6, gdpPerCapita: 14900, gini: 37.9, agriShare: 13, industryShare: 39, servicesShare: 48, urbanization: 58, population: 280, region: "Southeast Asia" },
    "VNM": { name: "Vietnam", lat: 21.03, lng: 105.85, extremePoverty: 1.2, moderatePoverty: 17.8, gdpPerCapita: 13900, gini: 36.8, agriShare: 12, industryShare: 38, servicesShare: 50, urbanization: 39, population: 100, region: "Southeast Asia" },
    "PHL": { name: "Philippines", lat: 14.6, lng: 120.98, extremePoverty: 5.5, moderatePoverty: 42.6, gdpPerCapita: 10700, gini: 42.3, agriShare: 10, industryShare: 29, servicesShare: 61, urbanization: 48, population: 117, region: "Southeast Asia" },
    "THA": { name: "Thailand", lat: 13.76, lng: 100.5, extremePoverty: 0.1, moderatePoverty: 5.4, gdpPerCapita: 20900, gini: 34.9, agriShare: 8, industryShare: 33, servicesShare: 59, urbanization: 53, population: 72, region: "Southeast Asia" },
    "KHM": { name: "Cambodia", lat: 11.56, lng: 104.92, extremePoverty: 16.6, moderatePoverty: 70.2, gdpPerCapita: 5500, gini: 37.9, agriShare: 22, industryShare: 37, servicesShare: 41, urbanization: 25, population: 17, region: "Southeast Asia" },
    "MYS": { name: "Malaysia", lat: 3.14, lng: 101.69, extremePoverty: 0.0, moderatePoverty: 2.5, gdpPerCapita: 34600, gini: 41.1, agriShare: 8, industryShare: 37, servicesShare: 55, urbanization: 78, population: 34, region: "Southeast Asia" },

    "BRA": { name: "Brazil", lat: -15.79, lng: -47.88, extremePoverty: 5.4, moderatePoverty: 24.4, gdpPerCapita: 17000, gini: 53.4, agriShare: 7, industryShare: 20, servicesShare: 73, urbanization: 88, population: 216, region: "Latin America" },
    "MEX": { name: "Mexico", lat: 19.43, lng: -99.13, extremePoverty: 3.6, moderatePoverty: 24.7, gdpPerCapita: 22100, gini: 45.4, agriShare: 4, industryShare: 31, servicesShare: 65, urbanization: 81, population: 130, region: "Latin America" },
    "COL": { name: "Colombia", lat: 4.71, lng: -74.07, extremePoverty: 6.2, moderatePoverty: 28.3, gdpPerCapita: 18400, gini: 51.3, agriShare: 7, industryShare: 26, servicesShare: 67, urbanization: 82, population: 52, region: "Latin America" },
    "PER": { name: "Peru", lat: -12.05, lng: -77.04, extremePoverty: 3.6, moderatePoverty: 23.4, gdpPerCapita: 15200, gini: 41.5, agriShare: 7, industryShare: 32, servicesShare: 61, urbanization: 79, population: 34, region: "Latin America" },
    "GTM": { name: "Guatemala", lat: 14.63, lng: -90.51, extremePoverty: 8.7, moderatePoverty: 48.1, gdpPerCapita: 10200, gini: 48.3, agriShare: 10, industryShare: 24, servicesShare: 66, urbanization: 52, population: 18, region: "Latin America" },
    "BOL": { name: "Bolivia", lat: -16.5, lng: -68.15, extremePoverty: 3.2, moderatePoverty: 22.8, gdpPerCapita: 9300, gini: 42.2, agriShare: 13, industryShare: 31, servicesShare: 56, urbanization: 71, population: 12, region: "Latin America" },
    "HND": { name: "Honduras", lat: 14.07, lng: -87.22, extremePoverty: 14.8, moderatePoverty: 52.1, gdpPerCapita: 6300, gini: 48.2, agriShare: 12, industryShare: 28, servicesShare: 60, urbanization: 59, population: 10, region: "Latin America" },

    "CHN": { name: "China", lat: 39.9, lng: 116.4, extremePoverty: 0.1, moderatePoverty: 6.3, gdpPerCapita: 23400, gini: 38.2, agriShare: 7, industryShare: 39, servicesShare: 54, urbanization: 65, population: 1410, region: "East Asia" },
    "JPN": { name: "Japan", lat: 35.68, lng: 139.69, extremePoverty: 0.0, moderatePoverty: 0.4, gdpPerCapita: 48800, gini: 32.9, agriShare: 1, industryShare: 29, servicesShare: 70, urbanization: 92, population: 124, region: "East Asia" },
    "KOR": { name: "South Korea", lat: 37.57, lng: 126.98, extremePoverty: 0.0, moderatePoverty: 0.3, gdpPerCapita: 53600, gini: 31.4, agriShare: 2, industryShare: 33, servicesShare: 65, urbanization: 82, population: 52, region: "East Asia" },

    "USA": { name: "United States", lat: 38.91, lng: -77.04, extremePoverty: 0.0, moderatePoverty: 1.2, gdpPerCapita: 80400, gini: 39.8, agriShare: 1, industryShare: 18, servicesShare: 81, urbanization: 83, population: 340, region: "High Income" },
    "DEU": { name: "Germany", lat: 52.52, lng: 13.41, extremePoverty: 0.0, moderatePoverty: 0.3, gdpPerCapita: 63200, gini: 31.7, agriShare: 1, industryShare: 27, servicesShare: 72, urbanization: 78, population: 84, region: "High Income" },
    "GBR": { name: "United Kingdom", lat: 51.51, lng: -0.13, extremePoverty: 0.0, moderatePoverty: 0.4, gdpPerCapita: 55500, gini: 35.1, agriShare: 1, industryShare: 18, servicesShare: 81, urbanization: 84, population: 68, region: "High Income" },
    "FRA": { name: "France", lat: 48.86, lng: 2.35, extremePoverty: 0.0, moderatePoverty: 0.3, gdpPerCapita: 56400, gini: 32.4, agriShare: 2, industryShare: 17, servicesShare: 81, urbanization: 82, population: 68, region: "High Income" },
    "CAN": { name: "Canada", lat: 45.42, lng: -75.7, extremePoverty: 0.0, moderatePoverty: 0.3, gdpPerCapita: 57400, gini: 33.3, agriShare: 2, industryShare: 25, servicesShare: 73, urbanization: 82, population: 39, region: "High Income" },
    "AUS": { name: "Australia", lat: -35.28, lng: 149.13, extremePoverty: 0.0, moderatePoverty: 0.4, gdpPerCapita: 65100, gini: 34.4, agriShare: 2, industryShare: 25, servicesShare: 73, urbanization: 87, population: 26, region: "High Income" },

    "TUR": { name: "Turkey", lat: 39.93, lng: 32.85, extremePoverty: 0.4, moderatePoverty: 8.5, gdpPerCapita: 37400, gini: 41.9, agriShare: 6, industryShare: 29, servicesShare: 65, urbanization: 77, population: 86, region: "Middle Income" },
    "EGY": { name: "Egypt", lat: 30.04, lng: 31.24, extremePoverty: 3.8, moderatePoverty: 47.2, gdpPerCapita: 15200, gini: 31.5, agriShare: 11, industryShare: 34, servicesShare: 55, urbanization: 43, population: 110, region: "Middle East & North Africa" },
    "SAU": { name: "Saudi Arabia", lat: 24.77, lng: 46.74, extremePoverty: 0.0, moderatePoverty: 0.5, gdpPerCapita: 59100, gini: 45.9, agriShare: 2, industryShare: 45, servicesShare: 53, urbanization: 85, population: 37, region: "Middle East & North Africa" },
    "RUS": { name: "Russia", lat: 55.76, lng: 37.62, extremePoverty: 0.0, moderatePoverty: 3.5, gdpPerCapita: 34100, gini: 36.0, agriShare: 4, industryShare: 33, servicesShare: 63, urbanization: 75, population: 144, region: "Europe & Central Asia" },
    "POL": { name: "Poland", lat: 52.23, lng: 21.01, extremePoverty: 0.0, moderatePoverty: 0.8, gdpPerCapita: 45700, gini: 29.7, agriShare: 2, industryShare: 29, servicesShare: 69, urbanization: 60, population: 37, region: "Europe & Central Asia" },
    "ARG": { name: "Argentina", lat: -34.6, lng: -58.38, extremePoverty: 4.0, moderatePoverty: 17.9, gdpPerCapita: 26500, gini: 42.3, agriShare: 6, industryShare: 23, servicesShare: 71, urbanization: 92, population: 46, region: "Latin America" },
    "AGO": { name: "Angola", lat: -8.84, lng: 13.23, extremePoverty: 32.3, moderatePoverty: 72.6, gdpPerCapita: 7300, gini: 51.3, agriShare: 8, industryShare: 49, servicesShare: 43, urbanization: 69, population: 36, region: "Sub-Saharan Africa" },
    "MDG": { name: "Madagascar", lat: -18.88, lng: 47.51, extremePoverty: 77.6, moderatePoverty: 95.5, gdpPerCapita: 1700, gini: 42.6, agriShare: 24, industryShare: 19, servicesShare: 57, urbanization: 40, population: 30, region: "Sub-Saharan Africa" },
    "MWI": { name: "Malawi", lat: -13.96, lng: 33.79, extremePoverty: 70.1, moderatePoverty: 93.4, gdpPerCapita: 1600, gini: 44.7, agriShare: 23, industryShare: 16, servicesShare: 61, urbanization: 18, population: 21, region: "Sub-Saharan Africa" },
  };

  // ── Growth Nodes ──────────────────────────────────────────────
  // type: "core" (global innovation centers), "regional" (emerging tech hubs), "emerging" (frontier innovation)
  const growthNodes = [
    // Core hubs
    { id: "sf", name: "San Francisco", lat: 37.77, lng: -122.42, type: "core", strength: 100, specialization: "Tech & AI" },
    { id: "ny", name: "New York", lat: 40.71, lng: -74.01, type: "core", strength: 95, specialization: "Finance & Services" },
    { id: "lon", name: "London", lat: 51.51, lng: -0.13, type: "core", strength: 93, specialization: "FinTech & Finance" },
    { id: "tok", name: "Tokyo", lat: 35.68, lng: 139.69, type: "core", strength: 90, specialization: "Advanced Manufacturing" },
    { id: "sha", name: "Shanghai", lat: 31.23, lng: 121.47, type: "core", strength: 88, specialization: "Manufacturing & FinTech" },
    { id: "shen", name: "Shenzhen", lat: 22.54, lng: 114.06, type: "core", strength: 86, specialization: "Hardware & Electronics" },
    { id: "sel", name: "Seoul", lat: 37.57, lng: 126.98, type: "core", strength: 84, specialization: "Semiconductors & 5G" },

    // Regional hubs
    { id: "bang", name: "Bangalore", lat: 12.97, lng: 77.59, type: "regional", strength: 72, specialization: "IT & Software" },
    { id: "sin", name: "Singapore", lat: 1.35, lng: 103.82, type: "regional", strength: 78, specialization: "Trade & Finance" },
    { id: "dub", name: "Dubai", lat: 25.2, lng: 55.27, type: "regional", strength: 68, specialization: "Trade & Logistics" },
    { id: "sao", name: "São Paulo", lat: -23.55, lng: -46.63, type: "regional", strength: 64, specialization: "FinTech & AgriTech" },
    { id: "mum", name: "Mumbai", lat: 19.08, lng: 72.88, type: "regional", strength: 66, specialization: "Finance & Services" },
    { id: "ist", name: "Istanbul", lat: 41.01, lng: 28.98, type: "regional", strength: 58, specialization: "Manufacturing & Trade" },
    { id: "jkt", name: "Jakarta", lat: -6.21, lng: 106.85, type: "regional", strength: 56, specialization: "Digital Economy" },
    { id: "mex", name: "Mexico City", lat: 19.43, lng: -99.13, type: "regional", strength: 55, specialization: "Manufacturing & Services" },
    { id: "hcm", name: "Ho Chi Minh City", lat: 10.82, lng: 106.63, type: "regional", strength: 52, specialization: "Manufacturing" },
    { id: "ber", name: "Berlin", lat: 52.52, lng: 13.41, type: "regional", strength: 70, specialization: "DeepTech & Startups" },

    // Emerging hubs
    { id: "nai", name: "Nairobi", lat: -1.29, lng: 36.82, type: "emerging", strength: 38, specialization: "Mobile Money & FinTech" },
    { id: "lag", name: "Lagos", lat: 6.45, lng: 3.39, type: "emerging", strength: 34, specialization: "FinTech & E-Commerce" },
    { id: "kig", name: "Kigali", lat: -1.94, lng: 29.87, type: "emerging", strength: 28, specialization: "Digital Governance" },
    { id: "acc", name: "Accra", lat: 5.55, lng: -0.2, type: "emerging", strength: 30, specialization: "Tech Startups" },
    { id: "add", name: "Addis Ababa", lat: 9.02, lng: 38.75, type: "emerging", strength: 26, specialization: "Manufacturing" },
    { id: "dak", name: "Dakar", lat: 14.69, lng: -17.44, type: "emerging", strength: 24, specialization: "Digital Services" },
    { id: "dhk", name: "Dhaka", lat: 23.81, lng: 90.41, type: "emerging", strength: 35, specialization: "Garments & Digital" },
    { id: "bog", name: "Bogotá", lat: 4.71, lng: -74.07, type: "emerging", strength: 42, specialization: "Software & Services" },
    { id: "cai", name: "Cairo", lat: 30.04, lng: 31.24, type: "emerging", strength: 36, specialization: "IT Outsourcing" },
    { id: "hyd", name: "Hyderabad", lat: 17.39, lng: 78.49, type: "emerging", strength: 44, specialization: "Pharma & IT" },
    { id: "man", name: "Manila", lat: 14.6, lng: 120.98, type: "emerging", strength: 40, specialization: "BPO & Digital" },
  ];

  // ── Diffusion Flows ───────────────────────────────────────────
  // intensity: "strong", "moderate", "weak"
  // channels: trade, digital, fdi, migration, infrastructure, knowledge
  const diffusionFlows = [
    // Core → Regional (Strong)
    { from: "sf", to: "bang", intensity: "strong", channels: ["digital", "fdi", "knowledge"] },
    { from: "sf", to: "sin", intensity: "strong", channels: ["trade", "fdi", "knowledge"] },
    { from: "lon", to: "dub", intensity: "strong", channels: ["trade", "fdi", "knowledge"] },
    { from: "sha", to: "sin", intensity: "strong", channels: ["trade", "fdi", "infrastructure"] },
    { from: "sha", to: "hcm", intensity: "strong", channels: ["trade", "fdi", "infrastructure"] },
    { from: "tok", to: "sin", intensity: "strong", channels: ["trade", "fdi", "knowledge"] },
    { from: "ny", to: "sao", intensity: "strong", channels: ["trade", "fdi", "digital"] },
    { from: "ny", to: "mex", intensity: "strong", channels: ["trade", "fdi", "migration"] },
    { from: "sel", to: "hcm", intensity: "strong", channels: ["fdi", "trade", "knowledge"] },
    { from: "shen", to: "jkt", intensity: "strong", channels: ["trade", "fdi", "digital"] },
    { from: "lon", to: "nai", intensity: "moderate", channels: ["fdi", "knowledge", "digital"] },

    // Regional → Emerging (Moderate)
    { from: "bang", to: "hyd", intensity: "moderate", channels: ["knowledge", "digital", "migration"] },
    { from: "sin", to: "jkt", intensity: "moderate", channels: ["trade", "fdi", "infrastructure"] },
    { from: "sin", to: "man", intensity: "moderate", channels: ["trade", "fdi", "digital"] },
    { from: "dub", to: "cai", intensity: "moderate", channels: ["trade", "fdi", "infrastructure"] },
    { from: "dub", to: "nai", intensity: "moderate", channels: ["fdi", "trade", "digital"] },
    { from: "sao", to: "bog", intensity: "moderate", channels: ["trade", "knowledge", "digital"] },
    { from: "mum", to: "dhk", intensity: "moderate", channels: ["trade", "knowledge", "fdi"] },
    { from: "ist", to: "cai", intensity: "moderate", channels: ["trade", "infrastructure"] },
    { from: "jkt", to: "man", intensity: "moderate", channels: ["trade", "digital"] },
    { from: "mex", to: "bog", intensity: "moderate", channels: ["trade", "digital", "knowledge"] },

    // Regional/Emerging → Emerging (Weak — frontier diffusion)
    { from: "nai", to: "lag", intensity: "weak", channels: ["digital", "knowledge"] },
    { from: "nai", to: "acc", intensity: "weak", channels: ["digital", "knowledge", "trade"] },
    { from: "nai", to: "kig", intensity: "weak", channels: ["digital", "knowledge"] },
    { from: "nai", to: "add", intensity: "weak", channels: ["trade", "infrastructure"] },
    { from: "nai", to: "dak", intensity: "weak", channels: ["digital", "knowledge"] },
    { from: "lag", to: "acc", intensity: "weak", channels: ["trade", "digital"] },
    { from: "cai", to: "add", intensity: "weak", channels: ["trade", "infrastructure"] },
    { from: "acc", to: "dak", intensity: "weak", channels: ["trade", "digital"] },
    { from: "dhk", to: "man", intensity: "weak", channels: ["trade", "digital"] },
    { from: "hyd", to: "dhk", intensity: "weak", channels: ["knowledge", "digital"] },
    { from: "bog", to: "mex", intensity: "weak", channels: ["trade", "knowledge"] },

    // Core → Emerging (weaker long-range)
    { from: "sha", to: "lag", intensity: "weak", channels: ["trade", "fdi", "infrastructure"] },
    { from: "sha", to: "add", intensity: "weak", channels: ["trade", "infrastructure", "fdi"] },
    { from: "sf", to: "nai", intensity: "weak", channels: ["digital", "knowledge", "fdi"] },
    { from: "lon", to: "lag", intensity: "weak", channels: ["fdi", "knowledge", "digital"] },
    { from: "lon", to: "acc", intensity: "weak", channels: ["fdi", "knowledge"] },
  ];

  // ── Regions for layered views ─────────────────────────────────
  const regions = {
    "Sub-Saharan Africa": {
      color: "#FF6B6B",
      countries: ["NGA", "ETH", "COD", "TZA", "KEN", "GHA", "ZAF", "MOZ", "SEN", "UGA", "RWA", "AGO", "MDG", "MWI"],
      nodes: ["nai", "lag", "kig", "acc", "add", "dak"]
    },
    "South Asia": {
      color: "#4ECDC4",
      countries: ["IND", "BGD", "PAK", "NPL", "LKA", "MMR"],
      nodes: ["bang", "mum", "hyd", "dhk"]
    },
    "Southeast Asia": {
      color: "#45B7D1",
      countries: ["IDN", "VNM", "PHL", "THA", "KHM", "MYS"],
      nodes: ["sin", "jkt", "hcm", "man"]
    },
    "Latin America": {
      color: "#F7DC6F",
      countries: ["BRA", "MEX", "COL", "PER", "GTM", "BOL", "HND", "ARG"],
      nodes: ["sao", "mex", "bog"]
    }
  };

  // ── Scenario presets ──────────────────────────────────────────
  const scenarios = {
    baseline: {
      name: "Baseline",
      description: "Current trends continue with moderate reform",
      drivers: { infrastructure: 50, digitalConnectivity: 55, tradeOpenness: 50, institutionalCapacity: 45, humanCapital: 50, demographics: 50 },
      policyMultiplier: 1.0
    },
    accelerated: {
      name: "Accelerated Reform",
      description: "Coordinated global investment and institutional reform",
      drivers: { infrastructure: 75, digitalConnectivity: 80, tradeOpenness: 70, institutionalCapacity: 70, humanCapital: 75, demographics: 55 },
      policyMultiplier: 1.5
    },
    fragmentation: {
      name: "Fragmentation",
      description: "Geopolitical tensions, trade barriers, and climate stress",
      drivers: { infrastructure: 30, digitalConnectivity: 40, tradeOpenness: 25, institutionalCapacity: 30, humanCapital: 35, demographics: 45 },
      policyMultiplier: 0.5
    }
  };

  return { countries, growthNodes, diffusionFlows, regions, scenarios };
})();
