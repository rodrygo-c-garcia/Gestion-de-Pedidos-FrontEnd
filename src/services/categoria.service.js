import { http, httpFile } from "./http.service";

export const getCategorias = function () {
  return http().get(`/categoria`);
};

export const postCategoria = function (data) {
  return http().post(`/categoria`, data);
};

export const getCategoria = function (id) {
  return http().get(`/categoria/${id}`);
};

export const putCategoria = function (id, data) {
  return http().put(`/categoria/${id}`, data);
};

export const deleteCategoria = function (id) {
  return http().delete(`/categoria/${id}`);
};
