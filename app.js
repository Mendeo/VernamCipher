'use strict';
const fs = require('fs');
const filePath = process.argv[2];
const keyFilePath = process.argv[3];
const truncateKey = process.argv[4];
fs.stat(filePath, (err, istats) =>
{
	if (err)
	{
		console.error('Can\'t open input file');
		return;
	}
	if (keyFilePath)
	{
		fs.stat(keyFilePath, (err, kstats) =>
		{
			if (err)
			{
				console.error('Can\'t open key file');
				return;
			}
			else if (kstats.size < istats.size)
			{
				console.error('Key file size must be greate or equal the input file size.');
				return;
			}
			go();
		});
	}
});
function go()
{
	const data = fs.readFileSync(filePath);
	const key = fs.readFileSync(keyFilePath);
	const dataUint8 = new Uint8Array(data);
	const keyUint8 = new Uint8Array(key);
	const resultUint8 = new Uint8Array(data.length);
	for (let i = 0; i < resultUint8.length; i++)
	{
		resultUint8[i] = keyUint8[i] ^ dataUint8[i];
	}
	fs.writeFileSync('data', Buffer.from(resultUint8));
	if(truncateKey)
	{
		fs.writeFileSync('key', Buffer.from(keyUint8.slice(data.byteLength).buffer));
	}
}
