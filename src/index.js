import '@/scss/index.scss';
import { initHeaderFixer } from '@/scripts/headerFixer.js';
import { initChoices } from '@/scripts/choicesController.js';
import { initCart } from '@/scripts/cartController.js';
import { renderProducts } from '@/scripts/renderProducts.js';
import { initChoicesType } from '@/scripts/choicesType.js';
import { filterProducts } from '@/scripts/filterProducts.js';
import { initSearchProducts } from '@/scripts/searchProducts.js';
import { initOrder } from '@/scripts/orderController.js';
import { checkCookies } from '@/scripts/checkCookies.js';

const init = () => {
  initHeaderFixer();
  initChoices();
  initChoicesType();
  initCart();
  initSearchProducts();
  renderProducts();
  filterProducts();
  initOrder();
  checkCookies();
};

document.addEventListener('DOMContentLoaded', init);
