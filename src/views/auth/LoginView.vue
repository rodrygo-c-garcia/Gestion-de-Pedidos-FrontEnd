<template>
  <h1>Mi login</h1>
  <div>
    <div>
      <label for="">Email</label>
      <!--  con v-model capturamos los datos de los inputs -->
      <input type="email" v-model="usuario.email" />
    </div>
    <div>
      <label for="">Password</label>
      <input type="password" v-model="usuario.password" />
    </div>
    <!-- v-on:click nos permite escuchar una funcion en este caso login -->
    <button v-on:click="login">Ingresar</button>
  </div>

  {{ usuario }}
</template>

<script>
import * as loginService from "@/services/login.service";

export default {
  data() {
    return {
      usuario: {
        email: "",
        password: "",
      },
    };
  },

  // conjunto de funciones
  methods: {
    // realizamos la peticion a nuestra API
    async login() {
      // solo capturamos la data (erro, mensaje)
      const { data } = await loginService.login(this.usuario);
      console.log(data);
      if (data.error) alert("Datos erroneos");
      else {
        // vamos a codificar con una cadena de caracteres en base64 y para eso utlizamos la funcion de btoa()
        // para ocultarlo un poco
        localStorage.setItem("token", btoa(data.access_token));
      }
    },
  },
};
</script>

<style>
</style>

clase 16 minuto 29:41