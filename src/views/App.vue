<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { RouterLink } from 'vue-router';

// State for the hamburger menu
const isMenuVisible = ref(false);

// Function to toggle menu visibility
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

// Function to close menu after selecting a link
const closeMenu = () => {
  isMenuVisible.value = false;
};
</script>

<template>
  <body>
    <div id="page-container">
      <!-- Header -->
      <header>
        <nav id="nav-container">
          <!-- Logo -->
          <div class="logo"><img src="../assets/Totokos.Temptations.Logo.Website.png" alt="Logo Totoko">Totoko's Temptations</div>

          <!-- Hamburger Menu Icon -->
          <div class="hamburger" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <!-- Navigation Menu -->
          <ul :class="['nav-list', { visible: isMenuVisible }]" id="header-menu">
            <li><RouterLink to="/" class="normal-link">Home</RouterLink></li>
            <!-- Section Ingredient -->
            <li class="dropdown">
              <span class="nav-link dropdown-title">Ingredient</span>
              <ul class="dropdown-menu">
                <li><RouterLink to="/ingredient" class="dropdown-item" @click="closeMenu">Ingredient List</RouterLink></li>
                <li><RouterLink to="/ingredient-form" class="dropdown-item" @click="closeMenu">Ingredient Form</RouterLink></li>
              </ul>
            </li>
            <!-- Section Order -->
            <li class="dropdown">
              <span class="nav-link dropdown-title">Order</span>
              <ul class="dropdown-menu">
                <li><RouterLink to="/order" class="dropdown-item" @click="closeMenu">Order List</RouterLink></li>
                <li><RouterLink to="/order-form" class="dropdown-item" @click="closeMenu">Order Form</RouterLink></li>
                <li><RouterLink to="/order-products" class="dropdown-item" @click="closeMenu">Products By Order ID</RouterLink></li>
              </ul>
            </li>
            <!-- Section Product -->
            <li class="dropdown">
              <span class="nav-link dropdown-title">Product</span>
              <ul class="dropdown-menu">
                <li><RouterLink to="/product" class="dropdown-item" @click="closeMenu">Product List</RouterLink></li>
                <li><RouterLink to="/product-form" class="dropdown-item" @click="closeMenu">Product Form</RouterLink></li>
                <li><RouterLink to="/price-history" class="dropdown-item" @click="closeMenu">Price History By Product ID</RouterLink></li>
                <li><RouterLink to="/client-products" class="dropdown-item" @click="closeMenu">Client Product Page</RouterLink></li>
                <li><RouterLink to="/product-ingredient" class="dropdown-item" @click="closeMenu">Ingredients By Product ID</RouterLink></li>
              </ul>
            </li>
            <!-- Section Product Category -->
            <li class="dropdown">
              <span class="nav-link dropdown-title">Product Category</span>
              <ul class="dropdown-menu">
                <li><RouterLink to="/product_category" class="dropdown-item" @click="closeMenu">Product Category List</RouterLink></li>
                <li><RouterLink to="/product_category-form" class="dropdown-item" @click="closeMenu">Product Category Form</RouterLink></li>
              </ul>
            </li>
            <!-- Section Supplier -->
            <li class="dropdown">
              <span class="nav-link dropdown-title">Supplier</span>
              <ul class="dropdown-menu">
                <li><RouterLink to="/supplier" class="dropdown-item" @click="closeMenu">Supplier List</RouterLink></li>
                <li><RouterLink to="/supplier-form" class="dropdown-item" @click="closeMenu">Supplier Form</RouterLink></li>
              </ul>
            </li>
            <!-- Section User -->
            <li class="dropdown">
              <span class="nav-link dropdown-title">User</span>
              <ul class="dropdown-menu">
                <li><RouterLink to="/user" class="dropdown-item" @click="closeMenu">User List</RouterLink></li>
                <li><RouterLink to="/user-form" class="dropdown-item" @click="closeMenu">User Form</RouterLink></li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <div class="content">
        <RouterView />
      </div>
      <!-- Footer Navigation -->
      <footer>
        <nav id="footer-nav">
          <ul class="footer-nav-list">
            <li><RouterLink to="/" class="footer-nav-link">Home</RouterLink></li>
            <li><RouterLink to="/ingredient" class="footer-nav-link">Ingredient List</RouterLink></li>
            <li><RouterLink to="/ingredient-form" class="footer-nav-link">Ingredient Form</RouterLink></li>
            <li><RouterLink to="/order" class="footer-nav-link">Order List</RouterLink></li>
            <li><RouterLink to="/order-form" class="footer-nav-link">Order Form</RouterLink></li>
            <li><RouterLink to="/order-products" class="footer-nav-link">Products By Order ID</RouterLink></li>
            <li><RouterLink to="/product" class="footer-nav-link">Product List</RouterLink></li>
            <li><RouterLink to="/product-form" class="footer-nav-link">Product Form</RouterLink></li>
            <li><RouterLink to="/price-history" class="footer-nav-link">Price History By Product ID</RouterLink></li>
            <li><RouterLink to="/client-products" class="footer-nav-link">Client Product Page</RouterLink></li>
            <li><RouterLink to="/product-ingredient" class="footer-nav-link">Ingredients By Product ID</RouterLink></li>
            <li><RouterLink to="/product_category" class="footer-nav-link">Product Category List</RouterLink></li>
            <li><RouterLink to="/product_category-form" class="footer-nav-link">Product Category Form</RouterLink></li>
            <li><RouterLink to="/supplier" class="footer-nav-link">Supplier List</RouterLink></li>
            <li><RouterLink to="/supplier-form" class="footer-nav-link">Supplier Form</RouterLink></li>
            <li><RouterLink to="/user" class="footer-nav-link">User List</RouterLink></li>
            <li><RouterLink to="/user-form" class="footer-nav-link">User Form</RouterLink></li>
          </ul>
        </nav>
      </footer>
    </div>
  </body>
</template>

<style>
/* Make sure the body and html occupy full height */
html, body {
  height: 100%;
  margin: 0;
}

#page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure it fills at least the viewport height */
  background-color: #edece6;
}

header, .content, footer {
  flex-shrink: 0; /* Prevent flex items from being smaller than their content */
}

.content {
  flex-grow: 1; /* Allows the content area to expand and fill the available space */
}

footer {
  text-align: center; /* Center align the text */
}
</style>