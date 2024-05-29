import { store } from './Store.js';

export const API_URL = 'http://localhost:3000';

const formatQueryString = (params) => {
  if (Object.keys(params).length === 0) {
    return '';
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  })

  // возвращаем строку с параметрами
  return `?${searchParams.toString()}`;
}

export const fetchProducts = async (params = {}) => {
  try {
    const response = await fetch(`${API_URL}/api/products${formatQueryString(params)}`);

    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();

    store.setProducts(products);
  } catch (error) {
    console.error(`Ошибка при получении данных: ${error}`);

    return [];
  }
};
