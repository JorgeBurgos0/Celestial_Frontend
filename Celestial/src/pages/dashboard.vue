<template>
  <div class="container">
    <VRow>
      <VCol cols="12" md="4" sm="6">
        <div class="chart-card">
          <GraficasBarra :datos="datas_de_ventas_por_genero" :categories="categorias_genero"/>
        </div>
      </VCol>
      <VCol cols="12" md="4" sm="6">
        <div class="chart-card">
          <GraficaMasVendido :datos="Datos_mas_vendido" :categories="categoria_venta"/>
        </div>
      </VCol>
      <VCol cols="12" md="4" sm="6">
        <div class="chart-card">
          <MaVendidoGenero :datos="Mas_Vendido_Genero" :categories="catagoria_genero"/>
        </div>
      </VCol>
      <VCol cols="12" md="4" sm="6">
        <div class="chart-card">
          <GraficaEdades :datos="GraficaEdades" :categories="Rango"/>
        </div>
      </VCol>
      <VCol cols="12" md="4" sm="6">
        <div class="chart-card">
          <GraficaCarrito :datos="GraficaCarrito" :categories="Rango"/>
        </div>
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
import GraficasBarra from '@/views/dashboard/GraficasBarra.vue'
import GraficaMasVendido from '@/views/dashboard/GraficaMasVendido.vue'
import MaVendidoGenero from '@/views/dashboard/MaVendidoGenero.vue';
import GraficaEdades from '@/views/dashboard/GraficaEdades.vue';
import GraficaCarrito from '@/views/dashboard/GraficaCarrito.vue';

import axios from 'axios'
</script>

<style scoped>
/* Estilos específicos del componente */
.container {
  background-color: #f0f0f0; /* Cambia este color al que desees */
  padding: 20px;
}

.heading {
  text-align: center;
  margin-bottom: 20px;
  color: #333; /* Color del texto */
}

.chart-card {
  background-color: #fff; /* Color de fondo de las tarjetas */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra de la tarjeta */
  padding: 20px;
  margin-bottom: 20px;
}

.chart-card h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #555; /* Color del texto */
}
</style>
