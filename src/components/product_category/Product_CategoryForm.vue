<template>
  <div class="category-form-container">
    <form @submit.prevent="handleSubmit">
      <h1 class="title">Add/Modify a Product Category</h1>
      <fieldset>
        <!-- Field for Category ID (used only for modifications) -->
        <div class="form-group">
          <label for="id_category">Category ID (only enter to modify, leave empty to add new)</label>
          <input 
            v-model="category.id_category" 
            type="text" 
            name="id_category" 
            id="id_category" 
            placeholder="Enter the category ID" 
          />
        </div>

        <!-- Field for Category Name -->
        <div class="form-group">
          <label for="category_name">Name</label>
          <input 
            v-model="category.category_name" 
            type="text" 
            name="category_name" 
            id="category_name" 
            placeholder="Enter the category name" 
            required 
          />
        </div>

        <!-- Field for Category Description -->
        <div class="form-group">
          <label for="category_description">Description</label>
          <input 
            v-model="category.category_description" 
            type="text" 
            name="category_description" 
            id="category_description" 
            placeholder="Enter the description" 
            required 
          />
        </div>

        <!-- Action Buttons -->
        <div class="form-actions">
          <button type="submit" class="btn btn-success">Submit</button>
          <button type="button" class="btn btn-danger" @click="resetForm">Reset</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const category = ref({
      id_category: '',
      category_name: '',
      category_description: ''
    });

    // Regex patterns for validations
    const nameRegex = /^[A-Za-z0-9\s]{2,}$/; // At least 2 chars, letters, numbers, spaces
    const descriptionRegex = /^[A-Za-z0-9\s,.\-!]{5,}$/; // At least 5 chars, letters, numbers, spaces and some punctuation

    // Handles form submission to add or update a category
    const handleSubmit = async () => {
      // Validate category_name
      if (!nameRegex.test(category.value.category_name)) {
        alert('Invalid category name. It should contain at least 2 alphanumeric characters and spaces only.');
        return;
      }

      // Validate category_description
      if (!descriptionRegex.test(category.value.category_description)) {
        alert('Invalid category description. It should contain at least 5 characters (letters, numbers, spaces, and , . - ! are allowed).');
        return;
      }

      if (category.value.id_category) {
        await updateCategory(category.value);
      } else {
        await addCategory(category.value);
      }
    };

    // Adds a new category
    const addCategory = async (categoryData) => {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/product_category/', 
          [categoryData]
        );
        alert('Category added successfully');
        resetForm();
      } catch (error) {
        console.error('Error adding category:', error);
        alert('Error adding category');
      }
    };

    // Updates an existing category
    const updateCategory = async (categoryData) => {
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/product_category/${categoryData.id_category}`, 
          categoryData
        );
        alert('Category updated successfully');
        resetForm();
      } catch (error) {
        console.error('Error updating category:', error);
        alert('Error updating category');
      }
    };

    // Fetches category details for a given ID
    const getProductCategory = async (id) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product_category/${id}`);
        category.value = res.data;
      } catch (error) {
        console.error('Error fetching product_category:', error);
        alert('Error loading product_category details');
      }
    };

    // Resets the form fields to default values
    const resetForm = () => {
      category.value = {
        id_category: '',
        category_name: '',
        category_description: ''
      };
    };

    // Fetches the category details if an ID is present in the route
    onMounted(() => {
      const id = route.params.id;
      if (id) {
        getProductCategory(id);
      }
    });

    return {
      category,
      handleSubmit,
      resetForm
    };
  }
};
</script>

<style scoped>
.category-form-container {
  max-width: 600px;
  margin: 20px auto 225px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus {
  outline: none;
  border-color: #28a745;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>
