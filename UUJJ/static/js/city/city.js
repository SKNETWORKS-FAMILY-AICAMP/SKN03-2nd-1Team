document.addEventListener('DOMContentLoaded', function() {
    var geojsonUrl = "/static/data/seoul-gyeonggi.geojson"; 

    var map = L.map('map', {
        zoomControl: false,        
        dragging: false,        
        scrollWheelZoom: false,    
        doubleClickZoom: false,   
        touchZoom: false          
    }).setView([37.5665, 126.978], 9);

    fetch(geojsonUrl)
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: function(feature) {
                    return {
                        color: feature.properties.color || "#BBBBBB", 
                        weight: 2,
                        fillColor: feature.properties.fillColor || "#66822E", 
                        fillOpacity: 0.8
                    };
                },
                onEachFeature: function(feature, layer) {
                    if (feature.properties && feature.properties.SIG_KOR_NM) {
                        layer.bindPopup(feature.properties.SIG_KOR_NM);
                    }
                }
            }).addTo(map);
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
});