"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePublicUrl = exports.api = void 0;
var api = 'http://localhost:3000/api';
exports.api = api;

var generatePublicUrl = function generatePublicUrl(fileName) {
  return "http://localhost:3000/public/".concat(fileName);
};

exports.generatePublicUrl = generatePublicUrl;