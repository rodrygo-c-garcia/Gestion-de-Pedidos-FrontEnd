// stores/counter.js
import { defineStore } from "pinia";

export const usePiniaStore = defineStore("store", {
  state: () => {
    return {
      count: 0,
      titulo: "Cambio de estado con PINIA",
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    incrementar() {
      this.count++;
    },
    decrementar() {
      this.count--;
    },
    changeMSJ(msg) {
      this.titulo = msg;
    },
  },
  getters: {
    parImpar: (state) => {
      return state.count % 2 === 0 ? "par" : "impar";
    },
  },
});

// import { createStore } from "vuex";

// export default createStore({
//   // los estados son los datos globales
//   state: {
//     mensaje: "Hello from Vuex",
//   },
//   mutations: {
//     cambioStateMsj(state, valor) {
//       state.mensaje = valor;
//     },
//   },
//   actions: {
//     // nuestro metodo accion recibe un contexto, que a su vez este va a llamar a cambioStateMsj
//     cambiarMsj(context, valor) {
//       context.commit("cambioStateMsj", valor);
//     },
//   },
//   modules: {},
//   // ayudan a capturar los estados
//   getters: {
//     // funcion
//     getMensaje(state) {
//       return state.mensaje;
//     },
//   },
// });
