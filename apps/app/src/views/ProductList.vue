<script setup>
import { computed, watch, ref } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useRouter, useRoute } from 'vue-router'
import ProgressSpinner from 'primevue/progressspinner'
import Panel from 'primevue/panel'

// --- Stores & router ---
const productsStore = useProductsStore()
const router = useRouter()
const route = useRoute()

// --- Reactivity ---
const loading = computed(() => productsStore.loading)
const error = computed(() => productsStore.error)
const products = computed(() => productsStore.products)
const categories = computed(() => productsStore.categories)
const searchQuery = computed(() => productsStore.searchQuery)

const categoryId = ref(route.params.id ? Number(route.params.id) : null)

// --- Watch route param ---
watch(
  () => route.params.id,
  newId => {
    categoryId.value = newId ? Number(newId) : null
    productsStore.searchQuery = ''
  }
)

// --- Aux functions for categories ---
const mapCategoryForStore = (cat, allCategories) => {
  const allIds = [cat.id]
  if (cat.subcategories?.length) {
    const items = cat.subcategories
      .map(id => allCategories.find(c => c.id === id))
      .filter(Boolean)
      .map(sub => {
        const mapped = mapCategoryForStore(sub, allCategories)
        allIds.push(...mapped.allIds)
        return mapped
      })
    return { ...cat, items, allIds }
  }
  return { ...cat, items: [], allIds }
}

const findCategoryById = (categories, id) => {
  for (const cat of categories) {
    if (cat.id === id) return cat
    if (cat.items?.length) {
      const found = findCategoryById(cat.items, id)
      if (found) return found
    }
  }
  return null
}

// --- Products by category ---
const displayedProducts = computed(() => {
  if (!categoryId.value) return products.value

  const rootCategories = categories.value
    .filter(c => !c.parent)
    .map(c => mapCategoryForStore(c, categories.value))

  const selected = findCategoryById(rootCategories, categoryId.value)
  const allCatIds = selected?.allIds || [categoryId.value]

  return products.value.filter(p =>
    p.categories?.some(cat => allCatIds.includes(cat.id))
  )
})

// --- Filter by search ---
const filteredProducts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return displayedProducts.value

  return displayedProducts.value.filter(p => {
    let name = ''
    if (p.name) {
      if (typeof p.name === 'string') name = p.name
      else if (typeof p.name === 'object' && p.name.es) name = p.name.es
      else name = String(p.name) // fallback seguro
    }
    return name.toLowerCase().includes(q)
  })
})

// --- Navigation ---
const categoryName = computed(() => {
  if (!categoryId.value) return 'Productos'
  const cat = categories.value.find(c => c.id === categoryId.value)
  return cat?.name?.es || 'Categoría'
})

const viewProduct = product => {
  router.push({ name: 'ProductDetail', params: { id: product.id } })
}
</script>

<template>
  <div>
    <Panel>
      <!-- Loading -->
      <div v-if="loading" class="flex justify-center mt-8">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="text-center text-red-600 font-semibold text-lg p-5 border border-red-300 bg-red-50 mt-4 rounded-lg"
      >
        ¡Ocurrió un error al cargar los productos!<br />
        {{ error }}
      </div>

      <!-- Productos -->
      <div v-else>
        <!-- Header: título -->
        <div class="mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <h1 class="text-2xl font-bold">{{ categoryName }}</h1>
        </div>

        <!-- Lista de productos -->
        <div
          v-if="filteredProducts.length"
          class="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          <div
            v-for="p in filteredProducts"
            :key="p.id"
            class="p-4 border rounded shadow hover:shadow-lg transition cursor-pointer"
            @click="viewProduct(p)"
          >
            <img
              :src="p.images?.[0]?.src"
              alt="Imagen del producto"
              class="w-full h-40 object-contain mb-2"
            />
            <h2 class="font-semibold text-lg truncate">
              {{ p.name?.es || p.name }}
            </h2>
          </div>
        </div>

        <!-- No products -->
        <div v-else class="text-gray-500 text-center py-6">
          No hay productos que coincidan con la búsqueda.
        </div>
      </div>
    </Panel>
  </div>
</template>
