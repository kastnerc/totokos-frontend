<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <h1>Add/Modify a Product Category</h1>
            <fieldset>
                <div>
                    <label for="id_category">Category ID (only enter to modify, leave empty to add new)</label>
                    <div>
                        <input v-model="category.id_category" type="text" name="id_category" id="id_category" placeholder="Enter the category ID">
                    </div>
                </div>
    
                <div>
                    <label for="category_name">Name</label>
                    <div>
                        <input v-model="category.category_name" type="text" name="category_name" id="category_name" placeholder="Enter the category name" required>
                    </div>
                </div>

                <div>
                    <label for="category_description">Description</label>
                    <div>
                        <input v-model="category.category_description" type="text" name="description" id="category_description" placeholder="Enter the description" required>
                    </div>
                </div>
    
                <button type="submit">Submit</button>
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

        // Method to handle form submission
        const handleSubmit = async () => {
            if (category.value.id_category) {
                await updateCategory(category.value);
            } else {
                await addCategory(category.value);
            }
        };

        // Method to add a new category
        const addCategory = async (categoryData) => {
            try {
                const response = await axios.post('http://localhost:5000/api/product_category/', [categoryData]);
                alert('Category added successfully');
                resetForm();
            } catch (error) {
                console.error('Error adding category:', error);
                alert('Error adding category');
            }
        };

        // Method to update an existing category
        const updateCategory = async (categoryData) => {
            try {
                const response = await axios.patch(`http://localhost:5000/api/product_category/${categoryData.id_category}`, categoryData);
                alert('Category updated successfully');
                resetForm();
            } catch (error) {
                console.error('Error updating category:', error);
                alert('Error updating category');
            }
        };

        // Method to fetch product_category data when editing
        const getProductCategory = async (id) => {
            try {
                const res = await axios.get(`http://localhost:5000/api/product_category/${id}`);
                category.value = res.data; // Properly assign to `category.value`
            } catch (error) {
                console.error('Error fetching product_category:', error);
                alert('Error loading product_category details');
            }
        };

        // Load product_category data if an ID is provided in the route
        onMounted(() => {
            const id = route.params.id;
            if (id) {
                getProductCategory(id);
            }
        });

        // Method to reset the form
        const resetForm = () => {
            category.value = {
                id_category: '',
                category_name: '',
                category_description: '' // Correct field name
            };
        };

        return {
            category,
            handleSubmit,
        };
    }
};
</script>

<style lang="css" scoped>
/* Add any styles for the form here */
</style>
