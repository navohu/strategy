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
  probabilities.push({x: iteration, y: barheight});
  var data = getLastFiveData(probabilities);
  y.domain([getMaxYDomain(barheight), getMinYDomain(barheight)]); //dynamic y-axis
  svg.select(".y.axis").transition().duration(300).call(yAxis);

  //Width and height
  var barPadding = 1;
  var bars = svg.selectAll(".bar").data(data, function(d) { return d.y; })

  bars.exit()
    .transition()
      .duration(300)
    .attr("y", y(0))
    .attr("height", Math.abs(height - y(0)))
    .style('fill-opacity', 1e-6)
    .remove();

  bars.enter().append("rect")
    .attr("class", "bar")
    .attr("y", function(d) {return y(d.y);})
    .attr("height", function(d){return height - y(d.y);});

  // the "UPDATE" set:
  bars.transition().duration(300).attr("x", function(d, i) {return i * (width / data.length);})
    .attr("width", width / data.length - barPadding) 
    .attr("y", function(d) { return y(d.y); })
    .attr("height", function(d) { return height - y(d.y); });

  //Append text on each attribute
  // svg.selectAll("text")
  //   .data(probabilities)
  //   .text(function(d) {
  //     return d.y;
  //   })
  //   .attr("x", function(d, i) {
  //       return i * (width / probabilities.length);
  //   })
  //   .attr("y", function(d) {
  //       return y(d.y);
  //   })
  //   .attr("font-family", "sans-serif")
  //   .attr("font-size", "11px")
  //   .attr("fill", "red");
}

var getLastFiveData = function(data){
  var arraylength = data.length;
  if (arraylength < 5) {
    return data;
  }
  return data.slice(arraylength - 5, arraylength+1);
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
