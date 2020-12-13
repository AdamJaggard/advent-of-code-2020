import get from  '../get.js';

const input = get('input.txt').map(str => [str.slice(0, 1), parseInt(str.slice(1))]);

// this fn is modified an SO answer, I can't take any credit
const rotate = (cx, cy, x, y, angle) => {
    const radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [Math.round(nx), Math.round(ny)];
};

const getPos = cmds => {
	let x = 0;
	let y = 0;
	let d = 90;
	let wX = 10;
	let wY = 1;

	cmds.forEach(([cmd, n]) => {
		switch (cmd) {
			case 'N': wY += n; break;
			case 'E': wX += n; break;
			case 'W': wX -= n; break;
			case 'S': wY -= n; break;
			case 'L': [wX, wY] = rotate(0, 0, wX, wY, -n); break;
			case 'R': [wX, wY] = rotate(0, 0, wX, wY, n); break;
			case 'F':
				const dX = Math.abs(wX);
				const dY = Math.abs(wY);	

				if (wX < 0) {
					x = x - (dX * n);
				} else {
					x = x + (dX * n);
				}

				if (wY < 0) {
					y = y - (dY * n);
				} else {
					y = y + (dY * n);	
				}
			break;
		}
	});

	return [x, y, d];
}

const pos = getPos(input);
const dist = Math.abs(pos[0]) + Math.abs(pos[1]);
console.log(pos, dist);