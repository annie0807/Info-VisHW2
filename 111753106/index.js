const margin = {top: 80, right: 100, bottom: 50, left: 100},
    width = 550 - margin.left - margin.right, //550-100-100=350
    height = 400 - margin.top - margin.bottom;//400-80-100=360

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Title
svg.append('text')
.attr('x', width/2)
.attr('y', -40)
.attr('text-anchor', 'middle')
.style('font-family', 'Helvetica')
.style('font-size', 30)
.style('font-weight','bold')
.text('2010-2020年 性別薪資差距');

// X label
svg.append('text')
.attr('x', width/2 + 220)  //285
.attr('y', height + 5) //495
.attr('text-anchor', 'middle')
.style('font-family', 'Helvetica')
.style('font-weight', 'bold')
.style('font-size', 14)
.text('年份(年)');

// Y label
svg.append('text')
.attr('text-anchor', 'middle')
.attr('transform', 'translate(-50,' + height /2 + ')rotate(-90)')
.style('font-family', 'Helvetica')
.style('font-weight', 'bold')
.style('font-size', 14)
.text('比例(%)');
  
//Read the data
d3.csv("./性別薪資差.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y")(d.date), value : d.value }
  })
  .then(
   //Now I can use this dataset:
  function(data) {
    
    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

     //Add Y axis
    const y = d3.scaleLinear()
      //.domain([0, d3.max(data, function(d) { return +d.value; })])
      .domain([0, 18])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )
})