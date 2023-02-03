<template>

  <div class="grid">
    <!-- col-12 pantallas movil
    md:col-12 pantallas pc
    -->
    <div class="col-12 md:col-12 lg:col-12">
      <div class="card">
        <h5>Usuario: {{ pinia.user.email }}</h5>
        <h5>Codigo: {{ pinia.user.id }}</h5>
      </div>
    </div>
    <div class="col-12 md:col-12 lg:col-12">
      <div class="card">
        <h4>Lista de productos</h4>
        <DataTable :value="productos" responsiveLayout="scroll">
          <Column field="id" header="#"></Column>
          <Column field="nombre" header="Nombre"></Column>
          <Column field="stock" header="Stock"></Column>
          <Column field="precio" header="Precio"></Column>
          <Column field="categoria.nombre" header="Categoria"></Column>
          <Column :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
              <Button icon="pi pi-cart-plus" class="p-button-rounded p-button-success"
                @click="addCarrito(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="col-12 md:col-8 lg:col-8">
      <div class="card">
        <h4>Carrito</h4>
        <DataTable :value="carrito" responsiveLayout="scroll">
          <Column field="nombre" header="Nombre"></Column>
          <Column field="cantidad" header="Cantidad">
          </Column>
          <Column field="precio" header="Precio"></Column>
          <Column field="sub_total" header="SubTotal"></Column>
          <Column field="" header="Acciones">
            <template #body="slotProps">
              <Button icon="pi pi-arrow-circle-up" class="p-button p-button-text p-button-success"
                @click="addCarrito(slotProps.data)" />
              <Button icon="pi pi-arrow-circle-down" class="p-button p-button-text p-button-success"
                @click="deleteCarrito(slotProps.data)" />
              <Button icon="pi pi-trash" class="p-button p-button-text p-button-danger" @click="hideDialog" />
            </template>
          </Column>
          <template #footer>
            Total: {{ total_carrito }}
          </template>
        </DataTable>
      </div>
    </div>
    <div class="col-12 md:col-4 lg:col-4">
      <div class="card">
        <h4>Cliente</h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import * as productoService from '@/services/producto.service'
// PINIA
import { usePiniaStore } from '@/store/index.js'
const pinia = usePiniaStore()


const productos = ref(null)
const carrito = ref([])
const total_carrito = ref(0.0)

onMounted(async () => {
  //productoService.value.getProductsSmall().then(data => products.value = data);
  const { data } = await productoService.getProductos(1, 5)
  productos.value = data.data
})

// Funciones
function addCarrito(producto) {
  let prod = {
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad: 1,
  }
  // Agregamos la culumna de subtotal
  prod['sub_total'] = parseFloat(prod.precio * prod.cantidad)

  total_carrito.value += parseFloat(prod.precio)
  carrito.value.push(prod)
}
</script>

<style>

</style>