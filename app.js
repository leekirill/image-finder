import GalleryApiService from './src/js/apiService';
import cardImage from './src/templates/cardImage';
import './src/js/infinite-scroll';
import * as basicLightbox from 'basiclightbox';

import { onSuccess, onError } from './src/js/notifications';

var debounce = require('lodash.debounce');

const galleryApiService = new GalleryApiService();

const refs = {
  inputEl: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  // loadMoreBtn: document.querySelector('.btn.btn-primary'),
  observer: document.querySelector('.observer'),
};

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
