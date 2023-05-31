//import axios
import axios from 'axios'

// create axios
const request = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 拦截器

// axios请求拦截器
request.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
request.interceptors.response.use(res => res.data, e => {
  return Promise.reject(e)
})

// 导出axios实例
export default request