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

async function fetchProducts(force = false) {
  if (!force && products.value.length > 0) {  
    return // console.log('Productos ya cargados en el store, no se vuelve a pedir a la API')
  }

  loading.value = true
  error.value = null

  try {
    const data = await service.getProducts()    
    products.value = data
    
    // Lógica de filtrado (si es global, puede ir aquí o en un 'getter')

    // *** para pruebas con productos que tienen categoria *** 
    // const filtered = products.value.filter(p => p.categories && p.categories.length > 0)
    // console.log('Productos filtrados en Store:', filtered.length)
    
  } catch (err) {    
    error.value = err.message || 'Error al cargar productos'
    console.error('Error en fetchProducts (Store):', err)
  } finally {
    loading.value = false
  }
}

async function fetchCategories(force = false) {
  if (!force && categories.value.length > 0) {  
    return // console.log('categories ya cargados en el store, no se vuelve a pedir a la API')
  }

  //loadingCategories.value = true
  error.value = null

  try {
    const data = await service.getCategories()    
    categories.value = data    
  } catch (err) {    
    error.value = err.message || 'Error al cargar categories'
    console.error('Error en fetchCategories (Store):', err)
  } finally {
   // loadingCategories.value = false
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

/*const categories = computed(() => {
  const set = new Set()
  products.value.forEach(p => {
    if (p.categories) {
      p.categories.forEach(c => set.add(c.name?.es)) // suponiendo que la categoría está así
    }
  })
  return Array.from(set)
})*/

  // Se pueden añadir "getters" aquí si quieres exponer datos calculados.
  // const totalProducts = computed(() => products.value.length);
