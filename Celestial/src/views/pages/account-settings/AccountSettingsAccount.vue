<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

// Variables reactivas para almacenar los datos del usuario
const userData = ref({ name: '', email: '', gender: '', age: '' });

// Función para obtener los datos del usuario desde la API
const fetchUserData = async () => {
  const userId = getUserId(); // Obtener el ID del usuario
  if (!userId) {
    console.error('No se encontró ningún ID de usuario en el almacenamiento local.');
    return;
  }

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.error('No se encontró ningún token de acceso en el almacenamiento local.');
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8000/api/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const { data } = response.data;
    userData.value = data;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
  }
};

// Función para obtener el ID del usuario
const getUserId = () => {
  // Aquí puedes implementar la lógica para obtener el ID del usuario
  // Por ejemplo, si estás almacenando el ID del usuario en localStorage, puedes hacer algo como:
  return localStorage.getItem('userId');
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
                <VTextField v-model="userData.name" label="Nombre" disabled />
              </VCol>
              <!-- Correo -->
              <VCol cols="12" md="6">
                <VTextField v-model="userData.email" label="Correo electrónico" type="email" disabled />
              </VCol>
              <!-- Género -->
              <VCol md="6" cols="12">
                <VTextField v-model="userData.gender" label="Género" disabled />
              </VCol>
              <!-- Edad -->
              <VCol cols="12" md="6">
                <VTextField v-model="userData.age" label="Edad" type="number" disabled />
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
