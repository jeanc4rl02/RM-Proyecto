let vm = new Vue({
    el: "#app",
    data: {
      users: JSON.parse(localStorage.getItem("users")),
      userEntered: "",
      passwordEntered: "",
      error: false,
      showModal: false,
      errorReg: false,
      modalName: null,
      modalLastname: null,
      modalUsername: null,
      modalPassword: null,
      errorUser: null,
    },
    methods: {
      verifyUser() {
       
        const userValidation = this.users.find((u) => u.username == this.userEntered);
        const passwordValidation = this.users.find((u) => u.password == this.passwordEntered);
  
        if (passwordValidation && userValidation) {
          let client = this.users.filter((u) => u.username == this.userEntered);
          localStorage.setItem("name", client[0].name);
          localStorage.setItem("client", JSON.stringify(client));
          console.log(localStorage.getItem("client"));
          Swal.fire({
            icon: 'success',
            title: `Inicio sesión como ${localStorage.getItem("name")}`,
            showConfirmButton: false,
            timer: 1800
          })
          this.error = false;
          setTimeout(function() {
              window.location.href = "../Landing/index.html";
            }, 2000);
          
        } else {
          this.error = true;
          Swal.fire({
            icon: 'error',
            title: 'Inicio de sesión fallido',
            text: 'Revise sus credenciales de ingreso',
            showConfirmButton: false,
            timer: 2500
          })
        }
      },
      validateUsername(){
        return this.users.some(user=>user.username===this.modalUsername) //Retorna verdadero si lo encuentra y falso si no lo encuentra
      },
      pushUser(){
        // FALTAN VALIDACIONES <-------------------- 
        // let userValidation = this.users.find((u) => u.username == this.modalUsername);
        // console.log(userValidation)
        /**Aquí va la validación del usuario */

        if(this.modalName != null && this.modalLastname != null && this.modalUsername != null && this.modalPassword != null){
          this.users = [];
          this.users = JSON.parse(localStorage.getItem("users")) || []
          if(!this.validateUsername()){
              this.users.push({
                name: this.modalName,
                lastname: this.modalLastname,
                username: this.modalUsername,
                password: this.modalPassword,
                accumulatedPickles: 0,
                cards: []
              })
              Swal.fire({
                icon: 'success',
                title: `Usuario registrado correctamente`,
                showConfirmButton: false,
                timer: 1800
              })
              this.errorReg = false;
              localStorage.setItem("users", JSON.stringify(this.users));
              setTimeout(function() {
                window.location.reload();
              }, 1500);
            
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Registro fallido',
                text: 'El usuario que está tratando de ingresar ya existe en el sistema',
                showConfirmButton: false,
                timer: 3500
              })
            }
        
        } else {
          this.errorReg = true;
        }
      },
    },
    created(){
      if(this.users===null){
        this.users=[]
      }
    },
    mounted(){

    }
  });