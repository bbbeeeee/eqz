$(document).ready(function() {
	var width = 1000;
	var height = 500;
	var rendered = false;

	function makeChart(q) {

		var margin = {top: 20, right: 20, bottom: 30, left: 100},
	    
	    width = 1000 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

		var x = d3.scale.ordinal()
		    .rangeRoundBands([0, width], .1);

		var y = d3.scale.linear()
		    .range([height, 0]);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left");

		// Clear it out if we already rendered something
		if(rendered) $('svg').remove();
		else rendered = true;

		var tip = d3.tip()
		  .attr('class', 'd3-tip')
		  .offset([-10, 0])
		  .html(function(d) {
		    return "<strong>" + d.value + "</strong";
		});

		var svg = d3.select(".chart").append('svg')
				    .attr("width", width + margin.left + margin.right)
				    .attr("height", height + margin.top + margin.bottom)
				  	.append("g")
				    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.call(tip);

		d3.json('/search?q=' + q, function(error, data) {
		  if (error) throw error;

		  x.domain(data.map(function(d) { return d.letter; }));
		  y.domain([0, d3.max(data, function(d) { return d.value; })]);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(20," + height + ")")
		      .call(xAxis);

		  svg.append("g")
		      .attr("class", "y axis")
		      .call(yAxis)
		      .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Occurrences");

		  svg.selectAll(".bar")
		      .data(data)
		      .enter().append("rect")
		      .attr("class", "bar")
		      .attr("x", function(d) { return x(d.letter) + 20; })
		      .attr("width", x.rangeBand())
		      .attr("y", function(d) { return y(d.value) })
		      .attr("height", function(d) { return height - y(d.value); })
		      .on('mouseover', tip.show)
      		  .on('mouseout', tip.hide);
		});
	}

	$('#search').submit(function(e) {
		e.preventDefault();
		makeChart($('#q').val());
		return false;
	});
});