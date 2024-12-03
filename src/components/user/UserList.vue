<template>
  <main>
    <h1>User list</h1>
    <div>
      <input v-model="searchQuery" placeholder="Search by User ID" />
      <button @click="searchById">Search</button>
      <button @click="resetSearch">Reset</button>
    </div>
    <table class="table table-striped">
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
          <th>Image</th> <!-- Added image column -->
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
          <td><img :src="user.image" alt="User Image" style="width: 50px; height: auto;"></td> <!-- Image display -->
          <td>
            <button class="btn btn-primary" @click="goToUpdate(user.id_user)">Update</button> <!-- Modified button -->
            <button @click="goToOrders(user.id_user)" class="btn btn-info">View Orders</button>
            <button @click="deleteUser(user.id_user)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
  
  <script setup>
  import { onBeforeMount, ref, computed } from 'vue';
  // Import Axios for communication with the API
  import axios from 'axios';
  import { useRouter } from 'vue-router'; // Import router
  
  // Define the users variable
  const users = ref([]);
const searchQuery = ref(""); // Search input value
const searchResult = ref(null); // Search result (for a single user)
const router = useRouter();

const goToOrders = (userId) => {
  router.push({ name: 'OrderList', query: { userId } }); // Assumes you have a route named 'OrderList' that can handle a query parameter for user ID
};
  
  // Function to get the users from the API
  const getUsers = () => {
    axios.get('http://localhost:5000/api/user/')
      .then(res => {
        console.log("liste", res)
        users.value = res.data.data;
        console.log("liste", users.value)
      })
      .catch(error => console.error(error));
  }
  
  const deleteUser = (id) => {
  axios.delete(`http://localhost:5000/api/user/${id}`)
    .then(() => {
      console.log(`User with ID ${id} deleted`);

      // Remove the user from the users array directly
      users.value = users.value.filter(user => user.id_user !== id);

      // Check if the deleted user is in the search result
      if (searchResult.value && searchResult.value.id_user === id) {
        searchResult.value = null; // Clear the search result if the deleted user is shown
        alert("User has been deleted.");
      }
    })
    .catch(error => console.error("Error deleting user:", error));
};


  
// Function to fetch an user by ID
const getUserById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/user/${id}`);
    return res.data.data; // Return the fetched user
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null; // Return null if there was an error
  }
};

// Function to handle the search by ID
const searchById = async () => {
  if (searchQuery.value) {
    // Convert searchQuery to an integer
    const id = parseInt(searchQuery.value, 10);
    if (isNaN(id)) {
      alert("Please enter a valid number");
      return;
    }

    const result = await getUserById(id);
    if (result) {
      searchResult.value = result;
    } else {
      alert("user not found");
      searchResult.value = null; // Ensure this is set to null if not found
    }
  } else {
    resetSearch();
  }
};

// Function to reset the search
const resetSearch = () => {
  searchQuery.value = ""; // Clear the search input
  searchResult.value = null; // Clear the search result
  getUsers(); // Reload all users
};

// Computed property to return filtered or full list of users
const Users = computed(() => {
  if (searchQuery.value && searchResult.value) {
    return [searchResult.value];
  }
  return users.value;
});

// New function to handle navigation for updating user
const goToUpdate = (id) => {
  router.push({ name: 'UserForm', params: { id } }); // Assumes you have a route named 'UserForm'
};
  
  onBeforeMount(() => {
    getUsers();
  });
  
  </script>

<style scoped>
img {
  width: 50px; /* Set a fixed width for the images */
  height: auto; /* Maintain aspect ratio */
}
</style>