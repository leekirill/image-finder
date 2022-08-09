import GalleryApiService from './src/js/apiService';
import cardImage from './src/templates/cardImage';

var debounce = require('lodash.debounce');

const refs = {
  inputEl: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.btn.btn-primary'),
  divEl: document.querySelector('.photo-card'),
};

const galleryApiService = new GalleryApiService();

refs.inputEl.addEventListener('input', debounce(onInput, 1000));
refs.loadMoreBtn.addEventListener('click', fetchImages);

function onInput(e) {
  refs.loadMoreBtn.classList.remove('is-hidden');

  galleryApiService.query = e.target.value;
  galleryApiService.resetPage();

  fetchImages();
  clearMarkup();
}

function fetchImages() {
  refs.loadMoreBtn.disabled = true;
  galleryApiService.fetchImages().then(pics => {
    markupImages(pics);
    refs.loadMoreBtn.disabled = false;
  });

  setTimeout(() => {
    refs.gallery.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 700);
}

function markupImages(markup) {
  return refs.gallery.insertAdjacentHTML('beforeend', cardImage(markup));
}
function clearMarkup() {
  refs.gallery.innerHTML = '';
}
