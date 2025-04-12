import endpoints from './endpoints';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiConfig = Object.keys(endpoints).reduce((config, key) => {
  config[key] = `${API_BASE_URL}${endpoints[key]}`;
  return config;
}, {});

export default apiConfig;