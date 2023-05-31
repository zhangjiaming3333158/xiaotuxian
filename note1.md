# 5.29    1)setup(){ //setup中的数据和方法需要return才能是用 return{} }
        2)setup(){ //setup中的this为undefined }
        3)语法糖 <script setup> //无需return </script> 
        4)响应式对象  <script setup>
                      //导入函数
                      import {reactive} from 'vue'  
                      //执行函数 传入一个对象类型参数
                      const state = reactive({
                        count:0
                      }) 
                      const setCount = () => {
                        state.count++
                      }
                    </script> 
        5)ref函数    <script setup>
                      //导入函数
                      import {ref} from 'vue'  
                      //执行函数 传入一个[简单+对象]类型参数
                      const count = ref(0)
                      const setCount = () => {
                        count.valeu++
                      }
                    </script> 
        6)computed函数 <script setup>
                        //导入函数
                        import {computed} from 'vue'  
                        import {ref} from 'vue'  
                        //执行函数 传入一个[简单+对象]类型参数
                        const list = ref([1,2,3])
                        const computedList = computed(() => {
                          list.value.filter(item=>item>2)
                        })
                      </script> 

# 5.30
  # 组合式API - watch
  > 侦听一个或者多个数据的变化，数据变化时执行回调函数，俩个额外参数 immediate控制立刻执行，deep开启深度侦听


  ## 1. 侦听单个数据
  ```vue
  <script setup>
    // 1. 导入watch
    import { ref, watch } from 'vue'
    const count = ref(0)
    // 2. 调用watch 侦听变化
    watch(count, (newValue, oldValue)=>{
      console.log(`count发生了变化，老值为${oldValue},新值为${newValue}`)
    })
  </script>
  ```
  ## 2. 侦听多个数据
  > 侦听多个数据，第一个参数可以改写成数组的写法

  ```vue
  <script setup>
    // 1. 导入watch
    import { ref, watch } from 'vue'
    const count = ref(0)
    const name = ref('cp')
    // 2. 调用watch 侦听变化
    watch([count, name], ([newCount, newName],[oldCount,oldName])=>{
      console.log('count或者name变化了，'[newCount, newName],[oldCount,oldName])
    })
  </script>
  ```
  ## 3. immediate
  > 在侦听器创建时立即出发回调，响应式数据变化之后继续执行回调


  ```vue
  <script setup>
    // 1. 导入watch
    import { ref, watch } from 'vue'
    const count = ref(0)
    // 2. 调用watch 侦听变化
    watch(count, (newValue, oldValue)=>{
      console.log(`count发生了变化，老值为${oldValue},新值为${newValue}`)
    },{
      immediate: true
    })
  </script>
  ```
  ## 4. deep
  > 通过watch监听的ref对象默认是浅层侦听的，直接修改嵌套的对象属性不会触发回调执行，需要开启deep

  ```vue
  <script setup>
    // 1. 导入watch
    import { ref, watch } from 'vue'
    const state = ref({ count: 0 })
    // 2. 监听对象state
    watch(state, ()=>{
      console.log('数据变化了')
    })
    const changeStateByCount = ()=>{
      // 直接修改不会引发回调执行
      state.value.count++
    }
  </script>

  <script setup>
    // 1. 导入watch
    import { ref, watch } from 'vue'
    const state = ref({ count: 0 })
    // 2. 监听对象state 并开启deep
    watch(state, ()=>{
      console.log('数据变化了')
    },{deep:true})
    const changeStateByCount = ()=>{
      // 此时修改可以触发回调
      state.value.count++
    }
  </script>

  ```
  # 组合式API - 生命周期函数

  ## 1. 选项式对比组合式
  ![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678183720098-4d40e806-bc0d-4c38-bcbe-9aed440f6b23.png#averageHue=%23cdd7e8&clientId=ud0819acc-4d21-4&from=paste&height=554&id=uc176ffaf&name=image.png&originHeight=1108&originWidth=2190&originalType=binary&ratio=2&rotation=0&showTitle=false&size=261737&status=done&style=none&taskId=u64291cff-e1f5-4709-ba14-700b20d39e8&title=&width=1095)

  ## 2. 生命周期函数基本使用
  > 1. 导入生命周期函数
  > 2. 执行生命周期函数，传入回调
  ```vue
  <scirpt setup>
  import { onMounted } from 'vue'
  onMounted(()=>{
    // 自定义逻辑
  })
  </script>
  ```
  
  ## 3. 执行多次
  > 生命周期函数执行多次的时候，会按照顺序依次执行

  ```vue
  <scirpt setup>
  import { onMounted } from 'vue'
  onMounted(()=>{
    // 自定义逻辑
  })

  onMounted(()=>{
    // 自定义逻辑
  })
  </script>
  ```
  # 组合式API - 父子通信
  ### 1. 父传子
  > 基本思想
  > 1. 父组件中给子组件绑定属性
  > 2. 子组件内部通过props选项接收数据


  ### 2. 子传父
  > 基本思想
  > 1. 父组件中给子组件标签通过@绑定事件
  > 2. 子组件内部通过 emit 方法触发事件

  # 组合式API - 模版引用
  > 概念：通过 ref标识 获取真实的 dom对象或者组件实例对象

  ## 1. 基本使用
  > 实现步骤：
  > 1. 调用ref函数生成一个ref对象
  > 2. 通过ref标识绑定ref对象到标签


  > 默认情况下在 <script setup>语法糖下组件内部的属性和方法是不开放给父组件访问的，可以通过defineExpose编译宏指定哪些属性和方法容许访问
  > 说明：指定testMessage属性可以被访问到

  # 组合式API - provide和inject
  ## 1. 作用和场景
  > 顶层组件向任意的底层组件传递数据和方法，实现跨层组件通信



  ## 2. 跨层传递普通数据
  > 实现步骤
  > 1. 顶层组件通过 `provide` 函数提供数据
  > 2. 底层组件通过 `inject` 函数提供数据


  ## 3. 跨层传递响应式数据
  > 在调用provide函数时，第二个参数设置为ref对象


  ## 4. 跨层传递方法
  > 顶层组件可以向底层组件传递方法，底层组件调用方法修改顶层组件的数据

  # 综合案例
  ## 1. 项目地址
  ```bash
  git clone  http://git.itcast.cn/heimaqianduan/vue3-basic-project.git
  ```
  ## 2. 项目说明

  1. 模版已经配置好了案例必须的安装包
  2. 案例用到的接口在 README.MD文件 中
  3. 案例项目有俩个分支，main主分支为开发分支，complete分支为完成版分支供开发完参考

