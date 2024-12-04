<template>
  <main class="order-list-container">
    <h1 class="title">Order List</h1>
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search by Order ID or User ID" class="search-input" />
      <button @click="searchByOrderId" class="btn btn-green">Search by Order ID</button>
      <button @click="searchByUserId" class="btn btn-green">Search by User ID</button>
      <button @click="resetSearch" class="btn btn-red">Reset</button>
    </div>
    <table class="table">
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
          <td class="actions">
            <button @click="goToUpdateForm(order.id_order)" class="btn btn-primary">Update</button>
            <button class="btn btn-green">Details</button>
            <button @click="deleteOrder(order.id_order)" class="btn btn-red">Delete</button>
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
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const orders = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const pageSize = 10;
const searchQuery = ref("");
const router = useRouter();
const route = useRoute();

const getOrders = async (page = 1) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/order/?page=${page}&limit=${pageSize}`);
    orders.value = res.data.data;
    totalPages.value = Math.ceil(res.data.total / pageSize);
    currentPage.value = page;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

const searchByOrderId = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/order/${searchQuery.value}`);
    orders.value = res.data ? [res.data] : [];
    totalPages.value = 1;
  } catch (error) {
    console.error("Error fetching order:", error);
    alert("Order not found.");
    resetSearch();
  }
};

const searchByUserId = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/user/${searchQuery.value}/orders`);
    orders.value = res.data.data;
    totalPages.value = Math.ceil(res.data.data.length / pageSize);
  } catch (error) {
    alert("User not found or no orders.");
    resetSearch();
  }
};

const resetSearch = () => {
  searchQuery.value = "";
  getOrders(currentPage.value);
};

const deleteOrder = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/order/${id}`);
    getOrders(currentPage.value);
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};

const goToUpdateForm = (id) => {
  router.push({ name: "OrderForm", params: { id } });
};

onMounted(() => {
  const userIdFromUrl = route.query.userId;
  if (userIdFromUrl) {
    searchQuery.value = userIdFromUrl;
    searchByUserId();
  } else {
    getOrders(currentPage.value);
  }
});
</script>

<style scoped>
.order-list-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

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

.actions {
  display: flex;
  gap: 10px;
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

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
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
