export default [
    {
        path: '/order',
        name: 'OrderList',
        component: () => import('../components/order/OrderList.vue')
    },
    {
        path: '/order-form/:id?',
        name: 'OrderForm',
        component: () => import('../components/order/OrderForm.vue')
    },
    {
        path: '/order-products/:id?',
        name: 'OrderProducts',
        component: () => import('../components/order/ProductsByOrder.vue')
    }
]