import { createStore } from "vuex";

export default createStore({
  // los estados son los datos globales
  state: {
    mensaje: "Hello from Vuex",
  },
  mutations: {
    cambioStateMsj(state, valor) {
      state.mensaje = valor;
    },
  },
  actions: {
    // nuestro metodo accion recibe un contexto, que a su vez este va a llamar a cambioStateMsj
    cambiarMsj(context, valor) {
      context.commit("cambioStateMsj", valor);
    },
  },
  modules: {},
  // ayudan a capturar los estados
  getters: {
    // funcion
    getMensaje(state) {
      return state.mensaje;
    },
  },
});
