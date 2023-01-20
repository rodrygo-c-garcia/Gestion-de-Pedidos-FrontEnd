<template>
  <h1>Producto</h1>
  {{ productos }}

  <DataTable ref="dt" :value="productos" v-model:selection="selectedProducts" dataKey="id" :paginator="true" :rows="10"
    :filters="filters"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
    responsiveLayout="scroll">
    <template #header>
      <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
        <h5 class="mb-2 md:m-0 p-as-md-center">Administrar Productos</h5>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <!-- <InputText v-model="filters['global'].value" placeholder="Search..." /> -->
        </span>
      </div>
    </template>

    <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
    <Column field="id" header="ID" :sortable="true" style="min-width:12rem"></Column>
    <Column field="nombre" header="Nombre" :sortable="true" style="min-width:16rem"></Column>
    <Column header="Image">
      <template #body="slotProps">
        <img :src="`http://127.0.0.1:8000/${slotProps.data.image}`" :alt="slotProps.data.image" class="product-image" />
      </template>
    </Column>
    <Column field="precio" header="Precio" :sortable="true" style="min-width:8rem">
      <!-- <template #body="slotProps">
        {{ formatCurrency(slotProps.data.precio) }}
      </template> -->
    </Column>
    <Column field="categoria_id" header="Categoria" :sortable="true" style="min-width:10rem"></Column>
    <!-- <Column field="rating" header="Reviews" :sortable="true" style="min-width:12rem">
      <template #body="slotProps">
        <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
      </template>
    </Column> -->
    <!-- <Column field="inventoryStatus" header="Status" :sortable="true" style="min-width:12rem">
      <template #body="slotProps">
        <span
          :class="'product-badge status-' + (slotProps.data.inventoryStatus ? slotProps.data.inventoryStatus.toLowerCase() : '')">{{
            slotProps.data.inventoryStatus
          }}</span>
      </template>
    </Column> -->
    <Column :exportable="false" style="min-width:8rem">
      <template #body="slotProps">
        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
          @click="editProduct(slotProps.data)" />
        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
          @click="confirmDeleteProduct(slotProps.data)" />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import * as productService from '@/services/producto.service'

export default {
  data() {
    return {
      productos: null,
      producto: {}
    }
  },
  async mounted() {
    const { data } = await productService.getProductos();
    // data.data solo trae los datos y los datos de la paginacion
    this.productos = data.data
  },
}
</script>

<style>

</style>