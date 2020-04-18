import { select, range } from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = (selection, props) => {

	svg.selectAll('circle').data(fruits)
	.enter().append('circle')
		.attr('cx', (d, i) => i * 100)
		.attr('cy', height/2)
		.attr('fill', 'red')
		.attr('r', 50);

	svg.selectAll('circle').data(fruits)
	.exit().remove();
}

const makeFruit = type => ({ type });

const fruits = range(5)
	.map(() => makeFruit('apple'));

render(svg, { fruits })

// Eat an apple. .pop() removes a data point
fruits.pop();

