(function (d3) {
	"use strict";

	const svg = d3.select("svg");
	

	const height = parseFloat(svg.attr("width")); // width is defined in html; because width is string, it needs to be converted to string asap
	const width = +(svg.attr("height")); // same; + means parseFloat

	const circle = svg.append("circle")
		.attr("r", height/5)
		.attr("cx", width)
		.attr("cy", height/4)
		.attr("fill", "yellow")
		.attr("stroke", "black");

	const leftEye = svg.append("circle")
		.attr("r", 10)
		.attr("cx", width - 30)
		.attr("cy", height/4 - 15)
		.attr("fill", "black");

	const rightEye = svg.append("circle")
		.attr("r", 10)
		.attr("cx", width + 30)
		.attr("cy", height/4 - 15)
		.attr("fill", "black");

	const g = svg.append("g")
		.attr("transform", `translate(${width}, ${height/4})`)

	const mouth = g.append("path")
		.attr("d", d3.arc()({  // in the tutorial, there is no d3 before arc; but in this code, if there is no d3, it will show an error, why?
			innerRadius: 80,
			outerRadius: 100,
			startAngle: 0,
			endAngle: Math.PI
		}))

}(d3));