import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";

export const useLinkStore = defineStore("link", () => {
  const userStore = useUserStore();

  const links = ref([]);

  const createLink = async (longLink) => {
    try {
      const res = await api({
        url: "/links",
        method: "POST",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink,
        },
      });
      //console.log(res.data);
      links.value.push(res.data.newLink);
    } catch (error) {
      //      console.log(error.response?.data || error);
      //el throw hace que se gatille el catch
      throw error.response?.data || error;
    }
  };

  const getLinks = async () => {
    try {
      console.log("llamando a todos los link 🚀");
      const res = await api({
        //usando paginacion
        //url: "/links?page=1&order=asc&limit=10",
        url: "/links",
        method: "GET",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      console.log(res.data.links);
      //map:me devuelve la misma cantidad de elementos un array
      //links.value = res.data.links.map((item) => item);
      //filter: me da lo mismo si me devuelve menos o la misma cantidad
      //elementos
      // //metodo es v1
      // links.value = res.data.links.map(
      //   (item) => item
      //   //la forma de seleccionar algunas etiquetas o partes
      //   //  {
      //   //   return {
      //   //     longLink: item.longLink,
      //   //     nanoLink: item.nanoLink,
      //   //   };
      //   // }
      // );
      //metodo v2 usando spread syntax operator developer.mozilla.org
      links.value = [...res.data.links];
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  //mayor optimizacion desde acá, se carga la vista y no se invoca a la mongodb
  getLinks();
  //mayor optimizacion desde acá, se carga la vista y no se invoca a la mongodb
  return { createLink, links, getLinks };
  //return { createLink, links };
});
