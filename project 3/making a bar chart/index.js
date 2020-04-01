import { select, csv } from "d3";

const svg = select("svg"); // delete "d3"

csv("population.csv").then(data => {
	console.log(data);
})