import { select, json, geoPath, geoMercator, geoOrthographic, geoNaturalEarth1 } from 'd3';
import { feature } from 'topojson';

const svg = select('svg');

const projection = geoMercator();
// const projection = geoOrthographic();
// const projection = geoNaturalEarth1();

const pathGenerator = geoPath().projection(projection);

//svg.append('path')
//	.attr('class', 'shpere')
//	.attr('d', pathGenerator({type: 'Sphere'}));

json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
	.then(data => {
  const countries = feature(data, data.objects.countries);
  
	console.log(countries);
  
  svg.selectAll('path')
  .data(countries.features)
    .enter().append('path')
  	.attr('class', 'country')
  	.attr('d', pathGenerator);

	})