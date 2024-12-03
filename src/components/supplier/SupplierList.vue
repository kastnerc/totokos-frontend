<template>
  <main>
    <h1>Supplier list</h1>
    <div>
      <input v-model="searchQuery" placeholder="Search by Supplier ID" />
      <button @click="searchById">Search</button>
      <button @click="resetSearch">Reset</button>
    </div>
    <table class="table table-striped">
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
          <td>
            <button @click="goToEditForm(supplier.id_supplier)" class="btn btn-primary">Update</button>
            <button class="btn btn-success">Details</button>
            <button @click="deleteSupplier(supplier.id_supplier)" class="btn btn-danger">Delete</button>
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
const suppliers = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 10; // Number of items per page
const searchQuery = ref(""); // Search input value

const getSuppliers = async (page = 1) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/supplier?page=${page}&limit=${pageSize}`);
    suppliers.value = response.data.data;
    totalPages.value = Math.ceil(response.data.total / pageSize);
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    alert('An error occurred.');
  }
};

const deleteSupplier = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/supplier/${id}`);
    getSuppliers(currentPage.value);
  } catch (error) {
    console.error('Error deleting supplier:', error);
    alert('An error occurred.');
  }
};

const goToEditForm = (id) => {
  router.push({ name: 'SupplierForm', params: { id } });
};

const searchById = async () => {
  if (searchQuery.value) {
    const id = parseInt(searchQuery.value, 10);
    if (!isNaN(id)) {
      const result = await axios.get(`http://localhost:5000/api/supplier/${id}`);
      if (result.data) {
        suppliers.value = [result.data];
      } else {
        alert("Supplier not found");
      }
    } else {
      alert("Please enter a valid number");
    }
  }
};

const resetSearch = () => {
  searchQuery.value = "";
  getSuppliers(currentPage.value);
};

const Suppliers = computed(() => suppliers.value);

const prevPage = () => {
  if (currentPage.value > 1) {
    getSuppliers(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    getSuppliers(currentPage.value + 1);
  }
};

onBeforeMount(() => getSuppliers(currentPage.value));
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
