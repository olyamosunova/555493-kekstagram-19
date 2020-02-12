'use strict';

(function () {
  var picturePressEnterHandler = function (evt) {
    if (!window.main.isModalOpen() && evt.key === window.main.KEY_ENTER && evt.target.classList.contains('picture')) {
      window.preview.open(evt);
    }
  };

  document.addEventListener('keydown', picturePressEnterHandler);

  window.picture = {
    picturePressEnterHandler: picturePressEnterHandler
  };
})();
