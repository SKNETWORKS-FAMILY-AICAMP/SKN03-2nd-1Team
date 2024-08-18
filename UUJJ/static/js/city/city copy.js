document.addEventListener('DOMContentLoaded', function() {
    var geojsonUrl = "/static/data/seoul-gyeonggi.geojson"; 

    var map = L.map('map', {
        zoomControl: false,        
        dragging: false,        
        scrollWheelZoom: false,    
        doubleClickZoom: false,   
        touchZoom: false          
    }).setView([37.5665, 127.12], 9);

    var seoulLayer;
    var currentMarkers = [];

    // 아이콘 설정
    var icons = {
        arboretum: L.icon({
            iconUrl: '/static/img/arboretum.png',
            // iconUrl: '/static/img/arboretum_icon.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        }),
        gallery: L.icon({
            iconUrl: '/static/img/gallery.png',
            // iconUrl: '/static/img/arboretum_icon.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        }),
        spa: L.icon({
            iconUrl: '/static/img/spa.png',
            // iconUrl: '/static/img/arboretum_icon.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        }),
        sauna: L.icon({
            iconUrl: '/static/img/sauna.png',
            // iconUrl: '/static/img/arboretum_icon.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        })
    };

    // 도시 리스트에 따른 마커 추가 함수
    function addMarkers(cityList, iconType) {
        clearMarkers(); // 기존 마커 제거
        cityList.forEach(function(cityName) {
            // 각 도시의 좌표를 얻고 마커를 추가합니다.
            var cityLayer = getLayerByCityName(cityName);
            if (cityLayer) {
                var cityCenter = cityLayer.getBounds().getCenter();
                var marker = L.marker(cityCenter, {icon: icons[iconType]}).addTo(map);
                currentMarkers.push(marker);
            }
        });
    }

    // 기존 마커 제거 함수
    function clearMarkers() {
        currentMarkers.forEach(function(marker) {
            map.removeLayer(marker);
        });
        currentMarkers = [];
    }

    // 도시 이름으로 해당 레이어를 찾는 함수
    function getLayerByCityName(cityName) {
        var foundLayer = null;
        seoulLayer.eachLayer(function(layer) {
            if (layer.feature.properties.SIG_KOR_NM === cityName) {
                foundLayer = layer;
            }
        });
        return foundLayer;
    }

    fetch(geojsonUrl)
        .then(response => response.json())
        .then(data => {
            seoulLayer = L.geoJSON(data, {
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

            // 버튼 클릭 이벤트
            document.querySelector('#arboretum a').addEventListener('click', function(event) {
                event.preventDefault();
                addMarkers(arboretumCityList, 'arboretum');
            });

            document.querySelector('#gallery a').addEventListener('click', function(event) {
                event.preventDefault();
                addMarkers(galleryCityList, 'gallery');
            });

            document.querySelector('#spa a').addEventListener('click', function(event) {
                event.preventDefault();
                addMarkers(spaCityList, 'spa');
            });

            document.querySelector('#sauna a').addEventListener('click', function(event) {
                event.preventDefault();
                addMarkers(saunaCityList, 'sauna');
            });
        })
        .catch(error => console.error('GeoJSON 로딩 에러:', error));
});
