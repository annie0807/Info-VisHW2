// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialise a X axis:
//var x = d3.scaleLinear().range([0,width]);
//var xAxis = d3.axisBottom().scale(x);
//svg.append("g")
  //.attr("transform", "translate(0," + height + ")")
  //.attr("class","myXaxis")

// Initialize an Y axis
//var y = d3.scaleLinear().range([height, 0]);
//var yAxis = d3.axisLeft().scale(y);
//svg.append("g")
  //.attr("class","myYaxis")



// Initialize the X axis
const x = d3.scaleLinear()
    .range([0,width]);
const xAxis = svg.append("g")
  .attr("transform", `translate(0,${height})`);

// Initialize the Y axis
const y = d3.scaleLinear()
  .range([ height, 0]);
const yAxis = svg.append("g")
  .attr("class", "myYaxis");



// Create a function that takes a dataset as input and update the plot:
function update(selectedVar) {
    d3.csv("售電量.csv").then( function(data){
    console.log(data)
  // Create the X axis:
  //x.domain(data.map(function(d) { return d.年度; }))
  //svg.selectAll(".myXaxis").transition()
    //.duration(3000)
    //.call(xAxis);

  x.domain([d3.min(data, function(d) { return d.年度 }), d3.max(data, function(d) { return d.年度 }) ]);
  xAxis.transition().duration(1000).call(d3.axisBottom(x));

    

  // create the Y axis
  //y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
  //svg.selectAll(".myYaxis")
    //.transition()
    //.duration(3000)
    //.call(yAxis);

  // Add Y axis
  //y.domain([0, d3.max(data, d => +d[selectedVar]) ]);
  //y.domain([0, 2600]);
  y.domain([100, d3.max(data, d => +d[selectedVar]) ]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));


  // Create a update selection: bind to the new data
  //var u = svg.selectAll(".lineTest")
    //.data([data], function(d){ return d.年度 });
  const u = svg.selectAll(".lineTest")
    .data([data], function(d){ return d.年度 });
    //.data(data)
  // Updata the line
  console.log(u)
  u
    .join("path")
    .attr("class","lineTest")
    .transition()
    .duration(1000)
    .attr("d", d3.line()
      .x(function(d) { return x(d.年度); })
      .y(function(d) { return y(d[selectedVar]); }))
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2.5)
    })
}

// At the beginning, I run the update function on the first dataset:
update('住宅售電量')