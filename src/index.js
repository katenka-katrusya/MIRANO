import '@/scss/index.scss';
import { initHeaderFixer } from '@/scripts/headerFixer.js';
import { initChoices } from '@/scripts/choices.js';
import { initCart } from '@/scripts/cart.js';
import { renderProducts } from '@/scripts/renderProducts.js';
import { initChoicesType } from '@/scripts/choicesType.js';
import { filterProducts } from '@/scripts/filterProducts.js';

const init = () => {
  initHeaderFixer();
  initChoices();
  initChoicesType();
  initCart();
  renderProducts();
  filterProducts();
};

document.addEventListener('DOMContentLoaded', init);
