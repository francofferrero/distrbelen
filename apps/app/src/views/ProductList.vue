<script setup>
import { ref, computed, watch } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useRouter, useRoute } from 'vue-router'
import ProgressSpinner from 'primevue/progressspinner'
import Paginator from 'primevue/paginator'
import Panel from 'primevue/panel'

const productsStore = useProductsStore()
const router = useRouter()
const route = useRoute()

// --- Reactivity ---
const loading = computed(() => productsStore.loading)
const error = computed(() => productsStore.error)
const products = computed(() => productsStore.products)
const categories = computed(() => productsStore.categories) // 🔹 más limpio acceder desde aquí
const searchQuery = ref('')

const rows = ref(9)
const first = ref(0)
const usePagination = ref(false) // 🔹 si querés activarlo luego, debe ser ref
const categoryId = ref(route.params.id ? Number(route.params.id) : null)

// --- Watch in URL ---
watch(
  () => route.params.id,
  newId => {
    categoryId.value = newId ? Number(newId) : null
    first.value = 0 // 🔹 reinicia paginación al cambiar categoría
    searchQuery.value = '' // 🔹 limpia búsqueda al cambiar categoría
  }
)

// --- auxiliar functions ---
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
    const name = typeof p.name === 'object' ? p.name.es || '' : p.name || ''
    return name.toLowerCase().includes(q)
  })
})

// --- Pagination ---
const paginatedProducts = computed(() => {
  if (!usePagination.value) return filteredProducts.value
  const start = first.value
  return filteredProducts.value.slice(start, start + rows.value)
})

const onPageChange = ({ first: f, rows: r }) => {
  first.value = f
  rows.value = r
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// --- Category & navigation ---
const categoryName = computed(() => {
  if (!categoryId.value) return 'Productos'
  const cat = categories.value.find(c => c.id === categoryId.value)
  return cat?.name?.es || 'Categoría'
})

const viewProduct = product => {
  router.push({ name: 'ProductDetail', params: { id: product.id } })
}

const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <div>
    <Panel>
      
      <!-- 🔄 Loading -->
      <div v-if="loading" class="flex justify-center mt-8">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
      </div>

      <!-- ❌ Error -->
      <div
        v-else-if="error"
        class="text-center text-red-600 font-semibold text-lg p-5 border border-red-300 bg-red-50 mt-4 rounded-lg"
      >
        ¡Ocurrió un error al cargar los productos!<br />
        {{ error }}
      </div>

      <!-- ✅ Productos -->
      <div v-else>
        <!-- Header: título + buscador -->
        <div
          class="mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3"
        >
          <h1 class="text-2xl font-bold">{{ categoryName }}</h1>
          <div class="relative w-full md:w-1/2 max-w-md">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar producto..."
              class="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
            />
          </div>
        </div>

        <!-- List -->
        <div
          v-if="paginatedProducts.length"
          class="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          <div
            v-for="p in paginatedProducts"
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
              {{ typeof p.name === 'object' ? p.name.es : p.name }}
            </h2>
          </div>
        </div>

        <!-- No products -->
        <div v-else class="text-gray-500 text-center py-6">
          No hay productos que coincidan con la búsqueda.
        </div>

        <!-- Pager -->
        <div
          v-if="usePagination && filteredProducts.length > rows"
          class="mt-6 flex justify-center"
        >
          <Paginator
            :rows="rows"
            :totalRecords="filteredProducts.length"
            :first="first"
            @page="onPageChange"
            :rowsPerPageOptions="[9, 18, 36]"
          />
        </div>
      </div>      
    </Panel>
  </div>
</template>
