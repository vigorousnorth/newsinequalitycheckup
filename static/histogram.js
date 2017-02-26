
var width, height, margin = {top: 10, right: 20, bottom: 60, left: 30};
    
var x0 = d3.scaleBand()
    .paddingInner(0.1);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var  width, height, aspect, populationsvg;

$(function() {

  width = $('div#histogram').innerWidth() - margin.left - margin.right,
  height = width / 2;
  var populationsvg = d3.select('div#histogram').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height',height + margin.top + margin.bottom);


d3.csv("https://raw.githubusercontent.com/vigorousnorth/newsinequalitycheckup/master/static/data_by_town.csv", function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(data) {

  var keys = data.columns.slice(1);

  x0.rangeRound([0, width])
      .domain(data.sort(function(a,b) { return b.Population - a.Population; }).map(function(d) { if (d.Stories > 0) { return d.Town; } }));

  var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, function(d) { return d.Stories; })]).nice();

  var g = populationsvg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .filter(function(d) { return (d.Stories > 0) })
      .attr("transform", function(d) { return "translate(" + x0(d.Town) + ",0)"; })
    .append("rect")
      .attr("x", 0 )
      .attr("y", function(d) { return y(d.Stories); })
      .attr("width", x0.bandwidth)
      .attr("height", function(d) { return height - y(d.Stories); })
      .attr("fill", function(d) { return z(d.key); });

  g.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", z(keys[0]))
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Stories");

  d3.selectAll("g.xaxis g.tick text")
    .attr("text-anchor", "start")
    .attr('dy', -6).attr('dx', 6)
    .attr("transform","rotate(90)");

});
});
