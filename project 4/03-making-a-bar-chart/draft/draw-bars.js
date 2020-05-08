async function drawBars() {
  

  const dataset = await d3.json("./../../my_weather_data.json")
  console.log(dataset)
  const metricAccessor = d => d.humidity

}
drawBars()