var app = new Vue({
  el: "#app",
  data: {
    message: "Bienvenid@",
    data: [],
    dataFilter: [],
    active: {},

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
      if (this.formNewPets.especie === "cat") {
        this.showEspecies = {
          cat: true,
          dog: false,
        };
      }
      if (this.formNewPets.especie === "dog") {
        this.showEspecies = {
          cat: false,
          dog: true,
        };
      }
    },

    logOut() {
      let isOut = confirm("Desea cerrar sesión?");
      if (isOut) {
        this.is = {
          out: true,
          login: false,
          admin: false,
        };
        this.active = {};
        this.isAdmin = false;
        location.reload();
      }
    },

    submitForm() {
      this.$refs.anyName.reset();
    },

    addNewPets(pet) {
      this.pets.push(pet);
      localStorage.setItem("pets", JSON.stringify(this.pets));
    },

    formPets() {
      this.formNewPets;
    },

    verifyLogin() {
      let arrayLogin = this.data.map((el) => ({ username: el.login.username, password: el.login.password, type: el.type }));
      console.log(arrayLogin);
      const { type } = arrayLogin.find((el) => el.username === this.username && el.password === this.password);
      // console.log(type);
      if (arrayLogin.some((el) => el.username === this.username && el.password === this.password)) {
        // console.log(arrayLogin);
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

        console.log(this.data);
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
  },
});
