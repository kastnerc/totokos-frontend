export default [
    {
        path: '/user/:id?',
        name: 'UserList',
        component: () => import('../components/user/UserList.vue')
    },
    {
        path: '/user-form/:id?',
        name: 'UserForm',
        component: () => import('../components/user/UserForm.vue')
    }    
]