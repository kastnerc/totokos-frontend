<template>
  <main class="user-list-container">
    <h1>User List</h1>
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search by User ID" class="search-input" />
      <button @click="searchById" class="btn btn-green">Search</button>
      <button @click="resetSearch" class="btn btn-red">Reset</button>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Surname</th>
            <th>Name</th>
            <th>Contact Info</th>
            <th>Email</th>
            <th>Role</th>
            <th>Last Connection Date</th>
            <th>Address</th>
            <th>City</th>
            <th>Province</th>
            <th>Country</th>
            <th>Postal Code</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in Users" :key="user.id_user">
            <td>{{ user.id_user }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.contact_info }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.last_connection_date }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.city }}</td>
            <td>{{ user.province }}</td>
            <td>{{ user.country }}</td>
            <td>{{ user.postal_code }}</td>
            <td><img :src="user.image" alt="User Image" class="user-image" /></td>
            <td class="actions">
              <button @click="goToUpdate(user.id_user)" class="btn btn-blue">Update</button>
              <button @click="goToOrders(user.id_user)" class="btn btn-green">View Orders</button>
              <button @click="deleteUser(user.id_user)" class="btn btn-red">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import { onBeforeMount, ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const users = ref([]);
const searchQuery = ref("");
const searchResult = ref(null);
const router = useRouter();

const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/user/");
    users.value = response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/user/${id}`);
    users.value = users.value.filter((user) => user.id_user !== id);
    if (searchResult.value?.id_user === id) {
      searchResult.value = null;
    }
    alert("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/user/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

const searchById = async () => {
  if (searchQuery.value) {
    const id = parseInt(searchQuery.value, 10);
    if (isNaN(id)) {
      alert("Please enter a valid number");
      return;
    }
    const result = await getUserById(id);
    searchResult.value = result || null;
    if (!result) alert("User not found");
  } else {
    resetSearch();
  }
};

const resetSearch = () => {
  searchQuery.value = "";
  searchResult.value = null;
  getUsers();
};

const Users = computed(() => {
  return searchResult.value ? [searchResult.value] : users.value;
});

const goToUpdate = (id) => {
  router.push({ name: "UserForm", params: { id } });
};

const goToOrders = (userId) => {
  router.push({ name: "OrderList", query: { userId } });
};

onBeforeMount(getUsers);
</script>

<style scoped>
.user-list-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}

.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  min-width: 1500px; /* Adjust this value based on your content needs */
  border-collapse: collapse;
  margin-top: 20px;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #f4f4f4;
}

.user-image {
  width: 50px;
  height: auto;
  border-radius: 4px;
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

.btn-blue {
  background-color: #007bff;
  color: white;
}

.btn-blue:hover {
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
</style>