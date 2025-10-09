<script setup>
import { onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
})

const tags = defineModel()
const inputValue = ref([])

onMounted(() => {
  // Initial value
  tags.value = []
})

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    tags.value.push({
      id: uuidv4(),
      value: inputValue.value,
    })
    inputValue.value = ''
  }
}

const handleRemove = (data) => {
  tags.value = tags.value.filter((tag) => tag.id !== data.id)
}
</script>
<template>
  <label class="block font-bold mb-2" v-if="!props.hiddenLabel" :for="props.name">
    {{ props.label }}
  </label>
  <InputText
    v-bind="$attrs"
    v-model="inputValue"
    type="text"
    :id="props.name"
    :placeholder="`Agregar ${props.placeholder?.toLowerCase() || props.label?.toLowerCase()}`"
    class="w-full md:w-42rem"
    @keydown="handleKeyDown"
  />
  <div class="flex flex-wrap gap-2 mt-2">
    <Chip v-for="tag in tags" :key="tag.id" :label="tag.value" removable @remove="() => handleRemove(tag)" />
  </div>
</template>
