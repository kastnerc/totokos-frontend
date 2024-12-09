<template>
  <div class="order-form-container">
    <form @submit.prevent="handleSubmit">
      <h1 class="form-title">Add/Modify an Order</h1>
      <fieldset class="form-fieldset">
        <div class="form-group">
          <label for="id_order">Order ID (only enter to modify, leave empty to add new)</label>
          <input v-model="order.id_order" type="text" id="id_order" placeholder="Enter the order ID" />
        </div>

        <div class="form-group">
          <label for="user_id">User ID</label>
          <input v-model="order.id_user" type="text" id="user_id" placeholder="Enter the user ID" required />
        </div>

        <div class="form-group">
          <label for="pickup_date">Pickup Date</label>
          <input v-model="order.pickup_date" type="date" id="pickup_date" />
        </div>

        <div class="form-group" v-if="order.id_order">
          <label for="status">Status</label>
          <input v-model="order.status" type="text" id="status" placeholder="Enter the order status" :required="!!order.id_order" />
        </div>

        <div class="form-group" v-if="!order.id_order">
          <label for="products">Select Products</label>
          <select v-model="selectedProductIds" multiple>
            <option v-for="product in products" :key="product.id_product" :value="product.id_product">
              {{ product.product_name }} - ${{ product.product_price }}
            </option>
          </select>
        </div>

        <div v-for="id in selectedProductIds" :key="id" class="selected-product">
          <label>{{ findProductName(id) }} Quantity:</label>
          <input type="number" v-model="findProductById(id).quantity" min="1">
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
  pickup_date: "",
  status: ""
});
const products = ref([]);
const selectedProductIds = ref([]);

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/product");
    products.value = response.data.data.map(product => ({
      ...product,
      quantity: 1  // Initialize quantity for each product
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const handleSubmit = async () => {
  // Regex validations
  const userIdRegex = /^[0-9]+$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const statusRegex = /^[A-Za-z\s]*$/; // Allow letters and spaces, empty allowed if not updating
  const quantityRegex = /^[0-9]+$/;

  // Validate user ID
  if (!userIdRegex.test(order.value.id_user)) {
    alert("User ID must be numeric.");
    return;
  }

  // Validate pickup_date if provided
  if (order.value.pickup_date && !dateRegex.test(order.value.pickup_date)) {
    alert("Pickup date must be in YYYY-MM-DD format.");
    return;
  }

  // If we are updating (id_order present), status is required
  if (order.value.id_order && !order.value.status) {
    alert("Status is required when updating an order.");
    return;
  }

  // Validate status if provided
  if (order.value.status && !statusRegex.test(order.value.status)) {
    alert("Status must contain only letters and spaces.");
    return;
  }

  // If we are adding a new order, we must have selected products
  if (!order.value.id_order && selectedProductIds.value.length === 0) {
    alert("Please select at least one product.");
    return;
  }

  // Validate product quantities
  for (const id of selectedProductIds.value) {
    const product = products.value.find(p => p.id_product === id);
    if (!quantityRegex.test(String(product.quantity)) || product.quantity < 1) {
      alert(`Quantity for product ${findProductName(id)} must be a positive number.`);
      return;
    }
  }

  const productsWithQuantities = selectedProductIds.value.map(id => {
    const product = products.value.find(p => p.id_product === id);
    return {
      id_product: id,
      quantity: product.quantity
    };
  });

  const orderDetails = {
    id_user: order.value.id_user,
    pickup_date: order.value.pickup_date ? order.value.pickup_date : null,
    status: order.value.status,
    products: productsWithQuantities
  };

  // Additional required checks before sending
  if (!orderDetails.id_user) {
    alert("User ID is required.");
    return;
  }
  if (!order.value.id_order && (!orderDetails.products || !orderDetails.products.length)) {
    alert("Please select at least one product when adding an order.");
    return;
  }

  const payload = order.value.id_order ? orderDetails : [orderDetails]; 
  const endpoint = order.value.id_order ? `http://localhost:5000/api/order/${order.value.id_order}` : "http://localhost:5000/api/order";
  const method = order.value.id_order ? 'patch' : 'post';

  try {
    await axios[method](endpoint, payload);
    alert(`Order ${order.value.id_order ? 'updated' : 'added'} successfully`);
  } catch (error) {
    console.error("Error submitting order:", error);
    alert(`An error occurred: ${error.response?.data?.message || error.message}`);
  }
};

const resetForm = () => {
  order.value = { id_order: "", id_user: "", pickup_date: "", status: "" };
  selectedProductIds.value = [];
};

const findProductName = (id) => {
  const product = products.value.find(p => p.id_product === id);
  return product ? product.product_name : '';
};

const findProductById = (id) => {
  const product = products.value.find(p => p.id_product === id);
  return product || {};
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
    selectedProductIds.value = response.data.products.map(p => p.id_product);
    // Sync the quantities
    response.data.products.forEach(product => {
      const found = products.value.find(p => p.id_product === product.id_product);
      if (found) found.quantity = product.quantity;
    });
  } catch (error) {
    console.error("Error fetching order:", error);
  }
};
</script>

<style scoped>
.order-form-container {
  max-width: 600px;
  margin: 20px auto;
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
