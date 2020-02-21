'use strict';

(function () {

  var createPictures = function (data) {
    var picturesFragment = document.createDocumentFragment();
    var pictureTemplate = document.querySelector('#picture');

    data.forEach(function (item) {
      var pictureElement = pictureTemplate.cloneNode(true).content;
      pictureElement.querySelector('.picture__img').src = item.url;
      pictureElement.querySelector('.picture__likes').textContent = item.likes;
      pictureElement.querySelector('.picture__comments').textContent = item.comments.length;
      picturesFragment.appendChild(pictureElement);
    });

    return picturesFragment;
  };

  var renderPictures = function (data) {
    document.querySelector('.pictures').appendChild(createPictures(data));

    var pictures = document.querySelectorAll('.picture');

    pictures.forEach(function (picture, index) {
      picture.dataset.pictureID = index;
      picture.addEventListener('click', window.galleryPreview.open);
    });
  };

  var deletePictures = function () {
    var pictures = document.querySelectorAll('a.picture');
    pictures.forEach(function (picture) {
      picture.remove();
    });
  };

  var galleryPicturePressEnterHandler = function (evt) {
    if (!window.utils.isModalOpen() && window.utils.isEnterPressed && evt.target.classList.contains('picture')) {
      window.galleryPreview.open(evt);
    }
  };

  document.addEventListener('keydown', galleryPicturePressEnterHandler);

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
    applyFilter: applyFilter,
    galleryPicturePressEnterHandler: galleryPicturePressEnterHandler
  };
})();
