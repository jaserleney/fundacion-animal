var app = new Vue({
  el: "#app",
  data: {
    message: "Bienvenid@",
    data: [],
    dataFilter: [],
    active: {},
    ID: 4,
    arrayLogin: [],

    is: {
      out: true,
      login: false,
      isAdmin: false,
    },

    show: {
      formAdop: true,
      adop: false,
      adminAdop: false,
    },

    showEspecies: {
      cat: false,
      dog: false,
    },

    username: "",
    password: "",

    formNewPets: {
      id: "",
      name: "",
      breed: "",
      color: "",
      description: "",
      age: "",
      gender: "",
      condition: 1,
      img: "",
      especie: "",
    },

    pets: [
      {
        id: 1,
        name: "Firulais",
        breed: "Husky",
        color: "Blanco",
        description: "Amoroso, Feliz",
        age: 5,
        gender: "Macho",
        condition: 1,
        img: "./img/perro-2.png",
        especie: "Perro",
      },
      {
        id: 2,
        name: "Mishi",
        breed: "kohana",
        color: "Amarillo ",
        description: "Amorosa, Bonita",
        age: 4,
        gender: "Hembra",
        condition: 1,
        img: "./img/gato-2.png",
        especie: "Gato",
      },
      {
        id: 3,
        name: "Kira",
        breed: "Persa",
        color: "Blanco",
        description: "Alegre",
        age: 2,
        gender: "Hembra",
        condition: 1,
        img: "./img/gato-1.png",
        especie: "Gato",
      },
      {
        id: 4,
        name: "Toby",
        breed: "Labrador",
        color: "Dorado",
        description: "Amoroso, Feliz",
        age: 12,
        gender: "Macho",
        condition: 1,
        img: "./img/perro-1.png",
        especie: "Perro",
      },
    ],
  },
  computed() {},

  methods: {
    showFormAdop() {
      this.show = {
        formAdop: true,
        adop: false,
        adminAdop: false,
      };
    },
    showAdopt() {
      this.show = {
        formAdop: false,
        adop: true,
        adminAdop: false,
      };
    },
    showAdminAdop() {
      this.show = {
        formAdop: false,
        adop: false,
        adminAdop: true,
      };
    },

    changedSpecies() {
      if (this.formNewPets.especie === "Gato") {
        this.showEspecies = {
          cat: true,
          dog: false,
        };
      }
      if (this.formNewPets.especie === "Perro") {
        this.showEspecies = {
          cat: false,
          dog: true,
        };
      }
    },

    logOut() {
      Swal.fire({
        title: "Desea cerrar sesión?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.is = {
            out: true,
            login: false,
            admin: false,
          };
          this.active = {};
          this.isAdmin = false;
          localStorage.removeItem("active");
          localStorage.removeItem("dataFilter");
          location.reload();
        }
      });
    },

    submitForm() {
      this.$refs.anyName.reset();
    },

    addNewPets(pet) {
      this.pets.push(pet);
      localStorage.setItem("pets", JSON.stringify(this.pets));
    },

    verifyName(name) {
      if (!name || name === undefined || name === "" || name === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El nombre no puede estar vacío",
        });
        return false;
      }
      return true;
    },
    verifyId(id) {
      if (!id || id === undefined || id === "" || id === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El id no puede estar vacío",
        });
        return false;
      }
      return true;
    },
    verifyBreed(breed) {
      if (!breed || breed === undefined || breed === "" || breed === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "La Raza no puede estar vacío",
        });
        return false;
      }
      return true;
    },
    verifyColor(color) {
      if (!color || color === undefined || color === "" || color === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El color no puede estar vacío",
        });
        return false;
      }
      return true;
    },
    verifyEspecie(especie) {
      if (!especie || especie === undefined || especie === "" || especie === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "La Especie no puede estar vacío",
        });
        return false;
      }
      return true;
    },
    verifyAge(age) {
      const expRegNum = /(?=\d)\d+/g;
      if (expRegNum.test(age)) {
        if (age > 0) {
          return true;
        }
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La Edad puede estar vacío o ser negativa",
      });
      return false;
    },
    verifyGender(gender) {
      if (!gender || gender === undefined || gender === "" || gender === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El genero no puede estar vacío",
        });
        return false;
      }
      return true;
    },
    verifyDescription(description) {
      if (!description || description === undefined || description === "" || description === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "La Descripcion no puede estar vacía",
        });
        return false;
      }
      return true;
    },
    verifyImg(img) {
      if (!img || img === undefined || img === "" || img === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "La imagen no puede estar vacía",
        });
        return false;
      }
      return true;
    },

    formPets() {
      let { id, name, breed, color, especie, age, gender, description, img, condition } = this.formNewPets;
      console.log(this.formNewPets);
      this.ID += 1;
      id = this.ID;
      localStorage.setItem("ID", this.ID);

      if (
        this.verifyName(name) &&
        this.verifyBreed(breed) &&
        this.verifyColor(color) &&
        this.verifyEspecie(especie) &&
        this.verifyAge(age) &&
        this.verifyGender(gender) &&
        this.verifyDescription(description) &&
        this.verifyImg(img) &&
        this.verifyId(id)
      ) {
        this.addNewPets({ id, name, breed, color, especie, age, gender, description, img, condition: 1 });
        Swal.fire("Exito!", "Pets agregados con éxito!", "success");
        this.formNewPets = {
          id: "",
          name: "",
          breed: "",
          color: "",
          description: "",
          age: "",
          gender: "",
          condition: 1,
          img: "",
          especie: "",
        };
        this.showEspecies = {
          cat: false,
          dog: false,
        };

        this.submitForm();
      } else {
        return false;
      }
    },

    adoptPets(index) {
      console.log(index);
      Swal.fire({
        title: "Desea adoptar esta mascota?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.pets[index].condition = 0;
          localStorage.setItem("pets", JSON.stringify(this.pets));
        }
      });
      return false;
    },

    verifyLogin() {
      if ((!this.username && !this.password) || (!this.username === "" && !this.password === "")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No has ingresado ningun usuario o contraseña",
        });
        return false;
      }

      // let arrayLogin = this.data.map((el) => ({ username: el.login.username, password: el.login.password, type: el.type }));
      // console.log(arrayLogin);

      // console.log(type);
      if (this.arrayLogin.some((el) => el.username === this.username && el.password === this.password)) {
        // console.log(arrayLogin);
        const { type } = this.arrayLogin.find((el) => el.username === this.username && el.password === this.password);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Usuario Validado Correctamente",
        });

        setTimeout(() => {
          if (type === 1) {
            this.is = {
              out: false,
              login: true,
              admin: true,
            };
          }
          if (type === 0) {
            this.is = {
              out: false,
              login: true,
              admin: false,
            };
          }

          this.active = {
            username: this.username,
            password: this.password,
            type,
          };
          localStorage.setItem("active", JSON.stringify(this.active));

          if (this.active) {
            this.dataFilter = this.data.filter((el) => el.login.username === this.active.username);
            localStorage.setItem("dataFilter", JSON.stringify(this.dataFilter));
            console.log(this.dataFilter);
          }
        }, 1500);
      } else {
        alert("Usuario o contraseña incorrecta");
        return false;
      }
    },

    async getData(url) {
      try {
        let res = await fetch(url);

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        let data = await res.json();

        this.data = data.results;
        this.data.map((el) => {
          el.type = Math.round(Math.random());
        });
        this.arrayLogin = this.data.map((el) => ({ username: el.login.username, password: el.login.password, type: el.type }));
        console.log(this.arrayLogin);
        // console.log(this.data);
      } catch (err) {
        console.log(`Error ${err.status}: ${err.statusText}`);
      }
    },

    // deleteUsers(index) {
    //   let isDelete = confirm("Esta Seguro Que Desea Eliminar Al Usuario?");
    //   if (isDelete) {
    //     this.dataFilter.splice(index, 1);
    //   }
    // },
  },

  created() {
    this.getData("https://randomuser.me/api/?results=10");

    let active = localStorage.getItem("active");
    let dataFilter = localStorage.getItem("dataFilter");
    let pets = localStorage.getItem("pets");
    let ID = localStorage.getItem("ID");

    if (active !== null) {
      this.active = JSON.parse(active);
      if (this.active) {
        let { type } = this.active;
        if (type === 1) {
          this.is = {
            out: false,
            login: true,
            admin: true,
          };
        }
        if (type === 0) {
          this.is = {
            out: false,
            login: true,
            admin: false,
          };
        }
      }
    }
    if (dataFilter !== null) {
      this.dataFilter = JSON.parse(dataFilter);
    }

    if (pets !== null) {
      this.pets = JSON.parse(pets);
    }

    if (ID !== null) {
      this.ID = parseInt(ID);
    }
  },
});
