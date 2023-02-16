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
          localStorage.setItem("client", client);
          console.log(localStorage.getItem("client"));
          Swal.fire({
            icon: 'success',
            title: `Inicio sesión como ${localStorage.getItem("name")}`,
            showConfirmButton: false,
            timer: 1800
          })
          this.error = false;
  setTimeout(function() {
              window.location = "#";
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
      pushUser(){
        // FALTAN VALIDACIONES <-------------------- 
        // let userValidation = this.users.find((u) => u.username == this.modalUsername);
        // console.log(userValidation)
        if(this.modalName != null && this.modalLastname != null && this.modalUsername != null && this.modalPassword != null){
          this.users = [];
          this.users = JSON.parse(localStorage.getItem("users")) || []
          this.users.push({
            name: this.modalName,
            lastname: this.modalLastname,
            username: this.modalUsername,
            password: this.modalPassword,
        })
        this.errorReg = false;
        localStorage.setItem("users", JSON.stringify(this.users));
        window.location.reload();
        } else {
          this.errorReg = true;
        }
      },
    },
    created(){

    },
    mounted(){

    }
  });