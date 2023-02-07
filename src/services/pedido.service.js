import { http, httpFile } from "./http.service";

export const getPedidos = function () {
  return http().get(`/pedido`);
};

export const postPedido = function (data) {
  return http().post(`/pedido`, data);
};

export const getPedido = function (id) {
  return http().get(`/pedido/${id}`);
};

export const putPedido = function (id, data) {
  return http().put(`/pedido/${id}`, data);
};

export const deletePedido = function (id) {
  return http().delete(`/pedido/${id}`);
};
