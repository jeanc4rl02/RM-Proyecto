var app = new Vue({
    el: '#app',
    data: {
      client: null,
    },
    methods: {
    },
    created(){
        this.client = JSON.parse(localStorage.getItem("client"));
    }
  })