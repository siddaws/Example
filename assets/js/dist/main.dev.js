"use strict";

var _cats = require("../js/cats.js");

function showImage(arr) {
  var out = '<div class="images-grid">';
  arr.forEach(function (el) {
    out += "\n        <div class=\"grid-item\">\n            <img src=\"".concat(el.image, "\" alt=\"").concat(el.title, "\" onerror=\"this.onerror=null;this.src='img/defoultCat.avif';\">\n            <div class=\"images-text\">\n                <h3>").concat(el.title, "</h3>\n                <p>").concat(el.price, "$, ").concat(el.description, "</p>\n            </div>\n        </div>");
  });
  out += '</div>';
  document.getElementById('about').innerHTML = out;
}

showImage(_cats.CATS);
var form = document.getElementById('addCatForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var price = document.getElementById('price').value;
  var imageInput = document.getElementById('image');
  var image = imageInput.files[0];
  saveCat(title, description, price, image);
});

function saveCat(title, description, price, image) {
  var cat = {
    title: title,
    description: description,
    price: price,
    image: image ? image.name : 'defaultCat.avif'
  };

  _cats.CATS.push(cat);

  showImage(_cats.CATS);
}

form.addEventListener('submit', function _callee(event) {
  var title, description, price, imageInput, image, formData, response, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault();
          title = document.getElementById('title').value;
          description = document.getElementById('description').value;
          price = document.getElementById('price').value;
          imageInput = document.getElementById('image');
          image = imageInput.files[0];
          formData = new FormData();
          formData.append('image', image); // Додаємо зображення у форму

          formData.append('title', title);
          formData.append('description', description);
          formData.append('price', price);
          _context.prev = 11;
          _context.next = 14;
          return regeneratorRuntime.awrap(fetch('/upload', {
            method: 'POST',
            body: formData
          }));

        case 14:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 22;
            break;
          }

          _context.next = 18;
          return regeneratorRuntime.awrap(response.json());

        case 18:
          result = _context.sent;
          saveCat(title, description, price, result.filePath);
          _context.next = 23;
          break;

        case 22:
          alert('Не вдалося завантажити зображення');

        case 23:
          _context.next = 28;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](11);
          alert('Помилка при завантаженні зображення');

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[11, 25]]);
});