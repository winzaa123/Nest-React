import http from "../http-common";

export const getAll = () => {
  return http.get("/product/search");
};

export const get = (id : string) => {
  return http.get(`/product/${id}`);
};

export const create = (data : any) => {
  return http.post("/product", data);
};

export const update = (id : string, data : any) => {
  return http.patch(`/product/${id}`, data);
};

export const remove = (id :any) => {
  return http.delete(`/product/${id}`);
};

// export const removeAll = () => {
//   return http.delete(`/product`);
// };

// export const findByTitle = (title  : string) => {
//   return http.get(`/product?name=${title}`);
// };

const service = {
  getAll,
  get,
  create,
  update,
  remove,
  // removeAll,
  // findByTitle
};
export default service
