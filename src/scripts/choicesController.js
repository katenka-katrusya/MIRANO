// центрирование выпадашек, открытие и закрытие
import { debounce } from './debounce.js';

const adjustElementPosition = (element, count = 0) => {
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  if (rect.right > viewportWidth) {
    element.style.left = 'auto';
    element.style.right = '0';
    element.style.transform = 'translateX(0)';
  } else if (rect.left < 0) {
    element.style.left = '0';
    element.style.right = 'auto';
    element.style.transform = 'translateX(0)';
  } else {
    element.style.right = 'auto';
    element.style.left = '50%';
    element.style.transform = 'translateX(-50%)';
  }

  const postRect = element.getBoundingClientRect();

  if ((postRect.left < 0 || postRect.right > viewportWidth) && count < 3) {
    count++;
    adjustElementPosition(element, count);
  }
};

export const initChoices = () => {
  const choices = document.querySelectorAll('.choices');

  choices.forEach((choice) => {
    const btn = choice.querySelector('.choices__btn');
    const box = choice.querySelector('.choices__box');
    const filterSelect = choice.querySelector('.filter__select');

    // закрытие выпадашки при клике за пределами
    const closeAllChoices = ({target}) => {
      let clickInside = target.closest('.choices');

      if (!clickInside) {
        box.classList.remove('choices__box_open');
        filterSelect.classList.remove('flipped');
        // очищаем обработчик, чтобы постоянно не работал при клике вне блока
        document.removeEventListener('click', closeAllChoices);
      }
    }

    btn.addEventListener('click', () => {
      box.classList.toggle('choices__box_open');
      filterSelect.classList.toggle('flipped');

      choices.forEach((item) => {
        if ((item !== choice)) {
          item
            .querySelector('.choices__box')
            .classList.remove('choices__box_open');
          item
            .querySelector('.filter__select')
            .classList.remove('flipped');
        }
      });

      if (box.classList.contains('choices__box_open')) {
        document.addEventListener('click', closeAllChoices);
      } else {
        document.removeEventListener('click', closeAllChoices);
      }

      adjustElementPosition(box);
    });

    // при изменении окна, пересчитывает позицию выпадашек
    window.addEventListener('resize', debounce(() => {
      adjustElementPosition(box);
    }));
  });
};
