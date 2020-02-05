'use strict';

var RECORDS_COUNT = 25;
var MESSAGES_COUNT = 100;
var MIN_COMMENTS_COUNT = 3;
var MAX_COMMENTS_COUNT = 15;
var MIN_LIKES_COUNT = 10;
var MAX_LIKES_COUNT = 200;
var SOCIAL_PICTURE_WIDTH = 35;
var SOCIAL_PICTURE_HEIGHT = 35;
var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;
var CHANGE_SCALE_STEP = 25;
var KEY_ESCAPE = 'Escape';
var KEY_ENTER = 'Enter';

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
  evt.preventDefault();
  var pictureNumber = evt.target.dataset.id;
  if (pictureNumber === undefined) {
    pictureNumber = evt.target.children[0].dataset.id;
  }
  showBigPicture(moki, pictureNumber);

  document.removeEventListener('keydown', userPicturesKeyDown);
  document.addEventListener('keydown', bigPicturePressEscape);
};

var usersPictures = document.querySelectorAll('.picture');

var userPicturesKeyDown = function (evt) {
  if (!document.querySelector('body').classList.contains('modal-open') && evt.key === KEY_ENTER && evt.target.classList.contains('picture')) {
    openBigPicture(evt);
  }
};

document.addEventListener('keydown', userPicturesKeyDown);

usersPictures.forEach(function (picture) {
  picture.addEventListener('click', openBigPicture);
});

var isOnFocus = function (element) {
  return document.activeElement === element;
};

var closeBigPicture = function () {
  document.removeEventListener('keydown', bigPicturePressEscape);
  document.addEventListener('keydown', userPicturesKeyDown);
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

var bigPicturePressEscape = function (evt) {
  if (evt.key === KEY_ESCAPE) {
    closeBigPicture();
  }
};

var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

bigPictureCloseButton.addEventListener('click', closeBigPicture);

var uploadFileForm = document.querySelector('.img-upload__form');
var uploadFileInput = uploadFileForm.querySelector('#upload-file');
var uploadFileWindow = uploadFileForm.querySelector('.img-upload__overlay');
var uploadFileCancelButton = uploadFileForm.querySelector('.img-upload__cancel');
var uploadFileHashtagsInput = uploadFileForm.querySelector('.text__hashtags');
var uploadFileDescriptionInput = uploadFileForm.querySelector('.text__description');

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
  if (evt.keyCode === 27 && !isOnFocus(uploadFileDescriptionInput) && !isOnFocus(uploadFileHashtagsInput)) {
    cancelUploadFile();
  }
};

uploadFileInput.addEventListener('change', openUploadWindow);
uploadFileCancelButton.addEventListener('click', cancelUploadFile);

var uploadImagePreview = uploadFileForm.querySelector('.img-upload__preview img');

var scaleControlSmaller = uploadFileForm.querySelector('.scale__control--smaller');
var scaleControlBigger = uploadFileForm.querySelector('.scale__control--bigger');
var scaleControlValue = uploadFileForm.querySelector('.scale__control--value');


var getScaleValue = function () {
  return parseInt(scaleControlValue.value, 10);
};

var setScaleValue = function (value) {
  if (value >= MIN_SCALE_VALUE && value <= MAX_SCALE_VALUE) {
    scaleControlValue.value = value + '%';

    uploadImagePreview.style.transform = 'scale(' + value / 100 + ')';
  }
};

var changeScaleValueHandler = function (evt) {
  if (evt.target === scaleControlSmaller) {
    setScaleValue(getScaleValue() - CHANGE_SCALE_STEP);
  } else if (evt.target === scaleControlBigger) {
    setScaleValue(getScaleValue() + CHANGE_SCALE_STEP);
  }
};

scaleControlValue.value = '100%';

scaleControlSmaller.addEventListener('click', changeScaleValueHandler);
scaleControlBigger.addEventListener('click', changeScaleValueHandler);

