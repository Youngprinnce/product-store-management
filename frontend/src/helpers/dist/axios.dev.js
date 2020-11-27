"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _urlConfig = require("./urlConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var token = window.localStorage.getItem('token');

var axiosInstance = _axios["default"].create({
  baseURL: _urlConfig.api,
  headers: {
    'Authorization': token
  }
});

var _default = axiosInstance;
exports["default"] = _default;