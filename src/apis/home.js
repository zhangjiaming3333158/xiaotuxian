import request from '@/utils/http.js'

//banner
export const getBannerAPI = (params = {}) => {
  const { distributionSite = '1' } = params
  return request({
    url: '/home/banner',
    params: {
      distributionSite,
    },
  })
}

//new
export const getNewAPI = () => {
  return request({
    url: '/home/new',
  })
}

//hot
export const getHotAPI = () => {
  return request({
    url: '/home/hot',
  })
}

//goods
export const getGoodsAPI = () => {
  return request({
    url: '/home/goods'
  })
}
