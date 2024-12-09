<template>
  <main class="product-list-container">
    <h1 class="title">Client Product List</h1>
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search by Product Name" class="search-input" />
      <button @click="searchProducts" class="btn btn-green">Search</button>
      <button @click="resetSearch" class="btn btn-red">Reset</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price ($)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.product_name">
          <td>{{ product.product_name }}</td>
          <td>{{ product.product_price }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-red">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-green">Next</button>
    </div>
  </main>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';

const products = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 10;
const searchQuery = ref("");

const fetchProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/product/product-page`, {
      params: {
        page: currentPage.value,
        limit: pageSize,
        product_name: searchQuery.value
      }
    });
    products.value = response.data.data;
    totalPages.value = response.data.pages;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const searchProducts = () => {
  currentPage.value = 1;
  fetchProducts();
};

const resetSearch = () => {
  searchQuery.value = "";
  fetchProducts();
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchProducts();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchProducts();
  }
};

onBeforeMount(fetchProducts);
</script>

<style scoped>
.product-list-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.search-input {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table th,
.table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}

.btn {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-green {
  background-color: #28a745;
  color: white;
}

.btn-green:hover {
  background-color: #218838;
}

.btn-red {
  background-color: #dc3545;
  color: white;
}

.btn-red:hover {
  background-color: #c82333;
}
</style>
