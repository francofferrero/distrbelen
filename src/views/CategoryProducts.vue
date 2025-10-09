<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'

const route = useRoute()
const store = useProductsStore()

onMounted(() => {
  store.fetchProducts()
})

const categoryProducts = computed(() => {
  const categoryId = parseInt(route.params.id)

  return store.products.filter(product =>
    product.categories?.some(cat => cat.id === categoryId)
  )
})

const categoryName = computed(() => {
  const categoryId = parseInt(route.params.id)
  const cat = store.categories.find(c => c.id === categoryId)
  return cat?.name?.es || cat?.name || 'Categoría'
})

</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">{{ categoryName }}</h1>

    <div v-if="categoryProducts.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="p in categoryProducts" :key="p.id" class="p-4 border rounded shadow hover:shadow-lg transition">
        <img
          :src="p.images?.[0]?.src"
          alt="Imagen del producto"
          class="w-full h-40 object-contain mb-2"
        />
        <h2 class="font-semibold text-lg">{{ p.name?.es || p.name }}</h2>
      </div>
    </div>

    <div v-else class="text-gray-500">
      No hay productos en esta categoría.
    </div>
  </div>
</template>
