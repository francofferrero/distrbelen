<template>
  <div class="p-d-flex p-flex-column p-ai-center">
    <Card style="width: 90%; max-width: 700px; text-align: center;">
      <img :src="product.image" alt="Imagen producto" class="product-img-detail"/>
      <h2 class="p-mt-3">{{ product.title }}</h2>
      <p>{{ product.longDescription }}</p>
      <Button
        label="Volver"
        icon="pi pi-arrow-left"
        class="p-button-text p-mt-3"
        @click="$router.push('/')"
      />
    </Card>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      product: {}
    }
  },
  created() {
    const allProducts = [
      { id: 1, title: 'Producto 1', longDescription: 'Detalle producto 1', image: 'https://via.placeholder.com/600x400?text=Producto+1' },
      { id: 2, title: 'Producto 2', longDescription: 'Detalle producto 2', image: 'https://via.placeholder.com/600x400?text=Producto+2' },
      { id: 3, title: 'Producto 3', longDescription: 'Detalle producto 3', image: 'https://via.placeholder.com/600x400?text=Producto+3' },
      { id: 4, title: 'Producto 4', longDescription: 'Detalle producto 4', image: 'https://via.placeholder.com/600x400?text=Producto+4' },
      { id: 5, title: 'Producto 5', longDescription: 'Detalle producto 5', image: 'https://via.placeholder.com/600x400?text=Producto+5' },
      { id: 6, title: 'Producto 6', longDescription: 'Detalle producto 6', image: 'https://via.placeholder.com/600x400?text=Producto+6' }
    ]
    this.product = allProducts.find(p => p.id === Number(this.id))
  }
}
</script>

<style scoped>
.product-img-detail {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 12px;
}
</style>
