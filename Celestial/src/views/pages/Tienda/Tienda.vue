<template>
  <v-container class="store-container">
    <h1 class="text-center mb-5">Tienda</h1>

    <!-- Espaciado -->
    <v-spacer></v-spacer>

    <!-- Lista de productos -->
    <v-row class="product-list">
      <v-col v-for="producto in productos" :key="producto.id" cols="12" md="4">
        <v-card class="mb-5 product-card">
          <!-- Imagen del producto -->
          <v-img :src="producto.image" aspect-ratio="1">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-title class="product-title">{{ producto.name }}</v-card-title>
          <v-card-text class="product-description">{{ producto.description }}</v-card-text>
          <v-card-text class="product-amount">Amount: {{ producto.amount }}</v-card-text>
          <v-card-text class="product-stock">Stock: {{ producto.stock }}</v-card-text>
          <v-card-actions class="product-actions">
            <!-- Campo de entrada para la cantidad -->
            <v-text-field v-model="cantidadesSeleccionadas[producto.id]" type="number" label="Cantidad" min="1"></v-text-field>
            <!-- Botón para agregar al carrito -->
            <v-btn color="#B69E6D" dark @click="agregarAlCarrito(producto.id, cantidadesSeleccionadas[producto.id])">Agregar al Carrito</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      productos: [],
      cantidadesSeleccionadas: {}, // Objeto para almacenar la cantidad seleccionada para cada producto por su ID
    };
  },
  mounted() {
    this.obtenerProductos();
  },
  methods: {
    async obtenerProductos() {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/store/products', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        this.productos = response.data.map(producto => ({
          ...producto,
          image: `http://localhost:8000/${producto.image}`
        }));
        // Inicializar cantidades seleccionadas para cada producto como 1
        this.productos.forEach(producto => {
          this.$set(this.cantidadesSeleccionadas, producto.id, 1);
        });
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    },
    async agregarAlCarrito(productoId, cantidad) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        await axios.post('http://localhost:8000/api/cart/add', { product_ids: [productoId], quantities: [cantidad] }, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log('Producto agregado al carrito exitosamente');
        // Actualizar la lista de productos en el carrito
        await this.getCart();
      } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para el contenedor de la tienda */
.store-container {
  background-color: rgba(240, 240, 240, 0.8); /* Color de fondo con transparencia */
  background-image: url('../../../assets/Fondos/pergamino.png'); /* Imagen de fondo */
  background-size: 3000px 3000px; /* Tamaño de la imagen de fondo en píxeles */
  background-position: center -700px; /* Posición de la imagen de fondo */
  border-radius: 10px; /* Bordes redondeados */
  padding: 20px; /* Añade espacio interno */
}

/* Estilos para la lista de productos */
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

/* Estilos para las tarjetas de producto */
.product-card {
  width: 300px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #e3d5d5;
  border-radius: 5px;
}

/* Estilos para el título del producto */
.product-title {
  color: #af894b; /* Texto oscuro */
}

.text-center{
   color: #e1a063;
}

/* Estilos para la descripción del producto */
.product-description {
  color: #646D48; /* Texto medio */
}

/* Estilos para la cantidad del producto */
.product-amount {
  color: #c4a170a9; /* Texto oscuro */
}

/* Estilos para el stock del producto */
.product-stock {
  color: #66706A; /* Texto medio */
}

/* Estilos para las acciones del producto */
.product-actions {
  justify-content: space-between;
  align-items: center;
}
</style>
