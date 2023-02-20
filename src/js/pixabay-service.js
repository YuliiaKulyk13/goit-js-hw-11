import axios from 'axios';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPictures() {
    const URL = `https://pixabay.com/api/?key=33700008-b0f3fc2623c0687ada0dd2d9b&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    // return fetch(URL);
    return fetch(URL)
      .then(r => r.json())
      .then(data => {
        return data;
      });
    // const response = await axios.get(URL);
    // const data = await response.json();
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
