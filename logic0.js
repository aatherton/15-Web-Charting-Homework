// Store our API endpoint as queryUrl
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";


var markers = new Array()
// Per-form a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Using the features array sent back in the API data, create a GeoJSON layer and add it to the map
  data.features.forEach( function(each) {
	let ball = each["geometry"]["coordinates"]
	markers.push(
		L.marker([ball[1], ball[0]])
			.bindPopup(`Magnitude: ${each["properties"]["mag"]}`)
	)
  });
  
});

markergroup = L.layerGroup(markers);



// Define variables for our base layers
let mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
let accessToken = 'pk.eyJ1IjoicmluY2tkIiwiYSI6ImNpamc3ODR1aDAxMmx0c2x0Zm9lc3E1OTAifQ.pIkP7PdJMrR5TBIp93Dlbg';
let streetMap = L.tileLayer(mapboxUrl, {id: 'mapbox.light', maxZoom: 20, accessToken: accessToken});
let darkMap = L.tileLayer(mapboxUrl, {id: 'mapbox.dark', maxZoom: 20, accessToken: accessToken});

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetMap,
  "Dark Map": darkMap
};

var overlays = {
	"test stuff": markergroup
}

// Create a new map
console.log(markers)
var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: streetMap
});

// Create a layer control containing our baseMaps
// Create a layer control containing our baseMaps
// Be sure to add an overlay Layer containing the earthquake GeoJSON
L.control.layers(baseMaps, overlays).addTo(myMap);
