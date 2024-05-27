import { store } from '@/scripts/Store.js';

export const initChoicesType = () => {
  const typeChoices = document.querySelector('.filter__choices_type');

  const updTypeChoicesVisibility = () => {
    const categories = store.getCategories();

    if (categories.size) {
      typeChoices.style.display = '';
    //   обновить категории
    } else {
      typeChoices.style.display = 'none';
    }
  }

  //  подписываемся на изменения
  store.subscribe(updTypeChoicesVisibility);

  // один раз вызываем, чтобы показало сразу категории
  updTypeChoicesVisibility();
}
