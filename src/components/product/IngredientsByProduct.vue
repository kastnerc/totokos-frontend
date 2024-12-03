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
import { ref } from "vue";
import axios from "axios";

const productIdQuery = ref("");
const ingredientProducts = ref([]);
const newLink = ref({ id_ingredient: "", quantity: "" });
const isEditing = ref(false);
const editingLink = ref({ id_ingredient: "", quantity: "" });

const fetchIngredientsByProductId = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/product/${productIdQuery.value}/ingredients`
    );

    // Expecting the backend to return both `id_ingredient` and `quantity`
    ingredientProducts.value = response.data.data.map((link) => ({
      id_ingredient: link.id_ingredient,
      quantity: link.Ingredient_Product?.quantity || 0, // Extract quantity from Ingredient_Product
    }));
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    ingredientProducts.value = [];
  }
};

const resetSearch = () => {
  productIdQuery.value = "";
  ingredientProducts.value = [];
};

const addLink = async () => {
  try {
    await axios.post("http://localhost:5000/api/product/ingredients", {
      id_product: productIdQuery.value,
      id_ingredient: newLink.value.id_ingredient,
      quantity: newLink.value.quantity,
    });
    await fetchIngredientsByProductId();
    newLink.value = { id_ingredient: "", quantity: "" };
  } catch (error) {
    console.error("Error adding link:", error);
  }
};

const editQuantity = (link) => {
  isEditing.value = true;
  editingLink.value = { ...link };
};

const updateQuantity = async () => {
  try {
    // Call the PATCH endpoint with updated quantity
    await axios.patch(
      `http://localhost:5000/api/product/${productIdQuery.value}/ingredients/${editingLink.value.id_ingredient}`,
      { quantity: editingLink.value.quantity }
    );

    // Update UI
    const index = ingredientProducts.value.findIndex(
      (item) => item.id_ingredient === editingLink.value.id_ingredient
    );
    if (index !== -1) {
      ingredientProducts.value[index].quantity = editingLink.value.quantity;
    }

    // Close modal and reset editing state
    isEditing.value = false;
    editingLink.value = { id_ingredient: "", quantity: "" };
  } catch (error) {
    console.error(
      "Error updating quantity:",
      error.response?.data || error.message
    );
    alert("Failed to update quantity. Please try again.");
  }
};

const deleteLink = async (id_ingredient) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/product/${productIdQuery.value}/ingredients/${id_ingredient}`
    );
    await fetchIngredientsByProductId();
  } catch (error) {
    console.error("Error deleting link:", error);
  }
};

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
