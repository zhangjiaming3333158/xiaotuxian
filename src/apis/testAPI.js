import request from '@/utils/http'

export const getCategory = () => {
  return request({
    url: 'home/category/head',
  })
}
