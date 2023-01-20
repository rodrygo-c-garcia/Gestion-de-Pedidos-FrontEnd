// Para configurar nuestras peticiones globalmente
import axios from "axios";

// formamos el axios para que se conecte a la API
export function http() {
  // configuracion global de nuestra endpoint
  return axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer 21|2Payqfpo1DOovfdAo1deAnoA4CqkkHPTuMKO0HZS",
    },
  });
}

// Para archivos
export function httpFile() {
  // configuracion global de nuestra endpoint
  return axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
}

// Clase 18
