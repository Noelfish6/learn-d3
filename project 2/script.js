// for (i = 0; i<10; i++){
//     console.log(i);
// }

// d3.csv("cities.csv", (error, d) => console.log(error, d));

// d3.csv("cities.csv", data => console.log("data"));
// d3.json("tweets.json", data => console.log("data"));

d3.json("tweets.json").then(function(data) {console.log(data);});
d3.csv("cities.csv").then(function(data) {console.log(data)});

// d3.csv("cities.csv", data => {
// d3.min(data, el => +el.population);
// d3.max(data, el => +el.population);
// d3.mean(data, el => +el.population);
// });



