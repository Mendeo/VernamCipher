'use strict';
const crypto = require('crypto');
const fs = require('fs');

const size = Number(process.argv[2]);
if (isNaN(size))
{
	console.error('Incorrect key file size.');
	process.exit(1);
}

let rounds = process.argv[3];
let addition = process.argv[4];

if (!rounds || rounds < 1) rounds = 1;
console.log('round: 1');
let key = crypto.randomBytes(size);
const keyUint8 = new Uint8Array(key);
if (rounds > 1)
{
	for (let r = 2; r <= rounds; r++)
	{
		console.log(`round: ${r}`);
		const keyUint8_add = new Uint8Array(crypto.randomBytes(size));
		for (let i = 0; i < size; i++)
		{
			keyUint8[i] ^= keyUint8_add[i];
		}
	}
}
if (addition)
{
	fs.stat(addition, (err, kstats) =>
	{
		if (err)
		{
			console.error(`Error while readin ${addition} file!`);
			process.exit(2);
		}
		if (kstats.size < size)
		{
			console.error('Addition file size must be equal or greater then key size!');
			process.exit(3);
		}
		console.log(`round: addtition file: ${addition}`);
		const additionUint8 = new Uint8Array(fs.readFileSync(addition));
		for (let i = 0; i < size; i++)
		{
			keyUint8[i] ^= additionUint8[i];
		}
		writeKey();
	});
}
else
{
	writeKey();
}

function writeKey()
{
	console.log('Writing to file...');
	fs.writeFileSync('key', Buffer.from(key));
}

