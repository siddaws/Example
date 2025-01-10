"use strict";

var _cats = require("./cats.js");

function showImage(arr) {
  var out = '<div class="images-grid">';
  arr.forEach(function (el) {
    out += "\n        <div class=\"grid-item\">\n            <img src=\"".concat(el.image, "\" alt=\"").concat(el.title, "\" onerror=\"this.onerror=null;this.src='img/defoultCat.avif';\">\n            <div class=\"images-text\">\n                <h3>").concat(el.title, "</h3>\n                <p>").concat(el.price, "$, ").concat(el.description, "</p>\n            </div>\n        </div>");
  });
  out += '</div>';
  document.getElementById('about').innerHTML = out;
}

showImage(_cats.CATS);