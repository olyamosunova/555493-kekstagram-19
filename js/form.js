'use strict';
(function () {
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var CHANGE_SCALE_STEP = 25;

  var bodyElement = document.querySelector('body');
  var uploadFileFormElement = document.querySelector('.img-upload__form');
  var uploadFileFormSubmitButton = uploadFileFormElement.querySelector('.img-upload__submit');
  var uploadFileInput = uploadFileFormElement.querySelector('#upload-file');
  var uploadFileWindowElement = uploadFileFormElement.querySelector('.img-upload__overlay');
  var uploadFileCancelButton = uploadFileFormElement.querySelector('.img-upload__cancel');
  var uploadFileHashtagsInput = uploadFileFormElement.querySelector('.text__hashtags');
  var uploadFileDescriptionInput = uploadFileFormElement.querySelector('.text__description');
  var uploadImagePreviewElement = uploadFileFormElement.querySelector('.img-upload__preview img');
  var scaleControlSmallerButton = uploadFileFormElement.querySelector('.scale__control--smaller');
  var scaleControlBiggerButton = uploadFileFormElement.querySelector('.scale__control--bigger');
  var scaleControlValueInput = uploadFileFormElement.querySelector('.scale__control--value');
  var effectLevelElement = uploadFileFormElement.querySelector('.effect-level');
  var effectsRadioSetElement = uploadFileFormElement.querySelector('.effects');

  var openUploadWindow = function () {
    uploadFileWindowElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', uploadFileWindowPressEscapeHandler);
    effectLevelElement.classList.add('hidden');
  };

  var closeUploadWindow = function () {
    uploadFileWindowElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', uploadFileWindowPressEscapeHandler);
    uploadFileFormClear();
  };

  var uploadFileFormClear = function () {
    uploadFileInput.value = null;
    scaleControlValueInput.value = '100%';
    uploadFileHashtagsInput.value = '';
    changeUploadImagePreviewState('scale', '');
    changeUploadImagePreviewState('filter', '');
    uploadImagePreviewElement.classList = '';
    uploadFileDescriptionInput.value = '';
    effectsRadioSetElement.querySelector('#effect-none').checked = true;
    uploadFileHashtagsInput.classList.remove('input-invalid');
  };

  var uploadFileWindowPressEscapeHandler = function (evt) {
    if (window.utils.isEscPressed(evt) && !window.utils.isOnFocus(uploadFileDescriptionInput) && !window.utils.isOnFocus(uploadFileHashtagsInput)) {
      closeUploadWindow();
    }
  };

  var fileReaderLoadHandler = function (evt) {
    uploadImagePreviewElement.src = evt.target.result;
  };

  var uploadFileInputHandler = function (evt) {
    var uploadFile = uploadFileInput.files[0];
    var fileReader = new FileReader();
    fileReader.addEventListener('load', fileReaderLoadHandler);
    fileReader.readAsDataURL(uploadFile);
    openUploadWindow(evt);
  };

  uploadFileInput.addEventListener('change', uploadFileInputHandler);
  uploadFileCancelButton.addEventListener('click', closeUploadWindow);

  var uploadImagePreviewState = {
    scale: '',
    filter: ''
  };

  var changeUploadImagePreviewState = function (name, value) {
    uploadImagePreviewState[name] = value;
    uploadImagePreviewElement.style = uploadImagePreviewState.scale + '; ' + uploadImagePreviewState.filter + '; ';
  };

  var getScaleValue = function () {
    return parseInt(scaleControlValueInput.value, 10);
  };

  var setScaleValue = function (value) {
    if (value >= MIN_SCALE_VALUE && value <= MAX_SCALE_VALUE) {
      scaleControlValueInput.value = value + '%';
      changeUploadImagePreviewState('scale', 'transform: scale(' + value / 100 + ')');
    }
  };

  var changeScaleValueHandler = function (evt) {
    if (evt.target === scaleControlSmallerButton) {
      setScaleValue(getScaleValue() - CHANGE_SCALE_STEP);
    } else if (evt.target === scaleControlBiggerButton) {
      setScaleValue(getScaleValue() + CHANGE_SCALE_STEP);
    }
  };

  scaleControlSmallerButton.addEventListener('click', changeScaleValueHandler);
  scaleControlBiggerButton.addEventListener('click', changeScaleValueHandler);

  var clearEffect = function () {
    changeUploadImagePreviewState('filter', '');
    uploadImagePreviewElement.removeAttribute('class');
    effectLevelElement.classList.add('hidden');
  };

  var currentEffect = '';

  var addEffect = function (evt) {
    currentEffect = evt.target.value;
    clearEffect();

    if (currentEffect !== 'none') {
      uploadImagePreviewElement.classList.add('effects__preview--' + currentEffect);
      effectLevelElement.classList.remove('hidden');
      window.slider.show();
    }
  };

  var setEffectLevelDepth = function (depthValue) {
    var filterStyle = '';
    switch (currentEffect) {
      case 'chrome':
        filterStyle = 'filter: grayscale(' + (depthValue / 100).toFixed(2) + ')';
        break;
      case 'sepia':
        filterStyle = 'filter: sepia(' + (depthValue / 100).toFixed(2) + ')';
        break;
      case 'marvin':
        filterStyle = 'filter: invert(' + depthValue + '%)';
        break;
      case 'phobos':
        filterStyle = 'filter: blur(' + (depthValue * 0.03) + 'px)';
        break;
      case 'heat':
        filterStyle = 'filter: brightness(' + (1 + parseFloat((depthValue * 0.02))) + ')';
        break;
      default:
        filterStyle = '';
    }

    changeUploadImagePreviewState('filter', filterStyle);
  };

  effectsRadioSetElement.addEventListener('click', addEffect);

  var uploadSuccessHandler = function () {
    closeUploadWindow();
    window.message.showSuccess();
  };

  var uploadErrorHandler = function () {
    closeUploadWindow();
    window.message.showError();
  };

  var uploadFileFormSubmitHandler = function (evt) {
    evt.preventDefault();
    if (window.formValidator.validate(uploadFileHashtagsInput)) {
      window.backend.save(new FormData(uploadFileFormElement), uploadErrorHandler, uploadSuccessHandler);
    }
  };

  var uploadFileHashtagsInputHandler = function () {
    uploadFileHashtagsInput.classList.remove('input-invalid');
  };

  uploadFileFormSubmitButton.addEventListener('click', uploadFileFormSubmitHandler);
  uploadFileHashtagsInput.addEventListener('input', uploadFileHashtagsInputHandler);

  window.form = {
    setEffectLevelDepth: setEffectLevelDepth
  };

})();
