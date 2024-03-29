import axios from "../axios"

export const apiValidatePhoneNumber = (data) =>
  axios({
    url: "/user/validate-phonenumber",
    method: "post",
    data,
  })
export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
  })
export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  })
export const apiGetCurrent = () =>
  axios({
    url: "/user/current",
    method: "get",
  })
export const apiUpdateProfile = (data) =>
  axios({
    url: "/user/profile",
    method: "patch",
    data,
  })
export const apiGetUsersByManager = (params) =>
  axios({
    url: "/user/manager",
    method: "get",
    params,
  })
export const apiUpgradeToManager = () =>
  axios({
    url: "/user/utm",
    method: "patch",
  })
export const apiGetUsersByAdmin = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  })
export const apiGetCustomers = (params) =>
  axios({
    url: "/user/customer",
    method: "get",
    params,
  })
export const apiUpdateUser = (id, data) =>
  axios({
    url: "/user/update/" + id,
    method: "patch",
    data,
  })
export const apiDeleteUser = (id) =>
  axios({
    url: "/user/" + id,
    method: "delete",
  })
