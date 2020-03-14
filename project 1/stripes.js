// read the data
function readData(file, id) {

	d3.csv(file, processData) // promise object, has a then function
		.then((data) => graph(data, id)) // callback, do something with arrary in d
		.catch((error) => console.log("Error: ", error.message)); // callback
}

// transform the data from string to array, and only keep parts of the data which is going to be visualized
function processData(datum){
	let dataItem = { 
		year: parseFloat(datum.Year) || 0.00,
		avg: parseFloat(datum["J-D"]) || 0.00
	};

	return dataItem;	
}


function graph(data, id){
	console.log(id, data);

	let colors = ["#023858", "#045a8d", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#ece7f2", "#fff7fb", "#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"];

	let land = d3.select(id);

	// set up the attributes of each stripe in each year
	let stripeWidth = 4;
	let stripeHeight = 300;

	// map function gets applied to every item in the array
	// it is used to keep the data you want
	let avgData = data.map((d) => d.avg); // year is filtered out and avg is kept

	// create scale for the data
	let linearScaleForData = 
			d3.scaleLinear()
			  .domain([d3.min(avgData), d3.max(avgData)]) // domain, d is data. It is used to define the range of data.
			  .range([0, colors.length-1]); // range, r is result. It is used to define the range of colors.


	// set up the attributes of the whole visualization
	// let svg = land.append("svg");
	// svg.attr("width", data.length * stripeWidth);
	// svg.attr("height", stripeHeight);

	// instead use the methods above, use "method chaining" is better
	let svg = d3.select(id).append("svg")
		.attr('width', data.length * stripeWidth)
		.attr('height', stripeHeight)

	// create the stripes, and add attributes 
	let stripes = svg.selectAll("rect") // select the rect which is not created yet
		.data(data) 					// bind these empty rects to the data in the data array, then we have a join
		.enter()						// create placeholder elements, rather than use a loop function
		.append('rect') 				// append a rect to the empty selection
		.attr('width', stripeWidth)
		.attr('height', stripeHeight)
		.attr('x', (d, i) => i * stripeWidth) // arrow function is same as "function(d, i){return i * stripeWidth;}" 
		.attr('y', 10)
		.style("fill", (d, i) => colors[Math.round(linearScaleForData(d.avg))])
		// d.avg is defined by the map function above
		// the data which is going to be put in the scale must be integer, not floating numbers, so use Math.round to solve it
		// colors[data] will generate the data visualization, colors(data) won't
		.on('mouseover', (d,i) => console.log(d.year,d.avg));


}