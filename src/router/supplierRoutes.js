export default [
    {
        path: '/supplier',
        name: 'SupplierList',
        component: () => import('../components/supplier/SupplierList.vue')
    },
    {
        path: '/supplier-form/:id?',
        name: 'SupplierForm',
        component: () => import('../components/supplier/SupplierForm.vue')
    }
];