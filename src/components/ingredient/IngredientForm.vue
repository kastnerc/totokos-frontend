<template>
    <main>
      <div>
        <h1>Add/Modify an Ingredient</h1>
        <form @submit.prevent="handleSubmit">
          <fieldset>
            <div>
              <label for="id_ingredient">Ingredient ID</label>
              <div>
                <input v-model="ingredient.id_ingredient" type="text" id="id_ingredient" placeholder="Ingredient ID" readonly />
              </div>
            </div>
  
            <div>
              <label for="id_supplier">Supplier ID</label>
              <div>
                <input v-model="ingredient.id_supplier" type="text" id="id_supplier" placeholder="Supplier ID" required />
              </div>
            </div>
  
            <div>
              <label for="ingredient_name">Name</label>
              <div>
                <input v-model="ingredient.ingredient_name" type="text" id="ingredient_name" placeholder="Name" required />
              </div>
            </div>
  
            <div>
              <label for="stock">Stock</label>
              <div>
                <input v-model="ingredient.stock" type="text" id="stock" placeholder="Stock" required />
              </div>
            </div>
  
            <div>
              <label for="expiry_date">Expiry Date</label>
              <div>
                <input v-model="ingredient.expiry_date" type="date" id="expiry_date" required />
              </div>
            </div>
  
            <div>
              <label for="price_per_unit">Price per Unit</label>
              <div>
                <input v-model="ingredient.price_per_unit" type="text" id="price_per_unit" placeholder="Price per Unit" required />
              </div>
            </div>
  
            <div>
              <label for="unit_measure">Unit Measure</label>
              <div>
                <input v-model="ingredient.unit_measure" type="text" id="unit_measure" placeholder="Unit Measure" required />
              </div>
            </div>
  
            <button type="submit">Submit</button>
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
  /* Add your styles here */
  </style>