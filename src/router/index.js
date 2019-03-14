import Vue from 'vue'
import VueRouter from 'vue-router'
import 'bootstrap'

import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/Pages/Products';
import CustomerOrder from '@/components/Pages/CustomerOrder';
import CustomerCheckout from '@/components/Pages/CustomerCheckout';
import OrderList from '@/components/Pages/OrderList';
import Coupons from '@/components/Pages/Coupons';
import KaohsiungTravel from '@/components/Pages/KaohsiungTravel';
import MultipulationChart from '@/components/Pages/MultipulationChart'
import Clock from '@/components/Pages/Clock';
// import Page from '@/components/Pages/page';
// import child from '@/components/Pages/child';
// import child2 from '@/components/Pages/child2';
// import child3 from '@/components/Pages/child3';
// import Menu from '@/components/Pages/menu';


Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '*',
            redirect: 'login'
        },
        {
            // name: 'Login',
            path: '/',
            redirect: 'login',
            // meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            name: 'Dashboard_Admin',
            path: '/admin',
            component: Dashboard,
            children: [
                {
                    path: 'products',
                    name: 'Products',
                    component: Products,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'order_list',
                    name: 'OrderList',
                    component: OrderList,
                    meta: { requiresAuth: true },
                },{
                    path: 'coupons',
                    name: 'Coupons',
                    component: Coupons,
                    meta: { requiresAuth: true },
                },
            ]
        },
        {
            name: 'Dashboard',
            path: '/',
            component: Dashboard,
            children: [
                {
                    path: 'customer_order',
                    name: 'CustomerOrder',
                    component: CustomerOrder,
                },
                {
                    path: 'customer_checkout/:orderId',
                    name: 'CustomerCheckout',
                    component: CustomerCheckout,
                },
                {
                    path: 'kaohsiung_travel',
                    name: 'KaohsiungTravel',
                    component: KaohsiungTravel,
                },
                {
                    path: 'multipulation_chart',
                    name: 'MultipulationChart',
                    component: MultipulationChart,
                },
                {
                    path: 'clock',
                    name: 'Clock',
                    component: Clock,
                }
            ]
        },
        
        // {
        //     // name: '分頁',
        //     path: '/page',
        //     // component: Page,
        //     components: {
        //         default: Page,
        //         menu: Menu,
        //     },
        //     children: [
        //         {
        //             name: '卡片 1',
        //             path: '',
        //             component: child,
        //         },
        //         {
        //             name: '卡片 2',
        //             path: 'child2',
        //             component: child2,
        //         },
        //         {
        //             name: '卡片 3',
        //             path: 'child3',
        //             component: child3,
        //         },
        //     ]
        // },
    ],
});