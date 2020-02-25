'use strict';

(function () {
  var serverData;

  var saveData = function (data) {
    serverData = data;
  };

  var getData = function () {
    return serverData;
  };

  var getElementByURL = function (elementURL) {
    return getData().filter(function (element) {
      return element.url === elementURL;
    }).pop();
  };

  window.data = {
    save: saveData,
    getData: getData,
    getElementByURL: getElementByURL
  };
})();
