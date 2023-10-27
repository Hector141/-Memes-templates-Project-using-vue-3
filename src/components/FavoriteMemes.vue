<script>
export default {
  name: "FavoriteMemes",
  computed: {
    favoriteMemes() {
      // Acceder a la lista de memes favoritos desde el estado global (Vuex)
      console.log(this.$store.getters["favorites"]);
      return this.$store.getters["favorites"];
    },
  },
  methods: {
    toggleFavorite(meme) {
      if (this.isFavorite(meme)) {
        this.$store.dispatch("removeMemeFromFavorites", meme);
      } else {
        this.$store.dispatch("addMemeToFavorites", meme);
      }
    },
    isFavorite(meme) {
      return this.$store.getters["favorites"].includes(meme);
    },
  },
};
</script>

<template>
  <div id="favorite-memes">
    <div class="NavBar">
      <h1>Favorites Memes</h1>
      <router-link class="link" to="/">
        <button class="btn btn--stripe">Home</button>
      </router-link>
    </div>

    <div
      class="favorite-memes-grid"
      v-if="favoriteMemes && favoriteMemes.length > 0"
    >
      <div
        v-for="(meme, index) in favoriteMemes"
        :key="index"
        class="favorite-meme"
      >
        <img :src="meme.url" :alt="meme.name" class="favorite-meme-image" />
        <p class="favorite-meme-name">{{ meme.name }}</p>
        <button @click="toggleFavorite(meme)" class="favorite-button">
          {{ isFavorite(meme) ? "❤️ " : "🤍 " }}
        </button>
      </div>
    </div>
    <div v-else>
      <p>You don't have favorite memes.</p>
    </div>
  </div>
</template>

<style scoped>
.NavBar {
  display: flex;
}
.favorite-memes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.favorite-meme {
  background-color: #f2f2f2;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative; /* Para el botón de favorito */
}

.favorite-meme-image {
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: auto;
}

.favorite-meme-name {
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
}

.favorite-button {
  background-color: transparent;
  border: none;
  font-size: 30px;
  position: absolute;
  right: 20px;
  top: 20px;
  transition: transform 0.3s; /* Efecto de escala en hover */
}

.favorite-button:hover {
  transform: scale(1.2);
}

.btn {
  position: absolute;
  cursor: pointer;
  right: 10px;
  text-transform: uppercase;
  padding: 16px 36px 22px;
  background-color: #fff;
  color: black;
  font-weight: bold;
  border: 2px solid #666;
  border-radius: 6px;
  margin-bottom: 16px;
  transition: all 0.5s ease;
}

.btn--stripe {
  overflow: hidden;
  margin-right: 100px;
}

.btn--stripe:after {
  content: "";
  display: block;
  height: 7px;
  width: 100%;
  background-image: repeating-linear-gradient(
    45deg,
    #666,
    #666 1px,
    transparent 2px,
    transparent 5px
  );
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-top: 1px solid grey;
  position: absolute;
  left: 0;
  bottom: 0;
  background-size: 7px 7px;
}

.btn--stripe:hover {
  background-color: #bdbdbd8a;
  border-color: grey;
}

.btn--stripe:hover:after {
  background-image: repeating-linear-gradient(
    45deg,
    gray,
    gray 1px,
    transparent 2px,
    transparent 5px
  );
  border-top: 1px solid grey;
  animation: stripe-slide 12s infinite linear forwards;
}

@keyframes stripe-slide {
  0% {
    background-position: 0% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
</style>
