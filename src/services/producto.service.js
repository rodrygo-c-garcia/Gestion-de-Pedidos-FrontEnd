import { http, httpFile } from "./http.service";

export const getProductos = function (page, limit) {
  return http().get(`/producto?page=${page}&limit=${limit}`);
};

export const postProducto = function (data) {
  let formData = new FormData();

  return http().post(`/producto`, data);
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
