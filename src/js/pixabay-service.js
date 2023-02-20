import axios from 'axios';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchPictures() {
    const searchParams = new URLSearchParams({
      key: '33700008-b0f3fc2623c0687ada0dd2d9b',
      q: `${this.searchQuery}`,
      image_type: 'horizontal',
      safesearch: true,
      per_page: `${this.per_page}`,
      page: `${this.page}`,
    });
    const URL = `https://pixabay.com/api/?${searchParams}`;
    return await axios.get(URL).then(response => {
      if (response.status !== 200 || response.data.hits.length === 0) {
        throw new Error(response.status);
      }

      return response.data;
    });
  }

  incrementPage() {
    return (this.page += 1);
  }

  resetPage() {
    return (this.page = 1);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  // setTotal(total) {
  //   return (this.totalPages = total);
  // }

  // resetTotal() {
  //   return this.totalPages - 0;
  // }

  // endOfImages() {
  //   return this.page === Math.ceil(this.totalPages / this.per_page);
  // }
}
