var app = new Vue({
    el: '#app',
    data: {
      arrayCards: [],
      client: null,
      insufficientCredits: false,
      successBuy: false,
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
                let price = this.getRandomInt(100);
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
                })
                ;
            })
            this.arrayCards = aux;
            localStorage.setItem("cards", JSON.stringify(this.arrayCards))
            console.log(this.arrayCards)
        },
        buyCard(index){
            let card = this.arrayCards.filter((c) => c.id == index + 1);
            if(this.client[0].accumulatedPickles >= card[0].cardPrice){
                this.successBuy = true;
                this.insufficientCredits = false;
                this.client[0].accumulatedPickles -= card[0].cardPrice;
                console.log(this.client[0].accumulatedPickles)
                this.client[0].cards.push(card)
            } else {
                this.successBuy = false;
                this.insufficientCredits = true;
                console.log(card)
            }
            
        },
        getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
    },
    created(){
        if(localStorage.getItem("cards") != null){
            this.arrayCards = JSON.parse(localStorage.getItem("cards"))
        } else {
            this.getData(); 
        }
        this.client = JSON.parse(localStorage.getItem("client"));
    }
  })