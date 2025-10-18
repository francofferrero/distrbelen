<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onBeforeMount, computed, onMounted, onUnmounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import Galleria from 'primevue/galleria'

const route = useRoute()
const router = useRouter()

const productsStore = useProductsStore()
const product = ref(null)

// Detectar ancho de pantalla para definir altura dinámica
const windowWidth = ref(window.innerWidth)

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

// Altura dinámica del contenedor según tamaño de pantalla
const galleryHeightClass = computed(() => {
  return windowWidth.value < 768 ? 'max-h-[50vh]' : 'max-h-[80vh]'
})

onBeforeMount(async () => {
  productsStore.getProductById(route.params.id)
  product.value = productsStore.selectedProduct
})

const galleryImages = computed(() => {
  if (!product.value?.images?.length) return []
  return product.value.images.map(img => ({
    itemImageSrc: img.src,
    alt: img.alt || 'Imagen de producto'
  }))
})

const categoryNames = computed(() =>
  !product.value?.categories?.length
    ? []
    : product.value.categories.map(c => c.name?.es || c.name || 'Categoría sin nombre')
)

const goBack = () => router.back()
</script>

<template>
  <div>
    <div v-if="product">
      <div class="grid grid-cols-12 gap-4 flex items-center">
        <div class="col-span-8 relative">
          <!-- Botón volver superpuesto -->
          <button
            @click="goBack"
            class="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-md hover:bg-black/70 transition-colors"
          >
            ← Volver
          </button>

          <!-- Galería -->
          <div v-if="galleryImages.length" class="w-full my-4 relative">
            <Galleria
              :value="galleryImages"
              :numVisible="1"
              containerStyle="width: 100%; height: 100%"
              :showThumbnails="false"
              :showIndicators="true"
              :circular="true"
            >
              <template #item="slotProps">
                <div
                  class="flex items-center justify-center w-full"
                  :class="galleryHeightClass"
                >
                  <img
                    :src="slotProps.item.itemImageSrc"
                    :alt="slotProps.item.alt"
                    class="max-w-full max-h-full object-contain"
                  />
                </div>
              </template>
            </Galleria>
          </div>

          <p v-else class="text-gray-500 my-4">
            Producto sin imágenes disponibles.
          </p>
        </div>

        <!-- Detalles -->
        <div class="col-span-4 my-4 flex flex-col items-center text-center">
          <h2 class="text-2xl font-bold mb-4">
            {{ product.name?.es || product.name }}
          </h2>
          <ul class="mt-2 text-lg text-gray-600">
            <li
              v-for="(catName, i) in categoryNames"
              :key="`category-${i}`"
            >
              {{ catName }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-red-500">
        No se encontró el producto
      </p>
    </div>
  </div>
</template>
