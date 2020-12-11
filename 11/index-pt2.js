import get from  '../get.js';

const input = get('input.txt').map(str => str.split(''));
const FLOOR = '.';
const SEAT = 'L';
const TAKEN = '#';

const seatVisible = (x, y, xAdd, yAdd, map) => {
	while (true) {
		let check = map[y + yAdd]?.[x + xAdd];
		if (!check || check === SEAT) return false;
		if (check === TAKEN) return true;
		x += xAdd;
		y += yAdd;
	}
};

const checkVis = (x, y, map, prev) => {
	if (prev === FLOOR) return prev;

	const check = [
		[-1,-1],[0,-1],[1,-1],
		[-1, 0], 	   [1, 0],
		[-1, 1],[0, 1],[1, 1]
	];

	const visTaken = check.reduce((acc, [xAdd, yAdd]) => {
		const found = seatVisible(x, y, xAdd, yAdd, map);
		return found ? acc + 1 : acc;
	}, 0);

	if (prev === SEAT && visTaken === 0) return TAKEN;
	if (prev === TAKEN && visTaken >= 5) return SEAT;
	return prev;
}

const findEnd = (map, iteration = 0) => {
	const changes = [];
	iteration++;

	map.forEach((row, y) => {
		row.forEach((char, x) => {
			const newChar = checkVis(x, y, map, char);
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