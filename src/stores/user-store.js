import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const expiresIn = ref(null);

  const access = async (email, password) => {
    try {
      //console.log("me diste click");
      const res = await api.post("/login", {
        // tambien puede ser de esta forma email:email || password:password
        email: email,
        password: password,
      });
      //console.log(res.data);
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      //no se esta guardando la sesión en el local storage
      sessionStorage.setItem("user", "PAYASO CREES QUE ME ROBARÁS??!");
      setTime();
    } catch (error) {
      if (error.response) {
        //La respuesta fue hecha y el servidor respondio con un codigo de estado
        //que esta fuera del rango 2xx(de los 200 para arriba)
        //console.log(error.response.data);
        throw error.response.data;
        //console.log(error.response.status);
        //console.log(error.response.headers);
      } else if (error.request) {
        //La petición fue hecha pero no se recibio respuesta
        //'error.request' es una instancia de XMLHttpRequest en el navegador y una instancia de
        // http.ClientRequest en node.js
        console.log(error.request);
      } else {
        //Algo paso al preparar la peticion que lanzo un error
        console.log("Error", error.message);
      }
      //console.log(error.config);
      //console.log(error);
    }
  };

  //validacion academica utilizando express validation
  const register = async (email, password, repassword) => {
    try {
      const res = await api.post("/register", {
        email: email,
        password: password,
        repassword: repassword,
      });
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem("user", "PAYASO CREES QUE ME ROBARÁS??!");
      setTime();
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  const logout = async () => {
    try {
      await api.get("/logout");
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
      sessionStorage.removeItem("user");
    }
  };

  const setTime = () => {
    setTimeout(() => {
      console.log("Se refresco");
      refreshToken();
    }, expiresIn.value * 1000 - 6000);
  };

  const refreshToken = async () => {
    console.log("RefreshToken");
    try {
      const res = await api.get("/refresh");
      //console.log(res.data);
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem("user", "PAYASO CREES QUE ME ROBARÁS??!");
      setTime();
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem("user");
    }
  };

  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
  };

  return {
    token,
    expiresIn,
    access,
    refreshToken,
    logout,
    register,
  };
});
