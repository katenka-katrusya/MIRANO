// открытие и закрытие корзины
import { cartStore } from './Store.js';
import { renderCart } from './renderCart.js';

const cart = document.querySelector('.cart');
const cartOpenBtn = document.querySelector('.header__cart-button');
const cartClose = document.querySelector('.cart__close');
const goodsSection = document.querySelector('.goods');

const toggleCart = () => {
  cart.classList.toggle('cart_open');

  // скролл к открывшейся корзине
  if (cart.classList.contains('cart_open') && window.innerWidth > 1360) {
    goodsSection.scrollIntoView({behavior: 'smooth'});
  }
}

export const initCart = async () => {
  await cartStore.init();

  cartOpenBtn.textContent = cartStore.getCart().length;
  renderCart();

  cartStore.subscribe(() => {
    cartOpenBtn.textContent = cartStore.getCart().length;
  });
  cartOpenBtn.addEventListener('click', toggleCart);
  cartClose.addEventListener('click', () => {
    cart.classList.remove('cart_open');
  });
};
