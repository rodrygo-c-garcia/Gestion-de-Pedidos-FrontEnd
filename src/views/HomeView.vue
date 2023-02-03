<template>
  <main>
    <h2>Mi componente Home (ADMINISTRADOR)</h2>
    <div class="card">
      <h5>Bienvenido {{ pinia.user.name }}</h5>
    </div>
  </main>
</template>

<script setup>
import { usePiniaStore } from '@/store/index.js'
const pinia = usePiniaStore()
</script>
