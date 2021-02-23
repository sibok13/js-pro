class ProductList {

  constructor(container = '.products') {
    this.container = container;
    this._goods = [];
    this._allProducts = [];
    this._fetchGoods();
    this._render();
  }

  goodsTotalPrice() {
    this.sum = 0;
    this._goods.forEach((good) => {
      this.sum += good.price;
    });
    return this.sum;
  }
  
  getTotalWithDiscount(discount = 1) {
    return this.goodsTotalPrice() * discount;
  }

  _fetchGoods() {
    this._goods = [
      {id: 1, title: 'Notebook', price: 20000},
      {id: 2, title: 'Mouse', price: 1500},
      {id: 3, title: 'Keyboard', price: 5000},
      {id: 4, title: 'Gamepad', price: 4500},
    ];
  }

  _render() {
    const block = document.querySelector(this.container);

    this._goods.forEach((product) => {
      const productObject = new ProductItem(product);
      console.log(productObject);
      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    });
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

class Basket {
  constructor(){

  }

  // метод удаления выбранного товара из корзины
  delItem() {

  }

  //метод применения скидки к заказу
  applyDiscount() {

  }

  //метод применения купона к заказу
  applyCoupon() {

  }

  // метод расчета стоимости доставки
  shippingCost() {

  }

  // метод подсчета итоговой суммы и количества товаров в корзине
  sumItems() {

  }

  // метод оформления заказа
  checkout() {

  }

}

class BasketItem {
  constructor(){

  }

  // метод увеличения количества заказанной позиции товара
  plusBasketItem() {

  }

  // метод уменьшения количества заказанной позиции товара
  minusBasketItem() {

  }
}

const productList = new ProductList();