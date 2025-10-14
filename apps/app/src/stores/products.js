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
    selectedProduct.value = products.value.find(p => p.id === parseInt(id))
  }

  const fetchProducts = async () => {
    try {
      const { products: prods } = await service.getProducts()
      products.value = prods
    } catch (err) {
      console.error("Error al obtener productos:", err.message)
    } finally {
      loading.value = false
    }
  } 

  const fetchCategories = async () => {
    try {
      const { categories: cats } = await service.getCategories()
      categories.value = cats
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
