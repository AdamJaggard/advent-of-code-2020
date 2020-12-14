import get from  '../get.js';
const program = get('input.txt').map(str => {
	if (str.indexOf('mask') !== -1) {
		const parts = str.split('mask = ');
		return ['mask', parts[1]];
	} else {
		const parts = /\[(\d+)\] = (\d+)/.exec(str);
		return ['save', parseInt(parts[1]).toString(2).padStart(36, '0'), parseInt(parts[2])];
	}
});

const getMaskAddresses = (mask, n) => {
	const xs = [];
	const newAddr = mask.map((c, idx) => {
		if (c === 'X') {
			xs.push(idx);
			return 'X';
		}
		if (c === '1') return '1';
		return n[idx];
	});
	
	const allAddr = [];
	for (let i = 0; i < 2 ** xs.length; i++) {
		const mod = i.toString(2).padStart(xs.length, '0');
		const modAddr = xs.reduce((addr, swapIdx, idx) => {
			addr[swapIdx] = mod[idx];
			return addr;
		}, newAddr).join('');
		allAddr.push(parseInt(modAddr, 2));
	};

	return allAddr;
};

const run = program => {
	const mem = {};
	let mask = [];

	program.forEach((cmd) => {
		switch (cmd[0]) {
			case 'mask': mask = cmd[1].split(''); break;
			case 'save':
				const [, addr, val] = cmd;
				getMaskAddresses(mask, addr).forEach(newAddr => {
					mem[newAddr] = val;
				});
			break;
		}
	});
	
	return Object.values(mem).reduce((acc, cur) => acc + cur, 0);
};

console.time('14');
const total = run(program);
console.timeEnd('14');
console.log(total);