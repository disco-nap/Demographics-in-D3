


// set the SVG height and width
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Retrieve data from the CSV file and execute everything below
d3.csv("data.csv", function(err, demoData) {
  if (err) throw err;

  // parse data
  demoData.forEach(function(data) {
    data.smokes = +data.smokes;
    data.income = +data.income;
    console.log(data.smokes)
    console.log(data.income)

  })
});


// Initial Params
var XAxis = "smokes";

// xLinearScale function above csv import
var xLinearScale = xScale(demoData, XAxis);

// Create y scale function
var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(demoData, d => d.income)])
  .range([height, 0]);

// Create initial axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// append x axis
var xAxis = chartGroup.append("g")
  .classed("x-axis", true)
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

// append y axis
chartGroup.append("g")
  .call(leftAxis);

// append initial circles
var circlesGroup = chartGroup.selectAll("circle")
  .data(demoData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.smokes))
  .attr("cy", d => yLinearScale(d.income))
  .attr("r", 20)
  .attr("fill", "pink")
  .attr("opacity", ".5");

  // append x axis
  chartGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .classed("axis-text", true)
    .text("Percent of Smokers");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Number of Billboard 500 Hits");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
