import get from '../get.js';

const reqKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const eyeColours = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const rules = {
	'byr': v => v.length === 4 && parseInt(v) >= 1920 && parseInt(v) <= 2002,
	'iyr': v => v.length === 4 && parseInt(v) >= 2010 && parseInt(v) <= 2020,
	'eyr': v => v.length === 4 && parseInt(v) >= 2020 && parseInt(v) <= 2030,
	'hgt': v => {
		const n = parseInt(v);
		return v.indexOf('cm') !== -1 ? n >= 150 && n <= 193 : v.indexOf('in') !== -1 ? n >= 59 && n <= 76 : false;
	},
	'hcl': v => /^#[0-9a-f]{6}$/.test(v),
	'ecl': v => eyeColours.includes(v),
	'pid': v => /^\d{9}$/.test(v),
	'cid': v => true
}

const passports = get('input.txt', '\n\n').map(str => {
	let found;
	let data = {};
	const rx = /(\w{3}):([\w#]+)/g;
	const search = str.replace(/\n/g, ' ');
	do {
		found = rx.exec(search);
		if (found) data[found[1]] = found[2];
	} while (found);
	return data;
});

const valididatePassport = passport => {
	const hasKeys = reqKeys.every(key => !!passport[key]);
	if (!hasKeys) return false;

	for (const [key, val] of Object.entries(passport)) {
		const valid = rules[key](val);

		if (!valid) {
			return false;
		}
	}

	return true;
};

console.time('find');

const validPassports = passports.filter(valididatePassport);

console.timeEnd('find');

console.log(validPassports.length);