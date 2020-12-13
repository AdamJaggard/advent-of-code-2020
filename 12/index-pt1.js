import get from  '../get.js';

const input = get('input.txt').map(str => [str.slice(0, 1), parseInt(str.slice(1))]);

const dirFns = {
	N: (x, y, n) => [x, y + n],
	E: (x, y, n) => [x + n, y],
	S: (x, y, n) => [x, y - n],
	W: (x, y, n) => [x - n, y],
};

const dirs = {0: 'N', 90: 'E', 180: 'S', 270: 'W'};

const negMod = (x, m) => (x % m + m) % m;

const getPos = cmds => {
	let x = 0;
	let y = 0;
	let d = 90;
	let dN = 'E';

	cmds.forEach(([cmd, n]) => {
		switch (cmd) {
			case 'N': y += n; break;
			case 'E': x += n; break;
			case 'W': x -= n; break;
			case 'S': y -= n; break;
			case 'L': d = negMod(d - n, 360); break;
			case 'R': d = (d + n) % 360; break;
			case 'F': [x, y] = dirFns[dN](x, y, n); break;
		}
		dN = dirs[d];
	});

	return [x, y, d];
}

const pos = getPos(input);
const dist = Math.abs(pos[0]) + Math.abs(pos[1]);
console.log(pos, dist);