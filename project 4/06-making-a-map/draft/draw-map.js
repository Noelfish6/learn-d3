async function drawMap() {
  const countryShapes = await d3.json("./../world-geojson.json")
  //console.log(countryShapes)

  const countryNameAccessor = d => d.properties["NAME"]
  const countryIdAccessor = d => d.properties["ADM0_A3_IS"]

  const dataset = await d3.csv("./../data_bank_data.csv")
  const metric = "Population growth (annual %)"

  let metricDataByCountry = {}
  dataset.forEach(d => {
  	if(d["Series Name"] != metric) return
  		metricDataByCountry[d["Country Code"]] = +d["2017 [YR2017]"] || 0
  })

  let dimensions = {
  	width: window.innerWidth * 0.9,
  	margin:{
  		top:10,
  		right:10,
  		bottom:10,
  		left:10,
  	},
  }
  dimensions.boundedWidth = dimensions.width
  	- dimensions.margin.left
  	- dimensions.margin.right

  const sphere = ({type:"Sphere"})
  const projection = d3.geoEqualEarth()
  	.fitWidth(dimensions.boundedWidth, sphere)

  const pathGenerator = d3.geoPath(projection)
  const [[x0, y0], [x1, y1]] = pathGenerator.bounds(sphere)

  dimensions.boundedHeight = y1
  dimensions.height = dimensions.boundedHeight
  	+ dimensions.margin.top
  	+ dimensions.margin.bottom



}
drawMap()