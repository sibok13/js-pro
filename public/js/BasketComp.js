Vue.component('basket', {
    data(){
      return {
          basketItems: [],
          showCart: false,
      }
    },
    mounted(){
        this.$parent.getJson('/api/cart')
            .then(data => {
                for(let el of data.contents){
                    this.basketItems.push(el);
                }
            });
    },
    template: `
        <div class="">
        <table class="shopping-card">
            <tr class="shopping-card-head">
                <td class="shopping-card-td">Product Details</td>
                <td class="shopping-card-td centred">Unite Price</td>
                <td class="shopping-card-td centred">Quantity</td>
                <td class="shopping-card-td centred">Shipping</td>
                <td class="shopping-card-td centred">Subtotal</td>
                <td class="shopping-card-td right">ACTION</td>
            </tr>
            <basket-item class="" v-for="item of basketItems" :key="item.id_product" :basket-item="item" @remove="remove">
            </basket-item>
        </table>
        </div>`
});

Vue.component('basket-item', {
    props: ['basketItem'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
      },
    template: `
            <tr class="shopping-card-products">
                <td class="shopping-card-td">
                    <img class="shopping-card-img" :src=basketItem.img alt="Product">
                    <h2 class="shopping-card-h2">{{basketItem.product_name}}</h2>
                </td>
                <td class="shopping-card-td shopping-card-text centred">{{basketItem.price}} ₽</td>
                <td class="shopping-card-td centred">
                    <input :placeholder=basketItem.quantity type="text" class="shopping-card-input">
                </td>
                <td class="shopping-card-td shopping-card-text centred">FREE</td>
                <td class="shopping-card-td shopping-card-text centred">{{basketItem.quantity*basketItem.price}}₽</td>
                <td class="shopping-card-td centred">
                    <button class="shopping-card-action" @click="cartAPI.$emit('remove', basketItem)"><i class="fas fa-times-circle"></i></button>
                </td>
            </tr>
    `
});
