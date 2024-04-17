<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
              class="d-flex text-primary"
              v-html="logo"
            />
          </div>
        </template>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          La aventura empieza aqui 🚀
        </h5>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="register">
          <VRow>
            <!-- Nombre -->
            <VCol cols="12">
              <VTextField
                v-model="form.name"
                autofocus
                label="Nombre"
              />
            </VCol>
            <!-- Correo -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Correo"
                type="email"
              />
            </VCol>
            <!-- Contraseña -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Contraseña"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>
            <!-- Género -->
            <VCol cols="12">
              <VSelect v-model="form.gender" :items="['Hombre', 'Mujer']" label="Género"></VSelect>
            </VCol>
            <!-- Edad -->
            <VCol cols="12">
              <VTextField
                v-model="form.age"
                label="Edad"
                type="number"
              />
            </VCol>

            <VCol>
              <div v-if="message" class="message" :class="{ 'error': isError }">{{ message }}</div>
            </VCol>

            <VBtn
              block
              type="submit"
            >
              Sign up
            </VBtn>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<script setup>
import logo from '@images/celestial-4.svg?raw';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  name: '',
  email: '',
  password: '',
  gender: '',
  age: null
});

const isPasswordVisible = ref(false);
const message = ref('');
const isError = ref(false);

const register = () => {
  axios.post('http://127.0.0.1:8000/api/register', {
    name: form.value.name,
    email: form.value.email,
    password: form.value.password,
    gender: form.value.gender,
    age: form.value.age
  })
  .then(response => {
    console.log('Registration response:', response.data);
    if (response.status === 200 && response.data.message === 'Registration successful') {
      message.value = '¡Registro exitoso! Ahora puedes iniciar sesión.';
      router.push('/login');
    } else {
      message.value = 'Error en el registro. Por favor, inténtelo de nuevo.';
      isError.value = true;
    }
  })
  .catch(error => {
    console.error('Registration error:', error);
    message.value = 'Error en el registro. Por favor, inténtelo de nuevo más tarde.';
    isError.value = true;
  });
};
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";

.message {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #dff0d8; /* Color de fondo para mensajes de éxito */
  border: 1px solid #d6e9c6; /* Color del borde para mensajes de éxito */
  color: #3c763d; /* Color de texto para mensajes de éxito */
}

.message.error {
  background-color: #f2dede; /* Color de fondo para mensajes de error */
  border-color: #ebccd1; /* Color del borde para mensajes de error */
  color: #a94442; /* Color de texto para mensajes de error */
}
</style>
