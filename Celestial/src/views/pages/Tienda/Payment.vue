<template>
  <div class="payment-container">
    <div class="products-column">
      <h2>Detalles del Pedido</h2>
      <div v-if="products.length === 0">No hay productos en el carrito</div>
      <div v-else>
        <div v-for="product in products" :key="product.id" class="product">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p>Cantidad: {{ product.quantity }}</p>
          <p>Precio: {{ formatCurrency(product.amount) }}</p>
        </div>
        <p>Total a pagar: {{ formatCurrency(totalAmount) }}</p>
      </div>
    </div>
    <div class="payment-column">
      <div class="payment-form">
        <h2>Detalles de Pago</h2>
        <form @submit.prevent="submitPayment">
          <div class="input-field">
            <label for="name">Nombre en la tarjeta</label>
            <input type="text" id="name" v-model="cardName" class="text-input" required>
          </div>
          <div class="input-field">
            <label for="card-number">Número de tarjeta</label>
            <div id="card-number" class="input-element"></div>
          </div>
          <div class="input-field">
            <label for="expiry">Fecha de expiración</label>
            <div id="expiry" class="input-element"></div>
          </div>
          <div class="input-field">
            <label for="cvc">CVC</label>
            <div id="cvc" class="input-element"></div>
          </div>
          <div class="input-field">
            <label for="email">Correo electrónico</label>
            <input type="email" id="email" v-model="email" class="text-input" required>
          </div>
          <div class="input-field">
            <label for="postal-code">Código Postal</label>
            <input type="text" id="postal-code" v-model="postalCode" class="text-input" required>
          </div>
          <div id="card-errors" role="alert" v-if="errorMessage">{{ errorMessage }}</div>
          <button type="submit" class="btn-pay" :disabled="processing">
            {{ processing ? 'Procesando...' : 'Pagar' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

export default {
  name: 'PaymentForm',
  setup() {
    const products = ref([]);
    const totalAmount = ref(0);
    const processing = ref(false);
    const errorMessage = ref('');
    const cardName = ref('');
    const email = ref('');
    const postalCode = ref('');
    let stripe;
    let elements;

    const stripePromise = loadStripe('pk_test_51P1FIv00oKzWBWE9IWJsctw2Trm5Jv6zhibGaXSYkribn0HHvEIhKQKxclZqfLY4TsoJOstUiY9HVoVVVRRwwTq700W3AJvKWO');

    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cart', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const data = await response.json();
        products.value = data.products;
        totalAmount.value = data.total_amount;
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    const formatCurrency = amount => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const submitPayment = async () => {
      processing.value = true;

      const accessToken = localStorage.getItem('accessToken');

      // Validar los campos
      if (!elements || !stripe) {
        errorMessage.value = 'Error al cargar el formulario de pago';
        processing.value = false;
        return;
      }

      try {
        // Generar el token de tarjeta usando Stripe
        const cardElement = elements.getElement('cardNumber');
        const { token, error } = await stripe.createToken(cardElement, {
          name: cardName.value,
          email: email.value,
          address_zip: postalCode.value
        });

        if (error) {
          console.error('Error al crear el token de la tarjeta:', error);
          errorMessage.value = error.message;
          processing.value = false;
          return;
        }

        // Enviar el token al servidor para procesar el pago
        const response = await fetch('http://localhost:8000/api/store/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            token: token.id,
            // Puedes incluir otros datos relevantes aquí, como el monto del pago, detalles del pedido, etc.
          }),
        });

        if (response.ok) {
          // Pago exitoso
          console.log('Pago exitoso');
          // Actualizar el stock después de la compra
          await updateStockAfterPurchase();
          // Actualizar la lista de productos en el carrito
          await fetchCart();
          // Redireccionar al usuario a la página de la tienda o a su perfil
          window.location.href = 'http://localhost:5173/Tienda'; // Cambia '/store' por la ruta de la tienda o del perfil del usuario
          // Aquí puedes realizar cualquier acción adicional después de un pago exitoso
        } else {
          // Error al procesar el pago
          console.error('Error al procesar el pago:', response.statusText);
          errorMessage.value = 'Error al procesar el pago';
        }
      } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        errorMessage.value = 'Error al procesar la solicitud';
      }

      processing.value = false;
    };

    const updateStockAfterPurchase = async () => {
      // Aquí puedes enviar una solicitud al backend para actualizar el stock de los productos comprados
      try {
        // Por ejemplo:
        const response = await fetch('http://localhost:8000/api/store/update-stock', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify({
            // Aquí envía la lista de productos comprados o cualquier otra información necesaria para actualizar el stock
          }),
        });

        if (!response.ok) {
          console.error('Error al actualizar el stock:', response.statusText);
        }
      } catch (error) {
        console.error('Error al actualizar el stock:', error);
      }
    };

    onMounted(fetchCart);

    stripePromise.then(stripeInstance => {
      stripe = stripeInstance;
      elements = stripe.elements();

      // Estilo del elemento de tarjeta
      const style = {
        base: {
          fontSize: '16px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a'
        }
      };

      // Crear los elementos de tarjeta de crédito y montarlos
      const cardNumber = elements.create('cardNumber', { style });
      cardNumber.mount('#card-number');
      const expiry = elements.create('cardExpiry', { style });
      expiry.mount('#expiry');
      const cvc = elements.create('cardCvc', { style });
      cvc.mount('#cvc');
    });

    return {
      products,
      totalAmount,
      processing,
      errorMessage,
      cardName,
      email,
      postalCode,
      formatCurrency,
      submitPayment
    };
  },
};
</script>


<style scoped>
.payment-container {
  display: flex;
  justify-content: space-between;
}

.products-column {
  flex: 1;
  margin-right: 20px;
}

.payment-column {
  flex: 1;
}

.payment-form {
  max-width: 400px;
}

.input-field {
  margin-bottom: 20px;
}

.input-element {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

#card-errors {
  color: red;
  margin-bottom: 10px;
}

.btn-pay {
  background-color: #4CAF50;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-pay:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.btn-pay:hover {
  background-color: #45a049;
}

.text-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.product {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
