var margin = {top: 20, right: 40, bottom: 30, left: 40},
    width = $("#statistics").parent().width() - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    barWidth = Math.floor(width / 19) - 1;

var x = d3.scaleLinear()
    .range([barWidth / 2, width - barWidth / 2]);

var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0,1]);

var yAxis = d3.axisLeft()
    .scale(y)
    .tickSize(-width)
    .tickFormat(function(d) { return Math.round(d*100) + "%"; });

// An SVG element with a bottom-right origin.
var svg = d3.select("#statistics").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)")
    .call(yAxis)
  .selectAll("g")
  .filter(function(value) { return !value; })
    .classed("zero", true);