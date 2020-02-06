'use strict';

(function () {
  var MOKI_RECORDS_COUNT = 25;
  var MOKI_MESSAGES_COUNT = 100;
  var MOKI_MIN_COMMENTS_COUNT = 3;
  var MOKI_MAX_COMMENTS_COUNT = 15;
  var MOKI_MIN_LIKES_COUNT = 10;
  var MOKI_MAX_LIKES_COUNT = 200;

  var mokiMessageTemplates = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var mokiNames = [
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

  var createMokiMessage = function (messageTemplates, names) {
    var message = Math.floor(Math.random() * 2) + 1 === 1 ? window.main.getRandomElementFromArray(messageTemplates) : window.main.getRandomElementFromArray(messageTemplates) + ' ' + window.main.getRandomElementFromArray(messageTemplates);

    return {
      avatar: 'img\\avatar-' + window.main.getRandomNumber(1, 6) + '.svg',
      message: message,
      name: window.main.getRandomElementFromArray(names)
    };
  };

  var createMokiMessages = function (quantity, messageTemplates, names) {
    var messages = [];

    for (var i = 0; i < quantity; i++) {
      messages.push(createMokiMessage(messageTemplates, names));
    }

    return messages;
  };

  var mokiMessages = createMokiMessages(MOKI_MESSAGES_COUNT, mokiMessageTemplates, mokiNames);

  var getMokiComments = function (messages, minMessages, maxMessages) {
    var randomQuantityComments = Math.floor(Math.random() * (maxMessages - minMessages)) + minMessages;
    var comments = [];

    for (var i = 0; i < randomQuantityComments; i++) {
      comments.push(window.main.getRandomElementFromArray(messages));
    }

    return comments;
  };

  var renderMoki = function (quantity, messages) {
    var records = [];

    for (var i = 0; i < quantity; i++) {
      records.push({
        url: 'photos/' + (i + 1) + '.jpg',
        description: ' ',
        likes: window.main.getRandomNumber(MOKI_MIN_LIKES_COUNT, MOKI_MAX_LIKES_COUNT),
        comments: getMokiComments(messages, MOKI_MIN_COMMENTS_COUNT, MOKI_MAX_COMMENTS_COUNT),
      });
    }

    return records;
  };

  window.data = {
    moki: renderMoki(MOKI_RECORDS_COUNT, mokiMessages)
  };
})();
