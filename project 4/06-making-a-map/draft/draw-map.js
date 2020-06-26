async function drawMap() {
  const countryShapes = await d3.json("./../world-geojson.json")
  //console.log(countryShapes)

  const countryNameAccessor = d => d.properties["NAME"]
  const countryIdAccessor = d => d.properties["ADM0_A3_IS"]

  const dataset = await d3.csv("./../data_bank_data.csv")
  console.log(dataset)

}
drawMap()