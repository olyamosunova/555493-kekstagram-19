'use strict';

var RECORDS_COUNT = 25;
var MESSAGES_COUNT = 100;
var MIN_COMMENTS_COUNT = 3;
var MAX_COMMENTS_COUNT = 15;
var MIN_LIKES_COUNT = 10;
var MAX_LIKES_COUNT = 200;

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
  var message = Math.floor(Math.random() * 2) + 1 === 1 ? getRandomElementFromArray(messageTemplates) : getRandomElementFromArray(messageTemplates) + getRandomElementFromArray(messageTemplates);

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

var renderMOKI = function (quantity, messages) {
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

var renderPictures = function (mokiData) {
  var picturesFragment = document.createDocumentFragment();
  var templatePicture = document.querySelector('#picture');

  for (var i = 0; i < mokiData.length; i++) {
    var pictureElement = templatePicture.cloneNode(true).content;
    pictureElement.querySelector('.picture__img').src = mokiData[i].url;
    pictureElement.querySelector('.picture__likes').textContent = mokiData[i].likes;
    pictureElement.querySelector('.picture__comments').textContent = mokiData[i].comments.length;

    picturesFragment.appendChild(pictureElement);
  }

  document.querySelector('.pictures').appendChild(picturesFragment);
};

renderPictures(renderMOKI(RECORDS_COUNT, mokiMessages));


