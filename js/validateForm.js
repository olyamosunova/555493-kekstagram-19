'use strict';

(function () {
  var uploadFileHashtagsInput = document.querySelector('.text__hashtags');

  var findDuplicateElements = function (elements) {
    var duplicatesExist = false;
    var etalon = '';
    if (elements.length > 1) {
      for (var i = 0; i < elements.length; i++) {
        etalon = elements[i];
        for (var j = i + 1; j < elements.length; j++) {
          if (etalon.toLocaleLowerCase() === elements[j].toLocaleLowerCase()) {
            duplicatesExist = true;
          }
        }
      }
    }

    return duplicatesExist;
  };

  var validateHashtags = function () {
    var validity = true;

    if (uploadFileHashtagsInput.value !== '') {
      var hashtags = uploadFileHashtagsInput.value.split(' ');
      var errorMessage = '';

      if (hashtags.length > window.constants.MAX_HASHTAGS_COUNT) {
        errorMessage += 'Нельзя указать больше пяти хэш-тегов. ';
        validity = false;
      } else if (findDuplicateElements(hashtags)) {
        errorMessage += 'Один и тот же хэш-тег не может быть использован дважды. ';
      } else {
        hashtags.forEach(function (hashtag) {
          if (hashtag.length > window.constants.MAX_HASHTAG_LENGTH) {
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

      uploadFileHashtagsInput.setCustomValidity(errorMessage);
    }

    return validity;
  };

  uploadFileHashtagsInput.addEventListener('input', validateHashtags);

  window.validateForm = {
    validate: validateHashtags
  };
})();
