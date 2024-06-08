import { checkFormContacts } from './validate.js';

export const initFormSubscribe = () => {
  const form = document.querySelector('.subscribe__form');
  const validator = checkFormContacts(form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isValid = await validator.revalidate();

    if (isValid) {
      const div = document.createElement('div');
      div.classList.add('success-subscribe');
      div.textContent = 'Ваша заявка принята';
      form.append(div);
      form.reset();
    } else {
      const div = document.querySelector('.success-subscribe');
      div ? div.remove() : '';
    }
  });
}
