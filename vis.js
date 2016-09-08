var ymin = 47,
    ymax = 52;

var probabilities = [];
var margin = {top: 20, right: 40, bottom: 30, left: 40},
    width = $("#statistics").parent().width() - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom,
    barWidth = Math.floor(width / probabilities.length) - 1;

var x = d3.scaleLinear()
    .range([barWidth / 2, width - barWidth / 2]);

var y = d3.scaleLinear()
    .range([height, 0])
    .domain([ymin,ymax]);

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(5)
    .tickSize(-width)
    .tickFormat(function(d) { return Math.round(d*10)/10 + "%"; });

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

var updateGraph = function(iteration, barheight){
  //  d3.select('#statistics').selectAll("*").remove();

  y.domain([getMaxYDomain(barheight), getMinYDomain(barheight)]); //dynamic y-axis

  // same for yAxis but with more transform and a title
  svg.select(".y.axis").transition().duration(300).call(yAxis);

  probabilities.push({x: iteration, y: barheight});
  //Width and height

  var bars = svg.selectAll(".bar").data(probabilities, function(d) { return d.y; }) // (data) is an array/iterable thing, second argument is an ID generator function

  bars.exit()
    .transition()
      .duration(300)
    .attr("y", y(0))
    .attr("height", height - y(0))
    .style('fill-opacity', 1e-6)
    .remove();

  // data that needs DOM = enter() (a set/selection, not an event!)
  bars.enter().append("rect")
    .attr("class", "bar")
    .attr("y", function(d) {return y(d.y);})
    .attr("height", function(d){return height - y(d.y);});

  // the "UPDATE" set:
  bars.transition().duration(300).attr("x", function(d, i) {return i * (width / probabilities.length);})
    .attr("width", width / probabilities.length - barPadding) // constant, so no callback function(d) here
    .attr("y", function(d) { return y(d.y); })
    .attr("height", function(d) { return height - y(d.y); }); // flip the height, because y's domain is bottom up, but SVG renders top down
}

function getMinYDomain(y){
  if(ymin<y) {
    ymin = y+0.5;
    return ymin;
  }
  else return ymin;
}

function getMaxYDomain(y){
  if(ymax>y){
    ymax = y - 0.5;
    return ymax;
  }
  else return ymax;
}
