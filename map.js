const map = L.map('map')
    .setView([46.801111, 8.226667], 13);

map.attributionControl.setPrefix('');

const basemap =  L.tileLayer('https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg', {
	attribution: '&copy; <a href="https://www.swisstopo.admin.ch/">swisstopo</a>',
	minZoom: 2,
	maxZoom: 19,
	bounds: [[45.398181, 5.140242], [48.230651, 11.47757]]
});
basemap.addTo(map);

let poiLayer = null;
let mapFilterElement = null;

initializeMap();

/**
 * Initialize the webmap.
 */
async function initializeMap() {

    const response = await fetch('../data/stp.gastwirtschaftsbetriebe.json');
    const data = await response.json();

    createFilterDropdown(data);

    poiLayer = L.geoJSON(data, {
        onEachFeature: (feature, layer) => {
            
            const properties = feature.properties;
            
            const categoryColor = getColor(properties['betriebsart']);

            layer.bindPopup(`
                <p class="leaflet-popup-category" style="--marker-color: ${categoryColor};">
                    ${properties['betriebsart']}
                </p>
                <h3>${properties['betriebsname']}</h3>
                <p>
                    ${properties['strasselang']} ${properties['hnr']}<br/>
                    ${properties['plz']} ${properties['ort']}
                </p>
            `);
        },
        filter: (feature) => {
            if (mapFilterElement && mapFilterElement.value != '') {
                return feature.properties['betriebsart'] == mapFilterElement.value;
            }
            return true;
        },
        pointToLayer: (feature, point) => { 
            const categoryColor = getColor(feature.properties['betriebsart']);
            return L.marker(point, {
                icon: L.divIcon({
                    className: "leaflet-marker-container",
                    iconAnchor: [0, 24],
                    labelAnchor: [-6, 0],
                    popupAnchor: [0, -36],
                    html: `<span class="leaflet-marker" style="--marker-color: ${categoryColor};" />`
                })
            }); 
        },
        attribution: `
            <a href="https://data.stadt-zuerich.ch/dataset/geo_gastwirtschaftsbetriebe" target="_blank">Stadt Zürich</a>
        `
    });

    const bounds = poiLayer.getBounds();
    map.fitBounds(bounds);
    
    poiLayer.addTo(map);

}

/**
 * Creates a filter dropdown for feature's category (betriebsart).
 * @param {object} data 
 */
async function createFilterDropdown(data) {

    const filterDropdownControl = L.control({position: 'topright'});

    filterDropdownControl.onAdd = () => {

        const div = L.DomUtil.create('div', 'leaflet-filter-control');

        mapFilterElement = document.createElement('select');

        const categories = [];

        for (const feature of data.features) {
            const properties = feature.properties;
            const category = properties['betriebsart'];
            categories.push(category);
        }

        const options = Array.from(new Set(categories))
            .sort((a, b) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            })
            .map(category => new Option(category, category));

        options.unshift(new Option('-- no filter selected --', ''));

        for (let option of options) {
            mapFilterElement.add(option);
        }

        mapFilterElement.addEventListener('change', () => {
            poiLayer.clearLayers();
            poiLayer.addData(data);
        });

        L.DomEvent.disableClickPropagation(div);

        div.appendChild(mapFilterElement);
        return div;

    };

    filterDropdownControl.addTo(map);

}

/**
 * Generates a color using the category string. The code is based
 * on a function written by Joe Freeman on StackOverflow.
 * 
 * @param {string} category 
 * @returns a hex code, e.g., #424874
 * @see https://stackoverflow.com/a/16348977/42659
 */
function getColor(category) {
    var hash = 0;
    for (var i = 0; i < category.length; i++) {
        hash = category.charCodeAt(i) + ((hash << 2) - hash);
    }
    var color = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
}