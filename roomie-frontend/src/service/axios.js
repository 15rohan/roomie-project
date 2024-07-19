import axios from 'axios'

export const axiosInstance=axios.create({
    baseURL:'http://localhost:8080/'
});

axiosInstance.defaults.headers.common["Accept"] = "application/json"
axiosInstance.defaults.headers.common["Content-Type"] = "application/json"

axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  })

