const BASE_URL = 'https://pixabay.com/api/';
const KEY = '19115231-b63e497fa397eaff465691d91';

export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.page += 1;

        return hits;
      });
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}

// export default class GalleryApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   fetchImages() {
//     const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=19115231-b63e497fa397eaff465691d91`;
//     return fetch(url)
//       .then(r => r.json())
//       .then(data => {
//         this.page += 1;

//         return data.hits;
//       });
//   }

//   resetPage() {
//     this.page = 1;
//   }
//   get query() {
//     return this.searchQuery;
//   }
//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }
