'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;
  var messageElement;

  var showSuccess = function (textTitle, textButton) {
    var message = successTemplate.cloneNode(true);

    if (textTitle) {
      message.querySelector('.success__title').textContent = textTitle;
    }

    if (textButton) {
      message.querySelector('.success__button').textContent = textButton;
    }

    document.querySelector('main').appendChild(message);
    messageElement = document.querySelector('section.success');
    messageElement.addEventListener('click', hide);

    messageElement.querySelector('.success__button').addEventListener('click', hidePressButtonHandler);
    document.addEventListener('keydown', messageEscDownHandler);
  };

  var showError = function (textTitle, textButton) {
    var message = errorTemplate.cloneNode(true);

    if (textTitle) {
      message.querySelector('.error__title').textContent = textTitle;
    }

    if (textButton) {
      message.querySelector('.error__button').textContent = textButton;
    }

    document.querySelector('main').appendChild(message);
    messageElement = document.querySelector('section.error');
    messageElement.addEventListener('click', hide);

    messageElement.querySelector('.error__button').addEventListener('click', hidePressButtonHandler);
    document.addEventListener('keydown', messageEscDownHandler);
  };

  var messageEscDownHandler = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      messageElement.remove();

      document.removeEventListener('keydown', messageEscDownHandler);
    }
  };

  var hidePressButtonHandler = function () {
    messageElement.remove();

    document.removeEventListener('keydown', messageEscDownHandler);
  };

  var hide = function (evt) {
    if (evt.target === messageElement) {
      messageElement.remove();

      document.removeEventListener('keydown', messageEscDownHandler);
    }
  };

  window.message = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
