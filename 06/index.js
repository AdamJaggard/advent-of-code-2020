import get from  '../get.js';

const qs = get('input.txt', '\n\n');

console.time('06pt1');

// pt 1

const anyoneYes = qs.map(a => {
	const set = new Set();
	[...a.replace(/\n/g, '')].forEach(char => set.add(char));
	return set.size;
}, new Set());

const anyoneTotal = anyoneYes.reduce((prev, curr) => prev + curr);

console.timeEnd('06pt1');

console.log(anyoneTotal);

// pt 2

console.time('06pt2');

const everyoneYes = qs.map(a => {
	const answers = a.split('\n').map(answers => new Set(answers));
	const combined = answers.reduce((set, curr, idx) => {
		if (idx === 0) return curr;
		return new Set([...set].filter(x => curr.has(x)));
	});
	return combined.size;
});

const everyoneTotal = everyoneYes.reduce((prev, curr) => prev + curr);

console.timeEnd('06pt2');

console.log(everyoneTotal);