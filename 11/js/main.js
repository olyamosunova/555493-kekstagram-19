'use strict';
(function () {
  var KEY_ESCAPE = 'Escape';
  var KEY_ENTER = 'Enter';

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

  var isOnFocus = function (element) {
    return document.activeElement === element;
  };

  var isModalOpen = function () {
    return document.querySelector('body').classList.contains('modal-open');
  };

  window.main = {
    KEY_ESCAPE: KEY_ESCAPE,
    KEY_ENTER: KEY_ENTER,
    getRandomNumber: getRandomNumber,
    getRandomElementFromArray: getRandomElementFromArray,
    isOnFocus: isOnFocus,
    isModalOpen: isModalOpen
  };

})();
