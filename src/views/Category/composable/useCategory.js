import { ref, onMounted } from 'vue'
import { getCategoryAPI } from '@/apis/category.js'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  const route = useRouter()
  const categoryData = ref({})
  const getCategory = async (id = route.currentRoute.value.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }

  onBeforeRouteUpdate((to) => {
    // 存在问题：使用最新的路由参数请求最新的分类数据
    getCategory(to.params.id)
  })

  onMounted(() => {
    getCategory()
  })
  
  return {
    categoryData,
  }
}
