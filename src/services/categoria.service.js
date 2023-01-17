import { http, httpFile } from "./http.service";

const getCategorias = function () {
  return http().get(`/categoria`);
};

const postCategoria = function (data) {
  return http().post(`/categoria`, data);
};

const getCategoria = function (id) {
  return http().get(`/categoria/${id}`);
};

const putCategoria = function (id, data) {
  return http().put(`/categoria/${id}`, data);
};

const deleteCategoria = function (id) {
  return http().delete(`/categoria/${id}`);
};
