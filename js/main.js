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

var AVATAR_NUMBERS = [1, 2, 3, 4, 5, 6];
var MIN_COMMENTS = 3;
var MAX_COMMENTS = 15;
var MIN_LIKES = 10;
var MAX_LIKES = 200;

var getRandomElementFromArray = function (array) {
  var min = Math.floor(Math.random() * 2);
  var max = array.length;
  var randomNumber = Math.floor(Math.random() * (max - min / 2));

  randomNumber = randomNumber < 0 ? 0 : randomNumber;

  array = Math.floor(Math.random() * 2) === 0 ? array.reverse() : array;

  return array[randomNumber];
};

var getAvatarURL = function (avatarNumbers) {
  return 'img\\avatar-' + getRandomElementFromArray(avatarNumbers) + '.svg';
};

var createMessage = function (messageTemplates, names, avatarNumbers) {
  var message = Math.floor(Math.random() * 2) + 1 === 1 ? getRandomElementFromArray(messageTemplates) : getRandomElementFromArray(messageTemplates) + getRandomElementFromArray(messageTemplates);

  return {
    avatar: getAvatarURL(avatarNumbers),
    message: message,
    name: getRandomElementFromArray(names)
  };
};

var createMessages = function (quantity, messageTemplates, names, avatarNumbers) {
  var messages = [];

  for (var i = 0; i < quantity; i++) {
    messages.push(createMessage(messageTemplates, names, avatarNumbers));
  }

  return messages;
};

var mokiMessages = createMessages(QUANTITY_MESSAGES, MESSAGE_TEMPLATES, NAME_TEMPLATES, AVATAR_NUMBERS);

var getPhotoURL = function (number) {
  return 'photos/' + number + '.jpg';
};

var getQuantityLikes = function (minLikes, maxLikes) {
  return Math.floor(Math.random() * (maxLikes - minLikes)) + minLikes;
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
      likes: getQuantityLikes(MIN_LIKES, MAX_LIKES),
      comments: getComments(messages, MIN_COMMENTS, MAX_COMMENTS),
    });
  }

  return records;
};

var picturesFragment = document.createDocumentFragment();
var templatePicture = document.querySelector('#picture');

var renderPictures = function (mokiData, template) {
  for (var i = 0; i < mokiData.length; i++) {
    var pictureElement = template.cloneNode(true).content;
    pictureElement.querySelector('.picture__img').src = mokiData[i].url;
    pictureElement.querySelector('.picture__likes').textContent = mokiData[i].likes;
    pictureElement.querySelector('.picture__comments').textContent = mokiData[i].comments.length;

    picturesFragment.appendChild(pictureElement);
  }
};

renderPictures(renderMOKI(QUANTITY_RECORDS, mokiMessages), templatePicture);

document.querySelector('.pictures').appendChild(picturesFragment);
