const { createApp } = Vue

createApp({
  data() {
    return {
      amountOfPickles:0,
    }
  },
  methods:{
    getAmountOfPickles(e){
      console.log(e.target)
    }
  }
}).mount('#app')