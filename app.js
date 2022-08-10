import GalleryApiService from './src/js/apiService';
import cardImage from './src/templates/cardImage';
import refs from './src/js/refs';

import './src/js/infinite-scroll';
import * as basicLightbox from 'basiclightbox';

import { onSuccess, onError } from './src/js/notifications';

var debounce = require('lodash.debounce');

const galleryApiService = new GalleryApiService();

refs.inputEl.addEventListener('input', debounce(onInput, 1000));
refs.gallery.addEventListener('click', onClickImage);
// refs.loadMoreBtn.addEventListener('click', loadMoreBtn); // кнопка 'load-more'

function onInput(e) {
  // refs.loadMoreBtn.classList.remove('is-hidden');

  galleryApiService.query = e.target.value;
  galleryApiService.resetPage();

  fetchImages();
  clearMarkup();
}

function fetchImages() {
  // refs.loadMoreBtn.disabled = true;
  galleryApiService
    .fetchImages()
    .then(pics => {
      markupImages(pics);
      // refs.loadMoreBtn.disabled = false;
    })
    .catch(onError);

  onSuccess();
}

function markupImages(markup) {
  return refs.gallery.insertAdjacentHTML('beforeend', cardImage(markup));
}
function clearMarkup() {
  refs.gallery.innerHTML = '';
}

// function loadMoreBtn() {
//   fetchImages();
//   setTimeout(() => {
//     refs.gallery.scrollIntoView({
//       behavior: 'smooth',
//       block: 'end',
//     });
//     onSuccess();
//   }, 1000);
// }

// pop-up image

function onClickImage(e) {
  if (e.target.nodeName === 'IMG') {
    basicLightbox.create(`<img src="${e.target.src}" width="800" height="600">`).show();
  }
}

// infinite scroll

const onEntry = entries => {
  entries.forEach(e => {
    if (e.isIntersecting && galleryApiService.query !== '') {
      galleryApiService.fetchImages().then(pics => {
        markupImages(pics);
      });
    }
  });
};

const options = {
  rootMargin: '200px',
};

const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.observer);

const onScroll = e => {
  e.forEach(e => {
    if (!e.isIntersecting) {
      refs.header.classList.add('alt');
    } else {
      refs.header.classList.remove('alt');
    }
  });
};

const scrollOptions = {
  rootMargin: '100px',
};

const headerScroll = new IntersectionObserver(onScroll, scrollOptions);
headerScroll.observe(refs.headerObserver);
