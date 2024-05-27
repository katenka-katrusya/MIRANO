class Store {
  constructor() {
    this.observers = [];
    this.products = [];
    this.categories = new Set();
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

export const store = new Store();
