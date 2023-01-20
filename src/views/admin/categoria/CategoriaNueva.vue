<template>
  <div>
    <Card>
      <template #title>
        Categoria Nueva
      </template>
      <template #content>
        <div class="field col-5">
          <span class="p-float-label">
            <InputText id="nombre" type="text" v-model="categoria.nombre" />
            <label for="nombre">Ingrese Nombre</label>
          </span>
        </div>
        <div class="field col-5">
          <span class="p-float-label">
            <Textarea v-model="categoria.detalle" rows="5" cols="30" />
            <label for="nombre">Ingrese Detalle</label>
          </span>
        </div>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Save" @click="guardarCategoria()" />
        <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
      </template>
    </Card>
  </div>
</template>

<script>
import * as apiCategoria from '@/services/categoria.service';

export default {
  data() {
    return {
      categoria: {
        nombre: '',
        detalle: ''
      }
    }
  },
  mounted() {
    this.guardarCategoria()
  },
  methods: {
    async guardarCategoria() {
      try {
        await apiCategoria.postCategoria(this.categoria)
        this.$router.push({ name: 'Categorias' })
      } catch (e) {
        this.$toast.add({ severity: 'error', summary: 'Error al guardar', detail: 'Order submitted', life: 3000 });
      }
    }
  }
}
</script>

<style>

</style>