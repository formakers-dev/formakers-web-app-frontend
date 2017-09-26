import axios from 'axios';

const config = require('../../config');

export default axios.create({
  baseURL: config[process.env.NODE_ENV].baseUrl,
});

