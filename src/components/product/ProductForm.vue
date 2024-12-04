<template>
    <main class="product-form-container">
      <div>
        <h1 class="title">Add/Modify a Product</h1>
        <div>
          <form @submit.prevent="handleSubmit">
            <fieldset>
              <div class="form-group">
                <label for="id_product">Product ID (only enter to modify, leave empty to add new)</label>
                <input
                  v-model="product.id_product"
                  type="text"
                  name="id_product"
                  id="id_product"
                  placeholder="Enter the product ID"
                  class="form-input"
                />
              </div>
  
              <div class="form-group">
                <label for="id_category">Category ID</label>
                <input
                  v-model="product.id_category"
                  type="text"
                  name="id_category"
                  id="id_category"
                  placeholder="Enter the category ID"
                  class="form-input"
                  required
                />
              </div>
  
              <div class="form-group">
                <label for="product_name">Name</label>
                <input
                  v-model="product.product_name"
                  type="text"
                  name="product_name"
                  id="product_name"
                  placeholder="Enter the product name"
                  class="form-input"
                  required
                />
              </div>
  
              <div class="form-group">
                <label for="product_price">Price</label>
                <input
                  v-model="product.product_price"
                  type="text"
                  name="product_price"
                  id="product_price"
                  placeholder="Enter the product price"
                  class="form-input"
                  required
                />
              </div>
  
              <div class="form-group">
                <label for="description">Description</label>
                <input
                  v-model="product.description"
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter the description"
                  class="form-input"
                  required
                />
              </div>
  
              <div class="form-group">
                <label for="stock">Stock</label>
                <input
                  v-model="product.stock"
                  type="text"
                  name="stock"
                  id="stock"
                  placeholder="Enter the stock"
                  class="form-input"
                  required
                />
              </div>
  
              <div class="form-group">
                <label for="expiry_date">Expiry Date</label>
                <input
                  v-model="product.expiry_date"
                  type="date"
                  name="expiry_date"
                  id="expiry_date"
                  class="form-input"
                  required
                />
              </div>
  
              <div class="button-group">
                <button type="submit" class="btn btn-green">Submit</button>
                <button type="button" @click="resetForm" class="btn btn-red">Reset</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useRoute } from "vue-router";
  
  export default {
    setup() {
      const route = useRoute();
      const product = ref({
        id_product: "",
        id_category: "",
        product_name: "",
        product_price: "",
        description: "",
        stock: "",
        expiry_date: "",
      });
  
      const handleSubmit = async () => {
        if (product.value.id_product) {
          await updateProduct(product.value);
        } else {
          await addProduct(product.value);
        }
      };
  
      const addProduct = async (productData) => {
        try {
          await axios.post("http://localhost:5000/api/product/", [productData]);
          alert("Product added successfully");
          resetForm();
        } catch (error) {
          console.error("Error adding product:", error);
          alert("Error adding product");
        }
      };
  
      const updateProduct = async (productData) => {
        try {
          await axios.patch(`http://localhost:5000/api/product/${productData.id_product}`, productData);
          alert("Product updated successfully");
          resetForm();
        } catch (error) {
          console.error("Error updating product:", error);
          alert("Error updating product");
        }
      };
  
      const getProduct = async (id) => {
        try {
          const res = await axios.get(`http://localhost:5000/api/product/${id}`);
          product.value = res.data;
        } catch (error) {
          console.error("Error fetching product:", error);
          alert("Error loading product details");
        }
      };
  
      const resetForm = () => {
        product.value = {
          id_product: "",
          id_category: "",
          product_name: "",
          product_price: "",
          description: "",
          stock: "",
          expiry_date: "",
        };
      };
  
      onMounted(() => {
        const id = route.params.id;
        if (id) {
          getProduct(id);
        }
      });
  
      return {
        product,
        handleSubmit,
        resetForm,
      };
    },
  };
  </script>
  
  <style scoped>
  .product-form-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
  
  .title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  
  button {
    padding: 10px 15px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  button:active {
    transform: scale(0.98);
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
  