const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
    {id: 5},
];

const renderProduct = (title = "н/д", price = "0", img = "http://placehold.it/120x140") => {
    return `<div class="product-item">
                <h3 class="card-h3">${title}</h3>
                <img src="${img}">
                <p>Цена: ${price} руб.</p>
                <button class="by-btn">Добавить в корзину</button>
            </div>`;
}

const renderProducts = (list) => {
    const productList = list.forEach((item) => {
        return document.querySelector('.products').insertAdjacentHTML("beforeEnd", renderProduct(item.title, item.price));
    });
}

renderProducts(products);
