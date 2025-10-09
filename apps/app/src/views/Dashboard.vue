<script setup>
import { ref } from 'vue'
import router from '@/router'
import CustomerForm from '@/components/CustomerForm.vue'

const customerDialog = ref(false)

const customerList = () => {
  router.push('/customers')
}
const hideCustomerDialog = () => {
  customerDialog.value = false
}
</script>

<template>
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">Clientes</div>
            <span class="block text-muted-color font-medium mb-4"></span>
          </div>
          <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 4rem; height: 4rem">
            <i class="pi pi-users text-cyan-500 !text-xl"></i>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button text raised rounded icon="pi pi-user-plus" title="Nuevo" @click="() => customerDialog = true" />
          <Button text raised rounded icon="pi pi-list" title="Listado" @click="customerList" />
        </div>
      </div>
    </div>
    <Dialog v-model:visible="customerDialog" :style="{ width: '450px' }" header="Cliente" :modal="true">
      <CustomerForm @cancel="hideCustomerDialog" @create="hideCustomerDialog" />
    </Dialog>
  </div>
</template>
