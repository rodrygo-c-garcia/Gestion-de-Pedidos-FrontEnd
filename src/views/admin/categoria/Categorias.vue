<template>
  <h1>Estas en la lista de Categorias</h1>
  <h2>Lista de Categorias</h2>
  <h3> {{ categorias }}</h3>
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