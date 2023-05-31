# 5.31
  pinia
  # 1.
  ## stores/count.js

  ```vue
    <script>
    //导入
    import { defineStore } from 'pinia'
    import { ref } from 'vue'
    //const一个对象接受定义的store
    export const useCounter = defineStore('counter', () => {
      //1.定义数据state
      const count = ref(0)
      //2.定义方法action
      const setCount = () => {
        count.value++
      }
      //3. 定义计算属性getter
      const doubleCount = computed(() => count.value * 2)
      //以对象方式return数据
      return {
        count,
        setCount,
      }   
    )
  ```
  
  ## App.vue 
  ```vue
    <script>
    //导入方法  注意{}接受
    import { useCounter } from './stores/count.js'
    //实例化对象   注意()
    const counter = useCounter()
    console.log(useCounter);
    </script>

    <template>
      <div class="app-container">
        <button @click="counter.setCount">{{ counter.count }}</button>
      </div>
    </template>

    <style scoped>
    </style>
  ```


  # 2
  结构
  ```vue
<script setup>
  //导入方法
  import { useCounter } from './stores/count.js'
  import { storeToRefs } from 'pinia';
  //实例化对象
  const counter = useCounter()
  console.log(counter)
  //数据结构
  const { count, doubleCount } = storeToRefs(counter)
  //方法结构
  const { setCount } = counter
</script>

<template>
  <div class="app-container">
    <button @click="setCount">{{ count }}</button>
    <button>{{ doubleCount }}</button>
  </div>
</template>
  ```