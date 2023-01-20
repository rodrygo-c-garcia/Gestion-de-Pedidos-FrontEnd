<template>
  <div>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
          <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected"
            :disabled="!selectedProducts || !selectedProducts.length" />
        </template>

        <template #end>
          <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
            class="mr-2 inline-block" />
          <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
        </template>
      </Toolbar>
      <DataTable ref="dt" :value="productos" v-model:selection="selectedProducts" dataKey="id" :paginator="true"
        :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
        <template #header>
          <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center">Manage Products</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="id" header="ID" :sortable="true" style="min-width:12rem"></Column>
        <Column field="nombre" header="Nombre" :sortable="true" style="min-width:16rem"></Column>
        <Column header="Image">
          <template #body="slotProps">
            <img v-if="slotProps.data.image" :src="`http://127.0.0.1:8000/${slotProps.data.image}`"
              :alt="slotProps.data.image" class="product-image" />
          </template>
        </Column>
        <Column field="precio" header="Precio" :sortable="true" style="min-width:8rem">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.precio) }}
          </template>
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
    </div>
  </div>
</template>

<script>
import * as productService from '@/services/producto.service'
import { FilterMatchMode } from 'primevue/api';

export default {
  data() {
    return {
      productos: null,
      producto: {},
      selectedProducts: null,
      filters: {},
    }
  },
  created() {
    this.initFilters();
  },
  async mounted() {
    const { data } = await productService.getProductos();
    // data.data solo trae los datos y los datos de la paginacion
    this.productos = data.data
  },
  methods: {
    formatCurrency(value) {
      if (value)
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      return;
    },
    initFilters() {
      this.filters = {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      }
    }, openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
    },
    confirmDeleteProduct(product) {
      this.product = product;
      this.deleteProductDialog = true;
    },
  }
}
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}

.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}
</style>