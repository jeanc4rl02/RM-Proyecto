const { createApp } = Vue

createApp({
  data() {
    return {
      accumulatedPickles:0, //Pepinillos acumulados, debe venir de Storage.
      amountOfPickles:0, //Papinillos que el usuario quiere comprar
      valuePickles:0,
      paymentMethod:'',

      //Estas son variables para la validación
      cardNameOk:true,
      cardOk:true, 
      cvcOk:true,
      dateOk:true,
      //Estos son las variabes de los campos
      cardName:'', 
      cardNumber:'',
      cvcNumber:'',
      expirationDate:'',
    }
  },
  methods:{
    getAmountOfPickles(e){
   
      this.amountOfPickles=Number(e.target.dataset.amount)
      this.valuePickles=Number(e.target.dataset.value)
      const salesData={
        pickles:this.amountOfPickles,
        value:this.valuePickles
      }
    },
    validateData(){
      let flag=true
      //1. Validación para que el nombre de la tarjeta no sea un campo vacío.
      if(this.cardName===''){
        this.cardNameOk=false
        flag=false
      }else{
        this.cardNameOk=true
      }
      //4293530017454209
      //2. Validación para tarjetas: Visa para 16 y 13 dígitos, Mastercard y discover
      let regExp=/^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/
      if(!(regExp.test(this.cardNumber.toString()))){
        this.cardOk=false
        flag=false
      }else{
          this.cardOk=true
        }
      //3.Validación para el CVC.
      if(!((this.cvcNumber.toString().length===3 ||this.cvcNumber.toString().length===4)&&this.cvcNumber>0)){
        this.cvcOk=false
        flag=false
      }else{
        this.cvcOk=true
      }
      
      //4.Validación de la fecha
      const currentDate=new Date()
      const expirationDate=new Date(this.expirationDate)
      if((expirationDate.getTime()-currentDate.getTime())<0 || this.expirationDate===''){
        this.dateOk=false
        flag=false
      }else{
        this.dateOk=true
      }
      return flag
    },
    makePaymentCard(){
      const rightInformation=this.validateData()
      if(rightInformation){
        this.accumulatedPickles += this.amountOfPickles //Una vez finalizado el pago.
        localStorage.setItem("accumulatedPickles",this.accumulatedPickles) 
        //Hecha con éxito la transacción, se procede a borrar el formulario y resetear el formulario.
        this.cardName='' 
        this.cardNumber=''
        this.cvcNumber=''
        this.expirationDate=''
        this.paymentMethod=''
        this.closeModal()
      }else{
        return
      }
    },
    makePaymentPaypal(){
      //Por ahora sin validaciones en Paypal, hace la compra directamente.
      this.accumulatedPickles += this.amountOfPickles //Una vez finalizado el pago.
      localStorage.setItem("accumulatedPickles",this.accumulatedPickles)
       //Hecha con éxito la transacción, se procede a borrar el formulario y resetear el formulario.
       this.cardName='' 
       this.cardNumber=''
       this.cvcNumber=''
       this.expirationDate=''
       this.paymentMethod=''
       this.closeModal()
    },
    makePayment(){
      (this.paymentMethod==='card')?this.makePaymentCard():this.makePaymentPaypal()
    },
    closeModal(){
      const myModalEl = document.getElementById('exampleModal');
      const modal = bootstrap.Modal.getInstance(myModalEl)
      modal.hide();
    }
  }
}).mount('#app')