import axiosInstance from "./axios";

export function getdata(route) {
  return axiosInstance.get(route, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
}
export function postForm(route, data) {
  return axiosInstance.post(route, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
}
