'use strict';

(function () {

  var preview = document.querySelector('.big-picture');


  var addComments = function (node, comments) {
    var commentsFragment = document.createDocumentFragment();
    node.innerHTML = '';

    comments.forEach(function (item) {
      var newComment = document.createElement('li');
      var newCommentImg = document.createElement('img');
      newComment.appendChild(newCommentImg);
      var newCommentText = document.createElement('p');
      newComment.appendChild(newCommentText);

      newComment.classList.add('social__comment');
      newCommentImg.classList.add('social__picture');
      newCommentImg.src = item.avatar;
      newCommentImg.alt = item.name;
      newCommentText.textContent = item.message;

      commentsFragment.appendChild(newComment);
    });

    node.appendChild(commentsFragment);
  };

  var renderPreview = function (data, number) {
    preview.classList.remove('hidden');

    preview.querySelector('.big-picture__img img').src = data[number].url;
    preview.querySelector('.likes-count').textContent = data[number].likes;
    preview.querySelector('.comments-count').textContent = data[number].comments.length;
    preview.querySelector('.social__caption').textContent = data[number].decription;

    addComments(preview.querySelector('.social__comments'), data[number].comments);

    preview.querySelector('.social__comment-count').classList.add('hidden');
    preview.querySelector('.comments-loader').classList.add('hidden');
  };

  var openPreview = function (evt) {
    evt.preventDefault();
    var pictureNumber = evt.target.dataset.pictureID;
    if (pictureNumber === undefined) {
      pictureNumber = evt.target.parentNode.dataset.pictureID;
    }
    renderPreview(window.data.getData(), pictureNumber);
    document.querySelector('body').classList.add('modal-open');

    document.removeEventListener('keydown', window.picture.picturePressEnterHandler);
    document.addEventListener('keydown', previewPressEscape);
  };

  var closePreview = function () {
    document.removeEventListener('keydown', previewPressEscape);
    document.addEventListener('keydown', window.picture.picturePressEnterHandler);
    document.querySelector('body').classList.remove('modal-open');
    preview.classList.add('hidden');
  };

  var previewPressEscape = function (evt) {
    if (evt.key === window.main.KEY_ESCAPE) {
      closePreview();
    }
  };

  var previewCloseButton = preview.querySelector('.big-picture__cancel');

  previewCloseButton.addEventListener('click', closePreview);

  window.preview = {
    open: openPreview,
    close: closePreview
  };
})();
