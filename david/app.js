 // circle chart
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("park_species.csv", function(speciesData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================

    speciesData.forEach(function(data) {
      data.Park_Name = data.Park_Name
      data.Park_ID = +data.Park_ID;
      data.Species_ID = +data.Species_ID

      console.log(data.Park_Name)
    });


    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(speciesData, d => d.Park_ID))
    .range([0, width]);
    // var xLinearScale = d3.scaleLinear()
    //   .domain([30, d3.max(speciesData, d => d.Park_ID)])
    //   .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(speciesData, d => d.Species_ID)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .text(speciesData, d => d.Park_Name)
      .call(d3.axisBottom(xLinearScale)
                 .ticks(function(d){return d.Park_Name;}));
// append new bottom axis

// end append for new axis
    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("cicle")
    .data(speciesData)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xLinearScale(d.Park_ID); })

    // function(d) { return x(d.date); })
    .attr("cy",function(d) { return yLinearScale(d.Species_ID); })
     // d => yLinearScale(d.Species_ID))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

// add x axis labels
svg.append("g")
     .attr("transform", "translate(0," + height + ")")




    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.Park_Name}<br>Species: ${d.Species_ID}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Number Of Species At Each Park");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("National Park (Name)");
  });
  // end cicle chart

//   // Chart Params
//   var svgWidth = 960;
//   var svgHeight = 500;
//
//   var margin = { top: 20, right: 40, bottom: 60, left: 50 };
//
//   var width = svgWidth - margin.left - margin.right;
//   var height = svgHeight - margin.top - margin.bottom;
//
//   // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
//   var svg = d3
//     .select(".chart")
//     .append("svg")
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);
//
//   var chartGroup = svg.append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);
//
//   // Import data from an external CSV file
//   d3.csv("species_count1.csv", function(error, countData) {
//     if (error) throw error;
//
//     console.log(countData);
//
//
//     // Format the data
//     countData.forEach(function(data) {
//       data.park_id = +data.park_id;
//       data.Bird = +data.Bird;
//       data.Mammal = +data.Mammal;
//       data.Reptile = +data.Reptile;
//       data.Plant = +data.Spider_Scorpion
//
//     });
//     console.log(countData)
//
//     // Create scaling functions
//     var xTimeScale = d3.scaleLinear()
//       .domain(d3.extent(countData, d => d.park_id))
//       .range([0, width]);
//
//     var yLinearScale1 = d3.scaleLinear()
//       .domain([0, d3.max(countData, d => d.Bird)])
//       .range([height, 0]);
//
//     // var yLinearScale2 = d3.scaleLinear()
//     //   .domain([0, d3.max(countData, d => d.Mammal)])
//     //   .range([height, 0]);
//     //
//     // var yLinearScale3 = d3.scaleLinear()
//     //   .domain([0, d3.max(countData, d => d.Reptile)])
//     //   .range([height, 0]);
//     //
//     // var yLinearScale4 = d3.scaleLinear()
//     //   .domain([0, d3.max(countData, d => d.Spider_Scorpion)])
//     //   .range([height, 0]);
//
//     // Create axis functions
//     var bottomAxis = d3.axisBottom(xTimeScale)
// 	  ;
//       // .tickFormat(d3.xTimeScale());
//     var leftAxis = d3.axisLeft(yLinearScale1);
//     // var leftAxis = d3.axisLeft(yLinearScale2);
//     // var leftAxis = d3.axisLeft(yLinearScale3);
//     // var leftAxis = d3.axisLeft(yLinearScale4);
//
//
//     // Add x-axis
//     chartGroup.append("g")
//       .attr("transform", `translate(0, ${height})`)
//
//       .call(bottomAxis);
//
//     // Add y1-axis to the left side of the display
//     chartGroup.append("g")
//       // Define the color of the axis text
//       .classed("green", true)
//       .call(leftAxis);
//
//     // // Add y2-axis to the right side of the display
//     // chartGroup.append("g")
//     //   // Define the color of the axis text
//     //   .classed("blue", true)
//     //   .attr("transform", `translate(${width}, 0)`)
//     //   .call(rightAxis);
//
//     // Line generators for each line
//     var line1 = d3.line()
//       .x(d => xTimeScale(d.park_id))
//       .y(d => yLinearScale1(d.Bird));
//
//     // var line2 = d3.line()
//     //   .x(d => xTimeScale(d.park_id))
//     //   .y(d => yLinearScale1(d.Mammal));
//     //
//     // var line3 = d3.line()
//     //   .x(d => xTimeScale(d.park_id))
//     //   .y(d => yLinearScale1(d.Reptile));
//     //
//     //   var line4 = d3.line()
//     //     .x(d => xTimeScale(d.park_id))
//     //     .y(d => yLinearScale1(d.Spider_Scorpion));
//
//     // Append a path for line1
//     chartGroup.append("path")
//       .data([countData])
//       .attr("d", line1)
//       .attr('stroke', 'red')
//       .attr('stroke-width', 2)
//       .attr('fill', 'none')
//       .classed("line red", true);
//
//     // // Append a path for line2
//     // chartGroup.append("path")
//     //   .data([countData])
//     //   .attr("d", line2)
//     //   .attr('stroke', 'blue')
//     //   .attr('stroke-width', 2)
//     //   .attr('fill', 'none')
//     //   .classed("line blue", true);
//     //
//     //   // Append a path for line3
//     //   chartGroup.append("path")
//     //     .data([countData])
//     //     .attr("d", line3)
//     //     .attr('stroke', 'green')
//     //     .attr('stroke-width', 2)
//     //     .attr('fill', 'none')
//     //     .classed("line green", true);
//     //
//     //
//     //     chartGroup.append("path")
//     //       .data([countData])
//     //       .attr("d", line4)
//     //       .attr('stroke', 'black')
//     //       .attr('stroke-width', 2)
//     //       .attr('fill', 'none')
//     //       .classed("line yellow", true);
//
//           // Step 5: Create Circles
//               // ==============================
//               //  Line-circle 1
//               var circlesGroup1 = chartGroup.selectAll("circle")
//               .data(countData)
//               .enter()
//               .append("circle")
//               .attr("cx", function(d) { return xTimeScale(d.park_id); })
//
//               // function(d) { return x(d.date); })
//               .attr("cy",function(d) { return yLinearScale1(d.Bird); })
//                // d => yLinearScale(d.Species_ID))
//               .attr("r", "5")
//               .attr("fill", "red")
//               .attr("opacity", ".5");
//
// // // Line-circle 2
// // var circlesGroup2 = chartGroup.selectAll("cicle")
// // .data(countData)
// // .enter()
// // .append("circle")
// // .attr("cx", function(d) { return xTimeScale(d.park_id); })
// //
// // // function(d) { return x(d.date); })
// // .attr("cy",function(d) { return yLinearScale1(d.Mammal); })
// //  // d => yLinearScale(d.Species_ID))
// // .attr("r", "5")
// // .attr("fill", "blue")
// // .attr("opacity", ".5");
// //
// // // line-circle 3
// // var circlesGroup3 = chartGroup.selectAll("cicle")
// // .data(countData)
// // .enter()
// // .append("circle")
// // .attr("cx", function(d) { return xTimeScale(d.park_id); })
// //
// // // function(d) { return x(d.date); })
// // .attr("cy",(d => yLinearScale1(d.Reptile)))
// //  // d => yLinearScale(d.Species_ID))
// // .attr("r", "5")
// // .attr("fill", "green")
// // .attr("opacity", ".5");
// //
// // // line-circle 4
// // var circlesGroup4 = chartGroup.selectAll("cicle")
// // .data(countData)
// // .enter()
// // .append("circle")
// // .attr("cx", function(d) { return xTimeScale(d.park_id); })
// //
// // // function(d) { return x(d.date); })
// // // (d => yLinearScale1(d.Spider_Scorpion))
// // .attr("cy",(d => yLinearScale1(d.Spider_Scorpion)))
// //  // d => yLinearScale(d.Species_ID))
// // .attr("r", "5")
// // .attr("fill", "black")
// // .attr("opacity", ".5");
//
// // // Step 6: Initialize tool tip Line 1
// //     // ==============================
//     var toolTip = d3.tip()
//       .attr("class", "tooltip")
//       .offset([80, -60])
//       .html(function(d) {
//         return (`${d.park_name}<br>Species, Bird: ${d.Bird}`);
//       });
//
//     // Step 7: Create tooltip in the chart
//     // ==============================
//     chartGroup.call(toolTip);
//
//     // Step 8: Create event listeners to display and hide the tooltip
//     // ==============================
//     circlesGroup1.on("mouseover", function(data) {
//       toolTip.show(data, this);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//
//
//    });
//    // Create axes labels
//     chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 0)
//       .attr("x", 0 - (height))
//       .attr("dy", "1em")
//       .attr("class", "axisText")
//       .text("Number Of Bird Species At Each Park");
//
//     chartGroup.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "axisText")
//       .text("National Park (Name)");
//    });
