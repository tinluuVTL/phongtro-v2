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
