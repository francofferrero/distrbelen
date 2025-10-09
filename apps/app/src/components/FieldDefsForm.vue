<script setup>
import { computed, toRefs } from 'vue'
import InputTags from './InputTags.vue'

const $props = defineProps({
  fieldDefs: {
    type: Array,
    required: true,
  },
  disableFields: {
    type: Array,
    default: () => [],
  },
})

const form = defineModel()
const { disableFields } = toRefs($props)

const formSchema = computed(() => {
  return $props.fieldDefs.map((fieldDef) => toFieldSchema(fieldDef))
})

function toFieldSchema(fieldDef) {
  const fieldSchema = {
    ...fieldDef,
    name: fieldDef.name || fieldDef.key,
    ...fieldComponent(fieldDef),
  }

  return fieldSchema
}

function fieldComponent(fieldDef) {
  let component = { component: 'input', type: 'text' }
  switch (fieldDef.format) {
    case 'number': {
      component = { component: 'input', type: 'number' }
      break
    }
    case 'array': {
      component = { component: 'inputTags' }
    }
  }

  return component
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <template v-for="fieldSchema in formSchema" :key="fieldSchema.key">
      <div class="field col col-12 md:col-6">
        <template v-if="fieldSchema.component === 'input'">
          <label class="block font-bold mb-2" v-if="!fieldSchema.hiddenLabel" :for="fieldSchema.name">
            {{ fieldSchema.label }}
          </label>
          <InputText
            :disabled="disableFields.includes(fieldSchema.key)"
            v-model="form[fieldSchema.key]"
            :type="fieldSchema.type"
            :id="fieldSchema.name"
            :placeholder="fieldSchema.placeholder || fieldSchema.label"
            class="w-full md:w-42rem"
          />
        </template>
        <template v-else-if="fieldSchema.component === 'inputTags'">
          <InputTags
            v-model="form[fieldSchema.key]"
            :disabled="disableFields.includes(fieldSchema.key)"
            :id="fieldSchema.name"
            :label="fieldSchema.label"
          />
        </template>
      </div>
    </template>
  </div>
</template>
