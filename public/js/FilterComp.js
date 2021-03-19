Vue.component('filter-el', {
    data(){
        return {
            userSearch: ''
        }
    },
    template: `
            <form action="#" class="search" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="search-field" v-model="userSearch" placeholder="Search for Item...">
                <input class="search-btn" type="image" name=”picture” src="img/search.png" alt="search-image">
                </button>
            </form>
    `
});
