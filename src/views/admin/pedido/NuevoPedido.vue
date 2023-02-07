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
    <div class="col-12 md:col-8 lg:col-7">
      <div class="card">
        <h4>Carrito</h4>
        <DataTable :value="carrito" responsiveLayout="scroll">
          <Column field="nombre" header="Nombre"></Column>
          <Column field="cantidad" header="Cant.">
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
    <div class="col-12 md:col-4 lg:col-5">
      <div class="card">
        <h4>Cliente</h4>
        <div class="field col-5">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText type="text" v-model="identificacion" placeholder="Buscar NIT del cliente" @change="getCliente" />
          </span>
          <span>
            <Button label="Nuevo Cliente" icon="pi pi-external-link" @click="openBasic" />
          </span>
          <Dialog v-model:visible="displayBasic" :style="{ width: '450px' }" header="Registrar nuevo cliente"
            :modal="true" class="p-fluid">
            <div class="grid p-fluid">
              <div class="col-12 md:col-12">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                  </span>
                  <InputText placeholder="Nombre Completo" v-model="cliente.nombreCompleto" />
                </div>
              </div>

              <div class="col-12 md:col-12">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon"><i class="pi pi-id-card"></i></span>
                  <InputText placeholder="CI / NIT" v-model="cliente.ci_nit" />
                </div>
              </div>
              <div class="col-12 md:col-12">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">#</span>
                  <InputNumber placeholder="Telefono" v-model="cliente.telefono" />
                </div>
              </div>
              <div class="col-12 md:col-12">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon"><i class="pi pi-at"></i></span>
                  <InputText type="email" placeholder="Correo" v-model="cliente.correo" />

                </div>
              </div>
            </div>
            <template #footer>
              <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeBasic" />
              <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveCliente" />
            </template>
          </Dialog>
        </div>
        <!-- <div>Cliente: {{ buscarCliente }}</div> -->
        <!-- <div>{{ lista_clientes }}</div> -->
        <DataTable :value="lista_clientes" responsiveLayout="scroll">
          <Column field="nombreCompleto" header="Nombre"></Column>
          <Column field="ci_nit" header="NIT"></Column>
          <Column field="" header="Acciones">
            <template #body="slotProps">
              <Button icon="pi pi-arrow-circle-up" class="p-button p-button-text p-button-success"
                @click="addCarrito(slotProps.data)" />
              <Button icon="pi pi-trash" class="p-button p-button-text p-button-danger" @click="hideDialog" />
            </template>
          </Column>
        </DataTable>
      </div>

      <div class="card">
        <Button>Realizar Pedido</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import * as productoService from '@/services/producto.service'
import * as apiCliente from '@/services/cliente.service';

// PINIA
import { usePiniaStore } from '@/store/index.js'
const pinia = usePiniaStore()


const productos = ref(null)
const carrito = ref([])
const total_carrito = ref(0.0),
  identificacion = ref(''),
  lista_clientes = ref([]),
  cliente = ref({})

const displayBasic = ref(false);

onMounted(async () => {
  //productoService.value.getProductsSmall().then(data => products.value = data);
  const { data } = await productoService.getProductos(1, 5)
  productos.value = data.data
  getCliente
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
};

const getCliente = computed(async () => {
  const { data } = await apiCliente.getClientes(identificacion.value)
  console.log(data)
  lista_clientes.value = data
})

const openBasic = () => {
  displayBasic.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
};

async function saveCliente() {
  await apiCliente.postCliente(cliente.value)
}
// const buscarCliente = computed(() => {
//   return lista_clientes.value.find(obj => obj.id === parseInt(identificacion.value)) || 'no existe'
// })
</script>

<style>

</style>