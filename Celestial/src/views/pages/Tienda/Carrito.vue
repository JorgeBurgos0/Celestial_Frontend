<template>
  <div class="cart-container">
    <div class="cart-items">
      <h2>Productos en el Carrito</h2>
      <div v-if="cartLoading" class="loading-text">Cargando...</div>
      <div v-else>
        <div v-if="cartProducts.length === 0" class="empty-cart">El carrito está vacío</div>
        <div v-else>
          <div class="cart-item" v-for="product in cartProducts" :key="product.id">
            <div class="item-info">
              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p>
              <p>Cantidad: {{ product.quantity }}</p>
              <img :src="product.image" alt="Product Image" class="product-image">
            </div>
            <button @click="removeFromCart(product.id)" class="remove-button">Quitar del carrito</button>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-summary">
      <h2>Resumen del Carrito</h2>
      <div class="summary-item" v-for="product in cartProducts" :key="product.id">
        <p>{{ product.name }}</p>
        <p>Cantidad: {{ product.quantity }}</p>
        <p>Precio unitario: ${{ product.amount }}</p>
        <hr class="divider">
      </div>
      <div class="total">
        <p>Total:</p>
        <p>${{ totalAmount }}</p>
      </div>
      <div class="checkout-button">
        <router-link to="/Compra">
          <button class="store-button">
            <i class="bx bx-store"></i>
            Realizar pago
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartProducts: [],
      totalAmount: 0,
      cartLoading: true
    };
  },
  mounted() {
    this.getCart();
  },
  methods: {
    async getCart() {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/cart', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        this.cartProducts = response.data.products.map(product => ({
          ...product,
          image: `http://localhost:8000/${product.image}`
        }));
        this.totalAmount = response.data.total_amount;
        this.cartLoading = false;
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    },
    async removeFromCart(productId) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        await axios.delete(`http://localhost:8000/api/cart/${productId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        // Actualizar la lista de productos en el carrito
        await this.getCart();
      } catch (error) {
        console.error('Error al quitar el producto del carrito:', error);
      }
    },
  }
};
</script>

<style scoped>
.cart-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.cart-items {
  width: 50%;
}

.cart-summary {
  width: 40%;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e5ded3;
  border: 1px solid #deceb7cc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}

.item-info {
  flex: 1; /* El contenido ocupa todo el espacio disponible */
}

.cart-item h3 {
  margin-top: 0;
}

.remove-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 10px;
}

.summary-item {
  margin-bottom: 15px;
}

.total {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  text-align: center;
}

.total p {
  margin: 0;
}

.checkout-button button {
  background-color: #cfbf66d1;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 16px;
}

.checkout-button button i {
  margin-right: 8px;
}
</style>
