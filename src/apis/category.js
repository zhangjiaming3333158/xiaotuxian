import request from '@/utils/http.js'

export const getCategoryAPI = (id) => {
  return request({
    url: '/category',
    params: { id },
  })
}
