<template>
  <main class="supplier-list-container">
    <h1 class="title">Supplier List</h1>
    <!-- Search Bar -->
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search by Supplier ID" class="search-input" />
      <button @click="searchById" class="btn btn-green">Search</button>
      <button @click="resetSearch" class="btn btn-red">Reset</button>
    </div>
    <!-- Table for displaying suppliers -->
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Supplier ID</th>
            <th>Supplier Name</th>
            <th>Supplier Address</th>
            <th>Telephone Contact</th>
            <th>Supplier Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="supplier in Suppliers" :key="supplier.id_supplier">
            <td>{{ supplier.id_supplier }}</td>
            <td>{{ supplier.supplier_name }}</td>
            <td>{{ supplier.supplier_address }}</td>
            <td>{{ supplier.telephone_contact }}</td>
            <td>{{ supplier.supplier_email }}</td>
            <td class="actions">
              <!-- Action buttons for updating and deleting -->
              <button @click="goToEditForm(supplier.id_supplier)" class="btn btn-primary">Update</button>
              <button @click="deleteSupplier(supplier.id_supplier)" class="btn btn-red">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-red">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-green">Next</button>
    </div>
  </main>
</template>

<script setup>
// Import necessary libraries and modules
import { ref, computed, onBeforeMount } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// Router instance
const router = useRouter();

// Reactive references
const suppliers = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 10; // Number of items per page
const searchQuery = ref("");

// Fetch suppliers from the API
const getSuppliers = async (page = 1) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/supplier?page=${page}&limit=${pageSize}`);
    suppliers.value = response.data.data;
    totalPages.value = Math.ceil(response.data.total / pageSize);
    currentPage.value = page;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    alert("An error occurred.");
  }
};

// Delete a supplier by ID
const deleteSupplier = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/supplier/${id}`);
    getSuppliers(currentPage.value); // Refresh supplier list
  } catch (error) {
    console.error("Error deleting supplier:", error);
    alert("An error occurred.");
  }
};

// Navigate to the edit form for a supplier
const goToEditForm = (id) => {
  router.push({ name: "SupplierForm", params: { id } });
};

// Search for a supplier by ID
const searchById = async () => {
  if (searchQuery.value) {
    const id = parseInt(searchQuery.value, 10);
    if (!isNaN(id)) {
      try {
        const result = await axios.get(`http://localhost:5000/api/supplier/${id}`);
        if (result.data) {
          suppliers.value = [result.data]; // Display only the found supplier
        } else {
          alert("Supplier not found");
        }
      } catch (error) {
        console.error("Error searching supplier:", error);
        alert("An error occurred.");
      }
    } else {
      alert("Please enter a valid number");
    }
  }
};

// Reset the search query and refresh the supplier list
const resetSearch = () => {
  searchQuery.value = "";
  getSuppliers(currentPage.value);
};

// Computed property for supplier data
const Suppliers = computed(() => suppliers.value);

// Handle pagination - go to the previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    getSuppliers(currentPage.value - 1);
  }
};

// Handle pagination - go to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    getSuppliers(currentPage.value + 1);
  }
};

// Fetch supplier list when the component is mounted
onBeforeMount(() => getSuppliers(currentPage.value));
</script>

<style scoped>
/* Styles for the supplier list */
.supplier-list-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

/* Search bar styling */
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.search-input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}

/* Table styles */
.table {
  width: 100%;
  border-collapse: collapse;
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

/* Button styles */
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

/* Pagination styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}

.table-container {
  overflow-x: auto;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    align-items: stretch;
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