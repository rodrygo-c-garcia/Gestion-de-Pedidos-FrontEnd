import { http, httpFile } from "./http.service";

export async function login(datos) {
  // datos (email, password)
  return http().post("/login", datos);
}
