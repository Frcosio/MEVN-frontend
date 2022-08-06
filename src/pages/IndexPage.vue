<template>
  <q-page padding>
    <q-btn @click="useLink.createLink('https://www.google.com.mx')"
      >Crear Link</q-btn
    >
    <add-Link />
    <pre>
        {{ useLink.links }}
      </pre
    >
    <template v-for="link in useLink.links" :key="link._id">
      <LinkCard></LinkCard>
    </template>
  </q-page>
</template>

<script setup>
import { useLinkStore } from "../stores/link-store.js";

//componentes
import AddLink from "src/components/AddLink.vue";
import LinkCard from "src/components/LinkCard.vue";

const useLink = useLinkStore();
//no se debe llamar muchas veces a la bd para consumir menos recursos de mongodb
//mejor se comenta
//useLink.getLinks();
</script>
