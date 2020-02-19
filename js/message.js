'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;
  var showedMessageElement;

  var showSuccess = function (text) {
    var message = successTemplate.cloneNode(true);

    if (text) {
      message.querySelector('.success__title').textContent = text;
    }

    document.querySelector('main').appendChild(message);
    showedMessageElement = document.querySelector('section.success');

    showedMessageElement.querySelector('.success__button').addEventListener('click', hide);
    document.addEventListener('keydown', messageEscDownHandler);
  };

  var showError = function (text) {
    var message = errorTemplate.cloneNode(true);

    if (text) {
      message.querySelector('.error__title').textContent = text;
    }

    document.querySelector('main').appendChild(message);
    showedMessageElement = document.querySelector('section.error');
    showedMessageElement.querySelector('.error__button').addEventListener('click', hide);
    document.addEventListener('keydown', messageEscDownHandler);
  };

  var messageEscDownHandler = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      hide();
    }
  };

  var hide = function () {
    showedMessageElement.remove();

    document.removeEventListener('keydown', messageEscDownHandler);
  };

  window.message = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
