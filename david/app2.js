  // Chart Params
  var svgWidth = 960;
  var svgHeight = 500;

  var margin = { top: 20, right: 40, bottom: 60, left: 50 };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
  var svg = d3
    .select(".chart2")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Import data from an external CSV file
  d3.csv("species_count1.csv", function(error, countData) {
    if (error) throw error;

    console.log(countData);


    // Format the data
    countData.forEach(function(data) {
      data.park_id = +data.park_id;
      data.Bird = +data.Bird;
      data.Mammal = +data.Mammal;
      data.Reptile = +data.Reptile;
      data.Plant = +data.Spider_Scorpion

    });
    console.log(countData)

    // Create scaling functions
    var xTimeScale = d3.scaleLinear()
      .domain(d3.extent(countData, d => d.park_id))
      .range([0, width]);


    var yLinearScale1 = d3.scaleLinear()
      .domain([0, d3.max(countData, d => d.Reptile)])
      .range([height, 0]);


    // Create axis functions
    var bottomAxis = d3.axisBottom(xTimeScale)
	  ;

    var leftAxis = d3.axisLeft(yLinearScale1);

    // Add x-axis
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)

      .call(bottomAxis);

    // Add y1-axis to the left side of the display
    chartGroup.append("g")
      // Define the color of the axis text
      .classed("green", true)
      .call(leftAxis);





    var line2 = d3.line()
      .x(d => xTimeScale(d.park_id))
      .y(d => yLinearScale1(d.Reptile));



    // // Append a path for line1
    // chartGroup.append("path")
    //   .data([countData])
    //   .attr("d", line1)
    //   .attr('stroke', 'red')
    //   .attr('stroke-width', 2)
    //   .attr('fill', 'none')
    //   .classed("line red", true);

    // Append a path for line2
    chartGroup.append("path")
      .data([countData])
      .attr("d", line2)
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .classed("line blue", true);
    //

          // Step 5: Create Circles
              // ==============================
              //  Line-circle 1
              var circlesGroup1 = chartGroup.selectAll("circle")
              .data(countData)
              .enter()
              .append("circle")
              .attr("cx", function(d) { return xTimeScale(d.park_id); })

              // function(d) { return x(d.date); })
              .attr("cy",function(d) { return yLinearScale1(d.Reptile); })
               // d => yLinearScale(d.Species_ID))
              .attr("r", "5")
              .attr("fill", "red")
              .attr("opacity", ".5");

// // Step 6: Initialize tool tip Line 1
//     // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.park_name}<br>Species, Reptile: ${d.Reptile}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup1.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);


   });
   // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 0)
      .attr("x", 0 - (height))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Number Of Reptiles Species At Each Park");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("National Park (Name)");
   });
