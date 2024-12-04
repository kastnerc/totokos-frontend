<template>
    <div class="supplier-form-container">
      <form @submit.prevent="handleSubmit" class="form">
        <h1 class="title">Add/Modify a Supplier</h1>
        <fieldset class="fieldset">
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
        supplier_email: ""
      });
  
      const handleSubmit = async () => {
        if (supplier.value.id_supplier) {
          await updateSupplier(supplier.value);
        } else {
          await addSupplier(supplier.value);
        }
      };
  
      const addSupplier = async (supplierData) => {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/supplier/",
            [supplierData]
          );
          alert("Supplier added successfully");
          resetForm();
        } catch (error) {
          alert("Error adding supplier");
        }
      };
  
      const updateSupplier = async (supplierData) => {
        try {
          const response = await axios.patch(
            `http://localhost:5000/api/supplier/${supplierData.id_supplier}`,
            supplierData
          );
          alert("Supplier updated successfully");
          resetForm();
        } catch (error) {
          alert("Error updating supplier");
        }
      };
  
      const getSupplier = async (id) => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/supplier/${id}`
          );
          supplier.value = res.data;
        } catch (error) {
          alert("Error loading supplier details");
        }
      };
  
      const resetForm = () => {
        supplier.value = {
          id_supplier: "",
          supplier_name: "",
          supplier_address: "",
          telephone_contact: "",
          supplier_email: ""
        };
      };
  
      onMounted(() => {
        const id = route.params.id;
        if (id) {
          getSupplier(id);
        }
      });
  
      return {
        supplier,
        handleSubmit,
        resetForm
      };
    }
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
  