<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products' // 1. Importa el Store de Pinia
import { useRouter } from 'vue-router'

// Importa los componentes de PrimeVue si no están registrados globalmente
import ProgressSpinner from 'primevue/progressspinner'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
import Dialog from 'primevue/dialog'
import Panel  from 'primevue/panel'

const productsStore = useProductsStore() // Obtiene la instancia del store
const router = useRouter()

// Destructurar las propiedades reactivas del store (opcional, pero ayuda a la legibilidad)
const loading = computed(() => productsStore.loading)
const error = computed(() => productsStore.error)
const products = computed(() => productsStore.products)
const categories = computed(() => productsStore.categories)

// --- Lógica de Paginación ---
const rows = ref(9) // Número de productos por página
const first = ref(0) // Índice del primer elemento de la página actual

const onPageChange = (event) => { // Función que se llama cuando se cambia de página
  first.value = event.first // El índice inicial
  rows.value = event.rows   // El nuevo número de elementos por página (si se cambia)
  // Opcional: Desplazarse arriba al cambiar de página
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Propiedad computada para obtener solo los productos de la página actual
const paginatedProducts = computed(() => {
  const start = first.value
  const end = first.value + rows.value
  return products.value.slice(start, end)
  // return productsWithImage.value.slice(start, end)
})

const showDialog = ref(false)
const selectedProduct = ref(null)

const viewProduct = (product) => {      
  router.push({
    name: 'ProductDetail',
    params: { id: product.id },    
  })
}

onMounted(()=>{
  console.log(categories.value)
})

const productsWithImage = computed(() => {
  return products.value.filter(product => {
    // Validación: debe tener images, el primer elemento [0], y la propiedad .src
    return product.images?.[0]?.src
  })
})
</script>

<template>
  <div class="p-4">
    <Panel>
    <div v-if="loading" class="flex justify-center mt-8">
      <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
    </div>

    <div v-else-if="error" class="text-center text-red-600 font-semibold text-lg p-5 border border-red-300 bg-red-50 mt-4 rounded-lg">
      ¡Ocurrió un error al cargar los productos! 😟<br>
      {{ error }}
    </div>

    <div v-else>
      <div v-if="products.length === 0" class="text-center text-gray-500 mt-8">
        No se encontraron productos con la categoría filtrada.
      </div>

      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="product in paginatedProducts" :key="product.id">
            <Card class="h-full flex flex-col" @click="viewProduct(product)">
              <template #header>
                <img 
                  :src="product.images?.[0]?.src" 
                  class="w-full h-full object-cover"
                  :alt="product.name.es"
                  loading="lazy"
                />
              </template>
              <template #subtitle>
                {{ product.name.es }}
              </template>             
            </Card>
          </div>
        </div>

        <div class="mt-6 flex justify-center">
            <Paginator
                :rows="rows"
                :totalRecords="products.length"
                :first="first"
                @page="onPageChange"
                :rowsPerPageOptions="[12, 24, 48]"
            />
        </div>
      </div>
    </div>

    <Dialog v-model:visible="showDialog" modal header="Detalle del Producto" :style="{ width: '30rem' }">
      <div v-if="selectedProduct" class="p-4">
        <img :src="selectedProduct.images[0].src" class="w-full h-auto rounded-lg mb-4 object-contain shadow-md" :alt="selectedProduct.title" />
        <h2 class="text-2xl font-bold mb-2 text-gray-800">{{ selectedProduct.title }}</h2>
        <!-- <p class="font-semibold text-2xl text-green-600 mb-4">Precio: $ {{ selectedProduct.price }}</p> 
         -->
        <p class="text-gray-700 leading-relaxed">{{ selectedProduct.name.es }}</p>
        <p class="text-gray-700 leading-relaxed">{{selectedProduct.variants[0]?.stock }}</p> 
      </div>
      <template #footer>
        <Button label="Cerrar" icon="pi pi-times" @click="showDialog = false" class="p-button-text" />
      </template>
    </Dialog>

  </Panel>
</div>
</template>

