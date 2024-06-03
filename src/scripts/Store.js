import { API_URL, fetchProducts } from './API.js';

class Store {
  constructor() {
    this.observers = [];
  }

  // метод для добавления новых наблюдателей. Функции, которые изменяются при изменении состояния
  subscribe(observerFunction) {
    this.observers.push(observerFunction);
  }

  // метод для уведомления всех наблюдателей об изменениях в хранилище
  notifyObservers() {
    // вызываем каждую функцию, оповещая всех наблюдателей об изменениях
    this.observers.forEach(observer => observer());
  }
}

class ProductStore extends Store {
  constructor() {
    super();
    this._products = [];
    this.categories = new Set();
    this._loading = false;
    this.error = null;
  }

  fetchProducts() {
    const _self = this;
    return async (params) => {
      try {
        _self.error = null;
        _self.loading = true;
        _self.products = await fetchProducts(params);
        _self.loading = false;
        _self.notifyObservers();
      } catch (error) {
        _self.error = error;
        _self.products = [];
        _self.loading = false;
        _self.notifyObservers();
      }
    }
  }

  get products() {
    return this._products;
  }

  get loading() {
    return this._loading;
  }

  set loading(bool) {
    this._loading = bool;
    this.notifyObservers();
  }

  // обновляем продукты
  set products(newProducts) {
    this._products = newProducts;
    this.updCategories(newProducts);
    // вызываем функцию, оповещающую всех наблюдателей, что произошли изменения
    this.notifyObservers();
  }

  getCategories() {
    return this.categories;
  }

  // обновляем продукты
  updCategories(products) {
    this.categories.clear();

    this.products.forEach(product => {
      if (product.categories) {
        product.categories.forEach(category => {
          this.categories.add(category);
        })
      }
    })
    // вызываем функцию, оповещающую всех наблюдателей, что произошли изменения
    this.notifyObservers();
  }
}

class CartStore extends Store {
  constructor() {
    super();
    this.cart = [];
  }

  async init() {
    await this.registerCart(); // получаем доступ к корзине, придут куки
    await this.fetchCart(); //  получаем данные о корзине
  }

  async registerCart() {
    try {
      const response = await fetch(`${API_URL}/api/cart/register`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  getCart() {
    return this.cart;
  }

  async fetchCart() {
    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        method: 'GET',
        credentials: 'include', // передача куки
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.cart = data;
      this.notifyObservers();

    } catch (err) {
      console.error(err);
    }
  }

  async postCart({id, quantity}) {
    try {
      const response = await fetch(`${API_URL}/api/cart/items`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId: id, quantity}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.cart = data;
      this.notifyObservers();

    } catch (err) {
      console.error(err);
    }
  }

  async addProductCart(id) {
    await this.postCart({id, quantity: 1});
  }

  clearCart() {
    this.cart = [];
    this.notifyObservers();
  }
}

export const productStore = new ProductStore();
export const cartStore = new CartStore();


