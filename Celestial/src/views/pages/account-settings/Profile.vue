<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

// Variables reactivas para almacenar los datos del usuario
const userData = ref({ nombre: '', correo: '' });

// Función para obtener los datos del usuario desde la API
const fetchUserData = () => {
  const token = JSON.parse(localStorage.getItem('accessToken'));
  if (!token) {
    console.error('No se encontró ningún token de acceso en el almacenamiento local.');
    return;
  }
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  axios.get('http://localhost:8000/api/profile')
    .then(response => {
      const { nombre, correo } = response.data;
      userData.value.nombre = nombre;
      userData.value.correo = correo;
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });
};

// Llama a la función para obtener los datos del usuario cuando el componente se monta
onMounted(() => {
  fetchUserData();
});
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Detalles de la cuenta">
        <VCardText>
          <VForm class="mt-6">
            <VRow>
              <!-- Nombre -->
              <VCol md="6" cols="12">
                <VTextField v-model="userData.nombre" label="Nombre" disabled />
              </VCol>
              <!-- Correo -->
              <VCol cols="12" md="6">
                <VTextField v-model="userData.correo" label="Correo electrónico" type="email" disabled />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- Botón para desactivar cuenta -->
      <VCard title="Desactivar cuenta">
        <VCardText>
          <div>
            <VCheckbox v-model="isAccountDeactivated" label="Confirmo la desactivación de mi cuenta" />
          </div>

          <VBtn :disabled="!isAccountDeactivated" color="error" class="mt-3" @click="deactivateAccount">
            Desactivar cuenta
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
