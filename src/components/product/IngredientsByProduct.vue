<template>
  <main>
    <h1>Ingredient-Product Management</h1>

    <!-- Search Ingredients by Product ID -->
    <div>
      <h2>Search Ingredients by Product ID</h2>
      <input v-model="productIdQuery" placeholder="Enter Product ID" />
      <button @click="fetchIngredientsByProductId">Search</button>
      <button @click="resetSearch">Reset</button>
    </div>

    <!-- Display Ingredients Linked to Product -->
    <table v-if="ingredientProducts.length > 0" class="table table-striped">
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
          <td>
            <button class="btn btn-primary" @click="editQuantity(link)">Edit</button>
            <button class="btn btn-danger" @click="deleteLink(link.id_ingredient)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No ingredients linked to this product.</p>

    <!-- Add New Link -->
    <div>
      <h2>Add Ingredient to Product</h2>
      <form @submit.prevent="addLink">
        <input v-model="newLink.id_ingredient" placeholder="Ingredient ID" required />
        <input v-model="newLink.quantity" placeholder="Quantity" required />
        <button type="submit" class="btn btn-success">Add Link</button>
      </form>
    </div>

    <!-- Edit Quantity Modal -->
    <div v-if="isEditing" class="modal">
      <div class="modal-content">
        <h3>Edit Quantity</h3>
        <form @submit.prevent="updateQuantity">
          <input v-model="editingLink.quantity" placeholder="New Quantity" required />
          <button type="submit" class="btn btn-primary">Update</button>
          <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
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
  if (!productIdQuery.value) return; // Ensure there is a product ID to fetch
  try {
    const response = await axios.get(`http://localhost:5000/api/product/${productIdQuery.value}/ingredients`);
    ingredientProducts.value = response.data.data.map((item) => ({
      id_ingredient: item.id_ingredient,
      quantity: item.Ingredient_Product.quantity  // Assuming that the backend sends this nested structure
    }));
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    alert(`Error fetching ingredients: ${error.response?.data.message || error.message}`);
    ingredientProducts.value = [];
  }
};

// Function to reset the search and clear current product ID
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
    // Post data to the backend API for adding a new link
    await axios.post("http://localhost:5000/api/product/ingredients", {
      id_product: productIdQuery.value,
      id_ingredient: newLink.value.id_ingredient,
      quantity: newLink.value.quantity,
    });
    alert('Link added successfully');
    fetchIngredientsByProductId();  // Refresh the list to include the new link
    newLink.value = { id_ingredient: "", quantity: "" };  // Reset the form fields
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
    const response = await axios.patch(
      `http://localhost:5000/api/product/${productIdQuery.value}/ingredients/${id_ingredient}`,
      { quantity: quantity }
    );
    alert('Quantity updated successfully');
    fetchIngredientsByProductId();  // Refresh the list to reflect the updated quantity
  } catch (error) {
    console.error("Error updating quantity:", error.response?.data || error.message);
    alert(`Failed to update quantity: ${error.response?.data.message || error.message}`);
  }
};

// Function to delete an ingredient link
const deleteLink = async (id_ingredient) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/product/${productIdQuery.value}/ingredients/${id_ingredient}`
    );
    fetchIngredientsByProductId();
    alert('Link deleted successfully');
  } catch (error) {
    console.error("Error deleting link:", error);
    alert(`Error deleting link: ${error.response?.data.message || error.message}`);
  }
};

// Watch for route changes to update the product ID and fetch new data
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
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.modal button {
  margin: 5px 0;
}
</style>
