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

    username: "",
    password: "",
  },
  computed() {},

  methods: {
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
        };

        if (this.active) {
          this.dataFilter = this.data.filter((el) => el.login.username === this.active.username);

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
  },
});
