<template>
    <div class="user-form-container">
      <form @submit.prevent="handleSubmit" class="user-form">
        <h1 class="form-title">User Details</h1>
        <fieldset>
          <div class="form-group">
            <label for="id_user">User ID (leave empty to add new)</label>
            <input
              type="text"
              id="id_user"
              v-model="user.id_user"
              placeholder="Enter User ID if updating"
            />
          </div>
  
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="user.username"
              placeholder="Enter the username"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="user.password"
              placeholder="Enter the password"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="surname">Surname</label>
            <input
              type="text"
              id="surname"
              v-model="user.surname"
              placeholder="Enter a surname"
            />
          </div>
  
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              v-model="user.name"
              placeholder="Enter a name"
            />
          </div>
  
          <div class="form-group">
            <label for="contact_info">Contact Info (phone number)</label>
            <input
              type="text"
              id="contact_info"
              v-model="user.contact_info"
              placeholder="Enter a phone number"
            />
          </div>
  
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="user.email"
              placeholder="Enter an email"
            />
          </div>
  
          <div class="form-group">
            <label for="role">Role (client or employee)</label>
            <input
              type="text"
              id="role"
              v-model="user.role"
              placeholder="Enter the role"
            />
          </div>
  
          <div class="form-group">
            <label for="address">Address</label>
            <input
              type="text"
              id="address"
              v-model="user.address"
              placeholder="Enter the address"
            />
          </div>
  
          <div class="form-group">
            <label for="city">City</label>
            <input
              type="text"
              id="city"
              v-model="user.city"
              placeholder="Enter the city"
            />
          </div>
  
          <div class="form-group">
            <label for="province">Province</label>
            <input
              type="text"
              id="province"
              v-model="user.province"
              placeholder="Enter the province"
            />
          </div>
  
          <div class="form-group">
            <label for="country">Country</label>
            <input
              type="text"
              id="country"
              v-model="user.country"
              placeholder="Enter the country"
            />
          </div>
  
          <div class="form-group">
            <label for="postal_code">Postal Code</label>
            <input
              type="text"
              id="postal_code"
              v-model="user.postal_code"
              placeholder="Enter the postal code"
            />
          </div>
  
          <div class="form-group">
            <label for="image">Profile Image</label>
            <input type="file" id="image" @change="handleFileChange" />
          </div>
  
          <div class="form-buttons">
            <button type="submit" class="btn btn-green">Submit</button>
            <button type="button" class="btn btn-red" @click="resetForm">
              Reset
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  
  export default {
    setup() {
      const route = useRoute();
      const user = ref({
        id_user: "",
        username: "",
        password: "",
        surname: "",
        name: "",
        contact_info: "",
        email: "",
        role: "",
        address: "",
        city: "",
        province: "",
        country: "",
        postal_code: "",
      });
      const image = ref(null);
  
      const fetchUser = async () => {
        const userId = route.params.id;
        if (userId) {
          try {
            const response = await axios.get(
              `http://localhost:5000/api/user/${userId}`
            );
            if (response.data && response.data.data) {
              Object.assign(user.value, response.data.data);
            } else {
              alert("User not found");
            }
          } catch (error) {
            alert(`Failed to fetch user: ${error.response?.data.message || error.message}`);
          }
        }
      };
  
      onMounted(fetchUser);
  
      const handleFileChange = (event) => {
        image.value = event.target.files[0];
      };
  
      const resetForm = () => {
        Object.keys(user.value).forEach((key) => {
          user.value[key] = "";
        });
        image.value = null;
      };
  
      const handleSubmit = async () => {
        const formData = new FormData();
        Object.keys(user.value).forEach((key) => {
          if (user.value[key]) {
            formData.append(key, user.value[key]);
          }
        });
        if (image.value) {
          formData.append("Image", image.value);
        }
  
        const method = user.value.id_user ? "patch" : "post";
        const url = `http://localhost:5000/api/user/${
          user.value.id_user ? `${user.value.id_user}` : ""
        }`;
  
        try {
          await axios({
            method: method,
            url: url,
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          alert("User successfully added or updated");
          resetForm();
        } catch (error) {
          alert(`Failed to submit user: ${error.response?.data.message || error.message}`);
        }
      };
  
      return { user, image, handleFileChange, handleSubmit, resetForm };
    },
  };
  </script>
  
  <style scoped>
  .user-form-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
  
  .form-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .btn {
    padding: 10px 15px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
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
  