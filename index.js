import axios from 'axios';

export const instance = axios.create({
      baseURL: 'https://api.flock.co/v1/',
      // timeout: 1000,
      headers: {}
});
