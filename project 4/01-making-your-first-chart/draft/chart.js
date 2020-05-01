async function drawLineChart() {
  const dataset = await d3.json("./../../my_weather_data.json");
  // console.table(dataset[0]);

  const yAccessor = d => d.temperatureMax;

  const dateParser = d3.timeParse("%Y-%m-%d");
  const xAccesor = d => dateParser(d.date);

  // console.log(xAccesor(dataset[0]));

}

drawLineChart()