import { ProductCard } from './ProductCard.jsx';
import { store } from './Store.js';

export const renderProducts = async () => {
  const goodsList = document.querySelector('.goods__list');
  const updList = () => {
    const products = store.getProducts();
    goodsList.innerHTML = '';

    if (!products.length) {
      const messageItem = document.createElement('li');
      messageItem.textContent = 'Товары не найдены';
      messageItem.classList.add('goods__no-product');
      goodsList.append(messageItem);
      return;
    }

    const productCards = products.map((product) => {
      return ProductCard(product);
    });

    goodsList.append(...productCards);
  };

  store.subscribe(updList);
  updList();
};
