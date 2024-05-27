// открытие и закрытие корзины
export const initCart = () => {
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

  cartOpenBtn.addEventListener('click', toggleCart);

  cartClose.addEventListener('click', () => {
    cart.classList.remove('cart_open');
  });
};
