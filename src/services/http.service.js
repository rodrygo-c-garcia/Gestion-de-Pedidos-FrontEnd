// Para configurar nuestras peticiones globalmente
import axios from "axios";
import { url_base } from "@/config/index.html";

// formamos el axios para que se conecte a la API
export function http() {
  let tonken64 = localStorage.getItem("token");
  let token = Buffer.from(tonken64, "base64").toString("ascii");

  // configuracion global de nuestra endpoint
  const interceptor = axios.create({
    baseURL: url_base,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token,
    },
  });

  // verificar errores ()
  return interceptor;
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
