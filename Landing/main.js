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
      auctionOpportunities:0, //Estas son las oportunidades que tenemos en la subasta.
      alert:false,
      cardPrice:0, //Este es el valor que sale en el modal de la subasta
    },
    methods: {
        logout() {
            localStorage.removeItem("client");
            localStorage.removeItem("name");
            window.location = "../index.html";
          },
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
                    buyDate: "",
                    cant: 1
                })
            })
            this.arrayCards = aux;
            localStorage.setItem("cards", JSON.stringify(this.arrayCards))
            console.log(this.arrayCards)
        },
        buyCard(index){
            let card = this.arrayCards.filter((c) => c.id == index + 1);
            console.log(card)
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
                this.client[0].global.push(card[0])
                let i = this.client[0].cards.map(c => c.id).indexOf(card[0].id)
                if(i != -1 ){
                    this.client[0].cards[i].cant ++
                } else {
                    this.client[0].cards.push(card[0])
                }
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
        let card = this.arrayCards.filter((c) => c.id == index + 1);
        let price=card[0].cardPrice
        this.cardPrice=price
        localStorage.setItem("price",price)
        localStorage.setItem("card",JSON.stringify(card))
        if(this.client[0].accumulatedPickles < this.cardPrice){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No tiene fondos suficientes para ofertar por esta carta, recuerde comprar más pepinillos en nuestra sección de comprar pickles',
                
                })
            return
        }
          this.showForm=true
          
        
        },
        analizeOffer(){
            
            if(this.offer<0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La oferta debe tener un número positivo de pepinillos',
                  })
                  this.auctionOpportunities++
                  return
            }
       
            if(this.auctionOpportunities===1){
                this.alert=true
            } 
           (this.auctionOpportunities<2)?this.regularAuction():this.lastChance()
        },
        regularAuction(){
          
            //Este es el precio mímimo de venta para las dos primeras iteraciones.
            // let index=Number(localStorage.getItem("index"))
            let card = JSON.parse(localStorage.getItem("card"))
            let basePrice=Number(localStorage.getItem("price"))*1.2
            
            if(this.offer>=basePrice && this.client[0].accumulatedPickles >=this.offer){
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
                      this.alert=false
                      this.auctionOpportunities=0
                } else if(this.offer<basePrice){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'La oferta es demasiado baja, mejórala un poco',
                       
                      })
                } else if(this.offer>=basePrice && this.client[0].accumulatedPickles<this.offer){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'La oferta que usted propone, supera a los pepinillos con los que usted cuenta actualmente, reconsidere su aferta o adquiera más pepinillos Rick',
                       
                      })
                }
                this.auctionOpportunities++
        },
        lastChance(){
         
            
            // let index=Number(localStorage.getItem("index"))
            let card = JSON.parse(localStorage.getItem("card"))
            let basePrice=Number(localStorage.getItem("price"))*1.2; //Como precio le dejamos el mismo que tenía al ser el último intento.
            
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
                        title: 'Aceptamos tu oferta, compra exitosa',
                        showConfirmButton: false,
                        timer: 3000
                      })
                } else {
                    // this.successBuy = false;
                    // this.insufficientCredits = true;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'La subasta terminó, puedes volver a intentarlo una próxima vez',
                       
                      })
                }
                this.showForm=false
                this.auctionOpportunities=0
                this.alert=false
            
        },
        offerCanceled(){
            this.showForm=false
            this.auctionOpportunities=0
            this.alert=false
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