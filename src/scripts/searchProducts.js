import { fetchProducts } from './API.js';
import { callBackWithPreload } from './preload.js';

export const initSearchProducts = () => {
  const headerForm = document.querySelector('.header__form');
  const goodsTitle = document.querySelector('.goods__title');
  const goodsSection = document.querySelector('.goods');

  headerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(headerForm);

    const searchQuery = formData.get('search').trim();

    if (searchQuery) {
      goodsTitle.textContent = `Результат поиска`;
      callBackWithPreload(goodsSection, fetchProducts, {search: searchQuery});
    }
  });
}
