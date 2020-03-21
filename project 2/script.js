
// old method: callback

	// d3.csv("cities.csv", data => console.log("data"));
	// d3.json("tweets.json", data => console.log("data"));

// new method: promises

	// d3.json("tweets.json").then(function(data) {console.log(data);});
	// d3.csv("cities.csv").then(function(data) {console.log(data)});


// nesting
	// d3.json("tweets.json").then(function(data){
	// 	let tweetData = data.tweets;
	// 	let nestedTweets = d3.nest()
	// 		.key(d => d.user) 
	// 		.entries(tweetData);

	// 	console.log(nestedTweets); // after nesting
	// 	console.log(tweetData); // before nesting
	// });


// extent
	// d3.csv("cities.csv").then(function(data){
	// 	let extent = d3.extent(data, el => +el.population);
	// 	console.log(extent);
	// });


// 2.2.1. Selections and binding

	// function readData(file) {
	// 	d3.csv("cities.csv").then((data) => dataViz(data));

	// };

	// function dataViz(incomingData) {
	// 	d3.select("body").selectAll("div.cities")
	// 		.data(incomingData)
	// 	    .enter()
	// 	    .append("div")
	// 	    .attr("class","cities")
	// 	    .html(d => d.label);
	// };


// Accessing data with inline functions

	function readData(file) {
		d3.csv("cities.csv").then((data) => dataViz(data));

	};

	function dataViz(incomingData) {
	var maxPopulation = d3.max(incomingData, d => parseInt(d.population));

	var yScale = d3.scaleLinear().domain([0,maxPopulation]).range([0,460]);

	d3.select("svg").attr("style","height: 480px; width: 600px;");

	d3.select("svg")
	   .selectAll("rect")
	   .data(incomingData)
	   .enter()
	   .append("rect")
	   .attr("width", 50)
	   .attr("height", d => yScale(parseInt(d.population)))
	   .attr("x", (d,i) => i * 60)
	   .attr("y", d => 480 - yScale(parseInt(d.population)))
	   .style("fill", "#FE9922")
	   .style("stroke", "#9A8B7A")
	   .style("stroke-width", "1px")
	};





// d3.select("svg")
//   .selectAll("rect")
//   .data([15, 50, 22, 8, 100, 10])
//   .enter()
//   .append("rect")
//   .attr("width", 10)
//   .attr("height", d => d);






