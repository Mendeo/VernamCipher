'use strict';
const filePath = process.argv[2];
const fs = require('fs');
const key = fs.readFileSync('key');
const data = fs.readFileSync('data');
if (key.byteLength !== data.byteLength) throw 'The key does not match the data!'
const dataInt8 = new Int8Array(data);
const keyInt8 = new Int8Array(key);
const result = new ArrayBuffer(key.byteLength);
const resultInt8 = new Int8Array(result);
for (let i = 0; i < keyInt8.length; i++)
{
	resultInt8[i] = keyInt8[i] ^ dataInt8[i];
}
fs.writeFileSync(filePath, new Buffer.from(result));