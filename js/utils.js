'use strict';
(function () {
  var ESC_KEYCODE = 'Escape';
  var ENTER_KEYCODE = 'Enter';

  var isEnterPressed = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  var isEscPressed = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var isOnFocus = function (element) {
    return document.activeElement === element;
  };

  var isModalOpen = function () {
    return document.querySelector('body').classList.contains('modal-open');
  };

  window.utils = {
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    isOnFocus: isOnFocus,
    isModalOpen: isModalOpen
  };

})();
