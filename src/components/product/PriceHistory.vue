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
        <button type="submit">Search</button>
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      productId: "", // Input field value
      priceHistories: [], // Array to store the fetched price histories
      error: null, // Error message if any
      loading: false, // Loading state
    };
  },
  methods: {
    async fetchPriceHistory() {
      this.error = null;
      this.loading = true;
      this.priceHistories = [];

      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/${this.productId}/price-history/`
        );
        this.priceHistories = response.data.data;
      } catch (err) {
        this.error = err.response?.data?.message || "Error fetching data";
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    const route = useRoute();
    this.productId = route.query.id_product; // Fetch id_product from query parameters
    if (this.productId) {
      this.fetchPriceHistory(); // Automatically fetch price history
    }
  },
};
</script>

  
  <style scoped>
  .price-history-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  input {
    padding: 8px;
    font-size: 16px;
  }
  
  button {
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .error-message {
    color: red;
    text-align: center;
  }
  
  .loading-message {
    text-align: center;
    font-style: italic;
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
    padding: 8px;
  }
  
  th {
    background-color: #f4f4f4;
    text-align: left;
  }
  </style>