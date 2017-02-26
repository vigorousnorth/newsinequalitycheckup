
var populationsvg = d3.select("svg#storiesbytown"),
    margin = {top: 20, right: 20, bottom: 90, left: 60};
    
var x0 = d3.scaleBand()
    .paddingInner(0.1);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

d3.csv("data_by_town.csv", function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = data.columns.slice(1);
  var  width = +populationsvg.attr("width") - margin.left - margin.right,
  height = +populationsvg.attr("height") - margin.top - margin.bottom;

  x0.rangeRound([0, width])
      .domain(data.sort(function(a,b) { return b.Population - a.Population; }).map(function(d) { if (d.Stories > 0) {  console.log(d.Town); return d.Town; } }));

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

  var keys1 = [ "StoriesPerCapita" , "MedianIncome" ],  key2 = ["StoriesPerCapita","Population"],  key3 = ["StoriesPerCapita" , "pct_Trump"];

  // drawChart(incomesvg, keys1);
  // drawChart(percapsvg, key2);
  // drawChart(trumpsvg, key3);

  function drawChart(target, keys) {

    var g = target.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x0.rangeRound([0, width])
      .domain(data.sort(function(a,b) {return b[keys[0]] - a[keys[0]]; }).map(function(d) { if (d[keys[0]] > 0.002) { return d.Town; } }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);

    y1.range([height, 0]).domain([0, d3.max(data, function(d) { return d[keys[0]]; })]).nice();
    y2.range([height, 0]).domain([0, d3.max(data, function(d) { return d[keys[1]]; })]).nice();

    g.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
        .filter(function(d) { return d[keys[0]] > 0.002 })
        .attr("transform", function(d) { return "translate(" + x0(d.Town) + ",0)"; })
      .selectAll("rect")
      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
      .enter().append("rect")
        .attr("x", function(d) { return x1(d.key); })
        .attr("y", function(d) { var y = (d.key === keys[0]) ? y1 : y2; return y(d.value); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { var y = (d.key === keys[0]) ? y1 : y2; return height - y(d.value); })
        .attr("fill", function(d) { return z(d.key); });

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0));

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y1).ticks(null))
      .append("text")
        .attr("x", 2)
        .attr("y", y1(y1.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", z(keys[0]))
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text(keys[0]);

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (width - 30) + ",0)")
        .call(d3.axisRight(y2).ticks(null))
      .append("text")
        .attr("x", -2)
        .attr("y", y2(y2.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill",z(keys[1]))
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(keys[1]);

    var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .attr("transform", "translate(-80,40)")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
    
  }

});
