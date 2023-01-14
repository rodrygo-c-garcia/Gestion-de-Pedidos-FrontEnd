<template>
  <h1>Mi login</h1>
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
};
</script>

<style>
</style>