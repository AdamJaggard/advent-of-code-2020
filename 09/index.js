import get from  '../get.js';

const input = get('input.txt').map(n => parseInt(n));

const hasSumOf = (total, nums) => {
	const checked = new Set();
	for (let n of nums) {
		if (checked.has(total - n)) return true;
		checked.add(n);
	}
	return false;
}

const findError = (nums, pre) => {
	for (let i = pre; i < nums.length; i++) {
		if (!hasSumOf(nums[i], nums.slice(i - pre, i))) {
			return nums[i];
		}
	}
	return null;
}

const findErrorSet = (nums, target) => {
	for (let i = 1; i < nums.length; i++) {
		for (let j = 0; j < i; j++) {
			const range = nums.slice(j, i + 1);
			const sum = range.reduce((a, b) => a + b);
			if (sum === target) return [Math.min(...range), Math.max(...range)];
		}
	}
}

console.time('09');
const error = findError(input, 25);
console.log(error);
const range = findErrorSet(input, error);
console.log(range, range[0] + range[1]);
console.timeEnd('09');