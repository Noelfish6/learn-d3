// read the data
function readData(file, id) {
	console.log("read the data");

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

	let land = d3.select(id);

	// set up the attributes of each stripe in each year
	let stripeWidth = 4;
	let stripeHeight = 300;

	// set up the attributes of the whole visualization
	// let svg = land.append("svg");
	// svg.attr("width", data.length * stripeWidth);
	// svg.attr("height", stripeHeight);

	// instead use the methods above, use "method chaining" is better
	let svg = d3.select(id).append("svg")
		.attr('width', data.length * stripeWidth)
		.attr('height', stripeHeight)

	
}

