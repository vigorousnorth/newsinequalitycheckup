
var avg = 0.003075333;

var incomesvg = d3.select("svg#incomechart"),
    percapsvg = d3.select("svg#percapchart"),
    trumpsvg = d3.select("svg#trumpchart"),
    margin = {top: 20, right: 20, bottom: 30, left: 60};
    
var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

d3.csv("https://raw.githubusercontent.com/vigorousnorth/newsinequalitycheckup/master/static/data_by_town.csv", function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data) {
  if (error) throw error;

  var  width = +percapsvg.attr("width") - margin.left - margin.right,
  height = +percapsvg.attr("height") - margin.top - margin.bottom;

  var x =  d3.scaleLinear(), y = d3.scaleLinear();

  var keys1 = [ "StoriesPerCapita" , "MedianIncome" ], key3 = ["StoriesPerCapita" , "pct_Trump"],
    key4 = [ "StoriesPerCapita" , "Population" ];

  drawChart(incomesvg, keys1);
  drawChart(percapsvg, key4);
  drawChart(trumpsvg, key3);

  function drawChart(target, keys) {

    var g = target.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.range([0, width])
      .domain([0, d3.max(data, function(d) { return d[keys[0]]; })]).nice();

    y.range([height, 0]).domain([0, d3.max(data, function(d) { return d[keys[1]]; })]).nice();

    var towns = g.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g");

    towns.append("circle")
        .attr("r",5)
        .attr("transform", function(d) { return "translate(" + x(d[keys[0]]) + "," + y(d[keys[1]]) + ")"; });
      
    towns.append("text")
        .attr("transform", function(d) { return "translate(" + x(d[keys[0]]) + "," + y(d[keys[1]]) + ")"; })
        .attr("dx", 6)
        .text(function(d) {return d.Town; });

    g.append('line')
      .attr('x1', x(avg))
      .attr('x2', x(avg))
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke','black')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2,2');

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(null, "s"));

    g.append('text')
        .attr("transform","translate(0,-15)")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 2)
        .attr("dy", "0.32em")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text(keys[1]);

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null))

    g.append("text")
        .attr("transform","translate(" +(width - 2)+ "," + (height-2) + ")")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(keys[0]);
    
  }

});