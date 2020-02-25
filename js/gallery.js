'use strict';

(function () {

  var createPicturesElements = function (data) {
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

  var renderPicturesElements = function (data) {
    document.querySelector('.pictures').appendChild(createPicturesElements(data));

    var pictures = document.querySelectorAll('.picture');

    pictures.forEach(function (picture, index) {
      picture.dataset.pictureID = index;
      picture.addEventListener('click', window.galleryPreview.open);
    });
  };

  var deletePicturesElements = function () {
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
    deletePicturesElements();
    renderPicturesElements(data);
  };

  var errorLoadHandler = function () {
    window.message.showError('The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurrence on the web', 'It\'s a crap');
  };

  var dataLoadHandler = function (data) {
    window.data.save(data);
    renderPicturesElements(window.data.getData());
    window.galleryFilter.show();
  };

  window.backend.load(errorLoadHandler, dataLoadHandler);

  window.gallery = {
    applyFilter: applyFilter,
    galleryPicturePressEnterHandler: galleryPicturePressEnterHandler
  };
})();
