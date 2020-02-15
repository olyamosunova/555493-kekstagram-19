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
      picture.addEventListener('click', window.preview.open);
    });
  };

  var deletePictures = function () {
    var pictures = document.querySelectorAll('a.picture');
    pictures.forEach(function (picture) {
      picture.remove();
    });
  };

  var applyFilter = function (data) {
    deletePictures();
    renderPictures(data);
  };

  var dataLoadHandler = function (data) {
    window.data.save(data);
    renderPictures(window.data.getData());
    window.galleryFilter.show();
  };

  window.backend.load(null, dataLoadHandler);

  window.gallery = {
    applyFilter: applyFilter
  };
})();
