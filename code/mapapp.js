var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  PROTECTION_NEEDED: new L.LayerGroup(),
  MUST_VISIT: new L.LayerGroup(),
};

var map = L.map("map-id", {
  center : [39.573, -99.838],
  zoom: 7,
  layers: [
    layers.PROTECTION_NEEDED,
    layers.MUST_VISIT
  ]
});

lightmap.addTo(map);

var overlays = {
  "Protection Needed": layers.PROTECTION_NEEDED,
  "Must Visit": layers.MUST_VISIT
};

// Control panel for layers, and adding layers into it
L.control.layers(null, overlays).addTo(map);

var info = L.control({
  position: "bottomright"
});

// insering div with legend class

info.onAdd = function(){
  var div = L.DomUtil.create("div", "legend");
  return div;
};

info.addTo(map);

console.log("hello2");

// icons object for each layer
// var icons = {
//   PROTECTION_NEEDED: L.ExtraMarkers.icon({
//     icon: "ion-minus-circled",
//     iconColor:"white",
//     markerColor:"red",
//     shape: "circle"
//   }),
//   MUST_VISIT: L.ExtraMarkers.icon({
//     icon: "ion-settings",
//     iconColor: "white",
//     markerColor: "yellow",
//     shape: "star"
//   })
// };






function updateLegend(protect) {
  document.querySelector(".legend").innerHTML = [
    "<p class = 'protection-needed'> Protection Needed Parks: " + protect + "</p>",
    // "<p class = 'must-visit'> Must See Parks: " + visit.length + "</p>"
  ].join("");
};

// load csv data

// d3.csv("../Output/data.csv", function(parks) {
//
//
//     var names = parks.map(data => data.park_name);
//     var id = parks.map(data => data.species_id);
//     var abundance = parks.map(data => data.abundance);
//     var nativeness = parks.map(data => data.nativeness);
//     var conservation_status = parks.map(data => data.conservation_status);
//     var coordinates = parks.map(data => data.location);
//     var occurrence = parks.map(data => data.occurrence);
//     var location = parks.map(data => data.location);
//     var latitude = parks.map(data => data.latitude);
//     var longitude = parks.map(data => data.longitude)
    //
    //
    // var metadata = JSON.parse(userdata);
    //
    // for (var i = 0; i < metadata.length; i++) {

    // var names = metadata[i].park_name;
    // var id = metadata[i].species_id;
    // var abundance = metadata[i].abundance;
    // var nativeness = metadata[i].nativeness;
    // var conservation_status = metadata[i].conservation_status;
    // var coordinates = metadata[i].coordinates;
    // var occurrence = metadata[i].occurrence;
    // var location = metadata[i].location;
    // var latitude = metadata[i].latitude;
    // var longitude = metadata[i].longitude


    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open('GET', 'Out/cafe4.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
              }
        };
        xobj.send(null);
     }


     function init() {
       loadJSON(function(response) {
        // Parse JSON string into object
        var metadata = JSON.parse(response);

        // var parkCount = {
        //   PROTECTION_NEEDED: 0,
        //   MUST_VISIT: 0
        // };

        var protect = {};
        var visit = {};
        var protectMarkers = [];
        var visitMarkers = [];


            for (var i = 0; i < metadata.length; i++) {
                    //
                    var names = metadata[i].park_name;
                    var id = metadata[i].species_id;
                    var abundance = metadata[i].abundance;
                    var nativeness = metadata[i].nativeness;
                    var conservation_status = metadata[i].conservation_status;
                    var coordinates = metadata[i].coordinates;
                    var occurrence = metadata[i].occurrence;
                    var locations = metadata[i].location;
                    var latitude = metadata[i].latitude;
                    var longitude = metadata[i].longitude;




                    if (nativeness === 'Native' && conservation_status === 'Endangered'){
                          if (!protect[names]){
                       protect[names] = 1;
                       protect[locations] = 1;
                     }
                          else{
                          protect[names]++;
                          protect[locations]++;
                        }

                    }




                     if (occurrence === "Present" && abundance === "Rare") {
                                if(!visit[names]){
                                  visit[names] = 1;
                                  visit[locations] = 1;
                                }
                                else{
                                  visit[names]++;
                                  visit[locations]++;
                                }

                          }

                    console.log("locations", proctect.locations);
                    //


              }
                      console.log("protect", protect);
                            console.log("visit", visit);

                          // Object.keys(protect)


                            function markerSize() {
                              return Object.values(protect)*10;
                              var degerler = Object.values(protect)*10;
                            }

                                // console.log("values", Object.values(protect));

                                var circle_size = Object.values(protect);



                            for (var j = 0; j < protect.length; j++) {

                            // protectMarkers.push(


                              // L.circle( {
                              //   stroke: false,
                              //   fillOpacity: 0.6,
                              //   color: "yellow",
                              //   fillColor: "red",
                              //   radius: circle_size[i]*10,
                              // }).addTo(myMap);
                            // );
                            }

                      // var newMarker = L.marker([metadata[i].latitude, metadata[i].longitude], {
                        //   icon: icons[layerCode]
                        // });
                        //
                        // newMarker.addTo(layers[layerCode]);
                        //
                        // newMarker.bindPopup(metadata[i].park_name);

    // for (var i = 0; i < id.length; i++){

    // new object for both objects
    // var station = Object.assign({}, info[i]);

  // updateLegend(protect, visit);
   });
};


init();
