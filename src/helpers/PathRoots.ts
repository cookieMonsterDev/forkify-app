import axios from 'axios';
import { BASE_URL, TIMEOUT } from './config';

export const ForkifyRoots = axios.create({
  baseURL: BASE_URL,
});

ForkifyRoots.defaults.timeout = TIMEOUT;
ForkifyRoots.defaults.timeoutErrorMessage = 'Timout 😡😡😡';
