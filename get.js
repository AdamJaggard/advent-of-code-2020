import fs from 'fs';

export default (src, split = '\n') => {
	return fs
		.readFileSync(src)
		.toString()
		.split(split);
}
