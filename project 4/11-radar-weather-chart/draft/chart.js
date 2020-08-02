async function drawChart() {

  // 1. Access data

  const dataset = await d3.json("./../../my_weather_data.json")

  const temperatureMinAccessor = d => d.temperatureMin
  const temperatureMaxAccessor = d => d.temperatureMax
  const uvAccessor = d => d.uvIndex
  const precipitationProbabilityAccessor = d => d.precipProbability
  const precipitationTypeAccessor = d => d.precipType
  const cloudAccessor = d => d.cloudCover
  const dateParser = d3.timeParse("%Y-%m-%d")
  const dateAccessor = d => dateParser(d.date)

  // 2. Create chart dimensions

  const width = 600
  let dimensions = {
    width: width,
    height: width,
    radius: width / 2,
    margin: {
      top: 120,
      right: 120,
      bottom: 120,
      left: 120,
    },
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
  dimensions.boundedRadius = dimensions.radius - ((dimensions.margin.left + dimensions.margin.right) / 2)

  // 3. Draw canvas

  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
      .style("transform", `translate(${
        dimensions.margin.left + dimensions.boundedRadius
      }px, ${
        dimensions.margin.top + dimensions.boundedRadius}px)`)

  // 4. Create scales
  const angleScale = d3.scaleTime()
      .domain(d3.extent(dataset, dateAccessor))
      .range([0, Math.PI * 2])
  // 5. Draw data


  // 6. Draw peripherals
  const peripherals = bounds.append("g")

  const months = d3.timeMonths(...angleScale.domain())
  const gridLines = months.forEach(month => {
    return peripherals.append("line")
  })

  const getCoordinatesForAngle = (angle, offset=1) => [
    Math.cos(angle - Math.PI / 2) * dimensions.boundedRadius * offset,
    Math.sin(angle - Math.PI / 2) * dimensions.boundedRadius * offset,
  ]

  months.forEach(month => {
    const angle = angleScale(month)
    const [x, y] = getCoordinatesForAngle(angle)

  peripherals.append("line")
    .attr("x2", x)
    .attr("y2", y)
    .attr("class", "grid-line")

  const [labelX, labelY] = getCoordinatesForAngle(angle, 1.38)
  peripherals.append("text")
  .attr("x", labelX)
  .attr("y", labelY)
  .attr("class", "tick-label")
  .text(d3.timeFormat("%b")(month))
  .style("text-anchor",
    Math.abs(labelX) < 5 ? "middle" :
    labelX > 0           ? "start" :
                           "end"
    )
  })

  const radiusScale = d3.scaleLinear()
    .domain(d3.extent([
      ...dataset.map(temperatureMaxAccessor),
      ...dataset.map(temperatureMinAccessor),
    ]))
    .range([0, dimensions.boundedRadius])
    .nice()

  const getXFromDataPoint = (d, offset=1.4) => getCoordinatesForAngle(
    angleScale(dateAccessor(d)),
    offset
  )[0] 

  const getYFromDataPoint = (d, offset=1.4) => getCoordinatesForAngle(
    angleScale(dateAccessor(d)),
    offset
  )[1]

  const temperatureTicks = radiusScale.ticks(4)
  const getCircles = temperatureTicks.map(d => (
    peripherals.append("circle")
      .attr("r", radiusScale(d))
      .attr("class", "grid-line")
  ))

  const tickLabels = temperatureTicks.map(d => {
    if (!d) return
    return peripherals.append("text")
      .attr("x", 4)
      .attr("y", -radiusScale(d) + 2)
      .attr("class", "tick-label-temperature")
      .html(`${d3.format(".0f")(d)}°F`)
  })

  // 7. Set up interactions


}
drawChart()