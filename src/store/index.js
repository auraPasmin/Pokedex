import { createStore } from 'vuex';

export default createStore({
  state: {
    favorites: []
  },
  mutations: {
    addFavorite(state, pokemon) {
      state.favorites.push(pokemon);
    }
  },
  actions: {
    addFavorite({ commit }, pokemon) {
      commit('addFavorite', pokemon);
    }
  },
  getters: {
    favorites: state => state.favorites
  }
});