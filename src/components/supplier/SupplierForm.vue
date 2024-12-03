<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <h1>Add/Modify a Supplier</h1>
            <fieldset>
                <div>
                    <label for="id_supplier">Supplier ID (only enter to modify, leave empty to add new)</label>
                    <div>
                        <input v-model="supplier.id_supplier" type="text" name="id_supplier" id="id_supplier" placeholder="Enter the supplier ID">
                    </div>
                </div>

                <div>
                    <label for="supplier_name">Name</label>
                    <div>
                        <input v-model="supplier.supplier_name" type="text" name="supplier_name" id="supplier_name" placeholder="Enter the supplier name" required>
                    </div>
                </div>

                <div>
                    <label for="address">Address</label>
                    <div>
                        <input v-model="supplier.supplier_address" type="text" name="supplier_address" id="address" placeholder="Enter the address" required>
                    </div>
                </div>

                <div>
                    <label for="phone">Phone</label>
                    <div>
                        <input v-model="supplier.telephone_contact" type="text" name="phone" id="phone" placeholder="Enter the phone" required>
                    </div>
                </div>

                <div>
                    <label for="email">Email</label>
                    <div>
                        <input v-model="supplier.supplier_email" type="text" name="email" id="email" placeholder="Enter the email" required>
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
import { useRoute } from 'vue-router'; // Import useRoute

export default {
    setup() {
        const route = useRoute(); // Get the current route
        const supplier = ref({
            id_supplier: '',
            supplier_name: '',
            supplier_address: '',
            telephone_contact: '',
            supplier_email: ''
        });

        // Method to handle form submission
        const handleSubmit = async () => {
            if (supplier.value.id_supplier) {
                // If an ID is provided, update the existing supplier
                await updateSupplier(supplier.value);
            } else {
                // If no ID, add a new supplier
                await addSupplier(supplier.value);
            }
        };

        // Method to add a new supplier
        const addSupplier = async (supplierData) => {
            try {
                const response = await axios.post('http://localhost:5000/api/supplier/', [supplierData]);
                console.log('Supplier added successfully:', response.data);
                alert('Supplier added successfully');
                resetForm();
            } catch (error) {
                console.error('Error adding supplier:', error);
                alert('Error adding supplier');
            }
        };

        // Method to update an existing supplier
        const updateSupplier = async (supplierData) => {
            try {
                const response = await axios.patch(`http://localhost:5000/api/supplier/${supplierData.id_supplier}`, supplierData);
                console.log('Supplier updated successfully:', response.data);
                alert('Supplier updated successfully');
                resetForm();
            } catch (error) {
                console.error('Error updating supplier:', error);
                alert('Error updating supplier');
            }
        };

        // Method to fetch supplier data when editing
        const getSupplier = async (id) => {
            try {
                const res = await axios.get(`http://localhost:5000/api/supplier/${id}`);
                supplier.value = res.data;
            } catch (error) {
                console.error('Error fetching supplier:', error);
                alert('Error loading supplier details');
            }
        };

        // Reset form fields
        const resetForm = () => {
            supplier.value = {
                id_supplier: '',
                supplier_name: '',
                supplier_address: '',
                telephone_contact: '',
                supplier_email: ''
            };
        };

        // Load supplier data if an ID is provided in the route
        onMounted(() => {
            const id = route.params.id;
            if (id) {
                getSupplier(id);
            }
        });

        return {
            supplier,
            handleSubmit
        };
    }
};
</script>

<style lang="css" scoped>
/* Add any styles for the form here */
</style>
