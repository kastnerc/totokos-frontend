<template>
  <main class="ingredient-form-container">
    <div>
      <h1>Add/Modify an Ingredient</h1>
      <form @submit.prevent="handleSubmit" class="ingredient-form">
        <fieldset>
          <div class="form-group">
            <label for="id_ingredient">Ingredient ID</label>
            <input v-model="ingredient.id_ingredient" type="text" id="id_ingredient" placeholder="Ingredient ID" readonly />
          </div>

          <div class="form-group">
            <label for="id_supplier">Supplier ID</label>
            <input v-model="ingredient.id_supplier" type="text" id="id_supplier" placeholder="Supplier ID" required />
          </div>

          <div class="form-group">
            <label for="ingredient_name">Name</label>
            <input v-model="ingredient.ingredient_name" type="text" id="ingredient_name" placeholder="Name" required />
          </div>

          <div class="form-group">
            <label for="stock">Stock</label>
            <input v-model="ingredient.stock" type="text" id="stock" placeholder="Stock" required />
          </div>

          <div class="form-group">
            <label for="expiry_date">Expiry Date</label>
            <input v-model="ingredient.expiry_date" type="date" id="expiry_date" required />
          </div>

          <div class="form-group">
            <label for="price_per_unit">Price per Unit</label>
            <input v-model="ingredient.price_per_unit" type="text" id="price_per_unit" placeholder="Price per Unit" required />
          </div>

          <div class="form-group">
            <label for="unit_measure">Unit Measure</label>
            <input v-model="ingredient.unit_measure" type="text" id="unit_measure" placeholder="Unit Measure" required />
          </div>

          <div class="button-group">
            <button type="submit" class="btn btn-success">Submit</button>
            <button type="reset" class="btn btn-danger">Reset</button>
          </div>
        </fieldset>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router"; // Import the useRoute hook

const route = useRoute();
const ingredient = ref({
  id_ingredient: '',
  id_supplier: '',
  ingredient_name: '',
  stock: '',
  expiry_date: '',
  price_per_unit: '',
  unit_measure: ''
});

const getIngredient = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/ingredient/${id}`);
    ingredient.value = res.data;
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    alert("Error loading ingredient details");
  }
};

const handleSubmit = async () => {
  try {
    if (ingredient.value.id_ingredient) {
      const response = await axios.patch(`http://localhost:5000/api/ingredient/${ingredient.value.id_ingredient}`, ingredient.value);
      alert("Ingredient updated successfully");
    } else {
      const response = await axios.post(`http://localhost:5000/api/ingredient/`, [ingredient.value]);
      alert("Ingredient added successfully");
    }
  } catch (error) {
    console.error("Error submitting ingredient:", error);
    alert("Error submitting ingredient");
  }
};

onMounted(() => {
  const id = route.params.id;
  if (id) {
    getIngredient(id);
  }
});
</script>

<style scoped>
.ingredient-form-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.ingredient-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>
