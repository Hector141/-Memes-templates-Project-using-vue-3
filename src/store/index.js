import { createStore } from 'vuex';
import favorites from './favorites';


export default createStore({
  modules: {
    favorites,
  },
});
