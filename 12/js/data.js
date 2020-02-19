'use strict';

(function () {
  var serverData;

  var saveData = function (data) {
    serverData = data;
  };

  var getData = function () {
    return serverData;
  };

  window.data = {
    save: saveData,
    getData: getData
  };
})();
