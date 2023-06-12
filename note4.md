# 6.4
  ## 1.异步请求数据渲染 
    v-if="detail"用来渲染数据  (Detail/index.vue)
    p64

  ## 登录
    1.表单验证
    2.token (utils/http.js)
    3.pinia持久化缓存保存token  main.js
    ```
    npm i pinia-plugin-persistedstate
    ```
    ```vue
    //pinia持久化插件
      import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
      const pinia = createPinia()
      pinia.use(piniaPluginPersistedstate)
    ```
    4.token失效处理跳转 http.js

# 6.12
  ## 1.splice(a,b) 
    选取以a开始b个单位
  ## 2.reduce 
    ```vue 
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    ```
    reduce 是数组的高阶函数，用于迭代处理每个元素并返回一个累积值。
    在reduce的回调函数中，a表示累积值，c表示当前遍历的元素。
    0 是reduce方法的初始累积值。
  ## 3. 购物车功能基本实现