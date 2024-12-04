<template>
  <main class="ingredient-product-container">
    <h1 class="title">Ingredient-Product Management</h1>

    <!-- Search Ingredients by Product ID -->
    <div class="search-bar">
      <h2>Search Ingredients by Product ID</h2>
      <input v-model="productIdQuery" placeholder="Enter Product ID" class="search-input" />
      <button @click="fetchIngredientsByProductId" class="btn btn-green">Search</button>
      <button @click="resetSearch" class="btn btn-red">Reset</button>
    </div>

    <!-- Display Ingredients Linked to Product -->
    <table v-if="ingredientProducts.length > 0" class="table">
      <thead>
        <tr>
          <th>Ingredient ID</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="link in ingredientProducts" :key="link.id_ingredient">
          <td>{{ link.id_ingredient }}</td>
          <td>{{ link.quantity }}</td>
          <td class="actions">
            <button class="btn btn-blue" @click="editQuantity(link)">Edit</button>
            <button class="btn btn-red" @click="deleteLink(link.id_ingredient)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No ingredients linked to this product.</p>

    <!-- Add New Link -->
    <div class="add-link">
      <h2>Add Ingredient to Product</h2>
      <form @submit.prevent="addLink">
        <input v-model="newLink.id_ingredient" placeholder="Ingredient ID" class="input" required />
        <input v-model="newLink.quantity" placeholder="Quantity" class="input" required />
        <button type="submit" class="btn btn-green">Add Link</button>
      </form>
    </div>

    <!-- Edit Quantity Modal -->
    <div v-if="isEditing" class="modal">
      <div class="modal-content">
        <h3>Edit Quantity</h3>
        <form @submit.prevent="updateQuantity">
          <input v-model="editingLink.quantity" placeholder="New Quantity" class="modal-form input" required />
          <button type="submit" class="btn btn-blue">Update</button>
          <button type="button" class="btn btn-red" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from 'vue-router';
import axios from "axios";

const route = useRoute();
const productIdQuery = ref("");
const ingredientProducts = ref([]);
const newLink = ref({ id_ingredient: "", quantity: "" });
const isEditing = ref(false);
const editingLink = ref({ id_ingredient: "", quantity: "" });

const fetchIngredientsByProductId = async () => {
  if (!productIdQuery.value) return;
  try {
    const response = await axios.get(`http://localhost:5000/api/product/${productIdQuery.value}/ingredients`);
    ingredientProducts.value = response.data.data.map((item) => ({
      id_ingredient: item.id_ingredient,
      quantity: item.Ingredient_Product.quantity,
    }));
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    alert(`Error fetching ingredients: ${error.response?.data.message || error.message}`);
    ingredientProducts.value = [];
  }
};

const resetSearch = () => {
  productIdQuery.value = "";
  ingredientProducts.value = [];
};

const addLink = async () => {
  if (!productIdQuery.value || !newLink.value.id_ingredient || !newLink.value.quantity) {
    alert('Please ensure all fields are filled correctly.');
    return;
  }
  try {
    await axios.post("http://localhost:5000/api/product/ingredients", {
      id_product: productIdQuery.value,
      id_ingredient: newLink.value.id_ingredient,
      quantity: newLink.value.quantity,
    });
    alert('Link added successfully');
    fetchIngredientsByProductId();
    newLink.value = { id_ingredient: "", quantity: "" };
  } catch (error) {
    console.error("Error adding link:", error);
    alert(`Error adding link: ${error.response?.data.message || error.message}`);
  }
};

const editQuantity = (link) => {
  const newQuantity = prompt(`Enter new quantity for Ingredient ID ${link.id_ingredient}`, link.quantity);
  if (newQuantity !== null && newQuantity !== link.quantity) {
    updateQuantity(link.id_ingredient, newQuantity);
  }
};

const updateQuantity = async (id_ingredient, quantity) => {
  try {
    await axios.patch(
      `http://localhost:5000/api/product/${productIdQuery.value}/ingredients/${id_ingredient}`,
      { quantity: quantity }
    );
    alert('Quantity updated successfully');
    fetchIngredientsByProductId();
  } catch (error) {
    console.error("Error updating quantity:", error.response?.data || error.message);
    alert(`Failed to update quantity: ${error.response?.data.message || error.message}`);
  }
};

const deleteLink = async (id_ingredient) => {
  try {
    await axios.delete(`http://localhost:5000/api/product/${productIdQuery.value}/ingredients/${id_ingredient}`);
    fetchIngredientsByProductId();
    alert('Link deleted successfully');
  } catch (error) {
    console.error("Error deleting link:", error);
    alert(`Error deleting link: ${error.response?.data.message || error.message}`);
  }
};

watch(() => route.query.productId, (newProductId) => {
  productIdQuery.value = newProductId;
  if (newProductId) {
    fetchIngredientsByProductId();
  }
}, { immediate: true });

const cancelEdit = () => {
  isEditing.value = false;
  editingLink.value = { id_ingredient: "", quantity: "" };
};
</script>

<style scoped>
.ingredient-product-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: bold;
  color: #333;
}

.search-bar,
.add-link {
  margin-bottom: 30px;
}

.search-bar h2,
.add-link h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #555;
}

.search-input,
.input {
  padding: 12px;
  margin-right: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.05);
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

.table th,
.table td {
  padding: 15px;
  text-align: left;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f8f8f8;
  font-weight: bold;
  color: #444;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
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

.btn-blue {
  background-color: #007bff;
  color: white;
}

.btn-blue:hover {
  background-color: #0056b3;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border-radius: 10px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal-form .input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.05);
}

.modal button {
  margin: 5px 0;
}

.modal .btn {
  width: 100%;
}

p {
  text-align: center;
  font-size: 16px;
  color: #777;
}
</style>
