var margin = {top: 20, right: 40, bottom: 30, left: 40},
    width = $("#statistics").parent().width() - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var x = d3.scaleBand()
    .rangeRound([0, width], .1);

var y = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(5, "%");

// An SVG element with a bottom-right origin.
var svg = d3.select("#statistics").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("text") // just for the title (ticks are automatic)
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + 0 + "," + height/2 + ")rotate(-90)") // rotate the text!
    .text("Probability");

  svg.append("text") // just for the title (ticks are automatic)
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + width/2 + "," + height + margin.bottom + ")") // rotate the text!
    .text("Iteration");

var updateLabels = function(data){
  var text = svg.selectAll(".bartext").data(data);
  
  text.exit()
    .transition()
    .duration(300)
    .attr("y", y(0))
    .style('fill-opacity', 1e-6)
    .remove();

  text.enter()
    .append("text")
    .attr("class", "bartext")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text( function(d){ return Math.round(d.y*1000)/10;})
    .attr("x", function(d){ 
      return x(d.x) + x.bandwidth()/2;
    })
    .attr("y", function(d){ return y(d.y);});

  text.transition()
    .duration(300)
    .attr("x", function(d){ 
      return x(d.x) + x.bandwidth()/2;
    })
    .attr("y", function(d){ return y(d.y);});

  //updates the labels
  d3.selectAll(".bartext").data(data)
    .text(function(d){ return Math.round(d.y*1000)/10;});
}

var updateGraph = function(data){
  console.log("x: " + data[data.length-1].x + " y: " + data[data.length-1].y);
  x.domain(data.map(function(d) { return d.x; }));
  y.domain([d3.min(data, function(d) { return d.y - 0.01; }), d3.max(data, function(d) { return d.y + 0.01; })]);
  
  svg.select('.x.axis').transition().duration(300).call(xAxis);
  svg.select(".y.axis").transition().duration(300).call(yAxis);

  //Width and height
  var barPadding = -1;  
  var bars = svg.selectAll(".bar").data(data);

  bars.exit()
    .transition()
    .duration(300)
    .attr("y", y(0))
    .style('fill-opacity', 1e-6)
    .remove();

  bars.enter()
    .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return x(d.x);
      })
      .attr("y", function(d) {
        return y(d.y);
      })
      .attr("width", x.bandwidth() + barPadding) 
      .attr("height", function(d) {
        return height - y(d.y); 
      });

  // the "UPDATE" set:
  bars.transition()
    .duration(300)
    .attr("x", function(d) {
      return x(d.x);
    })
    .attr("y", function(d) {
      return y(d.y); 
    })
    .attr("width", x.bandwidth() + barPadding) 
    .attr("height", function(d) { 
      return height - y(d.y); 
    });
}
