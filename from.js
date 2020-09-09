'use strict';
const filePath = process.argv[2];
const truncateKey = process.argv[3];
const fs = require('fs');
fs.stat('data', (err, istats) =>
{
	if (err) throw new Error("Can't find input file");
	fs.stat('key', (err, kstats) => 
	{
		if (err) throw new Error("Can't find key file");
		if (kstats.size < istats.size) throw new Error('Invalid key size.');
	});
	go();
});
function go()
{
	if (!filePath) throw new Error('You must specifed output file path');
	console.log(filePath, truncateKey);
	const key = fs.readFileSync('key');
	const data = fs.readFileSync('data');
	const dataInt8 = new Int8Array(data);
	const keyInt8 = new Int8Array(key);
	const result = new ArrayBuffer(data.byteLength);
	const resultInt8 = new Int8Array(result);
	for (let i = 0; i < keyInt8.length; i++)
	{
		resultInt8[i] = keyInt8[i] ^ dataInt8[i];
	}
	fs.writeFileSync(filePath, Buffer.from(result));
	if (truncateKey)
	{
		fs.writeFileSync('key', Buffer.from(keyInt8.slice(data.byteLength).buffer));
	}
}
