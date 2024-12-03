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
    }
]