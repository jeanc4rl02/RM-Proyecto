var app = new Vue({
    el: '#app',
    data: {
      arrayCards: [],
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
                })
                ;
            })
            this.arrayCards = aux;
            localStorage.setItem("users", JSON.stringify(this.arrayCards))
            console.log(this.arrayCards)
        },
    },
    created(){
        this.getData();
    }
  })