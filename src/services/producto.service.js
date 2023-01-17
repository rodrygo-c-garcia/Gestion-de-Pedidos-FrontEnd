import { http, httpFile } from "./http.service";

export const getProductos = function () {
  return http().get(`/producto`);
};

export const postProducto = function (data) {
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
