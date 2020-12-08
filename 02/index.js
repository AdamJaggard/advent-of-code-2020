import get from '../get.js';

const input = get('input.txt').map(str => {
	const bits = /(\d+)\-(\d+) (\w): (\w+)/.exec(str);
	return [bits[1], bits[2], bits[3], bits[4]];
});

const isValidPwd = (min, max, char, pwd) => {
	const occurances = pwd.split('').reduce((prev, testChar) => prev + (testChar === char ? 1 : 0), 0);
	return occurances >= min && occurances <= max;
};

const isValidPwdAlt = (min, max, char, pwd) => {
	return (pwd[min-1] === char || pwd[max-1] === char) && pwd[min-1] !== pwd[max-1];
};

const getValidPwds = list => {
	return list.filter(bits => isValidPwd(...bits));
};

const getValidPwdsAlt = list => {
	return list.filter(bits => isValidPwdAlt(...bits));
};

console.time('pt1');
const validPwds = getValidPwds(input);
console.timeEnd('pt1');
console.log(validPwds.length);

console.time('pt2');
const validPwdsAlt = getValidPwdsAlt(input);
console.timeEnd('pt2');
console.log(validPwdsAlt.length);