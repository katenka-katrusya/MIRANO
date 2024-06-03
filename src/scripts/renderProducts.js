import { ProductCard } from './ProductCard.jsx';
import { productStore } from './Store.js';

export const renderProducts = async () => {
  const goodsList = document.querySelector('.goods__list');
  const updList = () => {
    const products = productStore.getProducts();
    goodsList.innerHTML = '';

    if (!products.length && !productStore.loading) {
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

  productStore.subscribe(updList);
  updList();
};
