import axios from 'axios'

const token= localStorage.getItem('token')

export const axiosInstance=axios.create({
    baseURL:'http://localhost:8080/'
});

axiosInstance.defaults.headers.common["Accept"] = "application/json"
axiosInstance.defaults.headers.common["Content-Type"] = "application/json"

axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

