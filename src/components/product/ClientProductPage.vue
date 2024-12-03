<template>
    <main>
      <h1>Client Product List</h1>
      <div>
        <input v-model="searchQuery" placeholder="Search by Product Name" />
        <button @click="searchProducts">Search</button>
        <button @click="resetSearch">Reset</button>
      </div>
      <table class="table table-striped">
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
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
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
  currentPage.value = 1; // Reset to the first page for a new search
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
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}
</style>