// read the data
function readData(file, id) {
	console.log("read the data")

	d3.csv(file, processData) // promise object, has a then function
		.then((data) => graph(data, id)) // callback, do something with arrary in d
		.catch((error) => console.log("Error: ", error.message)); // callback
}

fucntion processData(datum){
	return datum;	
}

fucntion graph(data, id){
	console.log(id, data);
}