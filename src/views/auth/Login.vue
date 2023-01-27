<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';

const { layoutConfig, contextPath } = useLayout();
const email = ref('');
const password = ref('');
const checked = ref(false);

const logoUrl = computed(() => {
  return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

</script>

<script>
import * as loginService from "@/services/login.service";
import { Buffer } from 'buffer';

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
        //localStorage.setItem("token", btoa(data.access_token));
        let base64 = Buffer.from(data.access_token).toString('base64');
        localStorage.setItem("token", base64);
        this.$router.push({ name: '/' })
      }
    },
  },
};
</script>

<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
      <div
        style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
            <div class="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <div>
            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5"
              style="padding: 1rem" v-model="usuario.email" />

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
            <Password id="password1" v-model="usuario.password" placeholder="Password" :toggleMask="true"
              class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <div class="flex align-items-center">
                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                <label for="rememberme1">Remember me</label>
              </div>
              <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)">Forgot password?</a>
            </div>
            <Button label="Sign In" class="w-full p-3 text-xl" @:click='login'></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppConfig simple />
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>


<!-- <template>
  <h1>Mi login</h1>
  <div>
    <div>
      <label for="">Email</label>
      con v-model capturamos los datos de los inputs 
      <input type="email" v-model="usuario.email" />
    </div>
    <div>
      <label for="">Password</label>
      <input type="password" v-model="usuario.password" />
    </div>
    v-on:click nos permite escuchar una funcion en este caso login 
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

clase 16 minuto 29:41 -->