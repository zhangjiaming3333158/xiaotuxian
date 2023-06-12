// 封装购物车模块

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
import { useUserStore } from './userStore'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 依赖userStore
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 1. 定义state - cartList
    const cartList = ref([])
    // 2. 定义action - getCartList
    const updateNewList = async () => {
      const res = await findNewCartListAPI()
      cartList.value = res.result
      console.log('cartList', cartList.value)
    }
    // 2. 定义action - addCart
    const addCart = async (goods) => {
      const { skuId, count } = goods
      if (isLogin.value) {
        // 登录之后的加入购车逻辑
        await insertCartAPI({ skuId, count })
        updateNewList()
      } else {
        // 添加购物车操作
        // 已添加过 - count + 1
        // 没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          // 找到了
          item.count++
        } else {
          // 没找到
          cartList.value.push(goods)
        }
      }
    }
    // 删除购物车
    const delCart = async (skuId) => {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }

    // 全选功能
    const allCheck = (selected) => {
      // 把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected))
    }
    //计算总数量
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    )
    //计算总价格
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.price * c.count, 0)
    )
    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    // 3. 已选择数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    )
    // 4. 已选择商品价钱合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    )

    return {
      cartList,
      allCount,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice,
      singleCheck,
      allCheck,
      updateNewList,
      addCart,
      delCart,
    }
  },
  {
    persist: true,
  }
)
