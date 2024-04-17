<template>
  <v-container class="product-catalog">
    <h1 class="text-center mb-5">Catálogo de Productos</h1>

    <!-- Botón para abrir el modal de agregar nuevo producto -->
    <v-btn color="#94BCB4" @click="mostrarModalAgregar = true">Agregar Producto</v-btn>

    <!-- Línea divisoria -->
    <v-divider class="mb-5"></v-divider>

    <!-- Modal para agregar nuevo producto -->
    <v-dialog v-model="mostrarModalAgregar" persistent max-width="600px">
      <v-card class="dialog">
        <v-card-title class="dialog-title">Agregar Nuevo Producto</v-card-title>
        <v-card-text>
          <!-- Campos para agregar un nuevo producto -->
          <v-text-field v-model="nuevoProducto.name" label="Nombre del Producto"></v-text-field>
          <v-text-field v-model="nuevoProducto.description" label="Descripción del Producto"></v-text-field>
          <v-text-field v-model="nuevoProducto.amount" label="Precio del Producto" type="number"></v-text-field>
          <v-text-field v-model="nuevoProducto.stock" label="Cantidad del Producto" type="number"></v-text-field>
          <input type="file" @change="handleFileUpload($event, 'nuevoProducto')" accept="image/*">
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-btn color="#94BCB4" @click="agregarProducto">Agregar</v-btn>
          <v-btn color="#B69E6D" @click="mostrarModalAgregar = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal para editar producto -->
    <v-dialog v-model="mostrarModalEditar" max-width="600px">
      <v-card class="dialog">
        <v-card-title class="dialog-title">Editar Producto</v-card-title>
        <v-card-text>
          <!-- Campos para editar un producto -->
          <v-text-field v-model="productoEditado.name" label="Nombre del Producto"></v-text-field>
          <v-text-field v-model="productoEditado.description" label="Descripción del Producto"></v-text-field>
          <v-text-field v-model="productoEditado.amount" label="Precio del Producto" type="number"></v-text-field>
          <v-text-field v-model="productoEditado.stock" label="Cantidad del Producto" type="number"></v-text-field>
          <input type="file" @change="handleFileUpload($event, 'productoEditado')" accept="image/*">
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-btn color="#94BCB4" @click="guardarCambios">Guardar Cambios</v-btn>
          <v-btn color="#B69E6D" @click="mostrarModalEditar = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal para ver detalles del producto -->
    <v-dialog v-model="mostrarModalDetalles" max-width="600px">
      <v-card class="dialog">
        <v-card-title class="dialog-title">Detalles del Producto</v-card-title>
        <v-card-text>
          <!-- Detalles del producto -->
          <v-row>
            <v-col cols="12">
              <strong>Nombre:</strong> {{ productoSeleccionado.name }}
            </v-col>
            <v-col cols="12">
              <strong>Descripción:</strong> {{ productoSeleccionado.description }}
            </v-col>
            <v-col cols="6">
              <strong>Precio:</strong> {{ productoSeleccionado.amount }}
            </v-col>
            <v-col cols="6">
              <strong>Cantidad:</strong> {{ productoSeleccionado.stock }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-btn color="#B69E6D" @click="mostrarModalDetalles = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Espaciado -->
    <v-spacer></v-spacer>

    <!-- Lista de productos -->
    <v-row>
      <v-col v-for="producto in productos" :key="producto.id" cols="12" md="4">
        <v-card class="mb-5 card" elevation="2">
          <!-- Imagen del producto -->
          <v-img :src="'http://localhost:8000/' + producto.image" aspect-ratio="1">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <!-- Nombre del producto -->
          <v-card-title class="text-center card-title">{{ producto.name }}</v-card-title>
          <v-card-actions class="card-actions">
            <!-- Botón para ver detalles -->
            <v-btn color="#342gob" text @click="verDetalles(producto)">Ver Detalles</v-btn>
            <!-- Botón para editar producto -->
            <v-btn color="#B69E6D" text @click="editarProducto(producto)">Editar</v-btn>
            <!-- Botón para eliminar producto -->
            <v-btn color="#886B4F" text @click="eliminarProducto(producto.id)">Eliminar</v-btn>
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
      mostrarModalAgregar: false,
      mostrarModalEditar: false,
      mostrarModalDetalles: false,
      nuevoProducto: {
        name: '',
        description: '',
        amount: '',
        stock: '',
        image: ''
      },
      productoSeleccionado: {},
      productoEditado: {},
    };
  },
  mounted() {
    this.obtenerProductos();
  },
  methods: {
    async obtenerProductos() {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/products', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        this.productos = response.data;
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    },
    async agregarProducto() {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const formData = new FormData();
        Object.keys(this.nuevoProducto).forEach(key => {
          formData.append(key, this.nuevoProducto[key]);
        });
        formData.append('image', this.nuevoProducto.image);
        await axios.post('http://localhost:8000/api/products/create', formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        // Actualizar la lista de productos después de agregar uno nuevo
        await this.obtenerProductos();
        this.mostrarModalAgregar = false;
        this.nuevoProducto = {
          name: '',
          description: '',
          amount: '',
          stock: '',
          image: ''
        };
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    },
    async eliminarProducto(productId) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        await axios.delete(`http://localhost:8000/api/products/delete/${productId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        this.obtenerProductos();
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    },
    verDetalles(producto) {
      this.productoSeleccionado = producto;
      this.mostrarModalDetalles = true;
    },
    editarProducto(producto) {
      this.productoEditado = { ...producto };
      this.mostrarModalEditar = true;
    },
    async guardarCambios() {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const formData = new FormData();
        Object.keys(this.productoEditado).forEach(key => {
          formData.append(key, this.productoEditado[key]);
        });
        formData.append('image', this.productoEditado.image);
        const productId = this.productoEditado.id;
        await axios.post(`http://localhost:8000/api/products/update/${productId}`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        this.obtenerProductos();
        this.mostrarModalEditar = false;
        this.productoEditado = {};
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
      }
    },
    handleFileUpload(event, target) {
      const file = event.target.files[0];
      this[target].image = file;
    },
  },
};
</script>

