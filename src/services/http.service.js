import Buffer from "buffer";

// Para configurar nuestras peticiones globalmente
import axios from "axios";
import { url_base } from "@/config/index.js";

// formamos el axios para que se conecte a la API
export function http() {
  let token = "";
  try {
    token = window.atob(localStorage.getItem("token"));
  } catch (e) {}

  // configuracion global de nuestra endpoint
  const interceptor = axios.create({
    baseURL: url_base,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
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
      // Redireccionamos al login en caso de errores de no autenticacion
      window.location.href = "/login";
      // redireccionamos al login cuando hay un error
      return Promise.reject(error);
      //router.push("/login");
    }
  );
  return interceptor;
}

// Para archivos
export function httpFile() {
  // configuracion global de nuestra endpoint
  return axios.create({
    baseURL: url_base,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
}

// Clase 18
