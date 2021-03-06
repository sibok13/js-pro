const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        imgCatalog: 'https://placehold.it/200x150',
        products: [],
        filtredProducts: [],
        basket: [],
        isVisibleCart: true,
        search: '',
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
            let result = this.basket.find(item => item.id_product == product.id_product);
            if(result){
                result.quantity ++
            } else {
                    this.basket.push({id_product: product.id_product, price: product.price, product_name: product.product_name, quantity: 1});
                }
        },
        delProduct(product){
            let result = this.basket.find(item => item.id_product == product.id_product);
            if(result.quantity > 1){
                result.quantity --
            } else {
                this.basket.splice(this.basket.indexOf(result), 1);
            }
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
        },
        totalBasket(){
            let totalQuantity = 0;
            let totalSumm = 0;
            this.basket.forEach(element => {
                totalQuantity += element.quantity;
                totalSumm += element.price * element.quantity;
            });
            return `Количество: ${totalQuantity} Сумма: ${totalSumm}`
        },
        filterList(event){
            event.preventDefault();
            if(this.search.length){
                let result = this.products.filter(prod => prod.product_name.toLowerCase().includes(this.search.toLowerCase()));
                this.filtredProducts = result;
            } else {
                this.filtredProducts = this.products;
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
                this.filtredProducts = this.products;
            });
        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.basket.push({id_product: el.id_product, price: el.price, product_name: el.product_name, quantity: el.quantity});
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
