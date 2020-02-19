'use strict';

(function () {
  var DEFAULT_DEPTH_VALUE = 100;

  var pinElement = document.querySelector('.effect-level__pin');
  var lineElement = document.querySelector('.effect-level__line');
  var depthElement = document.querySelector('.effect-level__depth');
  var depthValueInput = document.querySelector('.effect-level__value');

  pinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;


      var rightLimit = lineElement.clientWidth;
      var leftLimit = 0;
      var newCoordX = pinElement.offsetLeft - shift;
      if (newCoordX >= leftLimit && newCoordX <= rightLimit) {
        pinElement.style.left = newCoordX + 'px';
        depthElement.style.width = newCoordX + 'px';
        setDepthValue();
      }
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
  });

  var setDepthValue = function () {
    var value = Math.floor(pinElement.offsetLeft / lineElement.clientWidth * 100);
    depthValueInput.value = value;
    window.form.setEffectLevelDepth(value);
  };

  var getDepthValue = function () {
    return depthValueInput.value;
  };

  var showEffectSliderHandler = function () {
    pinElement.style.left = lineElement.clientWidth + 'px';
    depthElement.style.width = lineElement.clientWidth + 'px';
    depthValueInput.value = DEFAULT_DEPTH_VALUE;
  };

  window.slider = {
    showHandler: showEffectSliderHandler,
    getDepthValue: getDepthValue
  };

})();
