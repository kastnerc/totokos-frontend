export default [
    {
        path: '/user',
        name: 'UserList',
        component: () => import('../components/user/UserList.vue')
    },
    {
        path: '/user-form',
        name: 'UserForm',
        component: () => import('../components/user/UserForm.vue')
    }    
]