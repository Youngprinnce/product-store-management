"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(query) {
  if (query) {
    var queryString = query.split("?")[1];

    if (queryString.length > 0) {
      var params = queryString.split("&");
      var paramsObj = {};
      params.forEach(function (param) {
        var keyValue = param.split("=");
        paramsObj[keyValue[0]] = keyValue[1];
      });
      return paramsObj;
    }
  }

  return {};
};

exports["default"] = _default;