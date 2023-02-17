var app = new Vue({
    el: '#app',
    data: {
      client: null,
    },
    methods: {
      logout() {
        localStorage.removeItem("client");
        localStorage.removeItem("name");
        window.location = "../index.html";
      },
    },
    created(){
        this.client = JSON.parse(localStorage.getItem("client"));
    }
  })