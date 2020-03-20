
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
	// d3.csv("cities.csv").then(function(error, data){
	// 	if (error) {console.error(error)}
	// 	else {dataViz(data)}
	// });

	// function dataViz(incomingData) {
	//   d3.select("body").selectAll("div.cities")
	//     .data(incomingData)
	//     .enter()
	//     .append("div")
	//     .attr("class","cities")
	//     .html(d => d.label);
	// }

	d3.csv("cities.csv", (error,data) => {
	   if (error) {
	   console.error(error)
	   }
	   else {
	   dataViz(data)
	   }
	});

	function dataViz(incomingData) {
	   d3.select("body").selectAll("div.cities")
	     .data(incomingData)
	     .enter()
	     .append("div")
	     .attr("class","cities")
	     .html(d => d.label);
	}


	// d3.select("svg")
 //  .selectAll("rect")
 //  .data([15, 50, 22, 8, 100, 10])
 //  .enter()
 //  .append("rect")
 //  .attr("width", 10)
 //  .attr("height", d => d);





