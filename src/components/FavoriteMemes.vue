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
        <button class="button">Home</button>
      </router-link>
    </div>

    <div
      class="favorite-memes-grid"
      v-if="favoriteMemes && favoriteMemes.length > 0"
    >
      <div
        v-for="(meme, index) in favoriteMemes"
        :key="index"
        class="meme-border"
      >
        <div class="favorite-meme">
          <router-link
            :to="{ name: 'MemeDetail', params: { id: meme.id } }"
            class="meme-link"
          >
            <img :src="meme.url" :alt="meme.name" class="favorite-meme-image" />
            <p class="favorite-meme-name">{{ meme.name }}</p>
          </router-link>
          <button @click="toggleFavorite(meme)" class="favorite-button">
            {{ isFavorite(meme) ? "❤️ " : "🤍 " }}
          </button>
        </div>
      </div>
    </div>
    <div class="no-meme" v-else>
      <p>You don't have favorite memes.</p>
    </div>
  </div>
</template>

<style scoped>
.NavBar {
  display: flex;
  color: #05ff04;
}

.NavBar h1 {
  margin-left: 50px;
}

#favorite-memes {
  height: 100%;
}
.favorite-memes-grid {
  margin: 100px 20px 20px 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.no-meme {
  text-align: center;
}
p {
  margin-top: 100px;
  font-size: 23px;
  color: #05ff04;
}
.meme-link {
  text-decoration: none;
  color: #05ff04;
}
.favorite-meme {
  background: linear-gradient(to bottom, #000000, #111);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
}

.meme-border {
  border: 2px solid #05ff04;
  border-radius: 15px;
  padding: 10px;
}
.favorite-meme-image {
  width: 100%;
  max-width: 100%;
  max-height: 310px;
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
  transition: transform 0.3s;
}

.favorite-button:hover {
  transform: scale(1.2);
}

.button {
  top: 20px;
  right: 100px;
  padding: 20px 60px;
  text-transform: uppercase;
  position: absolute;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;
  border: 2px solid #05ff04;
  background: linear-gradient(
    to right,
    rgba(27, 253, 156, 0.1) 1%,
    transparent 40%,
    transparent 60%,
    rgba(27, 253, 156, 0.1) 100%
  );
  color: #05ff04;
  box-shadow: inset 0 0 10px rgba(27, 253, 156, 0.4),
    0 0 9px 3px rgba(27, 253, 156, 0.1);
}

.button::before {
  content: "";
  position: absolute;
  left: -10%;
  width: 80px;
  height: 100%;
  top: 0;
  transition: all 0.4s ease-in-out;
  background: linear-gradient(
    to right,
    transparent 1%,
    rgba(27, 253, 156, 0.1) 40%,
    rgba(27, 253, 156, 0.1) 60%,
    transparent 100%
  );
}

.button:hover {
  cursor: pointer;
}

.button:hover::before {
  transform: translate(140px);
}
</style>
