<template>
  <h1>Estas en la lista de Categorias</h1>
  <h2>Lista de Categorias</h2>
  <h3> {{ categorias }}</h3>

  <Button label="Categoria Nueva" icon="pi pi-check" />

  <DataTable :value="categorias" stripedRows responsiveLayout="scroll">
    <Column field="id" header="ID"></Column>
    <Column field="nombre" header="NOMBRE"></Column>
    <Column field="detalle" header="DETALLE"></Column>
    <Column field="created_a" header="FECHA DE CREACION"></Column>
  </DataTable>
</template>

<script>
import * as apiCategoria from '@/services/categoria.service';

export default {
  data() {
    return {
      categorias: []
    }
  },

  mounted() {
    this.listarCategorias()
  },
  methods: {
    async listarCategorias() {
      const { data } = await apiCategoria.getCategorias()
      this.categorias = data
    }
  }
}
</script>

<style>

</style>