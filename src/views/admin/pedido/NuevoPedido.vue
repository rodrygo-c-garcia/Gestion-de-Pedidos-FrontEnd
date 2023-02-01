<template>

  <div class="grid">
    <!-- col-12 pantallas movil
    md:col-12 pantallas pc
    -->
    <div class="col-12 md:col-12 lg:col-12">
      <div class="card">
        <h1>Datos Pedido</h1>
      </div>
    </div>
    <div class="col-12 md:col-8 lg:col-7">
      <div class="card">
        <h2>Lista Prductos</h2>
      </div>
    </div>
    <div class="col-12 md:col-4 lg:col-5">
      <div class="card">
        <h2>Carrito</h2>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    dispatchMsj() {
      // el dispatch rescibe como argumento una funcion 'cambiarMsj' que seria nuestra accion en vuex
      this.$store.dispatch('cambiarMsj', this.msg)
    }
  }

}
</script>

<style>

</style>