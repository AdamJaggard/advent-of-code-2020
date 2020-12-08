import get from '../get.js';

const input = get('input.txt').map(n => parseInt(n));

const naivePair = (list, target) => {
	for (let i = 0; i < list.length; i++) {
		for (let j = 0; j < list.length; j++) {
			if (list[i] + list[j] === target)
				return list[i] * list[j];
		}
	}
}

const naivethree = (list, target) => {
	for (let i = 0; i < list.length; i++) {
		for (let j = 0; j < list.length; j++) {
			for (let k = 0; k < list.length; k++) {
				if (list[i] + list[j] + list[k] === target)
					return list[i] * list[j] * list[k];
			}
		}
	}
}

const findProductOfPair = (list, target) => {
	const checked = new Set();

	for (let num of list) {
		const complement = target - num;
		if (checked.has(complement)) return num * complement;
		checked.add(num);
	}

	return null;
};

const findProductOfThree = (list, target) => {
	for (let num of list) {
		const complement = target - num;
		const matchingPair = findProductOfPair(list, complement);
		if (matchingPair) return matchingPair * num;
	}
}

console.time('naive_pair_timer');
console.log(naivePair(input, 2020));
console.timeEnd('naive_pair_timer');

console.time('naive_three_timer');
console.log(naivethree(input, 2020));
console.timeEnd('naive_three_timer');

console.time('set_pair_timer');
console.log(findProductOfPair(input, 2020));
console.timeEnd('set_pair_timer');

console.time('set_three_timer');
console.log(findProductOfThree(input, 2020));
console.timeEnd('set_three_timer');
