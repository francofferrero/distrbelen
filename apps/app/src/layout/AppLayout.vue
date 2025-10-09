<script setup>
import { useLayout } from '@/layout/composables/layout'
import { computed, onMounted, ref, watch } from 'vue'
import AppFooter from './AppFooter.vue'
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'
import { useRoute, useRouter } from 'vue-router'
 // import { useUserStore } from '@/stores/user'
 import { useProductsStore } from '@/stores/products'

// store
// const userStore = useUserStore()
const productsStore = useProductsStore();
// composables
const { layoutConfig, layoutState, isSidebarActive, resetMenu } = useLayout()
const route = useRoute()

const outsideClickListener = ref(null)
const currentUser = ref(null)

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener()
  } else {
    unbindOutsideClickListener()
  }
})

onMounted(() => {  
  // checkUser()
  productsStore.fetchProducts()
  productsStore.fetchCategories()
})

watch(
  route,
  () => {
    checkUser()
  },
  { inmediate: true },
)

const checkUser = async () => {
  // await userStore.currentUser()
  // currentUser.value = userStore.userData
  // If no user is signed in redirects to login in page
  // if (!currentUser.value) return router.push('/sign-in')
}

const containerClass = computed(() => {
  return {
    'layout-overlay': layoutConfig.menuMode === 'overlay',
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.staticMenuMobileActive,
  }
})

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        resetMenu()
      }
    }
    document.addEventListener('click', outsideClickListener.value)
  }
}

const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener)
    outsideClickListener.value = null
  }
}

const isOutsideClicked = (event) => {
  const sidebarEl = document.querySelector('.layout-sidebar')
  const topbarEl = document.querySelector('.layout-menu-button')

  return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target))
}
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <app-topbar></app-topbar>
    <app-sidebar></app-sidebar>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
      <app-footer></app-footer>
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>
  <Toast />
</template>
