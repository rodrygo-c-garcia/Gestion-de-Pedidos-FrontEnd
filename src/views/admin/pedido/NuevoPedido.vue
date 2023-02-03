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
        <h4>Lista de productos</h4>
        <DataTable :value="productos" responsiveLayout="scroll">
          <Column field="id" header="#"></Column>
          <Column field="nombre" header="Nombre"></Column>
          <Column field="stock" header="Stock"></Column>
          <Column field="precio" header="Precio"></Column>
          <Column field="categoria.nombre" header="Categoria"></Column>
          <Column :exportable="false" style="min-width:8rem">
            <template #body="">
              <Button icon="pi pi-cart-plus" class="p-button-rounded p-button-warning"
                @click="confirmDeleteProduct(slotProps.data)" />
            </template>
          </Column>
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

onMounted(async () => {
  //productoService.value.getProductsSmall().then(data => products.value = data);
  const { data } = await productoService.getProductos(1, 5)
  productos.value = data.data
})



const productos = ref(null)
</script>

<style>

</style>