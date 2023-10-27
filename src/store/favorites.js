const state = {
    favorites: [],
  };
  
  const mutations = {
    ADD_MEME_TO_FAVORITES(state, meme) {
      state.favorites.push(meme);
    },
    REMOVE_MEME_FROM_FAVORITES(state, meme) {
      const index = state.favorites.findIndex((favorite) => favorite.id == meme.id);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        console.log('No se encontró el meme en favoritos:', meme);
      }
    },
  }
  
  const actions = {
    addMemeToFavorites({ commit }, meme) {
      commit('ADD_MEME_TO_FAVORITES', meme);
    },
    removeMemeFromFavorites({ commit }, meme) {
      commit('REMOVE_MEME_FROM_FAVORITES', meme);
    },
  };
  
  const getters = {
    favorites: (state) => state.favorites,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  