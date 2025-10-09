<script setup>
import { onMounted, ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useToast } from 'primevue/usetoast'
import CustomerForm from '@/components/CustomerForm.vue'
import { docToObject } from '@/helpers/firebase'
import CustomersService from '@/services/Customers'
import { FORM_MODE } from '../../../../shared/constants'

const toast = useToast()

const dt = ref()
const customer = ref({})
const customers = ref()
const formDialog = ref(false)
const formMode = ref(FORM_MODE.NEW)

const deleteDialog = ref(false)
const deleteProductsDialog = ref(false)
const selectedCustomers = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
const loading = ref(true)

const service = new CustomersService()

onMounted(async () => {
  await fetchCustomers()
})

const fetchCustomers = async () => {
  loading.value = true
  service
    .readAll()
    .then((data) => {
      customers.value = data.docs.map(docToObject).filter((customer) => !customer.deletedAt)
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      loading.value = false
    })
}

const openNew = () => {
  customer.value = {}
  formMode.value = FORM_MODE.NEW
  formDialog.value = true
}

const hideDialog = () => {
  formDialog.value = false
}

const openEdit = (item) => {
  customer.value = { ...item }
  formMode.value = FORM_MODE.EDIT
  formDialog.value = true
}

const confirmDelete = (item) => {
  customer.value = item
  deleteDialog.value = true
}

const deleteCustomer = async () => {
  try {
    await service.delete(customer.value.id)
    customers.value = customers.value.filter((val) => val.id !== customer.value.id)
    deleteDialog.value = false
    customer.value = {}
    toast.add({
      severity: 'success',
      summary: 'Clientes',
      detail: 'Cliente eliminado correctamente',
      life: 3000,
    })
  } catch (err) {
    console.error(err)
    toast.add({
      severity: 'danger',
      summary: 'Clientes',
      detail: 'Error al intentar eliminar el cliente',
      life: 3000,
    })
  }
}

const findIndexById = (id) => {
  let index = -1
  for (let i = 0; i < customers.value.length; i++) {
    if (customers.value[i].id === id) {
      index = i
      break
    }
  }

  return index
}

const exportCSV = () => {
  toast.add({ severity: 'info', summary: 'En desarrollo', detail: 'Esta opción estará disponible pronto', life: 3500 })
  // dt.value.exportCSV()
}
const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true
}

const handleCustomerCreate = async () => {
  hideDialog()
  await fetchCustomers()
}

const handleCustomerUpdate = (item) => {
  hideDialog()
  customers.value[findIndexById(item.id)] = item
}
</script>

<template>
  <div>
    <div class="card">
      <Toolbar class="mb-6">
        <template #start>
          <Button class="mr-2" label="Nuevo" icon="pi pi-plus" severity="primary" @click="openNew" />
          <Button
            v-if="false"
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedCustomers || !selectedCustomers.length"
          />
        </template>
        <template #end>
          <Button label="Exportar" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
        </template>
      </Toolbar>
      <DataTable
        ref="dt"
        :loading="loading"
        v-model:selection="selectedCustomers"
        :value="customers"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} clientes"
      >
        <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <h4 class="m-0">Clientes</h4>
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Buscar..." />
            </IconField>
          </div>
        </template>
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="code" header="Código" sortable style="min-width: 12rem"></Column>
        <Column field="name" header="Nombre" sortable style="min-width: 16rem"></Column>
        <Column header="Telefonos">
          <template #body="slotProps">
            {{ slotProps.data.phones?.join(' - ') }}
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 3rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="openEdit(slotProps.data)" />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDelete(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <Dialog v-model:visible="formDialog" :style="{ width: '450px' }" header="Cliente" :modal="true">
      <CustomerForm
        :action="formMode"
        :customer="customer"
        @cancel="hideDialog"
        @create="handleCustomerCreate"
        @update="handleCustomerUpdate"
      />
    </Dialog>
    <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Eliminar" :modal="true">
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="customer">
          ¿Está seguro que desea eliminar al cliente <b>{{ customer.name }}</b> ?
        </span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteDialog = false" />
        <Button label="Si" icon="pi pi-check" @click="deleteCustomer" />
      </template>
    </Dialog>
  </div>
</template>
