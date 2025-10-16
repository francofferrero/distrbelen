<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onBeforeMount } from 'vue'
import { useProductsStore } from '@/stores/products'
import Panel from 'primevue/panel'

const route = useRoute()
const router = useRouter()

const productsStore = useProductsStore()
const product = ref(null)

onBeforeMount(async () => {
  productsStore.getProductById(route.params.id)
  product.value = productsStore.selectedProduct
})

const getCategoryNames = (product) => {
  if (!product || !product.categories?.length) return []

  const names = product.categories.map((category) => {
    return category.name?.es || category.name || 'Categoría sin nombre'
  })

  return names
}

const goBack = () => {
  router.back()
}

</script>

<template>
  <Panel>
    <div
      class="p-6 w-[90vw] max-w-screen-lg mx-auto bg-white rounded-xl shadow-md flex flex-col items-center"
    >
      <div v-if="product" class="flex flex-col items-center text-center w-full">
        <img
          :src="product.images?.[0]?.src"
          alt="Product Image"
          class="w-full max-h-[75vh] object-contain my-4"
        />

        <h2 class="text-2xl font-bold mb-4">{{ product.name?.es || product.name }}</h2>

        <!-- Categorías -->
        <ul class="mt-2 text-lg text-gray-600">
          <li v-for="(catName, i) in getCategoryNames(product)" :key="`category-${i}`">
            {{ catName }}
          </li>
        </ul>
      </div>

      <div v-else>
        <p class="text-red-500">No se encontró el producto en memoria</p>
      </div>

      <button
        @click="goBack"
        class="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        Volver
      </button>
    </div>
  </Panel>
</template>