<style scoped>
/* Estilos específicos del componente */
.product-catalog {
  background-color: #f0f0f0; /* Color de fondo del contenedor */
  padding: 20px;
}

.text-center {
  text-align: center;
}

.mb-5 {
  margin-bottom: 20px;
}

.card {
  background-color: #edcda01d; /* Fondo del card */
  color: #daab60; /* Color del texto del card */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(228, 157, 94, 0.912); /* Sombra */
  transition: transform 0.3s ease-in-out; /* Transición al hacer hover */
}

.card:hover {
  transform: translateY(-5px); /* Efecto de elevación al hacer hover */
}

.card-title {
  font-size: 1.5rem; /* Tamaño del título */
  font-weight: bold; /* Peso del texto */
  margin-bottom: 0.5rem; /* Espacio inferior */
}

.card-actions {
  justify-content: space-between; /* Alinear botones de acciones */
}

/* Estilos para los botones de acciones */
.card-actions button {
  color: #a6876da8; /* Color del texto */
  border: none; /* Quitar borde */
  border-radius: 5px; /* Borde redondeado */
  padding: 0.5rem 1rem; /* Espaciado interno */
  cursor: pointer; /* Cursor al pasar sobre el botón */
  transition: background-color 0.3s ease-in-out; /* Transición al hacer hover */
}

.card-actions button:hover {
  background-color: #bfa58333; /* Cambio de color al hacer hover */
}

.dialog {
  border-radius: 8px;
}

.dialog-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.dialog-actions {
  justify-content: flex-end;
}

.hidden-input {
  display: none;
}
</style>
