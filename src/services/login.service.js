import axios from "axios";

export async function login() {
  return await axios.post("http://127.0.0.1:8000/api/login", datos);
}
