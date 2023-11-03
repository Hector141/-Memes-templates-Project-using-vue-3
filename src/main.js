import { createApp } from 'vue';
import App from './App.vue';
import Home from './components/Home.vue';
import FavoriteMemes from './components/FavoriteMemes.vue';
import MemeDetail from './components/MemeDetails.vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store'  


const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: Home },
      { path: '/favorites', component: FavoriteMemes },
      {
        path: "/meme/:id", 
        name: "MemeDetail",
        component: MemeDetail,
      },
    ],
  });
  
const app = createApp(App)
app.use(store)  // Registra Vuex en tu aplicación
app.use(router); 
app.mount('#app')
