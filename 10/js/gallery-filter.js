'use strict';

(function () {
  var galleryFilter = document.querySelector('.img-filters');
  var currentFilter = 'default';

  var showFilters = function () {
    galleryFilter.classList.remove('img-filters--inactive');
    galleryFilter.addEventListener('click', changeFilter);
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
    var filteredData = shuffleArray(window.data.getData().slice());

    window.gallery.applyFilter(filteredData.slice(0, 9));
  };

  var applyDiscussedFilter = function () {
    if (currentFilter !== 'discussed') {
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
    }
  };

  var applyDefaultFilter = function () {
    if (currentFilter !== 'default') {
      window.gallery.applyFilter(window.data.getData());
    }
  };

  var changeFilter = function (evt) {
    document.querySelector('#filter-' + currentFilter).classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');

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
  };

  window.galleryFilter = {
    show: showFilters
  };
})();
