import get from '../get.js';

const map = get('input.txt');
const mapWidth = map[0].length;

const treeAtCoord = (map, [x, y]) => {
	return map[y][x % mapWidth] === '#';
}

const findTrees = (map, right, down) => {
	let coord = [0, 0];
	let trees = 0;

	while (coord[1] < map.length) {
		if (treeAtCoord(map, coord)) trees++;
		coord[0]+=right;
		coord[1]+=down;
	}

	return trees;
}

console.time('find');

const counts = [
	findTrees(map, 1, 1),
	findTrees(map, 3, 1),
	findTrees(map, 5, 1),
	findTrees(map, 7, 1),
	findTrees(map, 1, 2),
];

const result = counts.reduce((a, b) => a * b);

console.timeEnd('find');

console.log(result);