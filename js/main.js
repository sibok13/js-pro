const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        imgCatalog: 'https://placehold.it/200x150',
        products: [],
        basket: [], //делаем в массиве объекты, где есть кол-во и товары
        isVisibleCart: true,
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            if(this.basket.length != 0){
                this.basket.forEach(element => {
                    if(element.id_product == product.id_product){
                        element.total ++
                    } if else()

                    this.basket.push({id_product: product.id_product, price: product.price, product_name: product.product_name, total: 1});
                });
            } else {
                this.basket.push({id_product: product.id_product, price: product.price, product_name: product.product_name, total: 1});
            }
            console.log(this.basket.length);
        },
        clickHandler(){
            if(this.isVisibleCart == true){
                this.isVisibleCart = false;
            } else {this.isVisibleCart = true;
            }
        },
        emptyBasket(){
            if(this.basket.length == 0){
                return 'Товаров нет';
            }
        }
    },
    // beforeCreate() {
    //     console.log('beforeCreate');
    // },
    created() {
        console.log('created');
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
    },
    // beforeMount() {
    //     console.log('beforeMount');
    // },
    // mounted() {
    //     console.log('mounted');
    // },
    // beforeUpdate() {
    //     console.log('beforeUpdate');
    // },
    // updated() {
    //     console.log('updated');
    // },
    // beforeDestroy() {
    //     console.log('beforeDestroy');
    // },
    // destroyed() {
    //     console.log('beforeDestroy');
    // }
});
