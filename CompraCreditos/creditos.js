const { createApp } = Vue

createApp({
  data() {
    return {
      accumulatedPickles:0, //Pepinillos acumulados, debe venir de Storage.
      amountOfPickles:0, //Papinillos que el usuario quiere comprar
      valuePickles:0,
      paymentMethod:''
    }
  },
  methods:{
    getAmountOfPickles(e){
      /*
      this.accumulatedPickles += e.target.dataset.amount //Una vez finalizado el pago.
      localStorage.setItem("accumulatedPickles",this.accumulatedPickles) */
      this.amountOfPickles=Number(e.target.dataset.amount)
      this.valuePickles=Number(e.target.dataset.value)
      const salesData={
        pickles:this.amountOfPickles,
        value:this.valuePickles
      }

      
    }
  }
}).mount('#app')