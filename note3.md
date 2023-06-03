# 6_1
  1.图片懒加载(directive),main引入 
  2.获取params参数 
  ```vue
  <script setup>
    import { useRouter } from 'vue-router'
    const route = useRouter()
    console.log(route.currentRoute.value.params.id)
  </script>
  ```
  p44

# 6_2
  # 1.路由跳转显示 active-class="active"
  ```vue
  <RouterLink active-class="active" :to="`/category/${item.id}`">
  ```

  # 2.路由缓存
    1.全部销毁重新渲染  <RouterView :key="$route.fullPath" />
    2.监听路由精细渲染  
    ```vue
    import { onBeforeRouteUpdate } from 'vue-router'
    onBeforeRouteUpdate((to) => {
    // 存在问题：使用最新的路由参数请求最新的分类数据
      getCategory(to.params.id)
    })
    ```
  # 3.基于业务逻辑的函数拆分  useCategory.js/useBanner.js

  # 4.srcoll 页面滚动加载 elementUI-plus
    ```vue
    <ul
      v-infinite-scroll="load" 
      class="list"
      :infinite-scroll-disabled="disabled"
    >
    //load       函数加载数据
    //disabled   函数停止加载数据
    ```
  # 5.路由行为滚动返回顶部 router index.js
    ```vue
    scrollBehavior() {
      return { top: 0 }
    }
    ```
  54

