import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://certificate-generator-server-t865.onrender.com',
});

export default instance;
