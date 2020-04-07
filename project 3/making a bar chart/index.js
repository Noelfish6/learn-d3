import { select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom } from "d3";

const svg = select("svg"); // delete "d3"

const width = +svg.attr("width");
const height = +svg.attr("height");

const render = data => {
  const margin = {top:10, right:20, bottom: 20, left: 20};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  const xScale = scaleLinear()
  	.domain([0, max(data, d => d.population)])
  	.range([0, innerWidth]);
  	// console.log(xScale.range());
  
  const yScale = scaleBand()
  	.domain(data.map(d => d.country))
  	.range([0, innerHeight])
  	.padding(0.1);
  	// console.log(yScale.domain());
  
  const g = svg.append("g")
  	.attr("transform", `translate(${margin.left},${margin.top})`);
  
  // yAxis(g.append("g"));
  
  g.append("g").call(axisLeft(yScale));
  g.append("g").call(axisBottom(xScale))
  .attr("transform", `translate(${0},${innerHeight})`);
  
  
	// make one rectangle for each row
  
  // D3 Data Join
	g.selectAll("rect").data(data) 
  	.enter().append("rect")
  	.attr("y", d => yScale(d.country))
  	.attr("width", d => xScale(d.population))
  	.attr("height", yScale.bandwidth());
};

csv("population.csv").then(data => {
  data.forEach(d => {
  	d.population = +d.population * 1000;
  });
	render(data);
});
