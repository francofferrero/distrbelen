<script setup>
import { useLayout } from '@/layout/composables/layout'
import AppConfigurator from './AppConfigurator.vue'
import UserMenu from '@/components/UserMenu.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useProductsStore } from '@/stores/products'

const { onMenuToggle } = useLayout()
const productsStore = useProductsStore()

</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
        <i class="pi pi-bars"></i>
      </button>
      <router-link to="/" class="layout-topbar-logo">
        <div class="logo-title">
          <img src="@/assets/logoDb.svg" alt="Logo DB" class="logo" />
        </div>

        <span>Distribuidora Belén</span>
      </router-link>
    </div>

    <div class="layout-topbar-actions">
      <!-- <div class="layout-config-menu">
        <div class="relative">
          <button v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }" type="button" class="layout-topbar-action">
            <i class="pi pi-user"></i>
          </button>
          <UserMenu />
        </div>
      </div>-->
      <div class="layout-topbar-right">
        <SearchBar
          v-model="productsStore.searchQuery"
          @search="onSearch"
          @clear="onClear"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo {
  height: 40px; /* ajustá el tamaño del logo */
  width: auto;
}
</style>
