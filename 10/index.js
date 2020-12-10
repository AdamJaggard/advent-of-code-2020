import get from  '../get.js';

const input = get('input.txt')
	.map(n => parseInt(n))
	.sort((a, b) => a - b);

const calcDifferences = nums => {
	const diffs = [0, 0, 1]; // built-in adapter
	let prev = 0;

	for (const n of nums) {
		diffs[n - prev - 1]++;
		prev = n;
	};

	return diffs;
};

const cache = [];

const calcArrangements = (nums, base = 0) => {
	const sum = nums.reduce((a, b) => a + b, 0);
	if (sum in cache) return cache[sum];

	let total = 0;

	if (nums.length === 1) return 1;

	const check = nums.slice(0, 3);

	if (check.length === 0) return 1;

	check.forEach((n, idx) => {
		const next = nums.slice(idx + 1);
		total += n - base <= 3 ? calcArrangements(next, n) : 0;
	});

	cache[sum] = total;

	return total;
}

console.time('10');

const diffs = calcDifferences(input);
console.log(diffs[0] * diffs[2]);

const arrangements = calcArrangements(input);
console.log(arrangements);

console.timeEnd('10');