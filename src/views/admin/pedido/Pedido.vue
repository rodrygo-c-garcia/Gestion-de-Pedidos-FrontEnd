<template>
  <div class="card">
    <h1>Nuevo Pedido</h1>

    <Button label="+" class="success" @click="incrementCounter" />
    <h2>{{ counter }}</h2>
    <Button label="-" class="danger" @click="decrementCounter" />
  </div>
</template>

<!-- Composition API -->
<script setup>
import { ref } from 'vue'

const counter = ref(0)

const incrementCounter = () => { counter.value++ }
const decrementCounter = () => { counter.value-- }

</script>

<style>

</style>