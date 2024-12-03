<template>
  <div class="order-form-container">
    <form @submit.prevent="handleSubmit">
      <h1 class="form-title">Add/Modify an Order</h1>
      <fieldset class="form-fieldset">
        <div class="form-group">
          <label for="id_order">Order ID</label>
          <input
            v-model="order.id_order"
            type="text"
            name="id_order"
            id="id_order"
            placeholder="Enter the order ID"
            readonly
          />
        </div>

        <div class="form-group">
          <label for="user_id">User ID</label>
          <input
            v-model="order.id_user"
            type="text"
            name="user_id"
            id="user_id"
            placeholder="Enter the user ID"
            required
          />
        </div>

        <div class="form-group">
          <label for="order_date">Order Date</label>
          <input
            v-model="order.order_date"
            type="date"
            name="order_date"
            id="order_date"
            required
          />
        </div>

        <div class="form-group">
          <label for="total_price">Total Price</label>
          <input
            v-model="order.total_price"
            type="number"
            name="total_price"
            id="total_price"
            placeholder="Enter the total price"
            required
          />
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <input
            v-model="order.status"
            type="text"
            name="status"
            id="status"
            placeholder="Enter the order status"
            required
          />
        </div>

        <div class="form-group">
          <label for="products">Select Products</label>
          <select v-model="selectedProducts" multiple>
            <option
              v-for="product in products"
              :key="product.id_product"
              :value="product.id_product"
            >
              {{ product.product_name }} - ${{ product.product_price }}
            </option>
          </select>
        </div>

        <div class="form-buttons">
          <button type="submit" class="btn btn-green">Submit</button>
          <button type="button" class="btn btn-red" @click="resetForm">Reset</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const order = ref({
  id_order: "",
  id_user: "",
  order_date: "",
  total_price: "",
  status: "",
});
const products = ref([]);
const selectedProducts = ref([]);

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/product");
    products.value = response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const handleSubmit = async () => {
  try {
    if (order.value.id_order) {
      await axios.patch(
        `http://localhost:5000/api/order/${order.value.id_order}`,
        { ...order.value, products: selectedProducts.value }
      );
      alert("Order updated successfully");
    } else {
      await axios.post("http://localhost:5000/api/order", {
        ...order.value,
        products: selectedProducts.value,
      });
      alert("Order added successfully");
    }
  } catch (error) {
    console.error("Error submitting order:", error);
    alert("An error occurred");
  }
};

const resetForm = () => {
  order.value = {
    id_order: "",
    id_user: "",
    order_date: "",
    total_price: "",
    status: "",
  };
  selectedProducts.value = [];
};

onMounted(() => {
  fetchProducts();
  if (route.params.id) {
    getOrderById(route.params.id);
  }
});

const getOrderById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/order/${id}`);
    order.value = response.data;
    selectedProducts.value = response.data.products.map((p) => p.id_product);
  } catch (error) {
    console.error("Error fetching order:", error);
  }
};
</script>

<style scoped>
.order-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.form-fieldset {
  border: none;
  padding: 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group select {
  height: auto;
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
  font-weight: bold;
}

.btn-green {
  background-color: #28a745;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-green:hover {
  background-color: #218838;
}

.btn-red {
  background-color: #dc3545;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-red:hover {
  background-color: #c82333;
}
</style>
