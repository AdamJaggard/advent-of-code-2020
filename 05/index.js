import get from '../get.js';

const passes = get('input.txt');

const search = (min, max, codes) => {
	const code = codes[0];
	const useTop = code === 'B' || code === 'R';
	const mid = min + ((max - min) / 2);
	let newMin = useTop ? Math.ceil(mid) : min;
	let newMax = useTop ? max : Math.floor(mid);

	if (codes.length === 1) {
		return useTop ? newMax : newMin;
	} else {
		return search(newMin, newMax, codes.slice(1));
	}
};

console.time('05');

const ids = passes.map(pass => {
	const row = search(0, 127, pass.slice(0, 7));
	const col = search(0, 7, pass.slice(7));
	return (row * 8) + col;
});

const highestId = Math.max(...ids);

ids.sort((a, b) => b - a);
let myId = -1;
for (let i = 0; i < ids.length; i++) {
	if (ids[i] !== highestId - i) {
		myId = highestId - i;
		break;
	}
}

console.timeEnd('05');

console.log('highestId', highestId);
console.log('my id', myId);