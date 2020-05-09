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
}
drawBars()