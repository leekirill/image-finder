import API from './src/js/apiService';
import cardImage from './src/templates/cardImage';

var debounce = require('lodash.debounce');

const refs = {
  inputEl: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
};

refs.inputEl.addEventListener('input', debounce(onInput, 1000));

function onInput(e) {
  const result = e.target.value;

  API.fetchImages(result).then(({ hits }) => {
    markupImages(hits);
  });
}

function markupImages(markup) {
  return refs.gallery.insertAdjacentHTML('afterbegin', cardImage(markup));
}

const element = document.getElementById('.my-element-selector');
element.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});