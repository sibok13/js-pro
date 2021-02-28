const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Перевести на Promise НЕ ИСПОЛЬЗОВАТЬ fetch
 
//function getRequest(url, callBack) {
//  let xhr = new XMLHttpRequest();
//  xhr.open('GET', url, true);
//  xhr.onreadystatechange = function() {
//    if (xhr.readyState === 4) {
//      if (xhr.status !== 200) {
//        console.log('Error');
//      } else {
//        callBack(xhr.responseText);
//      }
//    }
//  }
//  xhr.send();
//};
//
//getRequest(`${API}/catalogData.json`, function(data) {
//    let text = JSON.parse(data);
//    console.log(text);
//});

// Перевод в промисы

// function promise(url) {
//     return new Promise((resolve, reject) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4) {
//           if (xhr.status !== 200) {
//             reject('Error');
//           } else {
//             resolve(xhr.responseText);
//           }
//         }
//     }
//     xhr.send();
//     });
// }

// promise(`${API}/catalogData.json`)
//     .then(function(data) {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

///////////////////////////////////////

class ProductList {

 constructor(container = '.products') {
   this.container = container;
   this._goods = [];
   this._allProducts = [];

    this._basket = [];
    this._basketProducts = [];

   this._getProducts()
       .then((data) => {
         this._goods = [...data];
         this._render();
       });

    this._getBasket()
        .then((data) => {
          this._basket = data;
          this._renderBasket();
        });

    this._btnListener();
 }

 _getProducts() {
   return fetch(`${API}/catalogData.json`)
       .then((response) => response.json())
       .catch((err) => {
       });
}

  _getBasket() {
    return fetch(`${API}/getBasket.json`)
        .then((response) => response.json())
        .catch((err) => {
        });
 }

 _render() {
   const block = document.querySelector(this.container);
   this._goods.forEach((product) => {
     const productObject = new ProductItem(product);
     this._allProducts.push(productObject);
     block.insertAdjacentHTML('beforeend', productObject.render());
   });
 }
 _renderBasket() {
  const basketBlock = document.querySelector(".basket tbody");
   this._basket.contents.forEach((product) => {
    const basketObject = new ProductItem(product);
    this._basketProducts.push(basketObject);
    basketBlock.insertAdjacentHTML('beforeend', basketObject.renderBasket());
  });
 }

 _btnListener() {
  let btnListener = document.querySelector("body");
  const basket = new Basket(this._basketProducts);
  btnListener.addEventListener("click", function(event) {
    if(event.target.classList.value == "dell"){
      basket.dellItem(event.target.getAttribute("data-id"));
    } else if (event.target.classList.value == "add"){
      basket.addItem(event.target.getAttribute("data-id"));
    } else if (event.target.classList.value == "buy-btn"){
      basket.addItem(event.target.getAttribute("data-id"));
    }
  });
}
}

class ProductItem {
 constructor(product, img='https://placehold.it/200x150') {
   this.product_name = product.product_name;
   this.price = product.price;
   this.id_product = product.id_product;
   this.img = img;
 }

render() {
   return `<div class="product-item" data-id="${this.id_product}">
             <img src="${this.img}" alt="Some img">
             <div class="desc">
                 <h3>${this.product_name}</h3>
                 <p>${this.price} \u20bd</p>
                 <button data-id="${this.id_product}" class="buy-btn">Купить</button>
             </div>
         </div>`;
 }

renderBasket() {
  return `<tr id="${this.id_product}">
            <td>${this.id_product}</td>
            <td>${this.product_name}</td>
            <td>${this.price}</td>
            <td><button data-id="${this.id_product}" class="add">Добавить</button><br><button data-id="${this.id_product}" class="dell">Удалить</button></td>
          </tr>`;
}
}

class Basket {
  constructor(basketProducts) {
    this._basketProducts = basketProducts;
}

_apdateBasket() {
  const basketBlock = document.querySelector(".basket tbody");
  basketBlock.innerHTML = "";
  this._basketProducts.forEach((product) => {
    const basketObject = new ProductItem(product);
    basketBlock.insertAdjacentHTML('beforeend', basketObject.renderBasket());
  });
  console.log(this._basketProducts);
 }

  dellItem(id){
    let idDell = id;
    let elmDell = document.getElementById(idDell);
    elmDell.parentNode.removeChild(elmDell);
    for(let i = 0; i < this._basketProducts.length; i++){
      if(this._basketProducts[i].id_product == idDell){
        this._basketProducts.splice(i,1);
        console.log(this._basketProducts);
        break;
      }
    }
  }

  addItem(id){
    let idAdd = id;
    for(let i = 0; i < productList._allProducts.length; i++){
      if(productList._allProducts[i].id_product == idAdd){
        this._basketProducts.push(productList._allProducts[i]);
        this._apdateBasket();
      }
    }
  }
}

const productList = new ProductList();
let basketBtn = document.querySelector(".btn-cart");
basketBtn.addEventListener("click", () => {
    let basket = document.querySelector(".basket");
    basket.classList.toggle("disp-none");
  }
);