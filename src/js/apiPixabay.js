import axios from 'axios';

export class ApiPixabay {
  #apiKey = '34933308-0b2ca51c986eb130c0812b26f';
  #baseUrl = 'https://pixabay.com/api/';
  constructor() {
    this.query = '';
    this.page = 1;
    this.per_page = 40;
    this.totalHits = null;
  }
  async getImages() {
    return await axios.get(
      `${this.#baseUrl}?key=${this.#apiKey}&q=${
        this.query
      }&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.page
      }&per_page=${this.per_page}`
    );
  }
  setQuery(newQuery) {
    this.query = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  setTotalHits(newTotalHits) {
    this.totalHits = newTotalHits;
  }
}
