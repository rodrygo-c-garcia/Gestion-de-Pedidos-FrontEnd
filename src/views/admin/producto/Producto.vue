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
            <img v-if="slotProps.data.imagen" :src="`http://127.0.0.1:8000/${slotProps.data.image}`"
              :alt="slotProps.data.imagen" class="product-image" />
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

  <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Editar Producto" :modal="true"
    class="p-fluid">
    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="product.image"
      class="product-image" v-if="producto.imagen" />
    <div class="field">
      <label for="name">Nombre</label>
      <InputText id="name" v-model.trim="producto.nombre" required="true" autofocus
        :class="{ 'p-invalid': submitted && !product.name }" />
      <small class="p-error" v-if="submitted && !producto.nombre">El nombre es requerido.</small>
    </div>

    <div class="field">
      <label for="description">Descripcion del Producto</label>
      <Textarea id="description" v-model="producto.description" required="true" rows="3" cols="20" />
    </div>

    <div class="field">
      <label for="inventoryStatus" class="mb-3">Inventory Status</label>
      <Dropdown id="inventoryStatus" v-model="producto.inventoryStatus" :options="statuses" optionLabel="label"
        placeholder="Select a Status">
        <template #value="slotProps">
          <div v-if="slotProps.value && slotProps.value.value">
            <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
          </div>
          <div v-else-if="slotProps.value && !slotProps.value.value">
            <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
      </Dropdown>
    </div>

    <div class="field">
      <label class="mb-3">Category</label>
      <div class="formgrid grid">
        <div class="field-radiobutton col-6">
          <RadioButton id="category1" name="category" value="Accessories" v-model="producto.category" />
          <label for="category1">Accessories</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton id="category2" name="category" value="Clothing" v-model="producto.category" />
          <label for="category2">Clothing</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton id="category3" name="category" value="Electronics" v-model="producto.category" />
          <label for="category3">Electronics</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton id="category4" name="category" value="Fitness" v-model="producto.category" />
          <label for="category4">Fitness</label>
        </div>
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col">
        <label for="price">Price</label>
        <InputNumber id="price" v-model="producto.price" mode="currency" currency="USD" locale="en-US" />
      </div>
      <div class="field col">
        <label for="quantity">Quantity</label>
        <InputNumber id="quantity" v-model="producto.quantity" integeronly />
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
      <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
    </template>
  </Dialog>
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
      submitted: false,
      statuses: [
        { label: 'ACTIVO', value: 1 },
        { label: 'INACTIVO', value: 0 },
      ],
      productDialog: false,

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
      this.producto = {};
      this.submitted = false;
      this.productDialog = true;
    },
    confirmDeleteSelected() {
      this.deleteProductsDialog = true;
    },
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
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