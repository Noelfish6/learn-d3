(function (d3) {
	"use strict";

	const svg = d3.select("svg");


	csv("population.csv").then(data => {
	console.log(data);
	})
}(d3));