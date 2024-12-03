<template>
    <main>
        <div>
            <h1>Add/Modify a Product</h1>
            <div>
                <form @submit.prevent="handleSubmit">
                    <fieldset>
                        <div>
                            <label for="id_product">Product ID (only enter to modify, leave empty to add new)</label>
                            <div>
                                <input v-model="product.id_product" type="text" name="id_product" id="id_product" placeholder="Enter the product ID">
                            </div>
                        </div>

                        <div>
                            <label for="id_category">Category ID</label>
                            <div>
                                <input v-model="product.id_category" type="text" name="id_category" id="id_category" placeholder="Enter the category ID" required>
                            </div>
                        </div>

                        <div>
                            <label for="product_name">Name</label>
                            <div>
                                <input v-model="product.product_name" type="text" name="product_name" id="product_name" placeholder="Enter the product name" required>
                            </div>
                        </div>

                        <div>
                            <label for="product_price">Price</label>
                            <div>
                                <input v-model="product.product_price" type="text" name="product_price" id="product_price" placeholder="Enter the product price" required>
                            </div>
                        </div>

                        <div>
                            <label for="description">Description</label>
                            <div>
                                <input v-model="product.description" type="text" name="description" id="description" placeholder="Enter the description" required>
                            </div>
                        </div>

                        <div>
                            <label for="stock">Stock</label>
                            <div>
                                <input v-model="product.stock" type="text" name="stock" id="stock" placeholder="Enter the stock" required>
                            </div>
                        </div>

                        <div>
                            <label for="expiry_date">Expiry Date</label>
                            <div>
                                <input v-model="product.expiry_date" type="date" name="expiry_date" id="expiry_date" required>
                            </div>
                        </div>
                        
                        <button type="submit">Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router'; // Import useRoute

export default {
    setup() {
        const route = useRoute(); // Get the current route
        const product = ref({
            id_product: '',
            id_category: '',
            product_name: '',
            product_price: '',
            description: '',
            stock: '',
            expiry_date: ''
        });

        // Method to handle form submission
        const handleSubmit = async () => {
            if (product.value.id_product) {
                // If an ID is provided, update the existing product
                await updateProduct(product.value);
            } else {
                // If no ID, add a new product
                await addProduct(product.value);
            }
        };

        // Method to add a new product
        const addProduct = async (productData) => {
            try {
                const response = await axios.post('http://localhost:5000/api/product/', [productData]);
                console.log('Product added successfully:', response.data);
                alert('Product added successfully');
                resetForm();
            } catch (error) {
                console.error('Error adding product:', error);
                alert('Error adding product');
            }
        };

        // Method to update an existing product
        const updateProduct = async (productData) => {
            try {
                const response = await axios.patch(`http://localhost:5000/api/product/${productData.id_product}`, productData);
                console.log('Product updated successfully:', response.data);
                alert('Product updated successfully');
                resetForm();
            } catch (error) {
                console.error('Error updating product:', error);
                alert('Error updating product');
            }
        };

        // Method to fetch product data when editing
        const getProduct = async (id) => {
            try {
                const res = await axios.get(`http://localhost:5000/api/product/${id}`);
                product.value = res.data;
            } catch (error) {
                console.error('Error fetching product:', error);
                alert('Error loading product details');
            }
        };

        // Reset form fields
        const resetForm = () => {
            product.value = {
                id_product: '',
                id_category: '',
                product_name: '',
                product_price: '',
                description: '',
                stock: '',
                expiry_date: ''
            };
        };

        // Load product data if an ID is provided in the route
        onMounted(() => {
            const id = route.params.id;
            if (id) {
                getProduct(id);
            }
        });

        return {
            product,
            handleSubmit
        };
    }
};
</script>

<style lang="css" scoped>
/* Add any styling for the form here */
</style>
