const openSelect = () => {
  const selectWrapper = document.querySelector('.order__select-wrapper');
  selectWrapper.classList.add('order__select-wrapper_active');
}

const closeSelect = () => {
  const selectWrapper = document.querySelector('.order__select-wrapper');
  selectWrapper.classList.remove('order__select-wrapper_active');
}

export const Order = (totalPriceValue) => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const deliveryDate = `${day}.${month}`;

  return (
    <div class="order">
      <div class="order__wrapper">
        <h2 class="order__title">Оформить заказ</h2>
        <button class="order__close" type="button">&times;</button>

        <form class="order__form" id="order">

          <fieldset class="order__fieldset">
            <legend class="order__legend">Данные заказчика</legend>
            <div class="order__input-group">
              <label class="order__label" aria-label="Имя">
                <input class="order__input" type="text" name="name-buyer" placeholder="Имя"/>
              </label>
              <label class="order__label" aria-label="Телефон">
                <input class="order__input" type="number" name="phone-buyer" placeholder="Телефон"/>
              </label>
            </div>
          </fieldset>

          <fieldset class="order__fieldset">
            <legend class="order__legend">Данные получателя</legend>
            <div class="order__input-group">
              <label class="order__label" aria-label="Имя">
                <input class="order__input" type="text" name="name-recipient" placeholder="Имя"/>
              </label>
              <label class="order__label" aria-label="Телефон">
                <input class="order__input" type="number" name="phone-recipient" placeholder="Телефон"/>
              </label>
            </div>
          </fieldset>

          <fieldset class="order__fieldset">
            <legend class="order__legend">Адрес</legend>
            <div class="order__input-group">
              <label class="order__label" aria-label="Улица">
                <input class="order__input" type="text" name="street" placeholder="Улица"/>
              </label>
              <label class="order__label_min" aria-label="Дом">
                <input class="order__input order__input_min" type="text" name="house" placeholder="Дом"/>
              </label>
              <label class="order__label_min" aria-label="Квартира">
                <input class="order__input order__input_min" type="text" name="apartment" placeholder="Квартира"/>
              </label>
            </div>
          </fieldset>

          <fieldset class="order__fieldset">
            <div class="order__payment">
              <label class="order__label-radio">
                <input type="radio" class="order__radio" name="payment-online" value={'true'} checked/>
                Оплата онлайн
              </label>
            </div>

            <div class="order__delivery">
              <label htmlFor="delivery">Доставка {deliveryDate}</label>
              <input type="hidden" name="delivery-date" value={deliveryDate}/>
              <div class="order__select-wrapper">
                <select class="order__select"
                        name="delivery-time"
                        id="delivery"
                        onFocus={openSelect}
                        onBlur={closeSelect}
                >
                  <option value="9-12">с 9:00 до 12:00</option>
                  <option value="12-15">с 12:00 до 15:00</option>
                  <option value="15-18">с 15:00 до 18:00</option>
                  <option value="18-21">с 18:00 до 21:00</option>
                </select>
              </div>
            </div>
          </fieldset>
        </form>

        <div class="order__footer">
          <p class="order__total">{totalPriceValue}&nbsp;₽</p>
          <button class="order__button" type="submit" form="order">Заказать</button>
        </div>
      </div>
    </div>
  );
};
