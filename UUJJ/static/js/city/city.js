document.addEventListener('DOMContentLoaded', function() {
    var geojsonUrl = "/static/data/seoul-gyeonggi.geojson"; 

    var map = L.map('map', {
        zoomControl: false,        
        dragging: false,        
        scrollWheelZoom: false,    
        doubleClickZoom: false,   
        touchZoom: false          
    }).setView([37.5665, 127.12], 7);

    fetch(geojsonUrl)
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: function(feature) {
                    return {
                        color: feature.properties.color || "#322F20", 
                        weight: 5,
                        fillColor: feature.properties.fillColor || "#FFE55A", 
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