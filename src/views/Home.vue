<template>
  <div class="p-m-4">
    <!-- Buscador -->
    <div class="p-mb-4">
      <input
        type="text"
        v-model="searchQueryLocal"
        placeholder="_Buscar producto..."
        class="p-inputtext p-d-block"
      />
    </div>

    <!-- Grid de productos -->
    <div class="p-grid p-justify-center">
      <div v-for="product in productsToShow" :key="product.id" class="p-col-12 p-md-3">
        <Card class="p-mb-4" style="width: 100%; text-align: center;">
          <img :src="product.image" alt="Imagen producto" class="product-img"/>
          <h3 class="p-mt-3">{{ product.title }}</h3>
          <p>{{ product.description }}</p>
          <Button
            label="Ver más"
            icon="pi pi-search"
            class="p-button-text p-mt-2"
            @click="goToDetail(product.id)"
          />
        </Card>
      </div>
    </div>

    <!-- Paginador -->
    <div class="p-d-flex p-jc-center p-mt-4">
      <Paginator
        :rows="rows"
        :totalRecords="allFilteredProducts.length"
        :first="first"
        @page="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import Card from 'primevue/card'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'

export default {
  name: 'Home',
  components: { Card, Button, Paginator },
  data() {
    return {
      searchQueryLocal: '',
      first: 0,
      rows: 4,
      products: [
        { id: 1, title: 'Producto 1', description: 'Breve descripción del producto 1.', image: 'https://via.placeholder.com/300x200?text=Producto+1', longDescription: 'Detalle producto 1' },
        { id: 2, title: 'Producto 2', description: 'Breve descripción del producto 2.', image: 'https://via.placeholder.com/300x200?text=Producto+2', longDescription: 'Detalle producto 2' },
        { id: 3, title: 'Producto 3', description: 'Breve descripción del producto 3.', image: 'https://via.placeholder.com/300x200?text=Producto+3', longDescription: 'Detalle producto 3' },
        { id: 4, title: 'Producto 4', description: 'Breve descripción del producto 4.', image: 'https://via.placeholder.com/300x200?text=Producto+4', longDescription: 'Detalle producto 4' },
        { id: 5, title: 'Producto 5', description: 'Breve descripción del producto 5.', image: 'https://via.placeholder.com/300x200?text=Producto+5', longDescription: 'Detalle producto 5' },
        { id: 6, title: 'Producto 6', description: 'Breve descripción del producto 6.', image: 'https://via.placeholder.com/300x200?text=Producto+6', longDescription: 'Detalle producto 6' }
      ]
    }
  },
  computed: {
     // 1. **PRIMERO:** Aplica el filtro a la lista COMPLETA de productos.
     allFilteredProducts() {
      const query = this.searchQueryLocal.toLowerCase()
      // Filtra la lista completa (this.products)
      return this.products.filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
    },
    
    // 2. **SEGUNDO:** Aplica la paginación a la lista ya filtrada.
    productsToShow() {
      // Paginamos la lista ya filtrada
      return this.allFilteredProducts.slice(this.first, this.first + this.rows)
    }
  },
  methods: {
    onPageChange(event) {
      this.first = event.first
    },
    goToDetail(id) {
      this.$router.push(`/producto/${id}`)
    }
  }
}
</script>

<style scoped>
.product-img {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 12px;
}
</style>
