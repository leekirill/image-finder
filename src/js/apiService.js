const BASE_URL = 'https://pixabay.com/api/';
const KEY = '19115231-b63e497fa397eaff465691d91';

export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      page: this.page,
      per_page: 12,
      key: KEY,
    });
    // ^ это тоже самое, что и запись ниже

    // const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;

    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&${searchParams}`;

    // return fetch(url)
    //   .then(response => response.json())
    //   .then(({ hits }) => {
    //     this.page += 1;

    //     return hits;
    //   });

    async function asyncFn() {
      const response = await fetch(url);
      const data = await response.json();

      return data.hits;
    }

    return asyncFn();
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
