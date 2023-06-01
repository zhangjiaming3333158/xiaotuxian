import request from "@/utils/http"

export function getCategoryAPI () {
  return request({
    url: '/home/category/head'
  })
}