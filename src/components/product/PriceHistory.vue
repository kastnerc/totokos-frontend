<template>
  <div class="price-history-container">
    <h1>Search Price History by Product ID</h1>
    <form @submit.prevent="fetchPriceHistory">
      <label for="product-id">Product ID:</label>
      <input
        v-model="productId"
        type="number"
        id="product-id"
        placeholder="Enter product ID"
        required
      />
      <button type="submit" class="btn btn-green">Search</button>
    </form>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="loading" class="loading-message">
      Loading...
    </div>

    <div v-if="priceHistories.length" class="price-history-results">
      <h2>Price History for Product ID: {{ productId }}</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Price ($)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="history in priceHistories" :key="history.id">
            <td>{{ history.id_product }}</td>
            <td>{{ history.price }}</td>
            <td>{{ new Date(history.date).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="!loading && !error" class="no-results-message">
      <p>No price history found for this Product ID.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const productId = ref("");
    const priceHistories = ref([]);
    const error = ref(null);
    const loading = ref(false);

    const route = useRoute();

    const fetchPriceHistory = async () => {
      error.value = null;
      loading.value = true;
      priceHistories.value = [];

      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/${productId.value}/price-history/`
        );
        priceHistories.value = response.data.data;
      } catch (err) {
        error.value = err.response?.data?.message || "Error fetching data";
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      const idFromRoute = route.query.id_product;
      if (idFromRoute) {
        productId.value = idFromRoute;
        fetchPriceHistory();
      }
    });

    return { productId, priceHistories, error, loading, fetchPriceHistory };
  },
};
</script>

<style scoped>
.price-history-container {
  max-width: 600px;
  margin: 20px auto 270px;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  font-weight: bold;
  color: #555;
}

input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:active {
  transform: scale(0.98);
}

.btn-green {
  background-color: #28a745;
  color: #fff;
}

.btn-green:hover {
  background-color: #218838;
}

.error-message {
  color: #dc3545;
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
}

.loading-message {
  text-align: center;
  font-style: italic;
  margin-top: 10px;
}

.price-history-results {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f8f8f8;
  font-weight: bold;
  color: #333;
}

.no-results-message {
  text-align: center;
  font-style: italic;
  color: #777;
  margin-top: 10px;
}
</style>
