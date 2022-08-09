import GalleryApiService from './src/js/apiService';
import cardImage from './src/templates/cardImage';
import * as basicLightbox from 'basiclightbox';

import { onSuccess, onError } from './src/js/notifications';

var debounce = require('lodash.debounce');

const galleryApiService = new GalleryApiService();

const refs = {
  inputEl: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.btn.btn-primary'),
};

refs.inputEl.addEventListener('input', debounce(onInput, 1000));
refs.loadMoreBtn.addEventListener('click', loadMoreBtn);
refs.gallery.addEventListener('click', onClickImage);

function onInput(e) {
  refs.loadMoreBtn.classList.remove('is-hidden');

  galleryApiService.query = e.target.value;
  galleryApiService.resetPage();

  fetchImages();
  clearMarkup();
}

function fetchImages() {
  refs.loadMoreBtn.disabled = true;
  galleryApiService
    .fetchImages()
    .then(pics => {
      markupImages(pics);

      refs.loadMoreBtn.disabled = false;
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

function loadMoreBtn() {
  fetchImages();
  setTimeout(() => {
    refs.gallery.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
    onSuccess();
  }, 800);
}

function onClickImage(e) {
  if (e.target.nodeName === 'IMG') {
    basicLightbox.create(`<img src="${e.target.src}" width="800" height="600">`).show();
  }
}
