'use strict';

var QUANTITY_RECORDS = 25;

var QUANTITY_MESSAGES = 100;

var MESSAGE_TEMPLATES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAME_TEMPLATES = [
  'Куселют',
  'Гладислав',
  'Кусимир',
  'Мышебор',
  'Вкусеслав',
  'Зуботяп',
  'Усеслав',
  'Пузеслав',
  'Хвостосмысл',
  'Хватебор',
  'Царапович',
  'Царап Хватьевич',
  'Вкусилиса',
  'Царапа',
  'Кусихвост',
  'Медолап',
  'ВлаДиван',
  'Сладкопуз',
  'Пузочёсий',
  'Мясополк',
  'Жорополк',
  'Мечижор',
  'Шерстиком',
  'Мурчала',
  'Катратка',
  'Яромур',
  'Ярожор',
  'Ярокус',
  'Яроцап',
  'Яролиз',
  'Наглохват',
  'Лютодрав',
  'Кладимур',
  'Мурополк',
  'Мурослав',
  'Удолюб',
  'Вездессун',
  'Втапкисрав',
  'Гладислав',
  'Вуглусрах'
];

var getRandomElementFromArray = function (array) {
  var _min = Math.floor(Math.random() * 2);
  var _max = array.length;
  var _randomNumber = Math.floor(Math.random() * (_max - _min / 2));

  _randomNumber = _randomNumber < 0 ? 0 : _randomNumber;

  array = Math.floor(Math.random() * 2) === 0 ? array.reverse() : array;

  return array[_randomNumber];
};

var getAuthorName = function (names) {
  return getRandomElementFromArray(names);
};

var getAvatarURL = function () {
  return 'img\\avatar-' + getRandomElementFromArray([1, 2, 3, 4, 5, 6]) + '.svg';
};

var createMessage = function (messageTemplates, names) {
  var _message = Math.floor(Math.random() * 2) + 1 === 1 ? getRandomElementFromArray(messageTemplates) : getRandomElementFromArray(messageTemplates) + getRandomElementFromArray(messageTemplates);

  return {
    'avatar': getAvatarURL(),
    'message': _message,
    'name': getAuthorName(names)
  };
};

var createMessages = function (quantity, messageTemplates, names) {
  var _messages = [];

  for (var i = 0; i < quantity; i++) {
    _messages.push(createMessage(messageTemplates, names));
  }

  return _messages;
};

var MESSAGES = createMessages(QUANTITY_MESSAGES, MESSAGE_TEMPLATES, NAME_TEMPLATES);

var getPhotoURL = function (number) {
  return 'photos/' + number + '.jpg';
};

var getQuantityLikes = function (max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getComments = function (messages) {
  var _max = 15;
  var _min = 3;
  var _randomQuantityComments = Math.floor(Math.random() * (_max - _min)) + _min;
  var _comments = [];

  for (var i = 0; i < _randomQuantityComments; i++) {
    _comments.push(getRandomElementFromArray(messages));
  }

  return _comments;
};

var createMOKI = function (quantity) {
  var _records = [];

  for (var i = 0; i < quantity; i++) {
    _records.push({
      'url': getPhotoURL(i + 1),
      'description': ' ',
      'likes': getQuantityLikes(200, 15),
      'comments': getComments(MESSAGES),
    });
  }

  return _records;
};

var MOKI = createMOKI(QUANTITY_RECORDS);

var picturesFragment = document.createDocumentFragment();
var templatePicture = document.querySelector('#picture');


for (var i = 0; i < MOKI.length; i++) {
  var pictureElement = templatePicture.cloneNode(true).content;
  pictureElement.querySelector('.picture__img').src = MOKI[i].url;
  pictureElement.querySelector('.picture__likes').textContent = MOKI[i].likes;
  pictureElement.querySelector('.picture__comments').textContent = MOKI[i].comments.length;

  picturesFragment.appendChild(pictureElement);
}

document.querySelector('.pictures').appendChild(picturesFragment);