var effectLevelPin = uploadFileForm.querySelector('.effect-level__pin');
effectLevelPin.style.left = '100%';
var effectLevel = uploadFileForm.querySelector('.effect-level');
effectLevel.classList.add('hidden');
var effectLevelDepth = uploadFileForm.querySelector('.effect-level__depth');
var effectLevelValue = uploadFileForm.querySelector('.effect-level__value');
var effectsRadioSet = uploadFileForm.querySelector('.effects');

var clearEffect = function () {
  uploadImagePreview.removeAttribute('class');
  effectLevel.classList.add('hidden');
};

var addEffect = function (evt) {
  var effectName = evt.target.value;
  clearEffect();

  if (effectName !== 'none') {
    uploadImagePreview.classList.add('effects__preview--' + effectName);
    effectLevel.classList.remove('hidden');
  }
  changeEffectLevelDepth();
};

var getEffectLevelDepth = function () {
  var levelDepth = parseInt(effectLevelPin.style.left, 10);

  return levelDepth;
};

var changeEffectLevelDepth = function () {
  effectLevelDepth.style.width = getEffectLevelDepth() + '%';
  effectLevelValue.value = getEffectLevelDepth();
};

var effectLevelPinMouseDownHandler = function () {

};

var effectLevelPinMouseUpHandler = function () {

};

effectLevelPin.addEventListener('mousedown', effectLevelPinMouseDownHandler);
effectLevelPin.addEventListener('mouseup', effectLevelPinMouseUpHandler);
effectsRadioSet.addEventListener('click', addEffect);

var findDuplicateElements = function (elements) {
  var duplicatesExist = false;
  var etalon = '';
  if (elements.length > 1) {
    for (var i = 0; i < elements.length; i++) {
      etalon = elements[i];
      for (var j = i + 1; j < elements.length; j++) {
        if (etalon.toLocaleLowerCase() === elements[j].toLocaleLowerCase()) {
          duplicatesExist = true;
        }
      }
    }
  }

  return duplicatesExist;
};

var validateHashtags = function () {
  var hashtags = uploadFileHashtagsInput.value.split(' ');
  var errorMessage = '';
  var validity = true;

  if (hashtags.length > 5) {
    errorMessage += 'Нельзя указать больше пяти хэш-тегов. ';
    validity = false;
  } else if (findDuplicateElements(hashtags)) {
    errorMessage += 'Один и тот же хэш-тег не может быть использован дважды. ';
  } else {
    hashtags.forEach(function (hashtag) {
      if (hashtag.length > 20) {
        errorMessage += 'Максимальная длина одного хэш-тега 20 символов, включая решётку. ';
        validity = false;
      } else if (hashtag.length === 1 && hashtag === '#') {
        errorMessage += 'Хеш-тег не может состоять только из одной решётки. ';
        validity = false;
      } else if (hashtag.charAt(0) !== '#') {
        errorMessage += 'Хэш-тег должен начинаться с символа # (решётка). ';
        validity = false;
      } else if (/[^a-zA-Z0-9]/.test(hashtag.substr(1, (hashtag.length - 1)))) {
        errorMessage += 'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д. ';
      }
    });
  }

  uploadFileHashtagsInput.setCustomValidity(errorMessage);

  return validity;
};

uploadFileHashtagsInput.addEventListener('input', validateHashtags);

var uploadFileDescriptionInputInvalidHandler = function () {
  if (uploadFileDescriptionInput.validity.tooLong) {
    uploadFileDescriptionInput.setCustomValidity('Комментарий не должен превышать 140 символов');
  }
};

uploadFileDescriptionInput.addEventListener('invalid', uploadFileDescriptionInputInvalidHandler);

var uploadFileFormSubmitHandler = function (evt) {
  evt.preventDefault();
  if (validateHashtags()) {
    uploadFileForm.submit();
  }
};

uploadFileForm.addEventListener('submit', uploadFileFormSubmitHandler);
