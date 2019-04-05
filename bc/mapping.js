
// function updateLegend(protect) {
//   document.querySelector(".legend").innerHTML = [
//     "<p class = 'protection-needed'> Protection Needed Parks: " + protect + "</p>",
//     // "<p class = 'must-visit'> Must See Parks: " + visit.length + "</p>"
//   ].join("");
// };

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
    layers.MUST_VISIT,
  ]
});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
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
        var protect_lat = {};
        var visit_lat = {};
        var protect_lon = {};
        var visit_lon = {};

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

                    //
                    //
                    //
                    if (nativeness === 'Native' && conservation_status === 'Endangered'){
                          if (!protect[names]){
                              protect[names] = {};
                              protect[names]["pcount"] = 1;
                              protect[names]["lati"] = Number(latitude);
                              protect[names]["longi"] = Number(longitude);
                          }
                          else{
                          protect[names]["pcount"]++;
                          }
                         //  if (!protect_lat[latitude]) {
                         //       protect_lat[latitude] = 1
                         //  }
                         //  else{
                         //       protect_lat[latitude]++;
                         //     }
                         // if (!protect_lon[longitude]) {
                         //      protect_lon[longitude] = 1
                         // }
                         // else{
                         //      protect_lon[longitude]++;
                         //    }
                          }

                          //
                     //      //
                     // if (occurrence === "Present" && abundance === "Rare") {
                     //            if(!visit[names]){
                     //              visit[names] = 1;
                     //            }
                     //            else{
                     //              visit[names]++;
                     //            }
                     //            if (!visit_lat[latitude]) {
                     //                 visit_lat[latitude] = 1;
                     //            }
                     //            else{
                     //                 visit_lat[latitude]++;
                     //            }
                     //            if (!visit_lon[longitude]) {
                     //                 visit_lon[longitude] = 1;
                     //            }
                     //            else{
                     //                 visit_lon[longitude]++;
                     //            }
                     //         }
                     //
                     //      }

                        //
                        // var plat = Object.keys(protect_lat);
                        // var plon = Object.keys(protect_lon);
                        // var vlat = Object.keys(visit_lat);
                        // var vlon = Object.keys(visit_lon);
                        // console.log(protect);
                        //

                      //   end of for loop

                          //
                          // var circle_size = Object.values(protect)*10;
                          //
                          }



                          var heatArray = [];


                          for (let [key, value] of Object.entries(protect)) {

                          var lat_heat = value["lati"];
                          var lon_heat = value["longi"];
                          var count = value["pcount"];
                          //
                            if (lat_heat) {

                              heatArray.push([[lat_heat, lon_heat],count]);

                            }
                          }
                          console.log(heatArray);

                          // var cfg = {
                          //   "radius": 2,
                          //   "maxOpacity": .8,
                          //   "scaleRadius": true,
                          //   "useLocalExtrema": true,
                          //   latField: 'lati',
                          //   lngField: 'longi',
                          //   valueField: 'count'
                          //   };
                          //
                          //   var heatmapLayer = new HeatmapOverlay(cfg);
                          //   heatmapLayer.setData(protect);


//
//
                          var heat = L.heatLayer(heatArray[0], {
                            radius: 5,
                            blur: 50
                          }).addTo(map);
//
//                             console.log(heatArray);
//                             console.log(metadata.length);
}

)};
                        // end of init function

init();
































                            // for (var j = 0; j < protect.length; j++) {
                            //
                            // protectMarkers.push(
                            //
                            //
                            //   L.circle( {
                            //     stroke: false,
                            //     fillOpacity: 0.6,
                            //     color: "yellow",
                            //     fillColor: "red",
                            //     radius: circle_size[i]*10,
                            //   }).addTo(myMap);
                            // );
                            //

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
