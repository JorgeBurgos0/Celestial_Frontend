<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu" />
        </IconBtn>

        <VSpacer />

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        v-if="isAdmin"
        :item="{
          title: 'Panel Principal',
          icon: 'bx-home',
          to: '/dashboard',
        }"
      />
      <VerticalNavLink
        v-if="isAdmin"
        :item="{
          title: 'Usuarios',
          icon: 'bx-user',
          to: '/Users',
        }"
      />
      <VerticalNavLink
        v-if="isAdmin"
        :item="{
          title: 'Productos',
          icon: 'bx-store',
          to: '/Store',
        }"
      />

      <!-- 👉 User Interface -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Interfas de usuario',
        }"
      /> 
  
      <VerticalNavLink
        :item="{
          title: 'Principal',
          icon: 'bx-home',
          to: '/Home',
        }"
      />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<script>
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import { useTheme } from 'vuetify'
import { computed } from 'vue'

export default {
  components: {
    VerticalNavLayout,
    VerticalNavLink,
    UserProfile,
    Footer,
    NavbarThemeSwitcher,
    VerticalNavSectionTitle
  },
  setup() {
    const vuetifyTheme = useTheme()

    const isAdmin = computed(() => {
      // Supongamos que tienes la información del usuario almacenada en el local storage después de iniciar sesión
      const userRole = localStorage.getItem('userRole');
      if (userRole) {
        // Verifica si el rol del usuario es administrador
        return userRole === 'Administrador';
      }
      return false
    })

    const isUser = computed(() => {
      // Supongamos que tienes la información del usuario almacenada en el local storage después de iniciar sesión
      const userRole = localStorage.getItem('userRole');
      if (userRole) {
        // Verifica si el rol del usuario es usuario
        return userRole === 'Usuario';
      }
      return false
    })

    return { isAdmin, isUser }
  }
}
</script>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
