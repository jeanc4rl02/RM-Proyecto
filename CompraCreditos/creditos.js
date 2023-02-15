const { createApp } = Vue

createApp({
  data() {
    return {
      //accumulatedPickles:0, //Estos son los pepinillos que el jugador tiene en total.
      //amountOfPickles:0, //Papinillos que el usuario quiere comprar
      //valuePickles:0
    }
  },
  methods:{
    getAmountOfPickles(e){
      //Esto se debería hacer una vez el usuario ya haya realizado el pago.
      /*this.accumulatedPickles += e.target.dataset.amount
      localStorage.setItem("accumulatedPickles",this.accumulatedPickles)*/
      const salesData={
        pickles:e.target.dataset.amount,
        value:e.target.dataset.value
      }
      localStorage.setItem("salesData",JSON.stringify(salesData))

      alert("Aquí se activa la redireción con la data de venta ya en el Storage")
      
    }
  }
}).mount('#app')