'use strict';

(function () {
  var MAX_HASHTAGS_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var errorMessage = '';

  var validateHashtags = function (inputElement) {
    var inputValue = inputElement.value;
    var validity = true;

    if (inputValue !== '') {
      var hashtags = inputValue.split(' ');
      errorMessage = '';

      if (hashtags.length > MAX_HASHTAGS_COUNT) {
        errorMessage += 'Нельзя указать больше пяти хэш-тегов. ';
        validity = false;
      } else if (window.utils.isArrayHasDuplicateElements(hashtags)) {
        errorMessage += 'Один и тот же хэш-тег не может быть использован дважды. ';
      } else {
        hashtags.forEach(function (hashtag) {
          if (hashtag.length > MAX_HASHTAG_LENGTH) {
            errorMessage += 'Максимальная длина одного хэш-тега 20 символов, включая решётку. ';
            validity = false;
          } else if (hashtag === '#') {
            errorMessage += 'Хеш-тег не может состоять только из одной решётки. ';
            validity = false;
          } else if (hashtag.charAt(0) !== '#') {
            errorMessage += 'Хэш-тег должен начинаться с символа # (решётка). ';
            validity = false;
          } else if (/[^a-zA-Z0-9]/.test(hashtag.slice(1, (hashtag.length - 1)))) {
            errorMessage += 'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д. ';
          }
        });
      }
    }

    if (!validity) {
      inputElement.classList.add('input-invalid');
      inputElement.setCustomValidity(errorMessage);
    }

    return validity;
  };

  window.formValidator = {
    validate: validateHashtags
  };
})();
