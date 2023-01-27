<template>
  <div class="card">
    <h1>Nuevo Pedido</h1>
    <h2> {{ $store.state.mensaje }}</h2>
    <h3>Get - {{ $store.getters.getMensaje }}</h3>

    <input type="text" v-model="msg">
    <button @click="dispatchMsj">Cambiar MSJ</button>
  </div>
</template>

<script>
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