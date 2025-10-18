<script setup>
import { ref } from 'vue'

const model = defineModel() // (Vue 3.4+)
const emit = defineEmits(['search', 'clear'])

const onSearch = () => emit('search', model.value)
const onClear = () => {
  model.value = ''
  emit('clear')
}
</script>

<template>
  <div class="relative w-full md:w-80 max-w-sm">
    <input
      v-model="model"
      type="text"
      placeholder="Buscar producto..."
      class="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
      @keyup.enter="onSearch"
    />
    <button
      v-if="model"
      @click="onClear"
      class="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
    >
      ✕
    </button>
  </div>
</template>
