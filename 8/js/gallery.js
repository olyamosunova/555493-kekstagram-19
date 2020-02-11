'use strict';

(function () {

  var renderPictures = function (data) {
    var picturesFragment = document.createDocumentFragment();
    var templatePicture = document.querySelector('#picture');

    data.forEach(function (item) {
      var pictureElement = templatePicture.cloneNode(true).content;
      pictureElement.querySelector('.picture__img').src = item.url;
      pictureElement.querySelector('.picture__likes').textContent = item.likes;
      pictureElement.querySelector('.picture__comments').textContent = item.comments.length;
      picturesFragment.appendChild(pictureElement);
    });

    document.querySelector('.pictures').appendChild(picturesFragment);

    var pictures = document.querySelectorAll('.picture');

    pictures.forEach(function (picture, index) {
      picture.dataset.pictureID = index;
    });
  };

  window.backend.load(null, renderPictures);
})();
