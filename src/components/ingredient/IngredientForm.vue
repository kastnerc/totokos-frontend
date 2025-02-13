<template>
  <main class="ingredient-form-container">
    <div>
      <h1>Add/Modify an Ingredient</h1>
      <form @submit.prevent="handleSubmit" class="ingredient-form">
        <fieldset>
          <div class="form-group">
            <label for="id_ingredient">Ingredient ID (only enter to modify, leave empty to add new)</label>
            <input v-model="ingredient.id_ingredient" type="text" id="id_ingredient" placeholder="Ingredient ID"/>
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
import { useRoute } from "vue-router";

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
  // Define regex patterns
  const numericRegex = /^[0-9]+$/;
  const nameRegex = /^[A-Za-z\s]+$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/; 
  const measureRegex = /^[A-Za-z\s]+$/; 

  // Validate id_supplier (required numeric)
  if (!numericRegex.test(ingredient.value.id_supplier)) {
    alert("Supplier ID must be numeric.");
    return;
  }

  // Validate ingredient_name (letters and spaces only)
  if (!nameRegex.test(ingredient.value.ingredient_name)) {
    alert("Ingredient name must contain only letters and spaces.");
    return;
  }

  // Validate stock (required numeric)
  if (!numericRegex.test(ingredient.value.stock)) {
    alert("Stock must be a numeric value.");
    return;
  }

  // Validate expiry_date (required, format yyyy-mm-dd)
  if (!dateRegex.test(ingredient.value.expiry_date)) {
    alert("Expiry date must be in YYYY-MM-DD format.");
    return;
  }

  // Validate price_per_unit (required, numeric with optional decimals)
  if (!priceRegex.test(ingredient.value.price_per_unit)) {
    alert("Price per Unit must be a valid number, optionally with up to two decimal places.");
    return;
  }

  // Validate unit_measure (required, letters and spaces)
  if (!measureRegex.test(ingredient.value.unit_measure)) {
    alert("Unit measure must contain only letters and spaces.");
    return;
  }

  try {
    if (ingredient.value.id_ingredient) {
      await axios.patch(`http://localhost:5000/api/ingredient/${ingredient.value.id_ingredient}`, ingredient.value);
      alert("Ingredient updated successfully");
    } else {
      await axios.post(`http://localhost:5000/api/ingredient/`, [ingredient.value]);
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
