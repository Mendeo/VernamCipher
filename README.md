# Простая программа на Node.js для шифрования файллов шифром Вернама

Ключ - это файл "key".
Зашифрованные данные - это файл "data".

Если ключ уже есть, то будет использоваться его начало. Если ключа нет, то будет сгенерирован новый.
Аргументы to.js:
1. Файл, который следует зашифровать.
2. Обрезать ли существующий ключ после шифрования.

Аргументы from.js:
1. Файл, в который следует расшифровать данные.
2. Обрезать ли ключ после расшифровки.