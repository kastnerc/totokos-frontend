export default [
    {
        path: '/product/:id?',
        name: 'ProductList',
        component: () => import('../components/product/ProductList.vue')
    },
    {
        path: '/product-form/:id?',
        name: 'ProductForm',
        component: () => import('../components/product/ProductForm.vue')
    },
    {
        path: '/price-history/:id?',
        name: 'PriceHistory',
        component: () => import('../components/product/PriceHistory.vue')
    },
    {
        path: '/client-products/',
        name: 'ClientProducts',
        component: () => import('../components/product/ClientProductPage.vue')
    }
];