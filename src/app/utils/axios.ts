import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/woocommercenextjs', // Замените на ваш базовый URL
  headers: {
    'Content-Type': 'application/json',
    // Здесь можно добавить другие заголовки, например для авторизации
    // 'Authorization': `Bearer ${token}`,
  },
});
