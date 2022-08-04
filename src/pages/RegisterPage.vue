<!-- no hay que hacer destructuracion a no ser
 que se use storeRefs document de la web pina
 No se debe afectar la reactividad-->

<script setup>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "../stores/user-store.js";

const $q = useQuasar();

const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const repassword = ref("");

const handleSubmit = async () => {
  try {
    console.log("pasó las validaciones");
    console.log(email.value);
    console.log(password.value);
    console.log(repassword.value);
    await userStore.register(email.value, password.value, repassword.value);
    //empujar a la pagina de inicio
    router.push("/");
    //reiniciar
    email.value = "";
    password.value = "";
  } catch (error) {
    console.log("error", error);
    if (error.error) {
      alertDialogBackend(error.error);
    } else if (error.error[0].msg) {
      alertDialogBackend(error.error[0], msg);
    } else {
      alertDialogBackend();
    }
  }
};

const alertDialogBackend = (message = "Error en el servidor") => {
  $q.dialog({
    title: "Error",
    message,
  });
};
</script>

<template>
  <!-- componentes de quasar -->
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Register</h3>
      <q-form @submit.prevent="handleSubmit">
        <q-input
          v-model="email"
          type="email"
          label="Ingrese email"
          :rules="[
            (val) =>
              /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val) ||
              'Formato de email incorrecto',
          ]"
        ></q-input>

        <q-input
          v-model="password"
          label="Ingrese contraseña"
          type="password"
          :rules="[
            (val) =>
              (val && val.length > 5) || 'Contraseña minimo 6 caracteres',
          ]"
        ></q-input>

        <q-input
          v-model="repassword"
          label="Repita contraseña"
          type="password"
          :rules="[
            (val) => (val && val === password) || 'No coincide las contraseñas',
          ]"
        ></q-input>

        <div>
          <q-btn label="Login" type="submit"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
  <h3>Login {{ userStore.token }}</h3>
</template>

<style></style>
