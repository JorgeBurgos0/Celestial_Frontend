/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import VueApexCharts from 'vue3-apexcharts';
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { Carousel, Slide } from 'vue-carousel'
import { loadStripe } from '@stripe/stripe-js'
import { createAppToast } from 'vue-toast3';

loadFonts()


// Create vue app
const app = createApp(App)


// Use plugins
app.use(vuetify)
app.use(VueApexCharts);
app.use(createPinia())
app.use(router)

// Mount vue app
app.mount('#app')

// Ahora puedes usar loadStripe en tu aplicación
const stripePromise = loadStripe('pk_test_51P1FIv00oKzWBWE9IWJsctw2Trm5Jv6zhibGaXSYkribn0HHvEIhKQKxclZqfLY4TsoJOstUiY9HVoVVVRRwwTq700W3AJvKWO');

export { stripePromise }; // Exporta stripePromise si necesitas usarlo en otros archivos

const toast = createAppToast();
app.config.globalProperties.$toast = toast;