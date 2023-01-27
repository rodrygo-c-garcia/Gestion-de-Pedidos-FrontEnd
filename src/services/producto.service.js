import { http, httpFile } from "./http.service";

export const getProductos = function (page, limit) {
  return http().get(`/producto?page=${page}&limit=${limit}`);
};

export const postProducto = function (producto) {
  let formData = new FormData();

  formData.append("nombre", producto.nombre);
  formData.append("precio", producto.precio);
  formData.append("stock", producto.stock);
  formData.append("descripcion", producto.descripcion);
  formData.append("categoria_id", producto.categoria_id);
  formData.append("estado", producto.estado);
  // preguntamos si producto imagen existe
  if (producto.imagen) formData.append("imagen", producto.imagen);

  return http().post(`/producto`, formData);
};

export const getProducto = function (id) {
  return http().get(`/producto/${id}`);
};

export const putProducto = function (id, data) {
  return http().put(`/producto/${id}`, data);
};

export const deleteProducto = function (id) {
  return http().delete(`/producto/${id}`);
};
