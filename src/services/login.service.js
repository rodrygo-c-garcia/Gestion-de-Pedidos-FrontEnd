import { http, httpFile } from "./http.service";

export function login(datos) {
  // datos (email, password)
  return http().post("/login", datos);
}
