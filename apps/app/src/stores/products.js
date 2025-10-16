import { defineStore } from 'pinia'
import { ref } from 'vue'
import ProductService from '@/services/ProductService'

const service = new ProductService()

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selectedProduct = ref(null)

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

  return {
    products,
    fetchProducts,
    categories,
    fetchCategories,
    selectedProduct,
    getProductById,
    loading,
    error,
  }
})
