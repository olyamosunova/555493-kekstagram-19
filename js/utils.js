'use strict';

(function () {
  var ESC_KEYCODE = 'Escape';
  var ENTER_KEYCODE = 'Enter';

  var isEnterPressed = function (evt) {
    return evt.key === ENTER_KEYCODE;
  };

  var isEscPressed = function (evt) {
    return evt.key === ESC_KEYCODE;
  };

  var isOnFocus = function (element) {
    return document.activeElement === element;
  };

  var isModalOpen = function () {
    return document.querySelector('body').classList.contains('modal-open');
  };

  var isArrayHasDuplicateElements = function (elements) {
    var duplicatesExist = false;

    if (elements.length < 2) {
      return duplicatesExist;
    }

    var template = '';
    for (var i = 0; i < elements.length; i++) {
      template = elements[i];
      for (var j = i + 1; j < elements.length; j++) {
        if (template.toLocaleLowerCase() === elements[j].toLocaleLowerCase()) {
          duplicatesExist = true;
        }
      }
    }

    return duplicatesExist;
  };

  window.utils = {
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    isOnFocus: isOnFocus,
    isModalOpen: isModalOpen,
    isArrayHasDuplicateElements: isArrayHasDuplicateElements
  };

})();
