// Para configurar nuestras peticiones globalmente
import axios from "axios";
import { url_base } from "@/config/index.js";
import router from "@/router";

// formamos el axios para que se conecte a la API
export function http() {
  let token = "";
  try {
    let tonken64 = localStorage.getItem("token");
    let token = Buffer.from(tonken64, "base64").toString("ascii");
  } catch (e) {}

  // configuracion global de nuestra endpoint
  const interceptor = axios.create({
    baseURL: url_base,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer" + token,
    },
  });

  // verificar errores antes de realizar cualquier otra peticion
  interceptor.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //limipiamos el localStorage
      localStorage.clear();
      // redireccionamos al login cuando hay un error
      //router.push("/login");
      return Promise.reject(error);
    }
  );
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
