<script setup>
import { ref } from 'vue'
// import { useUserStore } from '@/stores/user'
import { useToast } from 'primevue/usetoast'

// composables
// const userStore = useUserStore()
const toast = useToast()

const userName = 'Usuario'

const handleSignOut = async () => {
  try {
    // await userStore.signOut()
  } catch (err) {
    console.log(err)
  }
}

const menuItems = ref([
  {
    label: userName,
    items: [
      {
        label: 'Editar perfil',
        icon: 'pi pi-fw pi-user',
        command: () => {
          toast.add({
            severity: 'info',
            summary: 'En desarrollo',
            detail: 'Esta opción estará disponible pronto',
            life: 3500,
          })
        },
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-fw pi-sign-out',
        command: handleSignOut,
      },
    ],
  },
])
</script>

<template>
  <div class="config-panel hidden absolute top-[3.25rem] right-0 w-64 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]">
    <Menu :model="menuItems" />
  </div>
</template>
