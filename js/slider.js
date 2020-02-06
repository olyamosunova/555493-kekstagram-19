'use strict';

(function () {
  var pin = document.querySelector('.effect-level__pin');
  var line = document.querySelector('.effect-level__line');
  var depth = document.querySelector('.effect-level__depth');
  var depthValue = document.querySelector('.effect-level__value');

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;


      var rightLimit = line.clientWidth;
      var leftLimit = 0;
      var newCoordX = pin.offsetLeft - shift;
      if (newCoordX >= leftLimit && newCoordX <= rightLimit) {
        pin.style.left = newCoordX + 'px';
        depth.style.width = newCoordX + 'px';
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
    var value = Math.floor(pin.offsetLeft / line.clientWidth * 100);
    depthValue.value = value;
    window.form.setEffectLevelDepth(value);
  };

  var getDepthValue = function () {
    return depthValue.value;
  };

  var showEffectSliderHandler = function () {
    pin.style.left = line.clientWidth + 'px';
    depth.style.width = line.clientWidth + 'px';
    depthValue.value = window.config.DEFAULT_DEPTH_VALUE;
  };

  window.slider = {
    showHandler: showEffectSliderHandler,
    getDepthValue: getDepthValue
  };

})();
