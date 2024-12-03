<template>
  <main>
    <h1>Order List</h1>
    <div>
      <input v-model="searchQuery" placeholder="Search by Order ID" />
      <button @click="searchById">Search</button>
      <button @click="resetSearch">Reset</button>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>User ID</th>
          <th>Order Date</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Reservation</th>
          <th>Pickup Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in paginatedOrders" :key="order.id_order">
          <td>{{ order.id_order }}</td>
          <td>{{ order.id_user }}</td>
          <td>{{ order.order_date }}</td>
          <td>{{ order.total_price }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.reservation }}</td>
          <td>{{ order.pickup_date }}</td>
          <td>
            <button @click="goToUpdateForm(order.id_order)" class="btn btn-primary">Update</button>
            <button class="btn btn-success">Details</button>
            <button @click="deleteOrder(order.id_order)" class="btn btn-danger">Delete</button>
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

const orders = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const pageSize = 10;
const searchQuery = ref("");
const searchResult = ref(null);
const router = useRouter();

const getOrders = (page = 1) => {
  axios.get(`http://localhost:5000/api/order/?page=${page}&limit=${pageSize}`)
    .then(res => {
      orders.value = res.data.data;
      totalPages.value = Math.ceil(res.data.total / pageSize);
      currentPage.value = page;
    })
    .catch(error => console.error("Error fetching orders:", error));
};

const goToUpdateForm = (id) => {
  router.push({ name: "OrderForm", params: { id } });
  console.log('Redirecting to update form for order:', id); // Placeholder
};

const searchById = async () => {
  if (searchQuery.value) {
    const id = parseInt(searchQuery.value, 10);
    if (!isNaN(id)) {
      const result = await axios.get(`http://localhost:5000/api/order/${id}`);
      if (result.data) {
        orders.value = [result.data]; // Display only the searched order
        totalPages.value = 1; // Reset total pages as we are showing one result
      } else {
        alert("Order not found");
        resetSearch();
      }
    } else {
      alert("Please enter a valid number");
    }
  }
};

const resetSearch = () => {
  searchQuery.value = "";
  getOrders(currentPage.value);
};

const deleteOrder = (id) => {
  axios.delete(`http://localhost:5000/api/order/${id}`)
    .then(() => {
      getOrders(currentPage.value); // Refresh the list after deletion
    })
    .catch(error => console.error("Error deleting order:", error));
};

const paginatedOrders = computed(() => orders.value);

const prevPage = () => {
  if (currentPage.value > 1) {
    getOrders(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    getOrders(currentPage.value + 1);
  }
};

onBeforeMount(() => {
  getOrders(currentPage.value);
});
</script>


<style scoped>
/* Add your styles here */
</style>
