'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;
  var showedMessage;

  var showSuccess = function (text) {
    var message = successTemplate.cloneNode(true);

    if (text) {
      message.querySelector('.success__title').textContent = text;
    }

    document.querySelector('main').appendChild(message);
    showedMessage = document.querySelector('section.success');

    showedMessage.querySelector('.success__button').addEventListener('click', hide);
    document.addEventListener('keydown', messageEscDownHandler);
  };

  var showError = function (text) {
    var message = errorTemplate.cloneNode(true);

    if (text) {
      message.querySelector('.error__title').textContent = text;
    }

    document.querySelector('main').appendChild(message);
    showedMessage = document.querySelector('section.error');
    showedMessage.querySelector('.error__button').addEventListener('click', hide);
    document.addEventListener('keydown', messageEscDownHandler);
  };

  var messageEscDownHandler = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      hide();
    }
  };

  var hide = function () {
    showedMessage.remove();

    document.removeEventListener('keydown', messageEscDownHandler);
  };

  window.message = {
    showSuccess: showSuccess,
    showError: showError,
    hide: hide
  };
})();
