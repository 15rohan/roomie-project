import axios from 'axios'

export const axiosInstance=axios.create();

axiosInstance.defaults.headers.common["Accept"] = "application/json"
axiosInstance.defaults.headers.common["Content-Type"] = "application/json"
