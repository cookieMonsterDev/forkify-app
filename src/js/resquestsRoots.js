import axios from 'axios';
import { BASE_URL, TIMEOUT } from './config';

export const appRequests = axios.create({
  baseURL: BASE_URL,
});

appRequests.defaults.timeout = TIMEOUT;
appRequests.defaults.timeoutErrorMessage = 'timeout 🤬🤬🤬';
