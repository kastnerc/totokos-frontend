export default [
    {
        path: '/ingredient',
        name: 'IngredientList',
        component: () => import('../components/ingredient/IngredientList.vue')
    },
    {
        path: '/ingredient-form/:id?',
        name: 'IngredientForm',
        component: () => import('../components/ingredient/IngredientForm.vue')
    }
]