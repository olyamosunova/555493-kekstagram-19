'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;

  var showSuccess = function (text) {
    var message = successTemplate.cloneNode(true);

    if (text) {
      message.querySelector('.success__title').textContent = text;
    }

    document.querySelector('main').appendChild(message);

    document.querySelector('.success__button').addEventListener('click', hide);
    document.addEventListener('keydown', messageEscDownHandler);
  };

  var showError = function (text) {
    var message = errorTemplate.cloneNode(true);

    if (text) {
      message.querySelector('.success__title').textContent = text;
    }

    document.querySelector('main').appendChild(message);

    document.querySelector('.error__button').addEventListener('click', hide);
    document.addEventListener('keydown', messageEscDownHandler);
  };

  var messageEscDownHandler = function (evt) {
    if (evt.key === window.main.KEY_ESCAPE) {
      hide();
    }
  };

  var hide = function () {
    var successMessage = document.querySelector('.success');
    var errorMessage = document.querySelector('.error');

    if (successMessage) {
      document.querySelector('main').removeChild(successMessage);
    }

    if (errorMessage) {
      document.querySelector('main').removeChild(errorMessage);
    }

    document.removeEventListener('keydown', messageEscDownHandler);
  };

  window.message = {
    showSuccess: showSuccess,
    showError: showError,
    hide: hide
  };
})();
