//Main Layer

var tileLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
});
var rememberLat = document.getElementById('latitude').value;
var rememberLong = document.getElementById('longitude').value;
if( !rememberLat || !rememberLong ) { rememberLat = 0; rememberLong = 0;}
var map = new L.Map('map', {
  'center': [rememberLat, rememberLong],
  'zoom': 2,
  'layers': [tileLayer]
});
var marker = L.marker([rememberLat, rememberLong],{
  draggable: true
}).addTo(map);
marker.on('dragend', function (e) {
  updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
});

//Search Module

var searchControl = new L.esri.Controls.Geosearch().addTo(map);

  var results = new L.LayerGroup().addTo(map);

  searchControl.on('results', function(data){
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

setTimeout(function(){$('.pointer').fadeOut('slow');},3400);

//Load File
L.Control.FileLayerLoad.LABEL = '<img class="icon" src="https://img.icons8.com/nolan/64/000000/folder-invoices.png" alt="file icon"/>';
L.Control.fileLayerLoad({
        layer: L.geoJson,
        layerOptions: {style: {color:'red'}},
        addToMap: true,
        fileSizeLimit: 1024,
        formats: [
            '.geojson',
            '.kml',
            '.gpx',
            '.json',

        ]
    }).addTo(map);

L.control.navbar().addTo(map);

//Button Fuction
function updateLatLng(lat,lng,reverse) {
  if(reverse) {
    marker.setLatLng([lat,lng]);
    map.panTo([lat,lng]);
  } else {
  document.getElementById('latitude').value = marker.getLatLng().lat;
  document.getElementById('longitude').value = marker.getLatLng().lng;
  map.panTo([lat,lng]);
  }
}

