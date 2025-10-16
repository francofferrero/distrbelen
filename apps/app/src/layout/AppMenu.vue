<script setup>
import { computed, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import AppMenuItem from './AppMenuItem.vue'

const store = useProductsStore()

onMounted(() => {
  store.fetchCategories()
})

const baseModel = [
  {
    label: 'Inicio',
    items: [
      { label: 'Productos', icon: 'pi pi-fw pi-list', to: '/products' },
    ],
  },
]

// función recursiva: arma un item de menú, pero guarda también todos los IDs descendientes en "allIds"
function mapCategory(cat, allCategories) {
  let allIds = [cat.id]

  // Resolver subcategorías
  const items = cat.subcategories?.length
    ? cat.subcategories
        .map(id => allCategories.find(c => c.id === id))
        .filter(Boolean)
        .map(sc => {
          const subItem = mapCategory(sc, allCategories)
          allIds = allIds.concat(subItem.allIds) // agregamos todos los IDs de hijos
          return subItem
        })
    : undefined

  return {
    label: cat.name?.es || cat.name,
    icon: 'pi pi-fw pi-tag',
    to: `/category/${cat.id}`,
    items,
    allIds, // agregamos propiedad con todos los IDs que incluye esta categoría
  }
}

const model = computed(() => {
  const categoriesMenu = store.categories
    .filter(cat => !cat.parent) // solo raíces
    .map(cat => mapCategory(cat, store.categories))

  return [
    ...baseModel,
    {
      label: 'Categorías',
      items: categoriesMenu,
    },
  ]
})
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="i">
      <app-menu-item v-if="!item.separator" :item="item" :index="i" />
      <li v-else class="menu-separator"></li>
    </template>
  </ul>
</template>
