'use strict';
(function () {
  var KEY_ESCAPE = 'Escape';
  var KEY_ENTER = 'Enter';

  window.main = {
    KEY_ESCAPE: KEY_ESCAPE,
    KEY_ENTER: KEY_ENTER
  };

  window.main.getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  window.main.getRandomElementFromArray = function (array) {
    var min = Math.floor(Math.random() * 2);
    var max = array.length;
    var randomNumber = Math.floor(Math.random() * (max - min / 2));

    randomNumber = randomNumber < 0 ? 0 : randomNumber;

    array = Math.floor(Math.random() * 2) === 0 ? array.reverse() : array;

    return array[randomNumber];
  };

  window.main.isOnFocus = function (element) {
    return document.activeElement === element;
  };

  window.main.isModalOpen = function () {
    return document.querySelector('body').classList.contains('modal-open');
  };

})();
