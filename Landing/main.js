var app = new Vue({
    el: '#app',
    data: {
      arrayCards: [],
      auction: false,
      client: null,
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
                aux.push({
                    id: u.id,
                    image: u.image,
                    name: u.name,
                    status: u.status,
                    origin: u.origin.name,
                    specie: u.species,
                    location: u.location.name,
                    gender: u.gender,
                    auction: false,
                    cardPrice: 0,
                })
                ;
            })
            this.arrayCards = aux;
            localStorage.setItem("cards", JSON.stringify(this.arrayCards))
            console.log(this.arrayCards)
        },
        buyCard(index){
            let card = this.arrayCards.filter((c) => c.id == index + 1);
            this.client[0].cards.push(card)
            console.log(card)
        }
    },
    created(){
        this.getData();
        this.client = JSON.parse(localStorage.getItem("client"));
    }
  })