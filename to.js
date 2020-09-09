'use strict';
const fs = require('fs');
const crypto = require('crypto');
const filePath = process.argv[2];
const truncateKey = process.argv[3];
let generateKey = false;
fs.stat(filePath, (err, istats) =>
	{
		if (err) throw new Error("Can't find input file");
		fs.stat('key', (err, kstats) => 
		{
			generateKey = err;
			if (!err && kstats.size < istats.size) throw new Error('Invalid key size.');
			go();
		});
	});
function go()
{
	console.log(filePath, truncateKey);
	const data = fs.readFileSync(filePath);
	const key = generateKey ? crypto.randomBytes(data.byteLength) : fs.readFileSync('key');
	const dataInt8 = new Int8Array(data);
	const keyUint8 = new Uint8Array(key);
	const result = new ArrayBuffer(data.byteLength);
	const resultInt8 = new Int8Array(result);
	for (let i = 0; i < resultInt8.length; i++)
	{
		resultInt8[i] = keyUint8[i] ^ dataInt8[i];
	}
	fs.writeFileSync('data', Buffer.from(result));
	if (generateKey)
	{
		fs.writeFileSync('key', Buffer.from(key));
	}
	else if(truncateKey)
	{
		fs.writeFileSync('key', Buffer.from(keyUint8.slice(data.byteLength).buffer))
	}
}
