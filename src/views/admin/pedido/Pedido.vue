<template>
  <div class="card">
    <h1>Pedido</h1>
    <h2>{{ pinia.titulo }}</h2>

    <h3>{{ pinia.count }} es {{ pinia.parImpar }}</h3>

    <Button @click="pinia.incrementar">+</Button>
    <Button @click="pinia.decrementar">-</Button>

    <div>
      <input v-model="msg" type="text">
      <Button label="cambiar" @click="pinia.changeMSJ(msg)" type="text" />
    </div>
  </div>
</template>

<!-- Composition API -->
<script setup>
import { usePiniaStore } from '@/store/index.js'

const pinia = usePiniaStore()
const msg = ''

</script>

<style>

</style>