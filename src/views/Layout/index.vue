<script setup>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutFixed from '@/views/Layout/components/LayoutFixed.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'

import { useCategoryStore } from '@/stores/categoryStore'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()
onMounted(() => categoryStore.getCategory())
</script>

<template>
  <LayoutNav></LayoutNav>
  <LayoutFixed></LayoutFixed>
  <LayoutHeader></LayoutHeader>
  <main>
    <router-view></router-view>
  </main>
  <LayoutFooter></LayoutFooter>
</template>

<style>
</style>