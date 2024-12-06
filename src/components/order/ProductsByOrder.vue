<template>
    <main class="order-product-container">
      <!-- Search Products by Order ID -->
      <div class="search-bar">
        <h2>Search Products by Order ID</h2>
        <input v-model="orderIdQuery" placeholder="Enter Order ID" class="search-input" />
        <button @click="fetchProductsByOrderId" class="btn btn-green">Search</button>
        <button @click="resetSearch" class="btn btn-red">Reset</button>
      </div>
  
      <!-- Display Products Linked to Order -->
      <table v-if="orderProducts.length > 0" class="table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Product Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in orderProducts" :key="product.id_product">
            <td>{{ product.id_product }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.product_price ? `$${parseFloat(product.product_price).toFixed(2)}` : 'N/A' }}</td>
            <td class="actions">
              <button class="btn btn-red" @click="deleteProductFromOrder(product.id_product)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No products linked to this order.</p>
    </main>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  import axios from "axios";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const orderIdQuery = ref(route.params.orderId);
  const orderProducts = ref([]);
  
  const fetchProductsByOrderId = async () => {
    if (!orderIdQuery.value) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/order/${orderIdQuery.value}/product`);
      orderProducts.value = response.data.data.map(entry => ({
        id_product: entry.id_product,
        quantity: entry.Order_Product.quantity,
        product_price: entry.product_price
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      alert(`Error fetching products: ${error.response?.data.data.message || error.message}`);
      orderProducts.value = [];
    }
  };

  watch(() => route.params.id, (newOrderId) => {
    orderIdQuery.value = newOrderId;
    fetchProductsByOrderId();
  }, { immediate: true });
  
  const resetSearch = () => {
    orderIdQuery.value = "";
    orderProducts.value = [];
  };
  
  const deleteProductFromOrder = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/order/${orderIdQuery.value}/product/${productId}`);
      alert('Product removed from order successfully');
      fetchProductsByOrderId();
    } catch (error) {
      console.error("Error deleting product from order:", error);
      alert(`Error deleting product: ${error.response?.data.data.message || error.message}`);
    }
  };
  </script>
  
  <style scoped>
  .order-product-container {
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .title, .search-bar h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: bold;
    color: #333;
  }
  
  .search-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .search-input, .btn {
    padding: 10px 15px;
    margin: 5px;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th, .table td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  
  .table th {
    background-color: #f8f8f8;
  }
  
  .actions {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .btn {
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: #007bff;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  
  .btn-red {
    background-color: #dc3545;
  }
  
  .btn-red:hover {
    background-color: #c82333;
  }
  </style>
  