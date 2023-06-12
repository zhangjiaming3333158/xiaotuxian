import {ref, onMounted} from 'vue'
import { defineStore } from 'pinia'
import {loginAPI} from '@/apis/user.js'

export const useUserStore = defineStore('user',()=>{
  const userInfo = ref({})
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
  }
   // 退出时清除用户信息
   const clearUserInfo = () => {
    userInfo.value = {}
  }
  return{
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},{
  persist: true,
})