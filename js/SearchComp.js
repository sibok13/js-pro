Vue.component('search', {
    data(){
        return {
            userSearch: '',
        }
    },
    methods: {
        log(){
            console.log(this.userSearch);
        },
        filter(){
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `
    <form action="#" class="search-form" @submit.prevent="log">
        <input type="text" class="search-field" v-model="userSearch">
        <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </form>
    `
});
