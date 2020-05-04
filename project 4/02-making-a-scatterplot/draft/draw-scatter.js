async function drawScatter() {
  let dataset = await d3.json("./../../my_weather_data.json")

  
  // Access data
  const xAccessor = d => d.dewPoint
  const yAccesssor = d => d.humidity

  
  // Create chart dimensions
  const width = d3.min([
  	window.innerWidth * 0.9,
  	window.innerHeight * 0.9,
  ])

  let dimensions = {
  	width: width,
  	height: width,
  	margin: {
  		top: 10,
  		right: 10,
  		bottom: 50,
  		left: 50,
  	},
  }
  dimensions.boundedWidth = dimensions.width
  	- dimensions.margin.left
  	- dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
  	- dimensions.margin.top
  	- dimensions.margin.bottom

  
  // Draw canvas
  const wrapper = d3.select("#wrapper")
  	.append("svg")
  	.attr('width', dimensions.width)
  	.attr('height', dimensions.height)

  const bounds = wrapper.appned("g")
  	.style("transform", `translate(${
  		dimensions.margin.left
  	}px, ${
  		dimensions.margin.top
  	}px)`)

  // Create scales
  const xScale = d3.linearScale()
  	.domain(d3.extent(dataset, xAccessor))
  	.range([0, dimensions.boundedWidth])
}
drawScatter()