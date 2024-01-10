import { createApp } from 'vue'
import App from './App.vue'
import store from '../store';
// createApp(App).mount('#app')
import './tailwind.css'

import { createRouter, createWebHistory } from 'vue-router';
import DataEntry from './components/DataEntry.vue';
import EditDivision from './components/EditDivision.vue';
import DistrictsComponent from './components/DistrictsComponent.vue';
// import ThanaComponent from './components/ThanaComponent.vue';
import UpazilaComponent from './components/UpazilaComponent.vue';
import UnionComponent from './components/UnionComponent.vue';
import LoginComponent from './components/LoginComponent.vue';

const routes = [
    { path: '/', name: 'home', component: DataEntry, meta: { title: 'Home Page' } },
    { path: '/login', name: 'login', component: LoginComponent, props: true, meta: { title: 'Login' } },
    { path: '/edit/:id', name: 'edit', component: EditDivision, props: true, meta: { title: 'Edit Division' } },
    { path: '/districts/:id', name: 'DistrictsComponent', component: DistrictsComponent, props: true, meta: { title: 'District' } },
    { path: '/districts', name: 'districtslist', component: DistrictsComponent, props: true, meta: { title: 'District' } },
    { path: '/upazila/:id', name: 'upazila', component: UpazilaComponent, props: true, meta: { title: 'upazila' } },
    { path: '/upazilas', name: 'upazilalist', component: UpazilaComponent, props: true, meta: { title: 'upazila' } },
    { path: '/union/:id', name: 'union', component: UnionComponent, props: true, meta: { title: 'union' } },
    { path: '/unions', name: 'unionlist', component: UnionComponent, props: true, meta: { title: 'union' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');