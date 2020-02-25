'use strict';

(function () {
  var PORTION_COMMENTS_COUNT = 5;
  var bodyElement = document.querySelector('body');
  var previewElement = document.querySelector('.big-picture');
  var previewImageElement = previewElement.querySelector('.big-picture__img img');
  var previewCloseButton = previewElement.querySelector('.big-picture__cancel');
  var commentsElement = previewElement.querySelector('.social__comments');
  var commentsLoaderButton = previewElement.querySelector('.comments-loader');
  var commentsShowedCountElement = previewElement.querySelector('.comments-showed');
  var commentsCountElement = previewElement.querySelector('.comments-count');
  var showedCommentsCount = 0;
  var comments;

  var renderComments = function () {
    var restCommentsCount = comments.length - showedCommentsCount;
    var commentsFragment = document.createDocumentFragment();
    var newCommentsPortionCount = restCommentsCount < PORTION_COMMENTS_COUNT ? restCommentsCount : PORTION_COMMENTS_COUNT;
    var newPortionComment = comments.slice(showedCommentsCount, showedCommentsCount + newCommentsPortionCount);

    newPortionComment.forEach(function (item) {
      var newComment = renderComment(item);
      commentsFragment.appendChild(newComment);
    });
    commentsElement.appendChild(commentsFragment);

    if (showedCommentsCount === 0) {
      commentsLoaderButton.classList.remove('hidden');
      commentsLoaderButton.addEventListener('click', renderComments);
    }

    showedCommentsCount += newCommentsPortionCount;
    commentsShowedCountElement.textContent = showedCommentsCount;

    if (showedCommentsCount === comments.length) {
      commentsLoaderButton.classList.add('hidden');
      commentsLoaderButton.removeEventListener('click', renderComments);
    }
  };

  var renderComment = function (dataItem) {
    var newComment = document.createElement('li');
    var newCommentImg = document.createElement('img');
    newComment.appendChild(newCommentImg);
    var newCommentText = document.createElement('p');
    newComment.appendChild(newCommentText);

    newComment.classList.add('social__comment');
    newCommentImg.classList.add('social__picture');
    newCommentImg.src = dataItem.avatar;
    newCommentImg.alt = dataItem.name;
    newCommentText.textContent = dataItem.message;

    return newComment;
  };

  var renderPreview = function (pictureObject) {
    commentsElement.innerHTML = '';

    previewImageElement.src = pictureObject.url;
    previewImageElement.alt = pictureObject.description;
    previewElement.querySelector('.likes-count').textContent = pictureObject.likes;
    previewElement.querySelector('.social__caption').textContent = pictureObject.description;

    previewElement.classList.remove('hidden');

    if (pictureObject.comments.length > 0) {
      commentsCountElement.textContent = pictureObject.comments.length;
      comments = pictureObject.comments;
      renderComments();
    }
  };

  var openPreview = function (evt) {
    evt.preventDefault();
    var pictureURL = evt.currentTarget.querySelector('img').getAttribute('src');
    renderPreview(window.data.getElementByURL(pictureURL));
    bodyElement.classList.add('modal-open');

    document.removeEventListener('keydown', window.picture.picturePressEnterHandler);
    document.addEventListener('keydown', previewPressEscape);
    previewCloseButton.addEventListener('click', closePreview);
  };

  var closePreview = function () {
    showedCommentsCount = 0;
    document.removeEventListener('keydown', previewPressEscape);
    commentsLoaderButton.removeEventListener('click', renderComments);
    document.addEventListener('keydown', window.picture.picturePressEnterHandler);
    bodyElement.classList.remove('modal-open');
    previewElement.classList.add('hidden');
  };

  var previewPressEscape = function (evt) {
    if (window.utils.isEscPressed(evt.key)) {
      closePreview();
    }
  };

  window.galleryPreview = {
    open: openPreview,
    close: closePreview
  };
})();
