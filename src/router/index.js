import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'dashboard-page',
        component: () => import(/* webpackChunkName: "DashboardPage" */ '../layouts/DashboardLayout.vue'),
        children: [
            {
                path: 'fubtolista',
                name: 'fubtolista-page',
                component: () => import(/* webpackChunkName: "FutbolistsPage" */ '../views/FutbolistaView.vue')
            },
            {
                path: 'equipo',
                name: 'equipo-page',
                component: () => import(/* webpackChunkName: "EquipoPage" */ '../views/EquipoView.vue')
            },
        ]
    },
    { 
        path: '/:pathMatch(.*)*',
        redirect: '/',   
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router