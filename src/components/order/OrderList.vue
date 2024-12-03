<template>
  <main>
    <h1>Order List</h1>
    <div>
      <input v-model="searchQuery" placeholder="Search by Order ID or User ID" />
      <button @click="searchByOrderId">Search by Order ID</button>
      <button @click="searchByUserId">Search by User ID</button>
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
        <tr v-for="order in orders" :key="order.id_order">
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
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const orders = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const pageSize = 10;
const searchQuery = ref("");
const router = useRouter();
const route = useRoute();

const getOrders = async (page = 1) => {
  axios.get(`http://localhost:5000/api/order/?page=${page}&limit=${pageSize}`)
    .then(res => {
      orders.value = res.data.data;
      totalPages.value = Math.ceil(res.data.total / pageSize);
      currentPage.value = page;
    })
    .catch(error => console.error("Error fetching orders:", error));
};

const searchByOrderId = async () => {
  if (searchQuery.value) {
    try {
      const response = await axios.get(`http://localhost:5000/api/order/${searchQuery.value}`);
      orders.value = response.data ? [response.data] : [];
      totalPages.value = 1;
    } catch (error) {
      console.error("Error fetching order:", error);
      alert("Order not found or error occurred.");
      resetSearch();
    }
  }
};

const searchByUserId = async () => {
  if (searchQuery.value) {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${searchQuery.value}/orders`);
      orders.value = response.data.data.length > 0 ? response.data.data : [];
      totalPages.value = Math.ceil(response.data.data.length / pageSize);
    } catch (error) {
      alert("User not found or no orders for this user.");
      resetSearch();
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

const goToUpdateForm = (id) => {
  router.push({ name: "OrderForm", params: { id } });
};

// Load initial data or perform search based on URL parameters
onMounted(() => {
  const userIdFromUrl = route.query.userId;
  if (userIdFromUrl) {
    searchQuery.value = userIdFromUrl;  // Set the user ID into the search bar
    searchByUserId();  // Trigger the search function
  } else {
    getOrders(currentPage.value);  // Load the initial set of orders if no user ID is specified
  }
});
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
