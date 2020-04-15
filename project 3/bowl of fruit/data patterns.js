import { select, range } from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const makeFruit = type => ({ type });

const fruits = range(5)
	.map(() => makeFruit('apple'));

svg.selectAll('circle').data(fruits)
	.enter().append('circle')
		.attr('cx', (d, i) => i * 100)
		.attr('cy', height/2)
		.attr('fill', 'red')
		.attr('r', 50);