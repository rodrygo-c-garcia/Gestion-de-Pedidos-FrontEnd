<template>
  <Toast position="top-right" />
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

      <DataTable ref="dt" :totalRecords="totalRecords" :loading="loading" @page="onPage($event)" :value="productos"
        :lazy="true" v-model:selection="selectedProducts" dataKey="id" :paginator="true" :rows="5" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
        <template #header>
          <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center">Lista de Productos</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="id" header="#" :sortable="true" style="min-width:12rem"></Column>
        <Column field="nombre" header="Nombre" :sortable="true" style="min-width:16rem"></Column>
        <Column header="Imagen">
          <template #body="slotProps">
            <img v-if="slotProps.data.imagen && slotProps.data.imagen !== '/imagenes'"
              :src="`http://127.0.0.1:8000${slotProps.data.imagen}`" :alt="slotProps.data.imagen"
              class="product-image" />
          </template>
        </Column>
        <Column field="precio" header="Precio" :sortable="true" style="min-width:8rem">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.precio) }}
          </template>
        </Column>
        <Column field="categoria.nombre" header="Categoria" :sortable="true" style="min-width:10rem"></Column>
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


    <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Añadir Nuevo Producto" :modal="true"
      class="p-fluid">
      <!-- <img :src="`http://127.0.0.1:8000/${producto.imagen}`" :alt="producto.imagen" class="product-image"
        v-if="producto.imagen" /> -->

      <div class="field">
        <label for="name">Nombre</label>
        <InputText id="name" v-model.trim="producto.nombre" required="true" autofocus
          :class="{ 'p-invalid': submitted && !producto.nombre }" />
        <small class="p-error" v-if="submitted && !producto.nombre">Name is required.</small>
      </div>

      <div class="field">
        <label for="img">Imagen</label>
        <!-- <FileUpload name="demo[]" @change="onImgSelected" url="https://www.primefaces.org/upload.php"
          @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="100000000"
          v-model="producto.imagen">
          <template #content>
            <ul v-if="uploadedFiles && uploadedFiles[0]">
              <li v-for="file of uploadedFiles[0]" :key="file">{{ file.name }} - {{ file.size }} bytes</li>
            </ul>
          </template>
          <template #empty>
            <p>Arrastrar y soltar archivos aquí para subir.</p>
          </template>
        </FileUpload> -->
        <input type="file" @change="onImgSelected" />
      </div>

      <div class="field">
        <label for="description">Descripcion</label>
        <Textarea id="description" v-model="producto.descripcion" required="true" rows="2" cols="20" />
      </div>


      <div class="field">
        <label class="mb-3">Estado</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton id="estado1" name="estado" :value="1" v-model="producto.estado" />
            <label for="estado1">Activo</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton id="estado2" name="estado" :value="0" v-model="producto.estado" />
            <label for="estado2">Inactivo</label>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="mb-3">Categoria</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6" v-for="(cat, index) in categorias" :key="index">
            <RadioButton id="category1" name="category" :value="cat.id" v-model="producto.categoria_id" />
            <label for="category1">{{ cat.nombre }}</label>
          </div>
        </div>
      </div>


      <div class="formgrid grid">
        <div class="field col">
          <label for="price">Precio</label>
          <InputNumber id="price" v-model="producto.precio" mode="currency" currency="USD" locale="en-US" />
        </div>
        <div class="field col">
          <label for="quantity">Stock</label>
          <InputNumber id="quantity" v-model="producto.stock" integeronly />
        </div>
      </div>

      <!-- <div class="field">
        <label for="inventoryStatus" class="mb-3">Inventory Status</label>
        <Dropdown id="inventoryStatus" v-model="producto.estado" :options="statuses" optionLabel="label"
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
      </div> -->

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
        <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
      </template>
    </Dialog>

  </div>
</template>

<script>
import * as productService from '@/services/producto.service'
import * as apiCategoria from '@/services/categoria.service';

import { FilterMatchMode } from 'primevue/api';

export default {
  data() {
    return {
      productos: null,
      producto: {
        imagen: ''
      },
      selectedProducts: null,
      filters: {},
      submitted: false,
      productDialog: false,
      statuses: [
        { label: 'ACTIVO', value: 1 },
        { label: 'INACTIVO', value: 0 },
      ],
      categorias: [],
      loading: false,
      totalRecords: 0,
      // es el proxy
      lazyParams: {},
      // para la imagen
      img_selected: null,
    }
  },
  created() {
    this.initFilters();
  },

  async mounted() {
    // atrapamos los errores que puede haver en la peticion de categorias
    try {
      const data_cat = await apiCategoria.getCategorias()
      this.categorias = data_cat.data
    } catch (e) {
      console.log(e.response.status)
      if (e.response.status == 401) this.$router.push({ name: 'login' })
    }
    this.lazyParams.page = 0
    this.lazyParams.rows = 5
    this.loadLazyData()
  },

  methods: {
    loadLazyData() {
      this.loading = true;
      console.log(this.lazyParams)
      // con lazyParams indicamos la pagina que queremos
      this.listarProductos(this.lazyParams.page + 1, this.lazyParams.rows)
    },
    async listarProductos(page, limit) {
      const { data } = await productService.getProductos(page, limit);
      // data.data solo trae los datos y los datos de la paginacion
      this.productos = data.data
      // capturamos el total de dataos retornados por laravel
      this.totalRecords = data.total
      console.log(data.total)
      console.log(this.productos)
      this.loading = false;
    },
    onPage(event) {
      this.lazyParams = event;
      this.loadLazyData();
    },
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
    async saveProduct() {
      this.submitted = true;

      if (this.producto.nombre.trim()) {
        if (this.producto.id) {
          this.producto.inventoryStatus = this.producto.inventoryStatus.value ? this.producto.inventoryStatus.value : this.producto.inventoryStatus;
          this.productos[this.findIndexById(this.producto.id)] = this.producto;
          this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }
        else {
          //this.producto.id = this.createId();
          // this.producto.code = this.createId();
          //this.producto.image = 'product-placeholder.svg';
          // this.producto.estado = this.producto.estado.value;
          await productService.postProducto(this.producto);
          this.productos.push(this.producto);
          this.$toast.add({ severity: 'success', summary: 'Producto Creado', detail: 'Revise la lista', life: 3000 });
        }

        this.productDialog = false;
        this.producto = {};
      }
    },
    onImgSelected(e) {
      console.log(e.target.files[0])
      this.producto.imagen = e.target.files[0]
    }
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