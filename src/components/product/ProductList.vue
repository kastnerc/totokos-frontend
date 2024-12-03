<template>
  <main>
    <h1>Product List</h1>
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search by Product ID or Category ID" />
      <button @click="searchById" class="btn btn-success">Search by Product ID</button>
      <button @click="searchByCategory" class="btn btn-success">Search by Category ID</button>
      <button @click="resetSearch" class="btn btn-danger">Reset</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Category ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Description</th>
          <th>Stock</th>
          <th>Expiry Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in Products" :key="product.id_product">
          <td>{{ product.id_product }}</td>
          <td>{{ product.id_category }}</td>
          <td>{{ product.product_name }}</td>
          <td>{{ product.product_price }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.expiry_date }}</td>
          <td class="actions">
            <button @click="goToEditForm(product.id_product)" class="btn btn-primary">Update</button>
            <button @click="goToIngredients(product.id_product)" class="btn btn-success">Ingredient Details</button>
            <button @click="goToPriceHistory(product.id_product)" class="btn btn-warning">Price History</button>
            <button @click="deleteProduct(product.id_product)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-danger">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-success">Next</button>
    </div>
  </main>
</template>

<script setup>
import { onBeforeMount, ref, computed, watch } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 10;

const products = ref([]);
const searchQuery = ref("");
const searchResult = ref(null);
const route = useRoute();
const router = useRouter();

const getProducts = async (page = 1) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/product/?page=${page}&limit=${pageSize}`);
    products.value = res.data.data;
    totalPages.value = Math.ceil(res.data.total / pageSize);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const deleteProduct = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/product/${id}`);
    products.value = products.value.filter(product => product.id_product !== id);
    alert("Product deleted successfully.");
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

const searchById = async () => {
  if (searchQuery.value) {
    try {
      const res = await axios.get(`http://localhost:5000/api/product/${searchQuery.value}`);
      searchResult.value = res.data;
    } catch (error) {
      alert("Product not found.");
    }
  }
};

const searchByCategory = async () => {
  if (searchQuery.value) {
    try {
      const res = await axios.get(`http://localhost:5000/api/product/category/${searchQuery.value}`);
      products.value = res.data.data;
    } catch (error) {
      alert("No products found in this category.");
    }
  }
};

const resetSearch = () => {
  searchQuery.value = "";
  getProducts();
};

const goToEditForm = (id) => {
  router.push({ name: "ProductForm", params: { id } });
};

const goToIngredients = (productId) => {
  router.push({ name: "IngredientsByProduct", query: { productId } });
};

const goToPriceHistory = (productId) => {
  router.push({ name: "PriceHistory", query: { id_product: productId } });
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    getProducts(currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    getProducts(currentPage.value);
  }
};

onBeforeMount(() => {
  getProducts(currentPage.value);
});
</script>

<style scoped>
main {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:active {
  transform: scale(0.98);
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-warning {
  background-color: #ffc107;
  color: white;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.table tr:hover {
  background-color: #f1f1f1;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 12px;
  margin: 0 5px;
}
</style>
