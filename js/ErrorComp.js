Vue.component('errorBox', {
    data(){
        return {
            error: '',
        };
    },
    methods: {
        alertErr(){
            this.error = 'Ошибка доступа к серверу!!';
        },
    },
    template: `
    <div><div>{{ error }}</div></div>
    `
});