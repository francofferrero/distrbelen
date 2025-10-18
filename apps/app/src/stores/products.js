import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import ProductService from '@/services/ProductService'

const service = new ProductService()

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selectedProduct = ref(null)
  const searchQuery = ref('')
  
  const productsWithSearchName = computed(() => // preprocesar nombres en minúsculas para filtrado rápido
    products.value.map(p => ({
      ...p,
      _searchName: (p.name?.es || p.name || '').toLowerCase()
    }))
  )

  const getProductById = (id) => {
    selectedProduct.value = products.value.find((product) => product.id === Number(id))
  }

  const fetchProducts = async () => {
    try {
      loading.value = true
      const data = await service.getProducts()
      products.value = data.products
    } catch (err) {
      console.error("Error al obtener productos:", err.message)
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      loading.value = true
      const data = await service.getCategories()
      categories.value = data.categories
    } catch (err) {
      console.error("Error al obtener categorías:", err.message)
    } finally {
      loading.value = false
    }
  }

  const filteredProducts = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return products.value
    return productsWithSearchName.value.filter(p =>
      p._searchName.includes(q)
    )
  })

  return {
    products,
    fetchProducts,
    categories,
    fetchCategories,
    selectedProduct,
    getProductById,
    loading,
    error,
    searchQuery,
    filteredProducts
  }
})
