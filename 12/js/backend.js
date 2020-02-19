'use strict';

(function () {
  var RESPONCE_TIMEOUT = 1000;
  var SUCCESS_STATUS = 200;
  var DOWNLOAD_DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_DATA_URL = 'https://js.dump.academy/kekstagram';

  var createXHR = function (errorHandler, successHandler) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = RESPONCE_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        successHandler(xhr.response);
      } else {
        errorHandler('Response status: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Connection\'s error');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Timeout ' + xhr.timeout + 'mc');
    });

    return xhr;
  };

  var load = function (errorHandler, successHandler) {
    var xhr = createXHR(errorHandler, successHandler);
    xhr.open('GET', DOWNLOAD_DATA_URL);
    xhr.send();
  };

  var save = function (data, errorHandler, successHandler) {
    var xhr = createXHR(errorHandler, successHandler);
    xhr.open('POST', UPLOAD_DATA_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
