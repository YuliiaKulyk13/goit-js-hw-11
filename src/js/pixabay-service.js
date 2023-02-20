import axios from 'axios';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    const URL = `https://pixabay.com/api/?key=33700008-b0f3fc2623c0687ada0dd2d9b&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    return await axios.get(URL).then(response => {
      if (response.status !== 200 || response.data.hits.length === 0) {
        throw new Error(response.status);
      }

      return response.data;
    });
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
