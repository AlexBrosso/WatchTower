const axios = require('axios');
const AppError = require('../utils/AppError');

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3', 
  timeout: 10000,                          
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'pt-BR'                 
  }
});

const statusMessages = {
  400: 'Bad Request - ',
  401: 'Invalid API Key - ',
  404: 'Resource Not Found - ',
  429: 'Rate limit exceeded - '
};

tmdb.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      const message = statusMessages[status] || (status >= 500 ? 'External Error with API Service - ' : 'Unexpected Error - ');
      const apiMessage = data?.status_message ? `API Message: ${data.status_message}` : '';

      throw new AppError(message + apiMessage, status);
    }

    throw new AppError('Communication Failed with API Service', 502);
  }
);

module.exports = tmdb;