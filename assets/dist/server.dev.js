"use strict";

var express = require('express');

var _require = require('inspector'),
    url = _require.url;

var multer = require('multer');

var path = require('path');

var _require2 = require('url'),
    URL = _require2.URL;

var app = express();
var port = 3000; // Налаштування для зберігання завантажених зображень

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'img', 'uploads'); // Папка, куди будуть зберігатися файли
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Перейменовуємо файл, щоб уникнути колізій
  }
});
var upload = multer({
  storage: storage
}); // Обробка завантаження зображення

app.post('/upload', upload.single('image'), function (req, res) {
  if (!req.file) {
    return res.status(400).send('Файл не було завантажено');
  }

  res.status(200).send({
    filePath: '../img/uploads/' + req.file.filename
  });
}); // Обслуговування HTML форми

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html')); // Припускаємо, що ваша форма знаходиться в index.html
});
app.listen(port, function () {
  console.log("\u0421\u0435\u0440\u0432\u0435\u0440 \u043F\u0440\u0430\u0446\u044E\u0454 \u043D\u0430 http://localhost:".concat(port));
});