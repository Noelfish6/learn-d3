async function drawLineChart() {
  const dataset = await d3.json("./../../my_weather_data.json");
  // console.table(dataset[0]);

  const yAccessor = d => d.temperatureMax;

  const dateParser = d3.timeParse("%Y-%m-%d");
  const xAccesor = d => dateParser(d.date);

  // console.log(xAccesor(dataset[0]));

  let dimensions = {
  	width: window.innerWidth * 0.9,
  	height: 400,
  	margin: {
  		top: 15,
  		right: 15,
  		bottom: 40,
  		left: 60,
  	},
  }
  dimensions.boundedWidth = dimensions.width 
  	- dimensions.margin.left
  	- dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
  	-dimensions.margin.top
  	-dimensions.margin.bottom 

  
  const wrapper = d3.select("#wrapper")
  	.append("svg")
  	.attr("width", dimensions.width)
  	.attr("height", dimensions.height);

  const bounds = wrapper.append("g")
  	.style("transform", `translate(${
  		dimensions.margin.left
  	}px, ${
  		dimensions.margin.top
  	}px)`)
  


  //Creating our scales
  const yScale = d3.scaleLinear()
  	.domain(d3.extent(dataset, yAccessor))
  	.range([dimensions.boundedHeight, 0]);

  const freezingTemperaturePlacement = yScale(32)
  const freezingTemperatures = bounds.append("rect")
  	.attr("x", 0)
  	.attr('width', dimensions.boundedWidth)
  	.attr('y', freezingTemperaturePlacement)
  	.attr('height', dimensions.boundedHeight
  		- freezingTemperaturePlacement)
  	.attr('fill', "#e0f3f3")
}

drawLineChart()