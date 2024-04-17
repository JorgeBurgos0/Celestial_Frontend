<template>
  <div class="header">
    <router-link to="/Tienda">
      <button class="store-button">
        <i class="bx bx-store"></i>
        Tienda
      </button>
    </router-link>
    <div class="separator"></div>
    <router-link to="/Carrito">
      <button class="cart-button">
        <i class="bx bx-cart"></i>
        Carrito
      </button>
    </router-link>
    <ThemeSwitcher :themes="themes" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const themes = [
  {
    name: 'light',
    icon: 'bx-sun',
  },
  {
    name: 'dark',
    icon: 'bx-moon',
  },
];

const router = useRouter();

const goToStore = () => {
  // Navegar a la ruta de la tienda
  router.push('/store');
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}

.store-button,
.cart-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: #333; /* Color de texto */
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px; /* Separación entre los botones */
}

.separator {
  width: 2px; /* Ancho del separador */
  height: 20px; /* Altura del separador */
  background-color: #ccc; /* Color del separador */
  margin-right: 10px; /* Espacio entre el separador y el botón del carrito */
}
</style>
