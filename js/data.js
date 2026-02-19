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

    // ── Additional countries (expanded coverage) ──
    "AFG": {"name":"Afghanistan","lat":34.53,"lng":69.17,"extremePoverty":54.5,"moderatePoverty":90,"gdpPerCapita":2100,"gini":29.4,"agriShare":23,"industryShare":21,"servicesShare":56,"urbanization":26,"population":42,"region":"South Asia"},
    "ALB": {"name":"Albania","lat":41.33,"lng":19.82,"extremePoverty":0.3,"moderatePoverty":7.8,"gdpPerCapita":17400,"gini":29,"agriShare":18,"industryShare":21,"servicesShare":61,"urbanization":64,"population":3,"region":"Europe & Central Asia"},
    "DZA": {"name":"Algeria","lat":36.75,"lng":3.04,"extremePoverty":0.5,"moderatePoverty":15.3,"gdpPerCapita":12700,"gini":27.6,"agriShare":13,"industryShare":39,"servicesShare":48,"urbanization":75,"population":45,"region":"Middle East & North Africa"},
    "AUT": {"name":"Austria","lat":48.21,"lng":16.37,"extremePoverty":0,"moderatePoverty":0.3,"gdpPerCapita":64000,"gini":30.5,"agriShare":1,"industryShare":26,"servicesShare":73,"urbanization":59,"population":9,"region":"High Income"},
    "BEL": {"name":"Belgium","lat":50.85,"lng":4.35,"extremePoverty":0,"moderatePoverty":0.3,"gdpPerCapita":62500,"gini":27.2,"agriShare":1,"industryShare":19,"servicesShare":80,"urbanization":98,"population":12,"region":"High Income"},
    "BGR": {"name":"Bulgaria","lat":42.7,"lng":23.32,"extremePoverty":0.8,"moderatePoverty":5.2,"gdpPerCapita":30200,"gini":40.3,"agriShare":3,"industryShare":28,"servicesShare":69,"urbanization":76,"population":7,"region":"Europe & Central Asia"},
    "CMR": {"name":"Cameroon","lat":3.87,"lng":11.52,"extremePoverty":25,"moderatePoverty":68.5,"gdpPerCapita":4100,"gini":46.6,"agriShare":16,"industryShare":26,"servicesShare":58,"urbanization":58,"population":28,"region":"Sub-Saharan Africa"},
    "CHL": {"name":"Chile","lat":-33.45,"lng":-70.67,"extremePoverty":0.3,"moderatePoverty":5.8,"gdpPerCapita":29500,"gini":44.9,"agriShare":4,"industryShare":30,"servicesShare":66,"urbanization":88,"population":20,"region":"Latin America"},
    "COG": {"name":"Congo","lat":-4.27,"lng":15.28,"extremePoverty":35.4,"moderatePoverty":75.2,"gdpPerCapita":4500,"gini":48.9,"agriShare":8,"industryShare":50,"servicesShare":42,"urbanization":69,"population":6,"region":"Sub-Saharan Africa"},
    "CRI": {"name":"Costa Rica","lat":9.93,"lng":-84.08,"extremePoverty":1.1,"moderatePoverty":10.5,"gdpPerCapita":23700,"gini":48.2,"agriShare":5,"industryShare":20,"servicesShare":75,"urbanization":82,"population":5,"region":"Latin America"},
    "HRV": {"name":"Croatia","lat":45.81,"lng":15.98,"extremePoverty":0.1,"moderatePoverty":1.5,"gdpPerCapita":37200,"gini":29,"agriShare":3,"industryShare":25,"servicesShare":72,"urbanization":58,"population":4,"region":"Europe & Central Asia"},
    "CUB": {"name":"Cuba","lat":23.11,"lng":-82.37,"extremePoverty":0.5,"moderatePoverty":6,"gdpPerCapita":12400,"gini":38,"agriShare":4,"industryShare":23,"servicesShare":73,"urbanization":77,"population":11,"region":"Latin America"},
    "CZE": {"name":"Czechia","lat":50.08,"lng":14.44,"extremePoverty":0,"moderatePoverty":0.4,"gdpPerCapita":48700,"gini":25.3,"agriShare":2,"industryShare":33,"servicesShare":65,"urbanization":74,"population":11,"region":"Europe & Central Asia"},
    "BEN": {"name":"Benin","lat":6.37,"lng":2.43,"extremePoverty":35.5,"moderatePoverty":78.8,"gdpPerCapita":4000,"gini":37.8,"agriShare":26,"industryShare":23,"servicesShare":51,"urbanization":49,"population":14,"region":"Sub-Saharan Africa"},
    "DNK": {"name":"Denmark","lat":55.68,"lng":12.57,"extremePoverty":0,"moderatePoverty":0.2,"gdpPerCapita":72300,"gini":28.2,"agriShare":1,"industryShare":20,"servicesShare":79,"urbanization":88,"population":6,"region":"High Income"},
    "DOM": {"name":"Dominican Republic","lat":18.49,"lng":-69.93,"extremePoverty":1.4,"moderatePoverty":18.5,"gdpPerCapita":22300,"gini":39.6,"agriShare":6,"industryShare":30,"servicesShare":64,"urbanization":84,"population":11,"region":"Latin America"},
    "ECU": {"name":"Ecuador","lat":-0.18,"lng":-78.47,"extremePoverty":5.6,"moderatePoverty":28.5,"gdpPerCapita":12500,"gini":45.5,"agriShare":9,"industryShare":32,"servicesShare":59,"urbanization":64,"population":18,"region":"Latin America"},
    "SLV": {"name":"El Salvador","lat":13.69,"lng":-89.22,"extremePoverty":2.2,"moderatePoverty":22.6,"gdpPerCapita":10900,"gini":38.8,"agriShare":6,"industryShare":26,"servicesShare":68,"urbanization":75,"population":6,"region":"Latin America"},
    "FJI": {"name":"Fiji","lat":-18.14,"lng":178.44,"extremePoverty":1.4,"moderatePoverty":14,"gdpPerCapita":14600,"gini":36.7,"agriShare":10,"industryShare":18,"servicesShare":72,"urbanization":58,"population":1,"region":"East Asia"},
    "FIN": {"name":"Finland","lat":60.17,"lng":24.94,"extremePoverty":0,"moderatePoverty":0.2,"gdpPerCapita":57600,"gini":27.4,"agriShare":2,"industryShare":25,"servicesShare":73,"urbanization":86,"population":6,"region":"High Income"},
    "GAB": {"name":"Gabon","lat":0.39,"lng":9.45,"extremePoverty":3.4,"moderatePoverty":27,"gdpPerCapita":18200,"gini":38,"agriShare":5,"industryShare":44,"servicesShare":51,"urbanization":90,"population":2,"region":"Sub-Saharan Africa"},
    "GRC": {"name":"Greece","lat":37.98,"lng":23.73,"extremePoverty":0,"moderatePoverty":1.4,"gdpPerCapita":37100,"gini":33,"agriShare":4,"industryShare":15,"servicesShare":81,"urbanization":80,"population":10,"region":"High Income"},
    "GIN": {"name":"Guinea","lat":9.64,"lng":-13.58,"extremePoverty":13.8,"moderatePoverty":69.2,"gdpPerCapita":2900,"gini":33.7,"agriShare":26,"industryShare":30,"servicesShare":44,"urbanization":37,"population":14,"region":"Sub-Saharan Africa"},
    "GUY": {"name":"Guyana","lat":6.8,"lng":-58.16,"extremePoverty":4.5,"moderatePoverty":26,"gdpPerCapita":42800,"gini":44.6,"agriShare":15,"industryShare":50,"servicesShare":35,"urbanization":27,"population":1,"region":"Latin America"},
    "HTI": {"name":"Haiti","lat":18.54,"lng":-72.34,"extremePoverty":24.5,"moderatePoverty":76,"gdpPerCapita":3200,"gini":41.1,"agriShare":22,"industryShare":20,"servicesShare":58,"urbanization":58,"population":12,"region":"Latin America"},
    "HUN": {"name":"Hungary","lat":47.5,"lng":19.04,"extremePoverty":0,"moderatePoverty":1.2,"gdpPerCapita":42600,"gini":30.6,"agriShare":4,"industryShare":29,"servicesShare":67,"urbanization":72,"population":10,"region":"Europe & Central Asia"},
    "ISL": {"name":"Iceland","lat":64.15,"lng":-21.94,"extremePoverty":0,"moderatePoverty":0.1,"gdpPerCapita":74600,"gini":26.1,"agriShare":4,"industryShare":20,"servicesShare":76,"urbanization":94,"population":1,"region":"High Income"},
    "IRN": {"name":"Iran","lat":35.69,"lng":51.39,"extremePoverty":0.3,"moderatePoverty":10.5,"gdpPerCapita":16200,"gini":40.9,"agriShare":10,"industryShare":35,"servicesShare":55,"urbanization":76,"population":88,"region":"Middle East & North Africa"},
    "IRQ": {"name":"Iraq","lat":33.31,"lng":44.37,"extremePoverty":2.5,"moderatePoverty":28,"gdpPerCapita":11400,"gini":29.5,"agriShare":3,"industryShare":50,"servicesShare":47,"urbanization":71,"population":44,"region":"Middle East & North Africa"},
    "IRL": {"name":"Ireland","lat":53.35,"lng":-6.26,"extremePoverty":0,"moderatePoverty":0.2,"gdpPerCapita":106000,"gini":31.4,"agriShare":1,"industryShare":38,"servicesShare":61,"urbanization":64,"population":5,"region":"High Income"},
    "ISR": {"name":"Israel","lat":31.77,"lng":35.22,"extremePoverty":0,"moderatePoverty":0.6,"gdpPerCapita":54700,"gini":39,"agriShare":1,"industryShare":19,"servicesShare":80,"urbanization":93,"population":10,"region":"High Income"},
    "ITA": {"name":"Italy","lat":41.9,"lng":12.5,"extremePoverty":0,"moderatePoverty":1,"gdpPerCapita":51800,"gini":35.2,"agriShare":2,"industryShare":23,"servicesShare":75,"urbanization":71,"population":59,"region":"High Income"},
    "CIV": {"name":"Côte d'Ivoire","lat":5.35,"lng":-4.01,"extremePoverty":12.1,"moderatePoverty":62.4,"gdpPerCapita":6500,"gini":37.2,"agriShare":20,"industryShare":27,"servicesShare":53,"urbanization":53,"population":29,"region":"Sub-Saharan Africa"},
    "JAM": {"name":"Jamaica","lat":18.11,"lng":-77.3,"extremePoverty":1.3,"moderatePoverty":18,"gdpPerCapita":12000,"gini":35,"agriShare":7,"industryShare":21,"servicesShare":72,"urbanization":57,"population":3,"region":"Latin America"},
    "KAZ": {"name":"Kazakhstan","lat":51.17,"lng":71.43,"extremePoverty":0,"moderatePoverty":3.8,"gdpPerCapita":33700,"gini":27.8,"agriShare":5,"industryShare":35,"servicesShare":60,"urbanization":58,"population":20,"region":"Europe & Central Asia"},
    "PRK": {"name":"North Korea","lat":39.02,"lng":125.75,"extremePoverty":40,"moderatePoverty":78,"gdpPerCapita":1800,"gini":31,"agriShare":22,"industryShare":47,"servicesShare":31,"urbanization":63,"population":26,"region":"East Asia"},
    "KWT": {"name":"Kuwait","lat":29.38,"lng":47.99,"extremePoverty":0,"moderatePoverty":0.3,"gdpPerCapita":52500,"gini":37,"agriShare":1,"industryShare":57,"servicesShare":42,"urbanization":100,"population":4,"region":"Middle East & North Africa"},
    "LAO": {"name":"Laos","lat":17.97,"lng":102.63,"extremePoverty":7.1,"moderatePoverty":56.4,"gdpPerCapita":8600,"gini":38.8,"agriShare":15,"industryShare":32,"servicesShare":53,"urbanization":37,"population":8,"region":"Southeast Asia"},
    "LBN": {"name":"Lebanon","lat":33.89,"lng":35.5,"extremePoverty":5,"moderatePoverty":30,"gdpPerCapita":14200,"gini":31.8,"agriShare":3,"industryShare":15,"servicesShare":82,"urbanization":89,"population":5,"region":"Middle East & North Africa"},
    "LSO": {"name":"Lesotho","lat":-29.31,"lng":28.48,"extremePoverty":27.3,"moderatePoverty":64,"gdpPerCapita":2900,"gini":44.9,"agriShare":5,"industryShare":30,"servicesShare":65,"urbanization":30,"population":2,"region":"Sub-Saharan Africa"},
    "LBR": {"name":"Liberia","lat":6.3,"lng":-10.8,"extremePoverty":27.6,"moderatePoverty":81.8,"gdpPerCapita":1600,"gini":35.3,"agriShare":42,"industryShare":13,"servicesShare":45,"urbanization":53,"population":5,"region":"Sub-Saharan Africa"},
    "LBY": {"name":"Libya","lat":32.9,"lng":13.18,"extremePoverty":0.5,"moderatePoverty":8,"gdpPerCapita":22000,"gini":35,"agriShare":2,"industryShare":52,"servicesShare":46,"urbanization":81,"population":7,"region":"Middle East & North Africa"},
    "MLI": {"name":"Mali","lat":12.64,"lng":-8,"extremePoverty":14.2,"moderatePoverty":73.6,"gdpPerCapita":2500,"gini":33,"agriShare":37,"industryShare":19,"servicesShare":44,"urbanization":45,"population":23,"region":"Sub-Saharan Africa"},
    "MRT": {"name":"Mauritania","lat":18.09,"lng":-15.98,"extremePoverty":5.3,"moderatePoverty":51.6,"gdpPerCapita":6300,"gini":32.6,"agriShare":18,"industryShare":31,"servicesShare":51,"urbanization":56,"population":5,"region":"Sub-Saharan Africa"},
    "MNG": {"name":"Mongolia","lat":47.92,"lng":106.91,"extremePoverty":0.5,"moderatePoverty":16,"gdpPerCapita":14500,"gini":32.7,"agriShare":12,"industryShare":38,"servicesShare":50,"urbanization":69,"population":3,"region":"East Asia"},
    "MAR": {"name":"Morocco","lat":33.97,"lng":-6.85,"extremePoverty":1,"moderatePoverty":22.8,"gdpPerCapita":9800,"gini":39.5,"agriShare":12,"industryShare":26,"servicesShare":62,"urbanization":64,"population":38,"region":"Middle East & North Africa"},
    "NAM": {"name":"Namibia","lat":-22.56,"lng":17.08,"extremePoverty":13.4,"moderatePoverty":47.8,"gdpPerCapita":11100,"gini":59.1,"agriShare":6,"industryShare":26,"servicesShare":68,"urbanization":54,"population":3,"region":"Sub-Saharan Africa"},
    "NLD": {"name":"Netherlands","lat":52.37,"lng":4.9,"extremePoverty":0,"moderatePoverty":0.2,"gdpPerCapita":68600,"gini":28.5,"agriShare":2,"industryShare":18,"servicesShare":80,"urbanization":93,"population":18,"region":"High Income"},
    "NZL": {"name":"New Zealand","lat":-41.29,"lng":174.78,"extremePoverty":0,"moderatePoverty":0.4,"gdpPerCapita":48800,"gini":32,"agriShare":6,"industryShare":20,"servicesShare":74,"urbanization":87,"population":5,"region":"High Income"},
    "NIC": {"name":"Nicaragua","lat":12.15,"lng":-86.27,"extremePoverty":5.6,"moderatePoverty":38,"gdpPerCapita":6700,"gini":46.2,"agriShare":15,"industryShare":26,"servicesShare":59,"urbanization":59,"population":7,"region":"Latin America"},
    "NER": {"name":"Niger","lat":13.51,"lng":2.11,"extremePoverty":42,"moderatePoverty":87.8,"gdpPerCapita":1400,"gini":37.3,"agriShare":40,"industryShare":17,"servicesShare":43,"urbanization":17,"population":27,"region":"Sub-Saharan Africa"},
    "NOR": {"name":"Norway","lat":59.91,"lng":10.75,"extremePoverty":0,"moderatePoverty":0.1,"gdpPerCapita":82800,"gini":27.6,"agriShare":2,"industryShare":30,"servicesShare":68,"urbanization":84,"population":5,"region":"High Income"},
    "PAN": {"name":"Panama","lat":8.98,"lng":-79.52,"extremePoverty":2,"moderatePoverty":14.5,"gdpPerCapita":37200,"gini":49.2,"agriShare":3,"industryShare":28,"servicesShare":69,"urbanization":68,"population":4,"region":"Latin America"},
    "PNG": {"name":"Papua New Guinea","lat":-6.31,"lng":147.18,"extremePoverty":36.7,"moderatePoverty":73.5,"gdpPerCapita":4300,"gini":41.9,"agriShare":17,"industryShare":40,"servicesShare":43,"urbanization":14,"population":10,"region":"East Asia"},
    "PRY": {"name":"Paraguay","lat":-25.26,"lng":-57.58,"extremePoverty":1,"moderatePoverty":13.8,"gdpPerCapita":15000,"gini":43.5,"agriShare":10,"industryShare":33,"servicesShare":57,"urbanization":62,"population":7,"region":"Latin America"},
    "PRT": {"name":"Portugal","lat":38.72,"lng":-9.14,"extremePoverty":0,"moderatePoverty":0.8,"gdpPerCapita":42300,"gini":33.5,"agriShare":2,"industryShare":20,"servicesShare":78,"urbanization":67,"population":10,"region":"High Income"},
    "QAT": {"name":"Qatar","lat":25.29,"lng":51.53,"extremePoverty":0,"moderatePoverty":0.1,"gdpPerCapita":100000,"gini":41.1,"agriShare":0,"industryShare":53,"servicesShare":47,"urbanization":99,"population":3,"region":"Middle East & North Africa"},
    "ROU": {"name":"Romania","lat":44.43,"lng":26.1,"extremePoverty":0.3,"moderatePoverty":4.5,"gdpPerCapita":38800,"gini":35.8,"agriShare":4,"industryShare":28,"servicesShare":68,"urbanization":54,"population":19,"region":"Europe & Central Asia"},
    "SLE": {"name":"Sierra Leone","lat":8.48,"lng":-13.23,"extremePoverty":25,"moderatePoverty":77.5,"gdpPerCapita":2100,"gini":35.7,"agriShare":60,"industryShare":7,"servicesShare":33,"urbanization":44,"population":9,"region":"Sub-Saharan Africa"},
    "SGP": {"name":"Singapore","lat":1.35,"lng":103.82,"extremePoverty":0,"moderatePoverty":0.1,"gdpPerCapita":131600,"gini":45.9,"agriShare":0,"industryShare":24,"servicesShare":76,"urbanization":100,"population":6,"region":"High Income"},
    "SVK": {"name":"Slovakia","lat":48.15,"lng":17.11,"extremePoverty":0,"moderatePoverty":0.9,"gdpPerCapita":38400,"gini":25.2,"agriShare":3,"industryShare":32,"servicesShare":65,"urbanization":54,"population":5,"region":"Europe & Central Asia"},
    "SVN": {"name":"Slovenia","lat":46.05,"lng":14.51,"extremePoverty":0,"moderatePoverty":0.3,"gdpPerCapita":48100,"gini":24.6,"agriShare":2,"industryShare":30,"servicesShare":68,"urbanization":55,"population":2,"region":"Europe & Central Asia"},
    "SOM": {"name":"Somalia","lat":2.05,"lng":45.32,"extremePoverty":68.6,"moderatePoverty":91.5,"gdpPerCapita":1300,"gini":36.8,"agriShare":65,"industryShare":7,"servicesShare":28,"urbanization":47,"population":18,"region":"Sub-Saharan Africa"},
    "ESP": {"name":"Spain","lat":40.42,"lng":-3.7,"extremePoverty":0,"moderatePoverty":0.8,"gdpPerCapita":46800,"gini":34.3,"agriShare":3,"industryShare":20,"servicesShare":77,"urbanization":81,"population":48,"region":"High Income"},
    "SSD": {"name":"South Sudan","lat":4.85,"lng":31.6,"extremePoverty":67.3,"moderatePoverty":92.6,"gdpPerCapita":800,"gini":44.1,"agriShare":10,"industryShare":33,"servicesShare":57,"urbanization":21,"population":11,"region":"Sub-Saharan Africa"},
    "SDN": {"name":"Sudan","lat":15.6,"lng":32.53,"extremePoverty":15.3,"moderatePoverty":60.5,"gdpPerCapita":4300,"gini":34.2,"agriShare":20,"industryShare":25,"servicesShare":55,"urbanization":36,"population":48,"region":"Sub-Saharan Africa"},
    "SUR": {"name":"Suriname","lat":5.83,"lng":-55.17,"extremePoverty":4,"moderatePoverty":20,"gdpPerCapita":17200,"gini":57.6,"agriShare":9,"industryShare":33,"servicesShare":58,"urbanization":66,"population":1,"region":"Latin America"},
    "SWZ": {"name":"Eswatini","lat":-26.31,"lng":31.14,"extremePoverty":36.1,"moderatePoverty":69,"gdpPerCapita":10800,"gini":54.6,"agriShare":8,"industryShare":36,"servicesShare":56,"urbanization":31,"population":1,"region":"Sub-Saharan Africa"},
    "SWE": {"name":"Sweden","lat":59.33,"lng":18.07,"extremePoverty":0,"moderatePoverty":0.2,"gdpPerCapita":63500,"gini":30,"agriShare":1,"industryShare":23,"servicesShare":76,"urbanization":88,"population":10,"region":"High Income"},
    "CHE": {"name":"Switzerland","lat":46.95,"lng":7.45,"extremePoverty":0,"moderatePoverty":0.1,"gdpPerCapita":83600,"gini":33.1,"agriShare":1,"industryShare":25,"servicesShare":74,"urbanization":74,"population":9,"region":"High Income"},
    "SYR": {"name":"Syria","lat":33.51,"lng":36.29,"extremePoverty":12,"moderatePoverty":55,"gdpPerCapita":3500,"gini":35.8,"agriShare":20,"industryShare":20,"servicesShare":60,"urbanization":57,"population":22,"region":"Middle East & North Africa"},
    "TJK": {"name":"Tajikistan","lat":38.56,"lng":68.77,"extremePoverty":3.9,"moderatePoverty":46,"gdpPerCapita":4300,"gini":34,"agriShare":23,"industryShare":28,"servicesShare":49,"urbanization":28,"population":10,"region":"Europe & Central Asia"},
    "TGO": {"name":"Togo","lat":6.17,"lng":1.23,"extremePoverty":24.5,"moderatePoverty":72,"gdpPerCapita":2500,"gini":42.4,"agriShare":22,"industryShare":22,"servicesShare":56,"urbanization":44,"population":9,"region":"Sub-Saharan Africa"},
    "TTO": {"name":"Trinidad & Tobago","lat":10.65,"lng":-61.5,"extremePoverty":0.4,"moderatePoverty":6,"gdpPerCapita":26200,"gini":40.3,"agriShare":1,"industryShare":40,"servicesShare":59,"urbanization":53,"population":1,"region":"Latin America"},
    "TUN": {"name":"Tunisia","lat":36.81,"lng":10.18,"extremePoverty":0.3,"moderatePoverty":11.9,"gdpPerCapita":12800,"gini":32.8,"agriShare":10,"industryShare":26,"servicesShare":64,"urbanization":70,"population":12,"region":"Middle East & North Africa"},
    "UKR": {"name":"Ukraine","lat":50.45,"lng":30.52,"extremePoverty":0.1,"moderatePoverty":5.6,"gdpPerCapita":14700,"gini":26.6,"agriShare":10,"industryShare":23,"servicesShare":67,"urbanization":70,"population":37,"region":"Europe & Central Asia"},
    "BFA": {"name":"Burkina Faso","lat":12.37,"lng":-1.52,"extremePoverty":30.5,"moderatePoverty":80.5,"gdpPerCapita":2400,"gini":35.3,"agriShare":18,"industryShare":25,"servicesShare":57,"urbanization":32,"population":23,"region":"Sub-Saharan Africa"},
    "URY": {"name":"Uruguay","lat":-34.9,"lng":-56.16,"extremePoverty":0.1,"moderatePoverty":4.5,"gdpPerCapita":28100,"gini":39.7,"agriShare":6,"industryShare":22,"servicesShare":72,"urbanization":96,"population":4,"region":"Latin America"},
    "UZB": {"name":"Uzbekistan","lat":41.3,"lng":69.28,"extremePoverty":3.6,"moderatePoverty":42.5,"gdpPerCapita":9200,"gini":35.3,"agriShare":25,"industryShare":30,"servicesShare":45,"urbanization":50,"population":36,"region":"Europe & Central Asia"},
    "VEN": {"name":"Venezuela","lat":10.48,"lng":-66.87,"extremePoverty":33.1,"moderatePoverty":68.5,"gdpPerCapita":7100,"gini":44.8,"agriShare":5,"industryShare":34,"servicesShare":61,"urbanization":88,"population":28,"region":"Latin America"},
    "YEM": {"name":"Yemen","lat":15.37,"lng":44.21,"extremePoverty":18.8,"moderatePoverty":73.5,"gdpPerCapita":2500,"gini":36.7,"agriShare":20,"industryShare":12,"servicesShare":68,"urbanization":39,"population":34,"region":"Middle East & North Africa"},
    "ZMB": {"name":"Zambia","lat":-15.39,"lng":28.32,"extremePoverty":58.7,"moderatePoverty":84.5,"gdpPerCapita":3900,"gini":57.1,"agriShare":3,"industryShare":36,"servicesShare":61,"urbanization":46,"population":20,"region":"Sub-Saharan Africa"},
    "ZWE": {"name":"Zimbabwe","lat":-17.83,"lng":31.05,"extremePoverty":38.3,"moderatePoverty":74.8,"gdpPerCapita":2800,"gini":50.3,"agriShare":12,"industryShare":22,"servicesShare":66,"urbanization":32,"population":16,"region":"Sub-Saharan Africa"},
    "NCL": {"name":"New Caledonia","lat":-22.26,"lng":166.46,"extremePoverty":0,"moderatePoverty":2,"gdpPerCapita":38000,"gini":32,"agriShare":2,"industryShare":20,"servicesShare":78,"urbanization":72,"population":1,"region":"High Income"},
    "PRI": {"name":"Puerto Rico","lat":18.47,"lng":-66.11,"extremePoverty":0,"moderatePoverty":3,"gdpPerCapita":40000,"gini":41,"agriShare":1,"industryShare":45,"servicesShare":54,"urbanization":94,"population":3,"region":"High Income"},
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
      countries: ["NGA", "ETH", "COD", "TZA", "KEN", "GHA", "ZAF", "MOZ", "SEN", "UGA", "RWA", "AGO", "MDG", "MWI", "CMR", "COG", "BEN", "GIN", "CIV", "SLE", "SOM", "SSD", "SDN", "BFA", "ZMB", "ZWE", "NER", "MLI", "MRT", "TGO", "LBR", "NAM", "GAB", "LSO", "SWZ"],
      nodes: ["nai", "lag", "kig", "acc", "add", "dak"]
    },
    "South Asia": {
      color: "#4ECDC4",
      countries: ["IND", "BGD", "PAK", "NPL", "LKA", "MMR", "AFG"],
      nodes: ["bang", "mum", "hyd", "dhk"]
    },
    "Southeast Asia": {
      color: "#45B7D1",
      countries: ["IDN", "VNM", "PHL", "THA", "KHM", "MYS", "LAO"],
      nodes: ["sin", "jkt", "hcm", "man"]
    },
    "Latin America": {
      color: "#F7DC6F",
      countries: ["BRA", "MEX", "COL", "PER", "GTM", "BOL", "HND", "ARG", "CHL", "CRI", "CUB", "DOM", "ECU", "SLV", "GUY", "HTI", "JAM", "NIC", "PAN", "PRY", "SUR", "TTO", "URY", "VEN"],
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
