'use strict';

(function () {
  var RANDOM_FILTERED_COUNT = 10;
  var galleryFilter = document.querySelector('.img-filters');
  var currentFilter = 'default';

  var showFilters = function () {
    galleryFilter.classList.remove('img-filters--inactive');
    galleryFilter.addEventListener('click', applyFilterHandler);
  };

  var shuffleArray = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var applyRandomFilter = function () {
    var filteredData = shuffleArray(window.data.getData().slice()).slice(0, RANDOM_FILTERED_COUNT);

    window.gallery.applyFilter(filteredData);
  };

  var applyDiscussedFilter = window.debounce(function () {
    var filteredData = window.data.getData()
    .slice()
    .sort(function (first, second) {
      if (first.likes > second.likes) {
        return -1;
      } else if (first.likes < second.likes) {
        return 1;
      } else {
        return 0;
      }
    });

    window.gallery.applyFilter(filteredData);
  });

  var applyDefaultFilter = function () {
    window.gallery.applyFilter(window.data.getData());
  };

  var applyFilterHandler = function (evt) {
    if (evt.target.classList.contains('img-filters__button')) {
      var currentFilterButton = document.querySelector('#filter-' + currentFilter);
      currentFilterButton.classList.remove('img-filters__button--active');
      currentFilterButton.disabled = false;

      evt.target.classList.add('img-filters__button--active');
      evt.target.disabled = true;

      switch (evt.target.id.split('-')[1]) {
        case 'random':
          applyRandomFilter();
          break;
        case 'discussed':
          applyDiscussedFilter();
          break;
        case 'default':
          applyDefaultFilter();
          break;
        default:
          applyDefaultFilter();
      }

      currentFilter = evt.target.id.split('-')[1];
    }
  };

  window.galleryFilter = {
    show: showFilters
  };
})();
