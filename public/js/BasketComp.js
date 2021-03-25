Vue.component('basket', {
    data(){
      return {
        cartAPI: this.$root.$refs.cart,
        showCart: false,
      }
    },
    template: `
    <main class="main-card min-width">
    <div class="container">
        <div class="">
        <table class="shopping-card">
            <tr class="shopping-card-head">
                <td class="shopping-card-td">Описание продукта</td>
                <td class="shopping-card-td centred">Стоимость</td>
                <td class="shopping-card-td centred">Количество</td>
                <td class="shopping-card-td centred">Доставка</td>
                <td class="shopping-card-td centred">Итого</td>
                <td class="shopping-card-td right">Действия</td>
            </tr>
            <basket-item class="" v-for="item of cartAPI.cartItems" :key="item.id" :cart-item="item">
            </basket-item>
        </table>
        <p class="empty" v-if="!cartAPI.cartItems.length">Корзина пуста</p>
        </div>
        <div class="shopping-card-footer">
        <button class="shopping-card-endbtn" @click="cartAPI.removeAll()">ОЧИСТИТЬ КОРЗИНУ</button>
        <a href="index.html" class="shopping-card-endbtn">ПРОДОЛЖИТЬ ПОКУПКИ</a>
    </div>
    <form action="" class="shopping-card-checkout">
        <div class="shopping-card-checkout-box">
            <h3 class="card-checkout-h3">Shipping Adress</h3>
            <select name="" id="" class="card-checkout-input">
                  <option>Bangladesh</option>
                  <option>Tokio</option>
                  <option>Moskow</option>
            </select>
            <input type="text" class="card-checkout-input" placeholder="State">
            <input type="number" class="card-checkout-input input-num" placeholder="Postcode / Zip">
            <button class="card-box-btn">get a quote</button>
        </div>
        <div class="shopping-card-checkout-box">
            <h3 class="card-checkout-h3">Coupon Discount</h3>
            <p class="coupon-discount-text">Enter your coupon code if you have one</p>
            <input type="text" class="card-checkout-input" placeholder="State">
            <button class="card-box-btn">Apply coupon</button>
        </div>
        <div class="shopping-card-checkout-box">
            <div class="proseed">
                <p class="sub-total">Подитог<span class="sub-total-check">{{ this.$root.$refs.cart.totalSumm() }}₽</span></p>
                <p class="grand-total card-checkout-h3">Итого<span class="grand-total-check pink">{{ this.$root.$refs.cart.totalSumm() }}₽</span></p>
                <hr>
                <button class="proceed-checkout">Proceed to checkout</button>
            </div>
        </div>
    </form>
</div>
</main>`
});

Vue.component('basket-item', {
    props: ['cartItem'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
      },
    template: `
            <tr class="shopping-card-products">
                <td class="shopping-card-td">
                    <img class="shopping-card-img" :src=cartItem.img alt="Product">
                    <h2 class="shopping-card-h2">{{cartItem.product_name}}</h2>
                </td>
                <td class="shopping-card-td shopping-card-text centred">{{cartItem.price}} ₽</td>
                <td class="shopping-card-td shopping-card-text centred">{{cartItem.quantity}}</td>
                <td class="shopping-card-td shopping-card-text centred">FREE</td>
                <td class="shopping-card-td shopping-card-text centred">{{cartItem.quantity*cartItem.price}}₽</td>
                <td class="shopping-card-td centred">
                <button class="shopping-card-action" @click="cartAPI.addProduct(cartItem)"><i class="fas fa-plus-circle"></i></button><button class="shopping-card-action" @click="cartAPI.remove(cartItem)"><i class="fas fa-minus-circle"></i></button>
                </td>
            </tr>
    `
});
