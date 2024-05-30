import { productStore } from './Store.js';
import { ListType } from './ListType.jsx';

export const initChoicesType = () => {
  const typeChoices = document.querySelector('.filter__choices_type');
  const choicesBox = document.querySelector('.filter__choices-box_type');

  const updTypeChoicesVisibility = () => {
    const categories = productStore.getCategories();

    if (categories.size) {
      typeChoices.style.display = '';
      choicesBox.textContent = '';

      const listType = ListType([...categories]);
      choicesBox.append(listType);
    } else {
      typeChoices.style.display = 'none';
    }
  }

  //  подписываемся на изменения
  productStore.subscribe(updTypeChoicesVisibility);

  // один раз вызываем, чтобы показало сразу категории
  updTypeChoicesVisibility();
}
