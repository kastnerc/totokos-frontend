<template>
  <main class="product-category-list-container">
    <h1 class="title">Product Category List</h1>
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search by Product Category ID" class="search-input" />
      <button @click="searchById" class="btn btn-green">Search</button>
      <button @click="resetSearch" class="btn btn-red">Reset</button>
    </div>
    <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Product Category ID</th>
          <th>Category Name</th>
          <th>Category Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product_category in paginatedProductCategories" :key="product_category.id_category">
          <td>{{ product_category.id_category }}</td>
          <td>{{ product_category.category_name }}</td>
          <td>{{ product_category.category_description }}</td>
          <td class="actions">
            <button @click="goToEditForm(product_category.id_category)" class="btn btn-primary">Update</button>
            <button @click="goToProductsPage(product_category.id_category)" class="btn btn-green">Products in Category</button>
            <button @click="deleteProduct_category(product_category.id_category)" class="btn btn-red">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-red">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-green">Next</button>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const product_categories = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const pageSize = 10;
const searchQuery = ref("");

const getProduct_categories = async (page = 1) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/product_category?page=${page}&limit=${pageSize}`);
    product_categories.value = response.data.data;
    totalPages.value = Math.ceil(response.data.total / pageSize);
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching product categories:', error);
  }
};

const deleteProduct_category = (id) => {
  axios.delete(`http://localhost:5000/api/product_category/${id}`)
    .then(() => {
      getProduct_categories(currentPage.value); // Reload the current page of product categories
    })
    .catch(error => console.error('Error deleting product category:', error));
};

const goToEditForm = (id) => {
  router.push({ name: 'Product_CategoryForm', params: { id } });
};

const goToProductsPage = (id_category) => {
  router.push({ name: 'ProductList', query: { category_id: id_category } });
};

const searchById = async () => {
  if (searchQuery.value) {
    const id = parseInt(searchQuery.value, 10);
    if (!isNaN(id)) {
      const result = await axios.get(`http://localhost:5000/api/product_category/${id}`);
      if (result.data) {
        product_categories.value = [result.data]; // Display only the searched category
        totalPages.value = 1; // Reset to 1 since only one item is displayed
      } else {
        alert("Product category not found");
      }
    } else {
      alert("Please enter a valid number");
    }
  }
};

const resetSearch = () => {
  searchQuery.value = "";
  getProduct_categories(currentPage.value);
};

const paginatedProductCategories = computed(() => product_categories.value);

const prevPage = () => {
  if (currentPage.value > 1) {
    getProduct_categories(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    getProduct_categories(currentPage.value + 1);
  }
};

onBeforeMount(() => {
  getProduct_categories(currentPage.value);
});
</script>

<style scoped>
.product-category-list-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
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

.search-input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
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
  background-color: #f8f8f8;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 5px;
}

.btn {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 8px 12px;
  margin: 0 5px;
}
.table-container {
  overflow-x: auto; 
  margin-top: 10px; 
}

.table {
  min-width: 800px; 
  width: 100%; 
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f8f8f8;
  font-weight: bold;
}

@media (max-width: 768px) {
  .search-bar {
    flex-direction: column; 
    align-items: stretch;
  }
  .search-input {
    width: 100%; 
  }

  .table {
    font-size: 12px; 
  }

  .table th,
  .table td {
    padding: 8px; 
  }

  .pagination {
    flex-direction: column; 
  }
}

@media (max-width: 480px) {
  .table {
    min-width: 600px;
  }
  .search-input {
    width: 100%;
  }

  .btn {
    font-size: 12px;
    padding: 6px 10px;
  }

  .table th,
  .table td {
    font-size: 11px;
    padding: 6px;
  }
}
</style>
