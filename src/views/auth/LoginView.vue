<template>
  <h1>Mi login</h1>
  <div>
    <div>
      <label for="">Email</label>
      <input type="email" v-model="usuario.email" />
    </div>
    <div>
      <label for="">Password</label>
      <input type="password" v-model="usuario.password" />
    </div>
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
    login() {
      console.log("ingresando");
    },
  },
};
</script>

<style>
</style>