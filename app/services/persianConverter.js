exports.persianConvert = (input) => {
	const numbers = {
		0: '۰',
		1: '۱',
		2: '۲',
		3: '۳',
		4: '۴',
		5: '۵',
		6: '۶',
		7: '۷',
		8: '۸',
		9: '۹',
	};

	const persianNumber = input
		.toString()
		.split('')
		.map((number) => (numbers[number] ? numbers[number] : number))
		.join('');
	return persianNumber;
};
