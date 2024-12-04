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

const goToIngredients = (productId) => {
  router.push({ name: 'IngredientsByProduct', query: { productId: productId } });
};

// Function to get products from the API
const getProducts = (page = 1) => {
  axios.get(`http://localhost:5000/api/product/?page=${page}&limit=${pageSize}`)
    .then((res) => {
    products.value = res.data.data;
    totalPages.value = Math.ceil(res.data.total / pageSize);
    })
    .catch((error) => console.error("Error fetching products:", error));
};

// Function to delete a product
const deleteProduct = (id) => {
  axios
    .delete(`http://localhost:5000/api/product/${id}`)
    .then(() => {
      products.value = products.value.filter(
        (product) => product.id_product !== id
      );
      if (searchResult.value && searchResult.value.id_product === id) {
        searchResult.value = null;
        alert("Product has been deleted.");
      }
    })
    .catch((error) => console.error("Error deleting product:", error));
};

// Function to fetch a product by ID
const getProductById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/product/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

// Function to fetch products by category ID
const getProductsByCategory = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/product/category/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    return [];
  }
};

// Watch for changes in the route query to trigger a search when category_id is passed
watch(() => route.query.category_id, async (newCategoryId) => {
  if (newCategoryId) {
    const results = await getProductsByCategory(newCategoryId);
    products.value = results;
    searchQuery.value = newCategoryId; // Set the search query to category ID
  }
}, { immediate: true }); // Trigger immediately on initial load if `category_id` is present

// Function to handle search by ID
const searchById = async () => {
  if (searchQuery.value) {
    const id = parseInt(searchQuery.value, 10);
    if (isNaN(id)) {
      alert("Please enter a valid number");
      return;
    }
    const result = await getProductById(id);
    if (result) {
      searchResult.value = result;
    } else {
      alert("Product not found");
      searchResult.value = null;
    }
  } else {
    resetSearch();
  }
};

// Function to handle search by category ID
const searchByCategory = async () => {
  if (searchQuery.value) {
    const id = parseInt(searchQuery.value, 10);
    if (isNaN(id)) {
      alert("Please enter a valid number");
      return;
    }
    const results = await getProductsByCategory(id);
    if (results.length > 0) {
      products.value = results;
      searchResult.value = null; // Clear product search
    } else {
      alert("No products found for this category");
      products.value = [];
    }
  } else {
    resetSearch();
  }
};

// Function to reset the search
const resetSearch = () => {
  searchQuery.value = "";
  searchResult.value = null;
  getProducts();
};

// Computed property for filtered or full product list
const Products = computed(() => {
  if (searchQuery.value && searchResult.value) {
    return [searchResult.value];
  }
  return products.value;
});

// Navigate to the edit form
const goToEditForm = (id) => {
  router.push({ name: "ProductForm", params: { id } });
};

// Redirect to PriceHistory with id_product as a query parameter
const goToPriceHistory = (id) => {
  router.push({ name: "PriceHistory", query: { id_product: id } });
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
