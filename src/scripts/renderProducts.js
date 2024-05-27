import { ProductCard } from '@/scripts/ProductCard.jsx';
import { store } from '@/scripts/Store.js';

export const renderProducts = async () => {
  const goodsList = document.querySelector('.goods__list');
  const updList = () => {
    const products = store.getProducts();
    goodsList.innerHTML = '';

    products.forEach(product => {
      const productCard = ProductCard(product);
      goodsList.append(productCard);
    });
  };

  store.subscribe(updList);
  updList();
};
