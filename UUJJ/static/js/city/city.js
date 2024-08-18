document.addEventListener("DOMContentLoaded", function () {
   var geojsonUrl = "/static/data/seoul-gyeonggi.geojson";

   var map = L.map("map", {
      zoomControl: false,
      dragging: true,
      scrollWheelZoom: true,
      wheelDebounceTime: 40, // 스크롤 휠 이벤트 사이의 최소 시간 간격 (밀리초)
      wheelPxPerZoomLevel: 100, // 줌 레벨 변경에 필요한 스크롤 픽셀 수
      minZoom: 8, // 최소 확대 레벨
      maxZoom: 11, // 최대 확대 레벨
      doubleClickZoom: false,
      touchZoom: false,
   }).setView([37.5665, 127.12], 9);

   // 드래그 가능한 영역 설정 (남서쪽 및 북동쪽 좌표)
   var southWest = L.latLng(38, 125.8);
   var northEast = L.latLng(36.5, 128.4);
   var bounds = L.latLngBounds(southWest, northEast);

   map.setMaxBounds(bounds); // 지도 드래그 범위 제한
   map.fitBounds(bounds); // 지도가 설정된 bounds에 맞게 크기 조정

   // 추가: 지도가 경계 내에 맞지 않을 경우 발생할 수 있는 패딩 설정
   map.options.maxBoundsViscosity = 1; // 드래그 경계에서의 탄성 설정 (0~1)

   var seoulLayer;
   var currentMarkers = [];

   // 아이콘 설정 함수 수정
   function createIcon(iconUrl, size) {
      return L.icon({
         iconUrl: iconUrl,
         iconSize: [size, size],
         iconAnchor: [size / 2, size / 2],
         popupAnchor: [0, -size / 2],
      });
   }

   // 리뷰 개수에 따른 아이콘 크기 계산 함수
   function calculateIconSize(reviewCount, minCount, maxCount) {
      var minSize = 25;
      var maxSize = 50;
      var size = minSize + ((reviewCount - minCount) / (maxCount - minCount)) * (maxSize - minSize);
      return Math.max(minSize, Math.min(maxSize, size));
   }

   // 도시 리스트에 따른 마커 추가 함수 수정
   function addMarkers(cityList, iconType, reviewCounts) {
      clearMarkers();
      var minCount = Math.min(...reviewCounts);
      var maxCount = Math.max(...reviewCounts);

      cityList.forEach(function (cityName, index) {
         var cityLayer = getLayerByCityName(cityName);
         if (cityLayer) {
            var cityCenter = cityLayer.getBounds().getCenter();
            var iconSize = calculateIconSize(reviewCounts[index], minCount, maxCount);
            var icon = createIcon("/static/img/" + iconType + ".png", iconSize);
            var marker = L.marker(cityCenter, { icon: icon }).addTo(map);
            currentMarkers.push(marker);
         }
      });
   }

   // 기존 마커 제거 함수
   function clearMarkers() {
      currentMarkers.forEach(function (marker) {
         map.removeLayer(marker);
      });
      currentMarkers = [];
   }

   // 도시 이름으로 해당 레이어를 찾는 함수
   function getLayerByCityName(cityName) {
      var foundLayer = null;
      seoulLayer.eachLayer(function (layer) {
         if (layer.feature.properties.SIG_KOR_NM === cityName) {
            foundLayer = layer;
         }
      });
      return foundLayer;
   }

   fetch(geojsonUrl)
      .then((response) => response.json())
      .then((data) => {
         seoulLayer = L.geoJSON(data, {
            style: function (feature) {
               return {
                  color: feature.properties.color || "#322F20",
                  weight: 5,
                  fillColor: feature.properties.fillColor || "#FFE55A",
                  fillOpacity: 0.8,
               };
            },
            onEachFeature: function (feature, layer) {
               if (feature.properties && feature.properties.SIG_KOR_NM) {
                  layer.bindPopup(feature.properties.SIG_KOR_NM);
               }
            },
         }).addTo(map);

         // 버튼 클릭 이벤트 수정
         document.querySelector("#Arboretum a").addEventListener("click", function (event) {
            event.preventDefault();
            var reviewCounts = [top5_arboretum[0][1], top5_arboretum[1][1], top5_arboretum[2][1], top5_arboretum[3][1], top5_arboretum[4][1]];
            addMarkers(arboretumCityList, "arboretum", reviewCounts);
         });

         document.querySelector("#gallery a").addEventListener("click", function (event) {
            event.preventDefault();
            var reviewCounts = [top5_gallery[0][1], top5_gallery[1][1], top5_gallery[2][1], top5_gallery[3][1], top5_gallery[4][1]];
            addMarkers(galleryCityList, "gallery", reviewCounts);
         });

         document.querySelector("#spa a").addEventListener("click", function (event) {
            event.preventDefault();
            var reviewCounts = [top5_spa[0][1], top5_spa[1][1], top5_spa[2][1], top5_spa[3][1], top5_spa[4][1]];
            addMarkers(spaCityList, "spa", reviewCounts);
         });

         document.querySelector("#sauna a").addEventListener("click", function (event) {
            event.preventDefault();
            var reviewCounts = [top5_sauna[0][1], top5_sauna[1][1], top5_sauna[2][1], top5_sauna[3][1], top5_sauna[4][1]];
            addMarkers(saunaCityList, "sauna", reviewCounts);
         });
      })
      .catch((error) => console.error("GeoJSON 로딩 에러:", error));
});
