<script setup>
import { computed, onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useToast } from 'primevue/usetoast'
import FieldDefsForm from './FieldDefsForm.vue'
import CustomersService from '@/services/Customers'
import fieldDefs from '@/constants/fieldDefs/customers'
import { FORM_MODE } from '../../../../shared/constants'

const $props = defineProps({
  action: {
    type: String,
    default: () => FORM_MODE.NEW,
  },
  customer: {
    type: Object,
    required: true,
  },
})

const $emit = defineEmits(['create', 'update', 'cancel'])

const toast = useToast()

const form = ref({})
const submitted = ref(false)
const disableFields = computed(() => {
  return action === FORM_MODE.EDIT ? ['code'] : undefined
})

const { customer, action } = $props
const service = new CustomersService()

onMounted(() => {
  if (action === FORM_MODE.EDIT) {
    const formData = {
      ...customer,
      phones: customer.phones?.map((phone) => {
        return { id: uuidv4(), value: phone }
      }),
    }
    form.value = formData
  }
})

const saveCustomer = async () => {
  submitted.value = true
  if (form?.value.name?.trim() && form?.value.code?.trim()) {
    try {
      const { id, ...formData } = {
        ...form.value,
        phones: form.value.phones?.map((phone) => phone.value) || [],
      }
      if (action === FORM_MODE.NEW) {
        await service.create(formData)
        $emit('create')
      } else {
        await service.update(id, formData)
        $emit('update', { id, ...formData })
      }
      toast.add({
        severity: 'success',
        summary: 'Clientes',
        detail: `Cliente ${action === FORM_MODE.NEW ? 'creado' : 'actualizado'} correctamente`,
        life: 3000,
      })
      submitted.value = false
      form.value = {}
    } catch (err) {
      console.error(err)
      toast.add({
        severity: 'error',
        summary: 'Clientes',
        detail: 'Error al intentar crear el cliente',
        life: 3000,
      })
    }
  } else {
    toast.add({
      severity: 'warn',
      summary: 'Clientes',
      detail: 'Faltan datos obligatorios, por favor revise el formulario',
      life: 3000,
    })
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <FieldDefsForm v-model="form" :fieldDefs="fieldDefs" :disableFields="disableFields" action="create" />
  </div>
  <div class="p-dialog-footer mt-5">
    <Button label="Cerrar" icon="pi pi-times" text @click="() => $emit('cancel')" />
    <Button label="Guardar" icon="pi pi-check" @click="saveCustomer" />
  </div>
</template>
