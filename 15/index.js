const input = [7, 12, 1, 0, 16, 2];

const solve = (target, seed) => {
	const mem = new Map();
	
	[...seed.slice(0, seed.length - 1)].forEach((n, i) => mem.set(n, i + 1));
	let prevN = seed[seed.length - 1];
	
	for (let turn = seed.length + 1; turn <= target; turn++) {
		const seen = mem.get(prevN);
		
		if (typeof seen === 'undefined') {
			mem.set(prevN, turn - 1);
			prevN = 0;
			continue;
		}

		mem.set(prevN, turn - 1);
		prevN = (turn - 1) - seen;
	}

	return prevN;
};

console.time('15');
const val = solve(2020, input);
const val2 = solve(30000000, input);
console.timeEnd('15');

console.log(val);
console.log(val2);