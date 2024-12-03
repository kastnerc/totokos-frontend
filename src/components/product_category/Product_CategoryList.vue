<template>
  <main>
    <h1>Product Category List</h1>
    <div>
      <input v-model="searchQuery" placeholder="Search by Product Category ID" />
      <button @click="searchById">Search</button>
      <button @click="resetSearch">Reset</button>
    </div>
    <table class="table table-striped">
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
          <td>
            <button @click="goToEditForm(product_category.id_category)" class="btn btn-primary">Update</button>
            <button @click="goToProductsPage(product_category.id_category)" class="btn btn-success">Products in Category</button>
            <button @click="deleteProduct_category(product_category.id_category)" class="btn btn-danger">Delete</button>
          </td>
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
/* Add your styles here */
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
