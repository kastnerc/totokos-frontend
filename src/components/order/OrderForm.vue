<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <h1>Add/Modify an Order</h1>
        <fieldset>
          <div>
            <label for="id_order">Order ID (only enter to modify, leave empty to add new)</label>
            <div>
              <input v-model="order.id_order" type="text" name="id_order" id="id_order" placeholder="Enter the order ID">
            </div>
          </div>
  
          <div>
            <label for="user_id">User ID</label>
            <div>
              <input v-model="order.id_user" type="text" name="user_id" id="user_id" placeholder="Enter the user ID" required>
            </div>
          </div>
  
          <div>
            <label for="order_date">Order Date</label>
            <div>
              <input v-model="order.order_date" type="date" name="order_date" id="order_date" required>
            </div>
          </div>
  
          <div>
            <label for="total_price">Total Price</label>
            <div>
              <input v-model="order.total_price" type="number" name="total_price" id="total_price" required>
            </div>
          </div>
  
          <div>
            <label for="status">Status</label>
            <div>
              <input v-model="order.status" type="text" name="status" id="status" required>
            </div>
          </div>
  
          <div>
            <label for="products">Select Products</label>
            <select v-model="selectedProducts" multiple>
              <option v-for="product in products" :key="product.id_product" :value="product.id_product">
                {{ product.product_name }} - ${{ product.product_price }}
              </option>
            </select>
          </div>
  
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const order = ref({
  id_order: '',
  id_user: '',
  order_date: '',
  total_price: '',
  status: '',
  reservation: '',
  pickup_date: ''
});
const products = ref([]);
const selectedProducts = ref([]);

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/product');
    products.value = response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const handleSubmit = async () => {
  if (order.value.id_order) {
    await updateOrder(order.value);
  } else {
    await addOrder(order.value);
  }
};

const addOrder = async (orderData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/order', { ...orderData, products: selectedProducts.value });
    console.log('Order added successfully:', response.data);
    alert('Order added successfully');
  } catch (error) {
    console.error('Error adding order:', error);
    alert('Error adding order');
  }
};

const updateOrder = async (orderData) => {
  try {
    const response = await axios.patch(`http://localhost:5000/api/order/${orderData.id_order}`, { ...orderData, products: selectedProducts.value });
    console.log('Order updated successfully:', response.data);
    alert('Order updated successfully');
  } catch (error) {
    console.error('Error updating order:', error);
    alert('Error updating order');
  }
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
    selectedProducts.value = response.data.products.map(p => p.id_product);
  } catch (error) {
    console.error('Error fetching order:', error);
  }
};
</script>
