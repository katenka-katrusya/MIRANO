// открытие и закрытие корзины
import { cartStore } from './Store.js';
import { renderCart } from './renderCart.js';

const cart = document.querySelector('.cart');
const cartOpenBtn = document.querySelector('.header__cart-button');
const cartClose = document.querySelector('.cart__close');
const goodsSection = document.querySelector('.goods');
const cartPriceTotal = document.querySelector('.cart__price_total');

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
    const cart = cartStore.getCart();
    cartOpenBtn.textContent = cart.length;

    const totalPriceValue = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0);
    cartPriceTotal.innerHTML = `${totalPriceValue}&nbsp;₽`;
  });

  cartOpenBtn.addEventListener('click', toggleCart);

  cartClose.addEventListener('click', () => {
    cart.classList.remove('cart_open');
  });
};
