<template>
  <q-page padding>
    <q-btn @click="access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear Link</q-btn>
    {{ token }} -{{ expiresIn }}
  </q-page>
</template>

<script setup>
import axios from "axios";
import { api } from "src/boot/axios.js";
import { ref } from "vue";

// const access = () => {
//   console.log("nos diste click");
//   axios
//     .post("http://localhost:5000/api/v1/login", {
//       email: "frcosio80@gmail.com",
//       password: "123123",
//     })
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((e) => console.log(e));
// };

const token = ref("");
const expiresIn = ref("");

const access = async () => {
  try {
    console.log("me diste click");
    const res = await api.post("/login", {
      email: "frcosio80@gmail.com",
      password: "123123",
    });
    //console.log(res.data);
    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    setTime();
  } catch (error) {
    console.log(error);
  }
};

const createLink = async () => {
  try {
    const res = await api({
      method: "POST",
      url: "/Links",
      headers: {
        Authorization: "Bearer " + token.value,
      },
      data: {
        longLink: "https://axios-http.com/docs/req_config",
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

const setTime = () => {
  setTimeout(() => {
    console.log("Se refresco");
    refreshToken();
  }, expiresIn.value * 1000 - 6000);
};

const refreshToken = async () => {
  try {
    const res = await api.get("/refresh");
    //console.log(res.data);
    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    setTime();
  } catch (error) {
    console.log(error);
  }
};

refreshToken();
</script>
