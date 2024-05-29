import { debounce } from './debounce.js';

export const initHeaderFixer = () => {
  // выезжающий header
  const header = document.querySelector('.header');
  const body = document.querySelector('body');
  let headerHeight = header.offsetHeight;

  const updHeaderHeight = () => {
    headerHeight = header.offsetHeight;
  };

  const handleScroll = () => {
    if (scrollY > 200) {
      header.classList.add('header__fixed');
      body.style.paddingTop = `${headerHeight}px`;
    } else {
      header.classList.remove('header__fixed');
      body.style.paddingTop = `0`;
    }
  }

  window.addEventListener('resize', debounce(updHeaderHeight, 100));
  window.addEventListener('scroll', debounce(handleScroll, 100));
};


