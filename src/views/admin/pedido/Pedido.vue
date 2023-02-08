<template>
  <div class="card">
    <h1>Pedido</h1>
    <DataTable :value="pedidos" responsiveLayout="scroll">
      <Column field="cod_factura" header="Codigo Factura"></Column>
      <Column field="cliente.nombreCompleto" header="Cliente"></Column>
      <Column field="" header="Productos">
        <template #body="slotProps">
          <Button label="Ver Productos" icon="pi pi-external-link" @click="mostrarPedido(slotProps.data)" />
        </template>
      </Column>
      <Column field="user.name" header="Usuario"></Column>
      <Column field="" header="Acciones">
        <template #body="slotProps">
          <Button icon="pi pi-arrow-circle-up" class="p-button p-button-text p-button-success"
            @click="selectClient(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button p-button-text p-button-danger" @click="hideDialog" />
        </template>
      </Column>
    </DataTable>
    <Dialog v-model:visible="displayBasic" :style="{ width: '450px' }" header="Registrar nuevo cliente" :modal="true"
      class="p-fluid">
      <DataTable :value="pedido" responsiveLayout="scroll">
        <Column field="nombre" header="Nombre"></Column>
        <Column field="precio" header="Precio"></Column>
        <Column field="" header="Acciones">
          <template #body="slotProps">
            <Button icon="pi pi-arrow-circle-up" class="p-button p-button-text p-button-success"
              @click="selectClient(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button p-button-text p-button-danger" @click="hideDialog" />
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </div>
</template>

<!-- Composition API -->
<script setup>
import { ref, reactive, onMounted, computed } from 'vue'

import * as apiPedido from '@/services/pedido.service';

const pedidos = ref([]),
  pedido = ref([]);
const displayBasic = ref(false)


onMounted(async () => {
  const { data } = await apiPedido.getPedidos()
  console.log(data.data)
  pedidos.value = data.data
})

const openBasic = () => {
  displayBasic.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
};

async function mostrarPedido(ped) {
  const { data } = await apiPedido.getPedido(ped.id)
  console.log(data.productos)
  pedido.value = data.productos
  openBasic()
}

</script>

<style>

</style>