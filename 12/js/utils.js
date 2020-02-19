'use strict';
(function () {
  var ESC_KEYCODE = 'Escape';
  var ENTER_KEYCODE = 'Enter';

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomElementFromArray = function (array) {
    var min = Math.floor(Math.random() * 2);
    var max = array.length;
    var randomNumber = Math.floor(Math.random() * (max - min / 2));

    randomNumber = randomNumber < 0 ? 0 : randomNumber;

    array = Math.floor(Math.random() * 2) === 0 ? array.reverse() : array;

    return array[randomNumber];
  };

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
    getRandomNumber: getRandomNumber,
    getRandomElementFromArray: getRandomElementFromArray,
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    isOnFocus: isOnFocus,
    isModalOpen: isModalOpen
  };

})();
