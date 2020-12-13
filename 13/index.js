import get from  '../get.js';

const input = get('input.txt');
const target = parseInt(input[0]);
const ids = input[1].split(',').map(n => parseInt(n));

const findNext = (target, ids) => {
	return ids.reduce((next, id) => {
		if (isNaN(id)) return next;
		const tDiff = id - (target + id) % id;
		return tDiff < next[1] ? [id, tDiff] : next;
	}, [-1, Infinity]);
};

const findSet = ids => {
	return ids.reduce(([n, multi], id, idx) => {
		if (isNaN(id)) return [n, multi];
		while ((n + idx) % id !== 0) {
			n += multi;
		}
		multi *= id;
		return [n, multi];
	}, [1, 1]);
};

const next = findNext(target, ids);
console.log(next[0] * next[1]);
const set = findSet(ids);
console.log(set);