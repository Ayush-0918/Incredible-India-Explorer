// script.js - Peasant and Agrarian Uprisings Interactive Map Logic

(function () {
    'use strict';

    /* ================================================================
       1. DATASETS
       ================================================================ */
    const peasantMovements = [
        {
            id: "indigo-revolt",
            title: "Indigo Revolt",
            year: 1859,
            region: "East",
            location: "Nadia, Jessore, Pabna (Bengal)",
            coords: [23.2324, 88.3639],
            economicCause: "Forced Indigo Cultivation",
            resistanceForm: "Refusal to plant indigo, social boycotts of planters, strikes, armed clashes with planters' retainers",
            leaders: ["Bishnucharan Biswas", "Digambar Biswas"],
            outcome: "Appointment of the Indigo Commission in 1860, which declared that indigo planting was non-voluntary and illegal under the contract system.",
            description: "Indigo planters forced peasants to grow indigo instead of food crops under highly exploitative contracts with token advances.",
            sources: "Report of the Indigo Commission (1860), 'Nil Darpan' (The Indigo Mirror play by Dinabandhu Mitra)."
        },
        {
            id: "pabna-resistance",
            title: "Pabna Agrarian Leagues",
            year: 1873,
            region: "East",
            location: "Pabna district (East Bengal)",
            coords: [24.0050, 89.2486],
            economicCause: "Eviction & Tenancy Insecurity",
            resistanceForm: "Formation of Agrarian Leagues, withholding rent payments, legal struggles in courts, minimal violence",
            leaders: ["Ishan Chandra Roy", "Sambhu Pal", "Khoodi Mollah"],
            outcome: "Passing of the Bengal Tenancy Act of 1885, which restored tenancy rights to occupant peasants.",
            description: "Zamindars enhanced rents beyond legal limits and prevented tenants from acquiring occupancy rights through eviction practices.",
            sources: "Bengal Administration Reports (1870s), historical analyses of rent strikes in Eastern Bengal."
        },
        {
            id: "deccan-riots",
            title: "Deccan Riots",
            year: 1875,
            region: "West",
            location: "Pune, Ahmednagar, Satara (Maharashtra)",
            coords: [18.5204, 73.8567],
            economicCause: "Debt Trap & Usury",
            resistanceForm: "Social boycott of Gujarati and Marwari moneylenders, burning of debt bonds, looting of grain shops",
            leaders: ["Local peasant panchayats", "Shetiba"],
            outcome: "Deccan Agriculturists' Relief Act of 1879, which placed restrictions on the arrest of peasant debtors and land alienation.",
            description: "Peasants faced high Ryotwari land revenue demands coupled with falling crop prices, driving them into deep debt traps with local moneylenders.",
            sources: "Deccan Riots Commission Report (1876), judicial records of Ahmednagar and Pune districts."
        },
        {
            id: "champaran-satyagraha",
            title: "Champaran Satyagraha",
            year: 1917,
            region: "East",
            location: "Champaran district (Bihar)",
            coords: [26.6536, 84.9126],
            economicCause: "Forced Indigo Cultivation",
            resistanceForm: "Non-violent civil disobedience, documentation of grievances, public hearings, fasts",
            leaders: ["Mahatma Gandhi", "Rajendra Prasad", "Raj Kumar Shukla"],
            outcome: "Abolition of the Tinkathia system (compulsory indigo planting on 3/20th of land) and partial refund of illegal dues to peasants.",
            description: "Planters enforced the Tinkathia system, charging highly inflated rent (Tawan) if peasants wished to opt out of indigo planting.",
            sources: "Champaran Satyagraha documents, Bihar Agrarian Inquiry Committee Report."
        },
        {
            id: "kheda-satyagraha",
            title: "Kheda Satyagraha",
            year: 1918,
            region: "West",
            location: "Kheda district (Gujarat)",
            coords: [22.7526, 72.6841],
            economicCause: "High Land Revenue",
            resistanceForm: "Non-payment of land revenue, defiance of confiscation orders, non-violent resistance",
            leaders: ["Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Mohanlal Pandya"],
            outcome: "The British government suspended revenue collection for the famine-hit year and returned confiscated property.",
            description: "Peasants requested a revenue waiver after famine and crop failure, but the administration insisted on full tax collections.",
            sources: "Collected Works of Mahatma Gandhi, revenue department documents of Bombay Presidency."
        },
        {
            id: "eka-movement",
            title: "Eka Movement (Unity Uprising)",
            year: 1921,
            region: "North",
            location: "Hardoi, Bahraich, Sitapur (Uttar Pradesh)",
            coords: [27.3828, 80.1287],
            economicCause: "Eviction & Tenancy Insecurity",
            resistanceForm: "Peasant oaths (Eka), refusal to pay extra illegal rents (Nazrana), refusal to perform forced labor (Begar)",
            leaders: ["Madari Pasi", "Baba Ram Chandra"],
            outcome: "Suppressed by authorities by 1922, but forced the government to introduce rent-stabilization clauses in local tenancy acts.",
            description: "Landlords extracted rents 50% higher than recorded rates, alongside Nazrana (customary gifts) and forced unpaid labor (Begar).",
            sources: "United Provinces Police Reports (1921), memoirs of Baba Ram Chandra."
        },
        {
            id: "moplah-rebellion",
            title: "Moplah Rebellion (Malabar)",
            year: 1921,
            region: "South",
            location: "Malabar district (Kerala)",
            coords: [11.0735, 76.0740],
            economicCause: "Eviction & Tenancy Insecurity",
            resistanceForm: "Armed rebellion, attacks on landlords (Jenmis) and British offices, parallel administrative set-ups",
            leaders: ["Ali Musaliar", "Variyankunnath Kunjahammed Haji"],
            outcome: "Violently suppressed by the British military (Malabar Special Police) by late 1921.",
            description: "Tenant farmers (Moplahs) protested against oppressive high rents, insecurity of tenure, and evictions by upper-caste Hindu landlords backed by the British.",
            sources: "Malabar District Gazetteers, military records of the Madras Presidency."
        },
        {
            id: "bardoli-satyagraha",
            title: "Bardoli Satyagraha",
            year: 1928,
            region: "West",
            location: "Bardoli taluka (Gujarat)",
            coords: [21.1180, 73.1147],
            economicCause: "High Land Revenue",
            resistanceForm: "Total non-payment of taxes, social boycott of buyers of seized property, publication of Satyagraha leaflets",
            leaders: ["Sardar Vallabhbhai Patel", "Kunvarji Mehta"],
            outcome: "Revenue hike reduced from 22% to 6.03%, and all seized lands were returned to their original owners.",
            description: "The Bombay Presidency administration raised land revenue assessments by 22% despite poor crop yields.",
            sources: "Bardoli Inquiry Committee Report, biography of Sardar Patel."
        },
        {
            id: "warli-revolt",
            title: "Warli Adivasi Revolt",
            year: 1945,
            region: "West",
            location: "Thane, Talasari (Maharashtra)",
            coords: [19.9723, 72.8093],
            economicCause: "Eviction & Tenancy Insequence",
            resistanceForm: "Refusal to work for landlords, strikes in timber/grass yards, marches, direct land occupations",
            leaders: ["Godavari Parulekar", "Shamrao Parulekar"],
            outcome: "Abolition of forced labor (vethbegar) and establishment of minimum wages for forest and grass workers in Thane.",
            description: "Warli tribal peasants rebelled against severe debt-bondage, land-grabbing, and forced labor by forest contractors and landlords.",
            sources: "'Adivasis' and 'Adivasi Revolt' records by Godavari Parulekar."
        },
        {
            id: "tebhaga-movement",
            title: "Tebhaga Movement",
            year: 1946,
            region: "East",
            location: "Dinajpur, Rangpur, Jessore (Bengal)",
            coords: [25.6279, 88.6332],
            economicCause: "Eviction & Tenancy Insecurity",
            resistanceForm: "Harvesting paddy and storing it in sharecroppers' granaries (Khamar) rather than landlords' godowns, clashes with police",
            leaders: ["Kampa Singh", "Ila Mitra", "Charu Majumdar"],
            outcome: "Bargadars Act of 1950, which legally protected sharecroppers and codified the two-thirds crop share rule.",
            description: "Sharecroppers (Bargadars) demanded keeping a two-thirds share of the harvest (Tebhaga) instead of half, which went to Jotedars.",
            sources: "Bengal Land Revenue Commission (Floud Commission) reports, sharecroppers union logs."
        }
    ];

    const leadersData = [
        {
            name: "Sardar Vallabhbhai Patel",
            movement: "Bardoli & Kheda Satyagraha",
            imageEmoji: "👨🏽‍💼",
            bio: "Organized the massive non-payment campaign in Bardoli, earning the title 'Sardar' (Leader) for his masterly leadership of Gujarat peasants."
        },
        {
            name: "Swami Sahajanand Saraswati",
            movement: "All India Kisan Sabha",
            imageEmoji: "🧘🏽‍♂️",
            bio: "Founded the Bihar Provincial Kisan Sabha and served as the first president of the All India Kisan Sabha, championing radical peasant land rights."
        },
        {
            name: "Baba Ram Chandra",
            movement: "Awadh Peasant Movement",
            imageEmoji: "📜",
            bio: "Organized Awadh peasants using Ramacharitmanas recitations, uniting tenants against high rents and forced labor (Begar)."
        },
        {
            name: "Madari Pasi",
            movement: "Eka Movement",
            imageEmoji: "✊",
            bio: "A charismatic leader of the Pasi community who organized the Eka Movement, binding peasants with sacred oaths of unity against rent hikes."
        },
        {
            name: "Godavari Parulekar",
            movement: "Warli Adivasi Revolt",
            imageEmoji: "👩🏽‍💼",
            bio: "Committed social worker and CPI leader who mobilized Warli tribals in Thane to break the chains of debt-bondage and forced labor."
        },
        {
            name: "Ila Mitra",
            movement: "Tebhaga Movement",
            imageEmoji: "👩🏽‍🌾",
            bio: "Known as 'Rani Ma' of the Santhals, she led the sharecroppers in the historic Tebhaga struggle in Nachole and Dinajpur."
        }
    ];

    /* ================================================================
       2. DOM ELEMENTS
       ================================================================ */
    const movementsListContainer = document.getElementById('movements-list');
    const timelineWrapper = document.getElementById('timeline-nodes-wrapper');
    const causeFilter = document.getElementById('cause-filter');
    const regionFilter = document.getElementById('region-filter');
    const themeBtn = document.getElementById('theme-toggle');

    // Comparison select elements
    const compareA = document.getElementById('compare-a');
    const compareB = document.getElementById('compare-b');
    const comparisonDisplay = document.getElementById('comparison-display');

    // Leaders grid
    const leadersGrid = document.getElementById('leaders-grid');

    // Modal elements
    const modal = document.getElementById('movement-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalYear = document.getElementById('modal-year');
    const modalTitle = document.getElementById('modal-title');
    const modalRegionBadge = document.getElementById('modal-region-badge');
    const modalCauseBadge = document.getElementById('modal-cause-badge');
    const modalLocation = document.getElementById('modal-location');
    const modalLeaders = document.getElementById('modal-leaders');
    const modalResistanceForm = document.getElementById('modal-resistance-form');
    const modalEconomicCauses = document.getElementById('modal-economic-causes');
    const modalOutcome = document.getElementById('modal-outcome');
    const modalSources = document.getElementById('modal-sources');

    // Leaflet map reference
    let map;
    let markersGroup;
    let filteredMovements = [...peasantMovements];

    /* ================================================================
       3. THEME MANAGEMENT
       ================================================================ */
    let isDarkMode = !document.body.classList.contains('light-theme');
    
    function syncThemeUI(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            themeBtn.textContent = '🌙 Dark Mode';
        } else {
            document.body.classList.remove('light-theme');
            themeBtn.textContent = '☀️ Light Mode';
        }
        if (window.updatePeasantMapTheme) {
            window.updatePeasantMapTheme(theme);
        }
    }

    themeBtn.addEventListener('click', () => {
        const light = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', light ? 'light' : 'dark');
        syncThemeUI(light ? 'light' : 'dark');
    });

    syncThemeUI(localStorage.getItem('theme') || 'dark');

    /* ================================================================
       4. LEAFLET MAP INITIALIZATION
       ================================================================ */
    function initMap() {
        const mapContainer = document.getElementById('peasant-map');
        if (!mapContainer || typeof L === 'undefined') return;

        map = L.map('peasant-map', {
            scrollWheelZoom: false,
            zoomControl: true
        }).setView([22.9734, 78.6569], 5);

        markersGroup = L.layerGroup().addTo(map);

        let tileLayer;
        window.updatePeasantMapTheme = function (theme) {
            if (tileLayer) map.removeLayer(tileLayer);
            const url = theme === 'light' 
                ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
                : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
            
            tileLayer = L.tileLayer(url, {
                attribution: '&copy; OpenStreetMap &copy; CARTO'
            }).addTo(map);
        };

        window.updatePeasantMapTheme(localStorage.getItem('theme') || 'dark');
    }

    function getCauseColor(cause) {
        switch (cause) {
            case "Forced Indigo Cultivation": return "#ef4444";
            case "High Land Revenue": return "#eab308";
            case "Eviction & Tenancy Insecurity": return "#8b5cf6";
            case "Debt Trap & Usury": return "#3b82f6";
            default: return "#f97316";
        }
    }

    function updateMapMarkers() {
        if (!markersGroup) return;
        markersGroup.clearLayers();

        filteredMovements.forEach((movement) => {
            const color = getCauseColor(movement.economicCause);
            const customIcon = L.divIcon({
                className: 'peasant-map-marker',
                html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.5);"></div>`,
                iconSize: [14, 14],
                iconAnchor: [7, 7]
            });

            const marker = L.marker(movement.coords, { icon: customIcon });
            marker.bindPopup(`<b>${movement.year}: ${movement.title}</b><br>${movement.location}`);
            marker.on('click', () => {
                openModal(movement.id);
            });
            markersGroup.addLayer(marker);
        });
    }

    /* ================================================================
       5. COMPONENT RENDERING
       ================================================================ */
    function renderMovementsList() {
        movementsListContainer.innerHTML = '';
        
        if (filteredMovements.length === 0) {
            movementsListContainer.innerHTML = `<p class="empty-message">No uprisings match the selected filters.</p>`;
            return;
        }

        filteredMovements.forEach(movement => {
            const card = document.createElement('div');
            card.className = 'peasant-list-card';
            card.style.borderLeftColor = getCauseColor(movement.economicCause);
            
            card.innerHTML = `
                <div class="card-meta">
                    <span class="card-year">${movement.year}</span>
                    <span class="card-region">${movement.region}</span>
                </div>
                <h3>${movement.title}</h3>
                <p class="card-cause">${movement.economicCause}</p>
            `;

            card.addEventListener('click', () => {
                openModal(movement.id);
                if (map) {
                    map.setView(movement.coords, 7);
                }
            });

            movementsListContainer.appendChild(card);
        });
    }

    function renderTimeline() {
        timelineWrapper.innerHTML = '';
        const sortedMovements = [...filteredMovements].sort((a, b) => a.year - b.year);

        sortedMovements.forEach(movement => {
            const node = document.createElement('div');
            node.className = 'timeline-node';

            const dot = document.createElement('div');
            dot.className = 'timeline-dot';
            dot.style.backgroundColor = getCauseColor(movement.economicCause);

            const card = document.createElement('div');
            card.className = 'timeline-node-card';
            
            card.innerHTML = `
                <span class="node-year">${movement.year}</span>
                <h4>${movement.title}</h4>
                <p>${movement.location}</p>
            `;

            card.addEventListener('click', () => {
                openModal(movement.id);
            });

            node.appendChild(dot);
            node.appendChild(card);
            timelineWrapper.appendChild(node);
        });
    }

    function renderLeaders() {
        leadersGrid.innerHTML = '';
        leadersData.forEach(leader => {
            const card = document.createElement('article');
            card.className = 'leader-card';
            
            card.innerHTML = `
                <div class="leader-avatar">${leader.imageEmoji}</div>
                <h3>${leader.name}</h3>
                <span class="leader-movement">${leader.movement}</span>
                <p>${leader.bio}</p>
            `;
            leadersGrid.appendChild(card);
        });
    }

    /* ================================================================
       6. COMPARISON SYSTEM
       ================================================================ */
    function initComparisonDropdowns() {
        compareA.innerHTML = '';
        compareB.innerHTML = '';

        peasantMovements.forEach((m, idx) => {
            const optionA = document.createElement('option');
            optionA.value = m.id;
            optionA.textContent = `${m.year} — ${m.title}`;
            compareA.appendChild(optionA);

            const optionB = document.createElement('option');
            optionB.value = m.id;
            optionB.textContent = `${m.year} — ${m.title}`;
            if (idx === 1) optionB.selected = true; // default second movement selected
            compareB.appendChild(optionB);
        });

        updateComparison();
        compareA.addEventListener('change', updateComparison);
        compareB.addEventListener('change', updateComparison);
    }

    function updateComparison() {
        const m1 = peasantMovements.find(m => m.id === compareA.value);
        const m2 = peasantMovements.find(m => m.id === compareB.value);

        if (!m1 || !m2) return;

        comparisonDisplay.innerHTML = `
            <table class="compare-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>${m1.title} (${m1.year})</th>
                        <th>${m2.title} (${m2.year})</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>📍 Region / Location</strong></td>
                        <td>${m1.location}</td>
                        <td>${m2.location}</td>
                    </tr>
                    <tr>
                        <td><strong>💰 Economic Grievance</strong></td>
                        <td style="color: ${getCauseColor(m1.economicCause)}">${m1.economicCause}</td>
                        <td style="color: ${getCauseColor(m2.economicCause)}">${m2.economicCause}</td>
                    </tr>
                    <tr>
                        <td><strong>🛡️ Form of Protest</strong></td>
                        <td>${m1.resistanceForm}</td>
                        <td>${m2.resistanceForm}</td>
                    </tr>
                    <tr>
                        <td><strong>👤 Key Organizer(s)</strong></td>
                        <td>${m1.leaders.join(', ')}</td>
                        <td>${m2.leaders.join(', ')}</td>
                    </tr>
                    <tr>
                        <td><strong>📈 Outcome & Significance</strong></td>
                        <td>${m1.outcome}</td>
                        <td>${m2.outcome}</td>
                    </tr>
                    <tr>
                        <td><strong>📚 Key Source Records</strong></td>
                        <td><em>${m1.sources}</em></td>
                        <td><em>${m2.sources}</em></td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    /* ================================================================
       7. DETAILS MODAL HANDLERS
       ================================================================ */
    function openModal(id) {
        const movement = peasantMovements.find(m => m.id === id);
        if (!movement) return;

        modalYear.textContent = movement.year;
        modalTitle.textContent = movement.title;
        modalLocation.textContent = movement.location;
        modalLeaders.textContent = movement.leaders.join(', ');
        modalResistanceForm.textContent = movement.resistanceForm;
        modalEconomicCauses.textContent = movement.description;
        modalOutcome.textContent = movement.outcome;
        modalSources.textContent = movement.sources;

        modalRegionBadge.textContent = `${movement.region} India`;
        modalCauseBadge.textContent = movement.economicCause;
        modalCauseBadge.style.backgroundColor = `${getCauseColor(movement.economicCause)}22`;
        modalCauseBadge.style.color = getCauseColor(movement.economicCause);

        modal.showModal();
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.close();
        document.body.style.overflow = '';
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    /* ================================================================
       8. FILTERING CONTROLS
       ================================================================ */
    function applyFilters() {
        const selectedCause = causeFilter.value;
        const selectedRegion = regionFilter.value;

        filteredMovements = peasantMovements.filter(movement => {
            const matchesCause = selectedCause === 'all' || movement.economicCause === selectedCause;
            const matchesRegion = selectedRegion === 'all' || movement.region === selectedRegion;
            return matchesCause && matchesRegion;
        });

        renderMovementsList();
        renderTimeline();
        updateMapMarkers();
    }

    causeFilter.addEventListener('change', applyFilters);
    regionFilter.addEventListener('change', applyFilters);

    /* ================================================================
       9. INIT
       ================================================================ */
    initMap();
    applyFilters();
    initComparisonDropdowns();
    renderLeaders();

    // Expose helpers globally for testing
    window.peasantMovements = peasantMovements;
    window.getPeasantMovementById = (id) => peasantMovements.find(m => m.id === id);

})();
