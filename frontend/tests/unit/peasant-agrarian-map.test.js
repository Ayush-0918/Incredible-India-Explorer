import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadPeasantScript() {
    const code = readFileSync(
        resolve(__dirname, '../../agriculture-map/script.js'),
        'utf-8'
    );
    
    const mockElement = {
        addEventListener: () => {},
        appendChild: () => {},
        innerHTML: '',
        querySelector: () => mockElement,
        querySelectorAll: () => [mockElement],
        value: 'all',
        classList: {
            add: () => {},
            remove: () => {},
            contains: () => false,
            toggle: () => false
        },
        setAttribute: () => {},
        style: {}
    };

    const mockDocument = {
        readyState: 'complete',
        addEventListener: () => {},
        createElement: () => mockElement,
        body: {
            classList: {
                add: () => {},
                remove: () => {},
                replace: () => {},
                contains: () => false,
                toggle: () => false
            }
        },
        getElementById: (id) => {
            if (id === 'theme-toggle') return mockElement;
            if (id === 'cause-filter') return mockElement;
            if (id === 'region-filter') return mockElement;
            if (id === 'compare-a') return mockElement;
            if (id === 'compare-b') return mockElement;
            if (id === 'comparison-display') return mockElement;
            if (id === 'leaders-grid') return mockElement;
            if (id === 'peasant-map') return mockElement;
            if (id === 'movements-list') return mockElement;
            if (id === 'timeline-nodes-wrapper') return mockElement;
            if (id === 'movement-modal') return {
                showModal: () => {},
                close: () => {},
                addEventListener: () => {}
            };
            if (id === 'close-modal') return mockElement;
            if (id === 'modal-year') return mockElement;
            if (id === 'modal-title') return mockElement;
            if (id === 'modal-region-badge') return mockElement;
            if (id === 'modal-cause-badge') return mockElement;
            if (id === 'modal-location') return mockElement;
            if (id === 'modal-leaders') return mockElement;
            if (id === 'modal-resistance-form') return mockElement;
            if (id === 'modal-economic-causes') return mockElement;
            if (id === 'modal-outcome') return mockElement;
            if (id === 'modal-sources') return mockElement;
            return null;
        },
        querySelector: () => mockElement,
        querySelectorAll: () => []
    };

    const mockL = {
        map: () => ({
            setView: function() { return this; },
            removeLayer: () => {},
            fitBounds: () => {},
            panTo: () => {},
            invalidateSize: () => {}
        }),
        marker: () => ({
            bindPopup: () => {},
            on: () => {}
        }),
        divIcon: () => {},
        layerGroup: () => ({
            addTo: () => ({
                clearLayers: () => {},
                addLayer: () => {}
            })
        }),
        tileLayer: () => ({
            addTo: () => {}
        })
    };

    const mockLocalStorage = {
        getItem: () => 'dark',
        setItem: () => {}
    };

    const window = {};

    const fn = new Function('window', 'document', 'localStorage', 'L', code + '\nreturn window;');
    return fn(window, mockDocument, mockLocalStorage, mockL);
}

describe('Peasant and Agrarian Uprisings Dataset & Component Tests', () => {
    it('dataset contains at least 10 major colonial rebellions', () => {
        const win = loadPeasantScript();
        const peasantMovements = win.peasantMovements;

        expect(peasantMovements).toBeDefined();
        expect(Array.isArray(peasantMovements)).toBe(true);
        expect(peasantMovements.length).toBeGreaterThanOrEqual(10);

        // Verify key fields on every rebellion item
        peasantMovements.forEach(m => {
            expect(m.id).toBeDefined();
            expect(m.title).toBeDefined();
            expect(m.year).toBeDefined();
            expect(m.region).toBeDefined();
            expect(m.location).toBeDefined();
            expect(Array.isArray(m.coords)).toBe(true);
            expect(m.coords.length).toBe(2);
            expect(m.economicCause).toBeDefined();
            expect(m.resistanceForm).toBeDefined();
            expect(Array.isArray(m.leaders)).toBe(true);
            expect(m.outcome).toBeDefined();
            expect(m.description).toBeDefined();
            expect(m.sources).toBeDefined();
        });
    });

    it('HTML has Leaflet components, comparison selector forms, and filter dropdowns', () => {
        const html = readFileSync(
            resolve(__dirname, '../../agriculture-map/index.html'),
            'utf-8'
        );

        // Leaflet references
        expect(html).toContain('leaflet.css');
        expect(html).toContain('leaflet.js');

        // Layout targets
        expect(html).toContain('id="peasant-map"');
        expect(html).toContain('id="cause-filter"');
        expect(html).toContain('id="region-filter"');
        expect(html).toContain('id="compare-a"');
        expect(html).toContain('id="compare-b"');
        expect(html).toContain('id="comparison-display"');
        expect(html).toContain('id="timeline-nodes-wrapper"');
    });

    it('correctly fetches movement by ID using script helpers', () => {
        const win = loadPeasantScript();
        const champaran = win.getPeasantMovementById('champaran-satyagraha');
        expect(champaran).toBeDefined();
        expect(champaran.title).toContain('Champaran');
        expect(champaran.leaders).toContain('Mahatma Gandhi');
    });
});
