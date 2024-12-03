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
          <div class="logo">Totoko's Temptations</div>

          <!-- Hamburger Menu Icon -->
          <div class="hamburger" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <!-- Navigation Menu -->
          <ul :class="['nav-list', { visible: isMenuVisible }]" id="header-menu">
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
              </ul>
            </li>
            <!-- Section Product -->
            <li class="dropdown">
              <span class="nav-link dropdown-title">Product</span>
              <ul class="dropdown-menu">
                <li><RouterLink to="/product" class="dropdown-item" @click="closeMenu">Product List</RouterLink></li>
                <li><RouterLink to="/product-form" class="dropdown-item" @click="closeMenu">Product Form</RouterLink></li>
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
            <li><RouterLink to="/ingredient" class="footer-nav-link">Ingredient List</RouterLink></li>
            <li><RouterLink to="/ingredient-form" class="footer-nav-link">Ingredient Form</RouterLink></li>
            <li><RouterLink to="/order" class="footer-nav-link">Order List</RouterLink></li>
            <li><RouterLink to="/order-form" class="footer-nav-link">Order Form</RouterLink></li>
            <li><RouterLink to="/product" class="footer-nav-link">Product List</RouterLink></li>
            <li><RouterLink to="/product-form" class="footer-nav-link">Product Form</RouterLink></li>
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
</style>