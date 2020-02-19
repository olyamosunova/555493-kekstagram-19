'use strict';
(function () {
  var uploadFileForm = document.querySelector('.img-upload__form');
  var uploadFileInput = uploadFileForm.querySelector('#upload-file');
  var uploadFileWindow = uploadFileForm.querySelector('.img-upload__overlay');
  var uploadFileCancelButton = uploadFileForm.querySelector('.img-upload__cancel');
  var uploadFileHashtagsInput = uploadFileForm.querySelector('.text__hashtags');
  var uploadFileDescriptionInput = uploadFileForm.querySelector('.text__description');

  var openUploadWindow = function () {
    uploadFileWindow.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', uploadFileWindowPressEscape);
  };

  var cancelUploadFile = function () {
    uploadFileInput.value = null;
    uploadFileWindow.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', uploadFileWindowPressEscape);
  };

  var uploadFileWindowPressEscape = function (evt) {
    if (evt.key === window.main.KEY_ESCAPE && !window.main.isOnFocus(uploadFileDescriptionInput) && !window.main.isOnFocus(uploadFileHashtagsInput)) {
      cancelUploadFile();
    }
  };

  uploadFileInput.addEventListener('change', openUploadWindow);
  uploadFileCancelButton.addEventListener('click', cancelUploadFile);

  var uploadImagePreview = uploadFileForm.querySelector('.img-upload__preview img');

  var scaleControlSmaller = uploadFileForm.querySelector('.scale__control--smaller');
  var scaleControlBigger = uploadFileForm.querySelector('.scale__control--bigger');
  var scaleControlValue = uploadFileForm.querySelector('.scale__control--value');


  var getScaleValue = function () {
    return parseInt(scaleControlValue.value, 10);
  };

  var setScaleValue = function (value) {
    if (value >= window.config.MIN_SCALE_VALUE && value <= window.config.MAX_SCALE_VALUE) {
      scaleControlValue.value = value + '%';

      uploadImagePreview.style.transform = 'scale(' + value / 100 + ')';
    }
  };

  var changeScaleValueHandler = function (evt) {
    if (evt.target === scaleControlSmaller) {
      setScaleValue(getScaleValue() - window.config.CHANGE_SCALE_STEP);
    } else if (evt.target === scaleControlBigger) {
      setScaleValue(getScaleValue() + window.config.CHANGE_SCALE_STEP);
    }
  };

  scaleControlValue.value = '100%';

  scaleControlSmaller.addEventListener('click', changeScaleValueHandler);
  scaleControlBigger.addEventListener('click', changeScaleValueHandler);

  var effectLevel = uploadFileForm.querySelector('.effect-level');
  effectLevel.classList.add('hidden');
  var effectsRadioSet = uploadFileForm.querySelector('.effects');

  var clearEffect = function () {
    uploadImagePreview.removeAttribute('class');
    effectLevel.classList.add('hidden');
  };

  var currentEffect = '';

  var addEffect = function (evt) {
    currentEffect = evt.target.value;
    clearEffect();

    if (currentEffect !== 'none') {
      uploadImagePreview.classList.add('effects__preview--' + currentEffect);
      uploadImagePreview.style = '';
      effectLevel.classList.remove('hidden');
      window.effectSlider.showHandler();
    }
  };

  var setEffectLevelDepth = function (depthValue) {
    switch (currentEffect) {
      case 'chrome':
        uploadImagePreview.style = 'filter: grayscale(' + (depthValue / 100).toFixed(2) + ')';
        break;
      case 'sepia':
        uploadImagePreview.style = 'filter: sepia(' + (depthValue / 100).toFixed(2) + ')';
        break;
      case 'marvin':
        uploadImagePreview.style = 'filter: invert(' + depthValue + '%)';
        break;
      case 'phobos':
        uploadImagePreview.style = 'filter: blur(' + (depthValue * 0.03) + 'px)';
        break;
      case 'heat':
        uploadImagePreview.style = 'filter: brightness(' + (1 + parseFloat((depthValue * 0.02))) + ')';
        break;
      default:
        uploadImagePreview.style = '';
    }
  };

  effectsRadioSet.addEventListener('click', addEffect);

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
    var hashtags = uploadFileHashtagsInput.value.split(' ');
    var errorMessage = '';
    var validity = true;

    if (hashtags.length > window.config.MAX_HASHTAGS_COUNT) {
      errorMessage += 'Нельзя указать больше пяти хэш-тегов. ';
      validity = false;
    } else if (findDuplicateElements(hashtags)) {
      errorMessage += 'Один и тот же хэш-тег не может быть использован дважды. ';
    } else {
      hashtags.forEach(function (hashtag) {
        if (hashtag.length > window.config.MAX_HASHTAG_LENGTH) {
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

    return validity;
  };

  uploadFileHashtagsInput.addEventListener('input', validateHashtags);

  var uploadFileDescriptionInputInvalidHandler = function () {
    if (uploadFileDescriptionInput.validity.tooLong) {
      uploadFileDescriptionInput.setCustomValidity('Комментарий не должен превышать 140 символов');
    }
  };

  uploadFileDescriptionInput.addEventListener('invalid', uploadFileDescriptionInputInvalidHandler);

  var uploadFileFormSubmitHandler = function (evt) {
    evt.preventDefault();
    if (validateHashtags()) {
      uploadFileForm.submit();
    }
  };

  uploadFileForm.addEventListener('submit', uploadFileFormSubmitHandler);

  window.form = {
    setEffectLevelDepth: setEffectLevelDepth
  };

})();