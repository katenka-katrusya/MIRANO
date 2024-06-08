import JustValidate from 'just-validate';

export const checkForm = (form) => {
  const validate = new JustValidate(form);

  validate
    .addField('.order__input[name="name-buyer"]', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Максимум 20 символов',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Минимум 2 символа',
      },
      {
        rule: 'customRegexp',
        value: /^[а-яёЁa-z]+(?:\s[а-яёЁa-z]+)*$/gi,
        errorMessage: 'Недопустимый формат',
      }
    ])
    .addField('.order__input[name="phone-buyer"]', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле',
      },
      {
        rule: 'customRegexp',
        value: /^(\+?7|8)[0-9]{10}$/,
        errorMessage: 'Недопустимый формат',
      }
    ])
    .addField('.order__input[name="name-recipient"]', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Максимум 20 символов',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Минимум 2 символа',
      },
      {
        rule: 'customRegexp',
        value: /^[а-яёЁa-z]+(?:\s[а-яёЁa-z]+)*$/gi,
        errorMessage: 'Недопустимый формат',
      }
    ])
    .addField('.order__input[name="phone-recipient"]', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле',
      },
      {
        rule: 'customRegexp',
        value: /^(\+?7|8)[0-9]{10}$/,
        errorMessage: 'Недопустимый формат',
      }
    ])
    .addField('.order__input[name="street"]', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Максимум 30 символов',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Минимум 3 символа',
      }
    ])
    .addField('.order__input[name="house"]', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Максимум 20 символов',
      },
      {
        rule: 'minLength',
        value: 1,
        errorMessage: 'Минимум 1 символа',
      },
    ])
    .addField('.order__input[name="apartment"]', [
      {
        rule: 'required',
        errorMessage: 'Обязательное поле',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Максимум 20 символов',
      },
      {
        rule: 'minLength',
        value: 1,
        errorMessage: 'Минимум 1 символа',
      },
    ]);

  return validate;
}


