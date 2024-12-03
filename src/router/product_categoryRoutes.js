export default [
    {
        path: '/product_category',
        name: 'Product_CategoryList',
        component: () => import('../components/product_category/Product_CategoryList.vue')
    },
    {
        path: '/product_category-form/:id?',
        name: 'Product_CategoryForm',
        component: () => import('../components/product_category/Product_CategoryForm.vue')
    }
]