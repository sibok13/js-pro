Vue.component('products', {
    data(){
        return {
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :product="item"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product'],
    data() {
      return {
          /**
           * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
           * то мы легко можем получить доступ к ним используя свойство $root.
           * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
           */
          cartAPI: this.$root.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
      };
    },

    template: `
    <div class="fetured-card">
            <div class="overlay">
                <button class="btn-single" @click="cartAPI.addProduct(product)"><img src="img/cart-w.png" alt="basket">&nbsp;&nbsp;Add to card</button>
            </div>
            <div class="a-card">
                <img :src=product.img alt="fetured-item">
                <a href="#">
                    <div class="fetured-title">{{product.product_name}}</div>
                    <div class="fetured-price">{{product.price}}₽</div>
                </a>
            </div>
    </div>
    `
});
