//引入初始化样式
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入懒加载指令插件并且注册
import { lazyPlugin } from '@/directives'


const app = createApp(App)
app.use(lazyPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
