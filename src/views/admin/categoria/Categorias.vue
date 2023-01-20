<template>
  <h1>Estas en la lista de Categorias</h1>
  <h2>Lista de Categorias</h2>
  <ConfirmDialog></ConfirmDialog>

  <Button label="Categoria Nueva" icon="pi pi-check" />

  <DataTable :value="categorias" stripedRows responsiveLayout="scroll">
    <Column field="id" header="ID"></Column>
    <Column field="nombre" header="NOMBRE"></Column>
    <Column field="detalle" header="DETALLE"></Column>
    <Column field="created_at" header="FECHA DE CREACION"></Column>
    <Column :exportable="false" style="min-width:8rem">
      <template #body="slotProps">
        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
          @click="editDialogCategoria(slotProps.data)" />
        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
          @click="eliminarDialogCategoria(slotProps.data)" />
      </template>
    </Column>
  </DataTable>
  <Dialog modal="Editar Categoria" v-model:visible="display">
    <Card>
      <template #title>
        Editar Categoria
      </template>
      <template #content>
        <div class="field col-10">
          <span class="p-float-label">
            <InputText id="nombre" type="text" v-model="categoria.nombre" />
            <label for="nombre">Ingrese Nombre Nuevo</label>
          </span>
        </div>
        <div class="field col-10">
          <span class="p-float-label">
            <Textarea v-model="categoria.detalle" rows="5" cols="30" />
            <label for="nombre">Ingrese Detalle Nuevo</label>
          </span>
        </div>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Save" @click="modificarCategoria()" />
        <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
      </template>
    </Card>
  </Dialog>
</template>

<script>
import * as apiCategoria from '@/services/categoria.service';

export default {
  data() {
    return {
      categorias: [],
      display: false,
      categoria: {}
    }
  },

  mounted() {
    this.listarCategorias()
  },
  methods: {
    async listarCategorias() {
      const { data } = await apiCategoria.getCategorias()
      this.categorias = data
    },
    editDialogCategoria(data) {
      this.display = true
      this.categoria = data
    },
    async modificarCategoria() {
      await apiCategoria.putCategoria(this.categoria.id, this.categoria)
    },
    eliminarDialogCategoria(data) {
      this.$confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.eliminarCategoria(data.id)
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
      });
    },
    async eliminarCategoria(id) {
      await apiCategoria.deleteCategoria(id)
      this.listarCategorias()
    }
  }
}
</script>

<style>

</style>