<template>
  <main class="ingredient-list-container">
    <h1>Ingredient List</h1>
    <div class="search-bar">
      <input v-model="searchQuery.id_ingredient" placeholder="Search by Ingredient ID" />
      <input v-model="searchQuery.id_supplier" placeholder="Search by Supplier ID" />
      <button @click="search" class="btn btn-green">Search</button>
      <button @click="resetSearch" class="btn btn-red">Reset</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Ingredient ID</th>
          <th>Supplier ID</th>
          <th>Name</th>
          <th>Stock</th>
          <th>Expiry Date</th>
          <th>Price per unit</th>
          <th>Unit measure</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in Ingredients" :key="ingredient.id_ingredient">
          <td>{{ ingredient.id_ingredient }}</td>
          <td>{{ ingredient.id_supplier }}</td>
          <td>{{ ingredient.ingredient_name }}</td>
          <td>{{ ingredient.stock }}</td>
          <td>{{ ingredient.expiry_date }}</td>
          <td>{{ ingredient.price_per_unit }}</td>
          <td>{{ ingredient.unit_measure }}</td>
          <td>
            <button class="btn btn-green" @click="updateIngredient(ingredient.id_ingredient)">Update</button>
            <button @click="deleteIngredient(ingredient.id_ingredient)" class="btn btn-red">Delete</button>
          </td>
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
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const ingredients = ref([]);
const searchQuery = ref({ id_ingredient: "", id_supplier: "" });
const searchResult = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 10;

// Fetch ingredients with pagination
const getIngredients = async (page = 1) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/ingredient?page=${page}&limit=${pageSize}`);
    ingredients.value = res.data.data;
    totalPages.value = Math.ceil(res.data.total / pageSize);
    searchResult.value = null;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
  }
};

// Delete an ingredient
const deleteIngredient = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/ingredient/${id}`);
    await getIngredients(currentPage.value);
  } catch (error) {
    console.error("Error deleting ingredient:", error);
  }
};

// Update ingredient
const updateIngredient = (id) => {
  router.push({ name: "IngredientForm", params: { id } });
};

// Search by Ingredient ID
const getIngredientById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/ingredient/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching ingredient by ID:", error);
    return null;
  }
};

// Search by Supplier ID
const getIngredientsBySupplierId = async (id_supplier) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/ingredient/supplier/${id_supplier}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching ingredients by Supplier ID:", error);
    return null;
  }
};

// Search function
const search = async () => {
  const { id_ingredient, id_supplier } = searchQuery.value;

  if (id_ingredient) {
    const id = parseInt(id_ingredient, 10);
    if (isNaN(id)) {
      alert("Please enter a valid number for Ingredient ID");
      return;
    }
      const result = await getIngredientById(id);
      if (result) {
        searchResult.value = [result];
        return;
      }
    }
  

  if (id_supplier) {
    const id = parseInt(id_supplier, 10);
    if (isNaN(id)) {
      alert("Please enter a valid number for Supplier ID");
      return;
    }
      const result = await getIngredientsBySupplierId(id);
    if (result && result.length > 0) {
        searchResult.value = result;
        return;
      }
    }
  

  // If no valid search result, reset
  searchResult.value = null;
  alert("No search results found");
};

// Reset search
const resetSearch = () => {
  searchQuery.value = { id_ingredient: "", id_supplier: "" };
  searchResult.value = null;
  getIngredients(currentPage.value);
};

// Filtered ingredients
const Ingredients = computed(() => {
  if (searchResult.value) {
    return searchResult.value;
  }
  return ingredients.value;
});

// Fetch ingredients on mount
onMounted(() => {
  getIngredients();
});

// Pagination methods
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    getIngredients(currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    getIngredients(currentPage.value);
  }
};

// Initial fetch
onMounted(() => {
  getIngredients();
});
</script>

<style scoped>
.ingredient-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-bar input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
  margin-top: 20px;
}

.pagination span {
  margin: 0 15px;
}
</style>
