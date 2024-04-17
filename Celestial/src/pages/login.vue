<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@images/celestial-4.svg?raw';

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const isPasswordVisible = ref(false)
const router = useRouter()

const login = () => {
  if (!form.value.email || !form.value.password) {
    console.error('Por favor, complete todos los campos.')
    return
  }

  const loginData = {
    email: form.value.email,
    password: form.value.password
  }

  axios.post('http://127.0.0.1:8000/api/login', loginData)
    .then(response => {
      if (response.data.accessToken) {
        console.log('Inicio de sesión exitoso.')
        
        // Almacena el token en localStorage
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('userRole', response.data.role); // Almacena el rol del usuario

        // Redirige al usuario al dashboard después del inicio de sesión exitoso
        router.push('/Home');
      } else {
        console.error('Credenciales inválidas. Por favor, inténtelo de nuevo.')
      }
    })
    .catch(error => {
      console.error('Error al iniciar sesión:', error)
    })
}
</script>

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
          Bienvenido a celestial! 👋🏻
        </h5>
        <p class="mb-0">
          Porfavor inicia sesion y Empieza la aventura
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="login">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                autofocus
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <VCol>
                
              </VCol>

              <!-- login button -->
              <VBtn
                class="custom-btn"
                block
                type="submit"
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <RouterLink
                class="text-primary ms-2"
                to="/register"
              >
                Create an account
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
