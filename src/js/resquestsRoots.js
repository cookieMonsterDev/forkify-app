import axios from 'axios';

export const appRequests = axios.create({
  baseURL: 'https://forkify-api.herokuapp.com/api/v2/recipes',
});

