'use strict';

(function () {
  var galleryPicturePressEnterHandler = function (evt) {
    if (!window.utils.isModalOpen() && window.utils.isEnterPressed && evt.target.classList.contains('picture')) {
      window.galleryPreview.open(evt);
    }
  };

  document.addEventListener('keydown', galleryPicturePressEnterHandler);

  window.picture = {
    picturePressEnterHandler: picturePressEnterHandler
  };
})();
