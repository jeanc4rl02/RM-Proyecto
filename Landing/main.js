var app = new Vue({
    el: '#app',
    data: {
      arrayCards: [],
      client: null,
      insufficientCredits: false,
      successBuy: false,
      users:[],
      offer:0,
      showForm:false,
    },
    methods: {
        async getData(){
            await fetch('https://rickandmortyapi.com/api/character/')
            .then(res => res.json())
            .then(data => this.arrayCards = data.results)
            this.updateLocalStorage();
        },
        updateLocalStorage(){
            let aux = [];
            this.arrayCards.map(u => {
                let price = this.getRandomInt(50);
                let boolean = false;
                this.getRandomInt(2) == 1 ? boolean = true : boolean = false;
                aux.push({
                    id: u.id,
                    image: u.image,
                    name: u.name,
                    status: u.status,
                    origin: u.origin.name,
                    specie: u.species,
                    location: u.location.name,
                    gender: u.gender,
                    auction: boolean,
                    cardPrice: price,
                    buyDate: ""
                })
            })
            this.arrayCards = aux;
            localStorage.setItem("cards", JSON.stringify(this.arrayCards))
            console.log(this.arrayCards)
        },
        buyCard(index){
            let card = this.arrayCards.filter((c) => c.id == index + 1);
            if(this.client[0].accumulatedPickles >= card[0].cardPrice){
                let date = new Date()
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let day = date.getDate();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                card[0].buyDate = `${day}/${month}/${year} ${hours}:${minutes}`
                this.successBuy = true;
                this.insufficientCredits = false;
                this.client[0].accumulatedPickles -= card[0].cardPrice;
                this.client[0].cards.push(card)
                localStorage.setItem("client",JSON.stringify(this.client))
                const index = this.users.map(user => user.username).indexOf(this.client[0].username)
                this.users[index]=this.client[0]
                localStorage.setItem("users",JSON.stringify(this.users))
                
            } else {
                this.successBuy = false;
                this.insufficientCredits = true;
                console.log(card)
            }
            
        },
        getRandomInt(max) {
            return Math.floor(Math.random() * max);
        },
        showFormOffer(index){
          this.showForm=true
          let card = this.arrayCards.filter((c) => c.id == index + 1);
          let price=card[0].cardPrice
          localStorage.setItem("price",price)
          localStorage.setItem("index",index)
        },
        analizeOffer(){
            //Este es el precio mímimo de venta 
            let index=Number(localStorage.getItem("index"))
            let card = this.arrayCards.filter((c) => c.id == index + 1);
            let basePrice=Number(localStorage.getItem("price"))*2
            console.log("Precio base",basePrice)
            console.log("Pepinillos acumulados",this.client[0].accumulatedPickles)
            if(this.offer>=basePrice && this.client[0].accumulatedPickles >=basePrice){
                    let date = new Date()
                    let year = date.getFullYear();
                    let month = date.getMonth()+1;
                    let day = date.getDate();
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    card[0].buyDate = `${day}/${month}/${year} ${hours}:${minutes}`
                    // this.successBuy = true;
                    // this.insufficientCredits = false;
                    this.client[0].accumulatedPickles -= this.offer;
                    this.client[0].cards.push(card)
                    localStorage.setItem("client",JSON.stringify(this.client))
                    const index = this.users.map(user => user.username).indexOf(this.client[0].username)
                    this.users[index]=this.client[0]
                    localStorage.setItem("users",JSON.stringify(this.users))
                    this.showForm=false
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Compra en subasta exitosa',
                        showConfirmButton: false,
                        timer: 2000
                      })
                } else {
                    // this.successBuy = false;
                    // this.insufficientCredits = true;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'La oferta es demasiado baja o no tiene fondos para realizarla',
                       
                      })
                      this.showForm=false
                    
                }
            

            



        }
    },
    created(){
        if(localStorage.getItem("cards") != null){
            this.arrayCards = JSON.parse(localStorage.getItem("cards"))
        } else {
            this.getData(); 
        }
        this.client = JSON.parse(localStorage.getItem("client"));
        this.users = JSON.parse(localStorage.getItem("users"));
    }
  })