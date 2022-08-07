export default { fetchImages };

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '19115231-b63e497fa397eaff465691d91';

function fetchImages(searchQuery) {
  return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=2&per_page=12&key=${KEY}`
  ).then(response => {
    if (!response.ok) {
      console.log('gg');
      throw new Error();
    }
    return response.json();
  });
}
