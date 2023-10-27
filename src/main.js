import { createApp } from 'vue';
import App from './App.vue';
import Home from './components/Home.vue';
import FavoriteMemes from './components/FavoriteMemes.vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store'  // Asegúrate de importar tu store Vuex desde el archivo adecuado


const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: Home },
      { path: '/favorites', component: FavoriteMemes },
    ],
  });
  
const app = createApp(App)
app.use(store)  // Registra Vuex en tu aplicación
app.use(router); 
app.mount('#app')
