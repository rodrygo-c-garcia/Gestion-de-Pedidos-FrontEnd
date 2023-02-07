import { http, httpFile } from "./http.service";

export const getClientes = function (id_ci_nit) {
  return http().get(`/cliente?search=${id_ci_nit}`);
};

export const postCliente = function (data) {
  return http().post(`/cliente`, data);
};

export const getCliente = function (id) {
  return http().get(`/cliente/${id}`);
};

export const putCliente = function (id, data) {
  return http().put(`/cliente/${id}`, data);
};

export const deleteCliente = function (id) {
  return http().delete(`/cliente/${id}`);
};
