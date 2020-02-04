'use strict';

var RECORDS_COUNT = 25;
var MESSAGES_COUNT = 100;
var MIN_COMMENTS_COUNT = 3;
var MAX_COMMENTS_COUNT = 15;
var MIN_LIKES_COUNT = 10;
var MAX_LIKES_COUNT = 200;
var SOCIAL_PICTURE_WIDTH = 35;
var SOCIAL_PICTURE_HEIGHT = 35;

var messagesTemplates = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var nameTemplates = [
  'Куселют',
  'Гладислав',
  'Кусимир',
  'Мышебор',
  'Вкусеслав',
  'Зуботяп',
  'Усеслав',
  'Пузеслав',
  'Хвостосмысл',
  'Царапа'
];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElementFromArray = function (array) {
  var min = Math.floor(Math.random() * 2);
  var max = array.length;
  var randomNumber = Math.floor(Math.random() * (max - min / 2));

  randomNumber = randomNumber < 0 ? 0 : randomNumber;

  array = Math.floor(Math.random() * 2) === 0 ? array.reverse() : array;

  return array[randomNumber];
};

var createMessage = function (messageTemplates, names) {
  var message = Math.floor(Math.random() * 2) + 1 === 1 ? getRandomElementFromArray(messageTemplates) : getRandomElementFromArray(messageTemplates) + ' ' + getRandomElementFromArray(messageTemplates);

  return {
    avatar: 'img\\avatar-' + getRandomNumber(1, 6) + '.svg',
    message: message,
    name: getRandomElementFromArray(names)
  };
};

var createMessages = function (quantity, messageTemplates, names) {
  var messages = [];

  for (var i = 0; i < quantity; i++) {
    messages.push(createMessage(messageTemplates, names));
  }

  return messages;
};

var mokiMessages = createMessages(MESSAGES_COUNT, messagesTemplates, nameTemplates);

var getPhotoURL = function (number) {
  return 'photos/' + number + '.jpg';
};

var getComments = function (messages, minMessages, maxMessages) {
  var randomQuantityComments = Math.floor(Math.random() * (maxMessages - minMessages)) + minMessages;
  var comments = [];

  for (var i = 0; i < randomQuantityComments; i++) {
    comments.push(getRandomElementFromArray(messages));
  }

  return comments;
};

var renderMoki = function (quantity, messages) {
  var records = [];

  for (var i = 0; i < quantity; i++) {
    records.push({
      url: getPhotoURL(i + 1),
      description: ' ',
      likes: getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
      comments: getComments(messages, MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT),
    });
  }

  return records;
};

var moki = renderMoki(RECORDS_COUNT, mokiMessages);

var renderPictures = function (mokiData) {
  var picturesFragment = document.createDocumentFragment();
  var templatePicture = document.querySelector('#picture');

  mokiData.forEach(function (item, index) {
    var pictureElement = templatePicture.cloneNode(true).content;
    pictureElement.querySelector('.picture__img').src = item.url;
    pictureElement.querySelector('.picture__likes').textContent = item.likes;
    pictureElement.querySelector('.picture__comments').textContent = item.comments.length;
    pictureElement.querySelector('.picture__img').dataset.id = index;
    picturesFragment.appendChild(pictureElement);
  });

  document.querySelector('.pictures').appendChild(picturesFragment);
};

renderPictures(moki);

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
    newCommentImg.width = SOCIAL_PICTURE_WIDTH;
    newCommentImg.height = SOCIAL_PICTURE_HEIGHT;
    newCommentText.textContent = item.message;

    commentsFragment.appendChild(newComment);
  });

  node.appendChild(commentsFragment);
};

var bigPicture = document.querySelector('.big-picture');

var showBigPicture = function (mokiData, number) {
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img img').src = mokiData[number].url;
  bigPicture.querySelector('.likes-count').textContent = mokiData[number].likes;
  bigPicture.querySelector('.comments-count').textContent = mokiData[number].comments.length;
  bigPicture.querySelector('.social__caption').textContent = mokiData[number].decription;

  addComments(bigPicture.querySelector('.social__comments'), mokiData[number].comments);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
};

var openBigPicture = function (evt) {
  var pictureNumber = evt.target.dataset.id;
  showBigPicture(moki, pictureNumber);

  document.addEventListener('keydown', bigPicturePressEscape);
};

var usersPictures = document.querySelectorAll('.picture');

usersPictures.forEach(function (picture) {
  picture.addEventListener('click', openBigPicture);
});


var closeBigPicture = function () {
  document.removeEventListener('keydown', bigPicturePressEscape);
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

var bigPicturePressEscape = function (evt) {
  if (evt.keyCode === 27) {
    closeBigPicture();
  }
};

var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

bigPictureCloseButton.addEventListener('click', closeBigPicture);

var uploadFileInput = document.querySelector('#upload-file');
var uploadFileWindow = document.querySelector('.img-upload__overlay');
var uploadFileCancelButton = document.querySelector('.img-upload__cancel');

var openUploadWindow = function () {
  uploadFileWindow.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', uploadFileWindowPressEscape);
};

var cancelUploadFile = function () {
  uploadFileInput.value = null;
  uploadFileWindow.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', uploadFileWindowPressEscape);
};

var uploadFileWindowPressEscape = function (evt) {
  if (evt.keyCode === 27) {
    cancelUploadFile();
  }
};

uploadFileInput.addEventListener('change', openUploadWindow);
uploadFileCancelButton.addEventListener('click', cancelUploadFile);
