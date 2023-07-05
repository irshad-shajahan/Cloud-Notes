import axios from 'axios'

const baseURL = 'http://localhost:8080'

const axiosInstance=  axios.create({
    baseURL,
    withCredentials:true
})

axiosInstance.interceptors.request.use(async req => {

   const token = localStorage.getItem('token')
        req.headers.Authorization = `Bearer ${token}`
    return req
})

export default axiosInstance