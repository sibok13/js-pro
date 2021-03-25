Vue.component('cart', {
    data(){
      return {
          cartItems: [],
          showCart: false,
      }
    },
    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
        removeAll() {
            if(!this.cartItems.lengh){
                for(let el of this.cartItems){
                    console.log(el);
                    this.$parent.deleteJson(`/api/cart/${el.id_product}`)
                        .then(data => {
                            if (data.result === 1) {
                                this.cartItems.splice(this.cartItems.indexOf(el), 1);
                            }
                        });
                    }
            }
        },
        totalSumm() {
                let result = 0;
                for(let el of this.cartItems){
                result += el.price * el.quantity;
            }
            return result;
        }
    },
    mounted(){
        this.$parent.getJson('/api/cart')
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div class="dropdown">
            <div class="account-btn" type="button" @click="showCart = !showCart">Моя корзина&nbsp;&nbsp;</div>
            <div class="drop account-drop" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                @remove="remove"
                @addProduct="addProduct">
                </cart-item>
            <div class="total-drop-box">
                <div>ИТОГО</div>
                <div>{{totalSumm()}}₽</div>
            </div>
             <a class="drop-box-btn pink-btn" href="shopping-сart.html">В корзину</a>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
                <div class="account-drop-box">
                    <img :src=cartItem.img alt="Some image" class="drop-account-img">
                    <div>
                        <h2>{{cartItem.product_name}}</h2>
                        <img src="img/stars.png" alt="stars">
                        <div>{{cartItem.quantity}} x {{cartItem.price}} ₽</div>
                        <h2>{{cartItem.quantity*cartItem.price}}₽</h2>
                        <button class="shopping-card-action" @click="$emit('addProduct', cartItem)"><i class="far fa-plus-square"></i></button><button class="shopping-card-action" @click="$emit('remove', cartItem)"><i class="far fa-minus-square"></i></button>
                    </div>
                </div>
    `
});
