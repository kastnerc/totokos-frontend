<template>
  <div class="supplier-form-container">
    <form @submit.prevent="handleSubmit" class="form">
      <h1 class="title">Add/Modify a Supplier</h1>
      <fieldset class="fieldset">
        <!-- Form group for supplier ID -->
        <div class="form-group">
          <label for="id_supplier">Supplier ID (only enter to modify, leave empty to add new)</label>
          <input
            v-model="supplier.id_supplier"
            type="text"
            name="id_supplier"
            id="id_supplier"
            placeholder="Enter the supplier ID"
          />
        </div>

        <!-- Form group for supplier name -->
        <div class="form-group">
          <label for="supplier_name">Name</label>
          <input
            v-model="supplier.supplier_name"
            type="text"
            name="supplier_name"
            id="supplier_name"
            placeholder="Enter the supplier name"
            required
          />
        </div>

        <!-- Form group for supplier address -->
        <div class="form-group">
          <label for="address">Address</label>
          <input
            v-model="supplier.supplier_address"
            type="text"
            name="supplier_address"
            id="address"
            placeholder="Enter the address"
            required
          />
        </div>

        <!-- Form group for supplier phone -->
        <div class="form-group">
          <label for="phone">Phone</label>
          <input
            v-model="supplier.telephone_contact"
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter the phone"
            required
          />
        </div>

        <!-- Form group for supplier email -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="supplier.supplier_email"
            type="text"
            name="email"
            id="email"
            placeholder="Enter the email"
            required
          />
        </div>

        <!-- Submit and reset buttons -->
        <div class="button-group">
          <button type="submit" class="btn btn-green">Submit</button>
          <button type="button" @click="resetForm" class="btn btn-red">Reset</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const supplier = ref({
      id_supplier: "",
      supplier_name: "",
      supplier_address: "",
      telephone_contact: "",
      supplier_email: "",
    });

    // Add a new supplier
    const addSupplier = async (supplierData) => {
      try {
        await axios.post("http://localhost:5000/api/supplier/", [supplierData]);
        alert("Supplier added successfully");
        resetForm();
      } catch (error) {
        alert("Error adding supplier");
      }
    };

    // Update an existing supplier
    const updateSupplier = async (supplierData) => {
      try {
        await axios.patch(
          `http://localhost:5000/api/supplier/${supplierData.id_supplier}`,
          supplierData
        );
        alert("Supplier updated successfully");
        resetForm();
      } catch (error) {
        alert("Error updating supplier");
      }
    };

    // Fetch supplier details by ID
    const getSupplier = async (id) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/supplier/${id}`);
        supplier.value = res.data;
      } catch (error) {
        alert("Error loading supplier details");
      }
    };

    // Reset the form
    const resetForm = () => {
      supplier.value = {
        id_supplier: "",
        supplier_name: "",
        supplier_address: "",
        telephone_contact: "",
        supplier_email: "",
      };
    };

    // Validate and handle form submission
    const handleSubmit = async () => {
      // Regex validations
      const idRegex = /^[0-9]*$/; // Optional ID; numeric if provided
      const nameRegex = /^[A-Za-z0-9\s'-]{3,50}$/; // Supplier name: letters, numbers, spaces, apostrophes, hyphens
      const addressRegex = /^.{5,100}$/; // Address: at least 5 characters, up to 100
      const phoneRegex = /^[0-9+\-\s()]{7,20}$/; // Phone: digits, +, -, spaces, parentheses, length 7-20
      const emailRegex = /^\S+@\S+\.\S+$/; // Basic email format

      // Validate ID (if provided)
      if (supplier.value.id_supplier && !idRegex.test(supplier.value.id_supplier)) {
        alert("Supplier ID must be numeric.");
        return;
      }

      // Validate supplier name
      if (!nameRegex.test(supplier.value.supplier_name)) {
        alert("Name must be 3-50 characters and can include letters, numbers, spaces, apostrophes, or hyphens.");
        return;
      }

      // Validate supplier address
      if (!addressRegex.test(supplier.value.supplier_address)) {
        alert("Address must be between 5 and 100 characters.");
        return;
      }

      // Validate phone
      if (!phoneRegex.test(supplier.value.telephone_contact)) {
        alert("Phone must be between 7 and 20 characters and can include digits, spaces, parentheses, plus and minus signs.");
        return;
      }

      // Validate email
      if (!emailRegex.test(supplier.value.supplier_email)) {
        alert("Email must be a valid email address.");
        return;
      }

      // If validations pass, either add or update the supplier
      if (supplier.value.id_supplier) {
        await updateSupplier(supplier.value);
      } else {
        await addSupplier(supplier.value);
      }
    };

    // Fetch supplier details if an ID is provided in the route
    onMounted(() => {
      const id = route.params.id;
      if (id) {
        getSupplier(id);
      }
    });

    return {
      supplier,
      handleSubmit,
      resetForm,
    };
  },
};
</script>

<style scoped>
.supplier-form-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
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
</style>
