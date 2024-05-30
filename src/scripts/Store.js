import { API_URL } from './API.js';

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
    this.products = [];
    this.categories = new Set();
  }

  getProducts() {
    return this.products;
  }

  // обновляем продукты
  setProducts(newProducts) {
    this.products = newProducts;
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
        credentials: 'include', // передача куков
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


}

export const productStore = new ProductStore();
export const cartStore = new CartStore();
