'use strict';
const ab = new ArrayBuffer(10);
const data = new Uint8Array(ab);
for (let i = 0; i < data.length; i++) data[i] = i;
console.log(data.slice(1));
