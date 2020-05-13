'use strict';
const filePath = process.argv[2];
const fs = require('fs');
const data = fs.readFileSync(filePath);
const dataInt8 = new Int8Array(data);
const key = new ArrayBuffer(data.byteLength);
const keyUint8 = new Uint8Array(key);
const result = new ArrayBuffer(key.byteLength);
const resultInt8 = new Int8Array(result);
for (let i = 0; i < resultInt8.length; i++)
{
	keyUint8[i] = Math.random() * 256;
	resultInt8[i] = keyUint8[i] ^ dataInt8[i];
}
fs.writeFileSync('data', new Buffer.from(result));
fs.writeFileSync('key', new Buffer.from(key));