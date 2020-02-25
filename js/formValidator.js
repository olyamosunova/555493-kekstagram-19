'use strict';

(function () {
  var MAX_HASHTAGS_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var hashtagInput = document.querySelector('.text__hashtags');
  var submitButton = document.querySelector('.img-upload__submit');
  var validity;

  var validateHashtags = function () {
    validity = true;
    var inputValue = hashtagInput.value;

    if (inputValue !== '') {
      var hashtags = inputValue.split(' ');

      if (hashtags.length > MAX_HASHTAGS_COUNT) {
        validity = false;
        hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов.');
        return validity;
      } else if (window.utils.isArrayHasDuplicateElements(hashtags)) {
        validity = false;
        hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
        return validity;
      } else {
        for (var i = 0; i < hashtags.length; i++) {
          if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
            validity = false;
            hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку.');
            return validity;
          } else if (hashtags[i] === '#') {
            validity = false;
            hashtagInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки.');
            return validity;
          } else if (hashtags[i].charAt(0) !== '#') {
            validity = false;
            hashtagInput.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка).');
            return validity;
          } else if (/^#([a-zA-Zа-яА-Я]+-)*([a-zA-Zа-яА-Я])/.test(hashtags[i].slice(1, (hashtags[i].length - 1)))) {
            validity = false;
            hashtagInput.setCustomValidity('Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
            return validity;
          }
        }
      }
    }
    hashtagInput.setCustomValidity('');

    return validity;
  };

  var submitButtonHandler = function () {
    if (!isValidate()) {
      hashtagInput.classList.add('input-invalid');
    }
  };

  var isValidate = function () {
    return validity;
  };

  var startWatching = function () {
    hashtagInput.addEventListener('input', validateHashtags);
    submitButton.addEventListener('click', submitButtonHandler);
  };

  var stopWatching = function () {
    hashtagInput.removeEventListener('input', validateHashtags);
    submitButton.removeEventListener('click', submitButtonHandler);
  };

  window.formValidator = {
    isValidate: isValidate,
    startWatching: startWatching,
    stopWatching: stopWatching
  };
})();
