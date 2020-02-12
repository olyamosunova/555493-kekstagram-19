'use strict';
(function () {
  var uploadFileForm = document.querySelector('.img-upload__form');
  var uploadFileInput = uploadFileForm.querySelector('#upload-file');
  var uploadFileWindow = uploadFileForm.querySelector('.img-upload__overlay');
  var uploadFileCancelButton = uploadFileForm.querySelector('.img-upload__cancel');
  var uploadFileHashtagsInput = uploadFileForm.querySelector('.text__hashtags');
  var uploadFileDescriptionInput = uploadFileForm.querySelector('.text__description');
  var uploadImagePreview = uploadFileForm.querySelector('.img-upload__preview img');
  var scaleControlSmaller = uploadFileForm.querySelector('.scale__control--smaller');
  var scaleControlBigger = uploadFileForm.querySelector('.scale__control--bigger');
  var scaleControlValue = uploadFileForm.querySelector('.scale__control--value');

  var openUploadWindow = function () {
    uploadFileWindow.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    uploadImagePreview.style = '';
    scaleControlValue.value = '100%';
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

  var uploadImagePreviewState = {
    scale: '',
    filter: ''
  };

  var changeUploadImagePreviewState = function (name, value) {
    uploadImagePreviewState[name] = value;
    uploadImagePreview.style = uploadImagePreviewState.scale + '; ' + uploadImagePreviewState.filter + '; ';
  };

  var getScaleValue = function () {
    return parseInt(scaleControlValue.value, 10);
  };

  var setScaleValue = function (value) {
    if (value >= window.constants.MIN_SCALE_VALUE && value <= window.constants.MAX_SCALE_VALUE) {
      scaleControlValue.value = value + '%';
      changeUploadImagePreviewState('scale', 'transform: scale(' + value / 100 + ')');
    }
  };

  var changeScaleValueHandler = function (evt) {
    if (evt.target === scaleControlSmaller) {
      setScaleValue(getScaleValue() - window.constants.CHANGE_SCALE_STEP);
    } else if (evt.target === scaleControlBigger) {
      setScaleValue(getScaleValue() + window.constants.CHANGE_SCALE_STEP);
    }
  };

  scaleControlSmaller.addEventListener('click', changeScaleValueHandler);
  scaleControlBigger.addEventListener('click', changeScaleValueHandler);

  var effectLevel = uploadFileForm.querySelector('.effect-level');
  effectLevel.classList.add('hidden');
  var effectsRadioSet = uploadFileForm.querySelector('.effects');

  var clearEffect = function () {
    changeUploadImagePreviewState('filter', '');
    uploadImagePreview.removeAttribute('class');
    effectLevel.classList.add('hidden');
  };

  var currentEffect = '';

  var addEffect = function (evt) {
    currentEffect = evt.target.value;
    clearEffect();

    if (currentEffect !== 'none') {
      uploadImagePreview.classList.add('effects__preview--' + currentEffect);
      effectLevel.classList.remove('hidden');
      window.slider.showHandler();
    }
  };

  var setEffectLevelDepth = function (depthValue) {
    switch (currentEffect) {
      case 'chrome':
        changeUploadImagePreviewState('filter', 'filter: grayscale(' + (depthValue / 100).toFixed(2) + ')');
        break;
      case 'sepia':
        changeUploadImagePreviewState('filter', 'filter: sepia(' + (depthValue / 100).toFixed(2) + ')');
        break;
      case 'marvin':
        changeUploadImagePreviewState('filter', 'filter: invert(' + depthValue + '%)');
        break;
      case 'phobos':
        changeUploadImagePreviewState('filter', 'filter: blur(' + (depthValue * 0.03) + 'px)');
        break;
      case 'heat':
        changeUploadImagePreviewState('filter', 'filter: brightness(' + (1 + parseFloat((depthValue * 0.02))) + ')');
        break;
      default:
        changeUploadImagePreviewState('filter', '');
    }
  };

  effectsRadioSet.addEventListener('click', addEffect);

  var uploadFileFormSubmitHandler = function (evt) {
    evt.preventDefault();
    if (window.validateForm.validate()) {
      uploadFileForm.submit();
    }
  };

  uploadFileForm.addEventListener('submit', uploadFileFormSubmitHandler);

  window.form = {
    setEffectLevelDepth: setEffectLevelDepth
  };

})();
