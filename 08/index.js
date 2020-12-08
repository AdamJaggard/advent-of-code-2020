import get from  '../get.js';

const input = get('input.txt');

const run = (instructions, acc = 0) => {
	let idx = 0;
	let looped = false;
	let visited = new Set();

	do {
		if (visited.has(idx)) {
			looped = true;
			break;
		}
		visited.add(idx);
		const op = instructions[idx].slice(0, 3);
		const num = parseInt(instructions[idx].slice(3));
		let next = idx + 1;

		switch (op) {
			case 'acc': acc += num; break;
			case 'jmp': next += num - 1; break;
		}

		idx = next;
	} while (idx < instructions.length);
	
	return [acc, looped];
}

const find = (instructions, start = 0) => {
	for (let i = 0; i < instructions.length; i++) {
		const op = instructions[i].slice(0, 3);
		let newOp = '';
		
		switch (op) {
			case 'nop': newOp = 'jmp'; break;
			case 'acc': continue; // skip checking
			case 'jmp': newOp = 'nop'; break;
		}
		
		const mod = [...instructions];
		mod[i] = newOp + mod[i].slice(3);
		const [acc, looped] = run(mod, start);
		
		if (!looped) {
			console.log('changed', op, 'to', newOp, 'at', i, instructions[i]);
			return acc;
		}
	}
	
	return null;
}

console.time('08');

console.log(find(input, 0));

console.timeEnd('08');