async function drawBars() {
  

  const dataset = await d3.json("./../../my_weather_data.json")
  // console.log(dataset)
  const metricAccessor = d => d.humidity

  // create dimension
  const width = 600

  let dimensions = {
  	width: width,
  	height: width * 0.6,
  	margin: {
  		top: 30,
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

  // draw canvas
  const wrapper = d3.select("#wrapper")
  	.append("svg")
  	.attr("width", dimensions.width)
  	.attr("height", dimensions.height)

  const bounds = wrapper.append("g")
  	.style("transform", `translate(${
  		dimensions.margin.left
  	}px, ${
  		dimensions.margin.top
  	}px)`)

  // create scales
  const xScale = d3.scaleLinear()
  	.domain(d3.extent(dataset, metricAccessor))
  	.range([0, dimensions.boundedWidth])
  	.nice()

  // creating bins
  const binsGenerator = d3.histogram()
  	.domain(xScale.domain())
  	.value(metricAccessor)
  	.thresholds(12)

  const bins = binsGenerator(dataset)

  // creating the y sacle
  const yAccessor = d => d.length

  const yScale = d3.scaleLinear()
  	.domain([0, d3.max(bins, yAccessor)])
  	.range([dimensions.boundedHeight, 0])
  	.nice()
  	
}
drawBars()