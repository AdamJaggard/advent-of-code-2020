import get from  '../get.js';

const input = get('input.txt').map(str => str.split(''));
const FLOOR = '.';
const SEAT = 'L';
const TAKEN = '#';

const checkAdj = (x, y, map, prev) => {
	if (prev === FLOOR) return prev;

	const check = [
		[x-1, y-1], [x, y-1], [x+1, y-1],
		[x-1, y], 			  [x+1, y],
		[x-1, y+1], [x, y+1], [x+1, y+1]
	];

	const adjTaken = check.reduce((acc, [x, y]) => map[y]?.[x] === TAKEN ? acc + 1 : acc, 0);

	if (prev === SEAT && adjTaken === 0) return TAKEN;
	if (prev === TAKEN && adjTaken >= 4) return SEAT;
	return prev;
}

const findEnd = (map, iteration = 0) => {
	const changes = [];
	iteration++;

	map.forEach((row, y) => {
		row.forEach((char, x) => {
			const newChar = checkAdj(x, y, map, char);
			if (newChar !== char) changes.push([x, y, newChar]);
		});
	});

	changes.forEach(([x, y, char]) => {
		map[y][x] = char;
	});

	if (changes.length === 0) {
		return [iteration, map.reduce((acc, row) => acc + row.reduce((rowAcc, char) => char === TAKEN ? rowAcc + 1 : rowAcc, 0), 0)];
	} else {
		return findEnd(map, iteration);
	}
}

console.time('11');
console.log(findEnd(input));
console.timeEnd('11');