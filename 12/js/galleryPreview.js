'use strict';

(function () {
  var PORTION_COMMENTS_COUNT = 5;
  var bodyElement = document.querySelector('body');
  var previewElement = document.querySelector('.big-picture');
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

  var renderPreview = function (data, pictureID) {
    commentsElement.innerHTML = '';
    previewElement.querySelector('.big-picture__img img').src = data[pictureID].url;
    previewElement.querySelector('.likes-count').textContent = data[pictureID].likes;
    previewElement.querySelector('.social__caption').textContent = data[pictureID].decription;

    previewElement.classList.remove('hidden');

    if (data[pictureID].comments.length > 0) {
      commentsCountElement.textContent = data[pictureID].comments.length;
      comments = data[pictureID].comments;
      renderComments();
    }
  };

  var openPreview = function (evt) {
    evt.preventDefault();
    var pictureNumber = evt.target.dataset.pictureID;
    if (pictureNumber === undefined) {
      pictureNumber = evt.target.parentNode.dataset.pictureID;
    }
    renderPreview(window.data.getData(), pictureNumber);
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
