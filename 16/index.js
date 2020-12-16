import get from  '../get.js';
const input = get('input.txt', '\n\n');

const rules = input[0].split('\n').map(str => {
	const [, name, min1, max1, min2, max2] = /^(.*): (\d+)-(\d+) or (\d+)-(\d+)/.exec(str);
	return [name, parseInt(min1), parseInt(max1), parseInt(min2), parseInt(max2)]
});

const myTicket = input[1].split('\n')[1].split(',').map(Number);

const nearby = input[2].split('\n').map(str => str.split(',').map(Number));
nearby.shift();

const validateRules = n => {
	for (const rule of rules) {
		if (validateRule(rule, n)) return true;
	}
	return false;
};

const validateRule = (rule, n) => {
	if ((n >= rule[1] && n <= rule[2]) || (n >= rule[3] && n <= rule[4])) {
		return true;
	}
	return false;
};

const getValidTickets = tickets => {
	return tickets.filter(ticket => {
		for (const n of ticket) {
			if (!validateRules(n)) return false;
		}
		return true;
	}, 0);
};

// wtf am I doing with this function... works though
const findFields = tickets => {
	let indexes = new Array(rules.length).fill(rules.map((rule, i) => i));
	
	for (const ticket of tickets) {
		for (const [i, n] of ticket.entries()) {
			for (const [j, rule] of rules.entries()) {
				if (!validateRule(rule, n)) indexes[i] = indexes[i].filter(x => x !== j);
			}
		};
	};

	let prevFound = new Set();
	indexes.forEach(() => {
		const [found] = indexes.find(list => list.length === 1 && !prevFound.has(list[0]));
		indexes = indexes.map(list => list.length === 1 ? list : list.filter(n => n !== found));
		prevFound.add(found);
	});

	return indexes;
};

console.time('16');
const validTickets = getValidTickets(nearby, rules);
const fields = findFields(validTickets);
const matched = myTicket.map((n, i) => [rules[fields[i][0]][0], n]);
const result = matched.reduce((acc, cur) => cur[0].indexOf('departure') === -1 ? acc : acc * cur[1], 1);
console.timeEnd('16');
console.log(result);