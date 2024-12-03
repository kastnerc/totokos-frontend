<script setup>
import { RouterView } from 'vue-router';
import { RouterLink } from 'vue-router';
</script>

<template>
  <body>
    <!-- Conteneur principal de la page -->
    <div id="page-container">
        <div id="content-wrap">

  <header>
                <div class="haut_de_page">
                    <!-- Logo et navigation -->
                    
                    <!-- Navigation -->
                    <nav aria-label="Navigation haut de page">
                        <ul>
                          <div class="logo">Totoko's Temptations</div>
                          <li><RouterLink to="/ingredient">Ingredient List</RouterLink></li>
                          <li><RouterLink to="/ingredient-form">Ingredient Form</RouterLink></li>
                          <li><RouterLink to="/order">Order List</RouterLink></li>
                          <li><RouterLink to="/order-form">Order Form</RouterLink></li>
                          <li><RouterLink to="/product">Product List</RouterLink></li>
                          <li><RouterLink to="/product-form">Product Form</RouterLink></li>
                          <li><RouterLink to="/price-history">Price History by Product ID</RouterLink></li>
                          <li><RouterLink to="/ingredient-product">Ingredients by Product ID</RouterLink></li>
                          <li><RouterLink to="/client-products">Client Product Page</RouterLink></li>
                          <li><RouterLink to="/product_category">Product Category List</RouterLink></li>
                          <li><RouterLink to="/product_category-form">Product Category Form</RouterLink></li>
                          <li><RouterLink to="/supplier">Supplier List</RouterLink></li>
                          <li><RouterLink to="/supplier-form">Supplier Form</RouterLink></li>
                          <li><RouterLink to="/user">User List</RouterLink></li>
                          <li><RouterLink to="/user-form">User Form</RouterLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
          </div>
        </div>

        
      <RouterView class="content"/>
      </body>
</template>

<style>

/* Réinitialisation des styles par défaut */
body {
    font-size: 14px;
    font-family: sans-serif;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
}

/* Styles de l'en-tête */
header {
    background-color: rgb(255, 255, 255);
    outline: 1px solid rgb(43, 23, 0);
    box-shadow: 0px 8px 10px 10px rgba(255, 255, 255, 0.3);
    position: fixed;
    width: 100%;
    top: 0;
}
/* Navigation en haut de la page */
.haut_de_page {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

.haut_de_page li {
    list-style: none;
    margin-right: 15px;
    font-size: 14px;
    font-weight: 400;
    position: relative;
}

.haut_de_page nav {
    text-align: right;
}

.haut_de_page a {
    text-decoration: none;
    color: rgb(208, 155, 30);
    text-transform: uppercase;
}

.haut_de_page a:hover,
.haut_de_page a:active {
    color: rgb(43, 23, 0);
}

.haut_de_page li:last-of-type {
    margin-right: 50px;
}

/* Styles du logo */
.logo {
    font-family: Cookie;
    font-size: 27px;
    text-transform: uppercase;
    font-weight: 400;
    color: rgb(43, 23, 0);
    text-shadow: 2px 2px 2px rgb(203, 181, 127);
}

.logo,
nav,
.haut_de_page li,
.logo img {
    display: inline-block;
}

div#app {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.content {
    flex: 1;
    padding-top: 100px;
}

</style>