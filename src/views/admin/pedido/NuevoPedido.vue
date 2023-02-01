<template>

  <div class="grid">
    <!-- col-12 pantallas movil
    md:col-12 pantallas pc
    -->
    <div class="col-12 md:col-12 lg:col-12">
      <div class="card">
        <h1>Datos Pedido</h1>
      </div>
    </div>
    <div class="col-12 md:col-8 lg:col-7">
      <div class="card">
        <DataTable :value="products" responsiveLayout="scroll">
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>
      </div>
    </div>
    <div class="col-12 md:col-4 lg:col-5">
      <div class="card">
        <h2>Carrito</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import * as productoService from '@/services/producto.service'

onMounted(() => {
  productoService.value.getProductsSmall().then(data => products.value = data);
  productoService.getProductos()
  // Clase 23 - 54:09
})

</script>

<style>

</style>