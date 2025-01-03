import axios from 'axios';
import util from './util';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  // headers: {
  //   Authorization: '66708f34674a2041244682cc',
  // },
});

export default api;