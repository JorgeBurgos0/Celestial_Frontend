<template>
  <v-container class="user-catalog">
    <h1 class="text-center mb-5">Catálogo de Usuarios</h1>
    
    <!-- Botón para agregar nuevo usuario -->
    <v-btn color="#94BCB4" @click="mostrarModalAgregar = true">Agregar Usuario</v-btn>
    
    <!-- Línea divisoria -->
    <v-divider class="mb-5"></v-divider>
    
    <!-- Lista de usuarios -->
    <v-row>
      <v-col v-for="usuario in usuarios" :key="usuario.id" cols="12" md="6" lg="4">
        <v-card class="mb-5" elevation="2">
          <v-card-title>{{ usuario.name }}</v-card-title>
          <v-card-actions>
            <v-btn color="#B69E6D" text @click="verDetalles(usuario)">Ver Detalles</v-btn>
            <v-btn color="#66706A" text @click="eliminarUsuario(usuario.id)">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Modal para agregar nuevo usuario -->
    <v-dialog v-model="mostrarModalAgregar" max-width="600px">
      <v-card>
        <v-card-title>Agregar Nuevo Usuario</v-card-title>
        <v-card-text>
          <v-text-field v-model="nuevoUsuario.name" label="Nombre"></v-text-field>
          <v-text-field v-model="nuevoUsuario.email" label="Correo Electrónico"></v-text-field>
          <v-text-field v-model="nuevoUsuario.password" label="Contraseña" type="password"></v-text-field>
          <v-select v-model="nuevoUsuario.gender" :items="['Hombre', 'Mujer']" label="Género"></v-select>
          <v-text-field v-model="nuevoUsuario.age" label="Edad" type="number"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="#94BCB4" @click="agregarUsuario">Agregar</v-btn>
          <v-btn color="#B69E6D" @click="mostrarModalAgregar = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Modal para ver detalles del usuario -->
    <v-dialog v-model="mostrarModalDetalles" max-width="600px">
      <v-card>
        <v-card-title>Detalles del Usuario</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Nombre:</v-list-item-title>
                <v-list-item-subtitle>{{ usuarioSeleccionado.name }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Correo Electrónico:</v-list-item-title>
                <v-list-item-subtitle>{{ usuarioSeleccionado.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Género:</v-list-item-title>
                <v-list-item-subtitle>{{ usuarioSeleccionado.gender }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Edad:</v-list-item-title>
                <v-list-item-subtitle>{{ usuarioSeleccionado.age }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="#B69E6D" @click="mostrarModalDetalles = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      usuarios: [],
      mostrarModalAgregar: false,
      mostrarModalDetalles: false,
      nuevoUsuario: {
        name: '',
        email: '',
        password: '',
        gender: '',
        age: null
      },
      usuarioSeleccionado: {}
    };
  },
  mounted() {
    this.obtenerUsuarios();
  },
  methods: {
    async obtenerUsuarios() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.usuarios = response.data;
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    },
    async agregarUsuario() {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.post('http://localhost:8000/api/users/create', this.nuevoUsuario, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.obtenerUsuarios();
        this.mostrarModalAgregar = false;
        this.nuevoUsuario = {
          name: '',
          email: '',
          password: '',
          gender: '',
          age: null
        };
      } catch (error) {
        console.error('Error al agregar el usuario:', error);
      }
    },
    async eliminarUsuario(userId) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`http://localhost:8000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.obtenerUsuarios();
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    },
    verDetalles(usuario) {
      this.usuarioSeleccionado = usuario;
      this.mostrarModalDetalles = true;
    }
  }
};
</script>

<style scoped>
/* Estilos específicos del componente */
.user-catalog {
  background-color: #ddd0c142; /* Color de fondo del contenedor */
  padding: 20px;
}

.text-center {
  text-align: center;
}

.mb-5 {
  margin-bottom: 20px;
}

.card {
  background-color: #efbb7e; /* Fondo del card */
  color: #c19348; /* Color del texto del card */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgb(237, 48, 48); /* Sombra */
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
  color: #f0bb7585; /* Color del texto */
  border: none; /* Quitar borde */
  border-radius: 5px; /* Borde redondeado */
  padding: 0.5rem 1rem; /* Espaciado interno */
  cursor: pointer; /* Cursor al pasar sobre el botón */
  transition: background-color 0.3s ease-in-out; /* Transición al hacer hover */
}

.card-actions button:hover {
  background-color: #c1b968; /* Cambio de color al hacer hover */
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
</style>
