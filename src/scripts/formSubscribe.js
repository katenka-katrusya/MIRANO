import { checkFormContacts } from './validate.js';

export const initFormSubscribe = () => {
  const form = document.querySelector('.subscribe__form');
  const validator = checkFormContacts(form);
  const div = document.createElement('div');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const input = document.querySelector('.subscribe__input').value.trim();
    const isValid = await validator.revalidate();
    div.remove();

    if (isValid && input) {
      div.classList.add('success-subscribe');
      div.textContent = 'Вы подписались на рассылку';
      form.append(div);
      form.reset();
    }
  });
}
