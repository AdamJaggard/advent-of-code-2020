import get from  '../get.js';

const input = get('input.txt');

const bags = {};
const myBag = 'shiny gold';

console.time('07');

input.forEach(str => {
	const parts = str.split(' contain ');
	const id = parts[0].replace('bags', '').trim();
	const rules = parts[1].matchAll(/(\d+) (\w+ \w+)/g);
	bags[id] = [...rules].map(rule => [parseInt(rule[1]), rule[2]]);
});

const numContain = (id, target) => {
	let total = 0;
	for (const rule of bags[id]) {
		if (rule[1] === target) {
			total += rule[0];
		}
		total += numContain(rule[1], target);
	}
	return total;
}

const numInnerBags = id => {
	let total = 0;
	for (const rule of bags[id]) {
		total += rule[0] + numInnerBags(rule[1]) * rule[0];
	}
	return total;
};

const totals = Object.keys(bags).map(id => numContain(id, myBag));
const canContain = totals.filter(n => n > 0).length;
const canContainAmount = totals.reduce((a, b) => a + b, 0);

console.timeEnd('07');

console.log('canContain', canContain, 'canContainAmount', canContainAmount);
console.log('inner bags', numInnerBags(myBag));