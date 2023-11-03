<script>
export default {
  name: "MemePage",
  data() {
    return {
      memes: [],
      itemsPerPage: 8,
      currentPage: 1,
      searchText: "",
    };
  },
  computed: {
    filteredMemes() {
      return this.memes.filter((meme) => {
        return meme.name.toLowerCase().includes(this.searchText.toLowerCase());
      });
    },
    totalPages() {
      return Math.ceil(this.filteredMemes.length / this.itemsPerPage);
    },
    pageNumbers() {
      const currentPage = this.currentPage;
      const total = this.totalPages;

      // Calcula el rango de números de página para mostrar
      const numToShow = total > 5 ? 5 : total;

      let startPage = currentPage - Math.floor(numToShow / 2);
      if (startPage < 1) {
        startPage = 1;
      }
      if (startPage + numToShow > total) {
        startPage = total - numToShow + 1;
      }

      const pageNumbers = Array.from(
        { length: numToShow },
        (_, i) => startPage + i
      );
      return pageNumbers;
    },
    pagedMemes() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredMemes.slice(startIndex, endIndex);
    },
  },
  methods: {
    async fetchMemes() {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        this.memes = data.data.memes;
      } catch (error) {
        console.error("Error al obtener memes", error);
      }
    },
    toggleFavorite(meme) {
      if (this.isFavorite(meme)) {
        this.$store.dispatch("removeMemeFromFavorites", meme);
        console.log("sali de favs");
      } else {
        this.$store.dispatch("addMemeToFavorites", meme);
        console.log("entre a favs");
      }
      this.$forceUpdate();
    },
    isFavorite(meme) {
      // Valida si el meme está en la lista de favoritos en Vuex
      return this.$store.state.favorites.favorites.some(
        (favMeme) => favMeme.id === meme.id
      );
    },
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
  },
  watch: {
    searchText: function (newText, oldText) {
      // Cuando la searchText cambia, configuramos currentPage en 1
      this.currentPage = 1;
    },
  },
  mounted() {
    this.fetchMemes();
  },
};
</script>

<template>
  <div id="home">
    <div class="navBar">
      <h1 class="title">Memes List</h1>
      <div class="search-input-container">
        <span class="search-icon">🔎</span>
        <input
          v-model="searchText"
          class="search-input"
          placeholder="Search memes by name"
        />
      </div>
      <router-link class="link" to="/favorites">
        <button class="btn btn--stripe">Favorites</button>
      </router-link>
    </div>
    

    <div class="meme-container">
    <div class="meme-grid" v-if="filteredMemes.length > 0">
      <div v-for="(meme, index) in pagedMemes" :key="index" class="meme-border">
        <div class="meme">
          <button @click="toggleFavorite(meme)" class="favorite-button">
          {{ isFavorite(meme) ? "❤️" : "🤍" }}
        </button>
        <router-link
            :to="{ name: 'MemeDetail', params: { id: meme.id } }"
            class="meme-link"
          >
        <img :src="meme.url" :alt="meme.name" class="meme-image" />
        <p class="meme-name">{{ meme.name }}</p>
       
        </router-link>
      </div>
    </div>
    </div>
    
    <div v-else>
      <p>Cargando memes...</p>
    </div>
    
  </div>
    <div class="pagination" v-if="filteredMemes.length > itemsPerPage">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="page-button"
      >
        &lt;
      </button>
      <span class="page-numbers">
        <button
          v-for="pageNumber in pageNumbers"
          :key="pageNumber"
          @click="goToPage(pageNumber)"
          :class="{ active: pageNumber === currentPage }"
        >
          {{ pageNumber }}
        </button>
      </span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="page-button"
      >
        >
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ... estilos principales ... */

.meme-container{
  justify-content: center;
  align-items: center;
  margin: auto;
  display: flex;
}
.meme-grid {
  height: 100%;
  width: 99%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  user-select: none;
}

.meme-border{
  border: 2px solid #05FF04;
  border-radius: 15px;
  padding: 10px;
  
}
.meme {
  background: linear-gradient(to bottom, #000000, #111);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.meme-link{
  text-decoration: none;
  color: black;
  max-width: 100%;
}
.meme-image {
  width: 100%;
  max-width: 100%;
  max-height: 310px;
  height: auto;
}

.meme-name {
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
  color: #05FF04;
}

.favorite-button {
  background-color: transparent;
  border: none;
  font-size: 30px;
  position: absolute;
  margin: 20px;
  transition: all 0.3s ease;
  transition-delay: 0.2s;
  z-index: 1000;
}

.favorite-button:hover {
  font-size: 35px;
}

/* ... estilos de paginacion ... */
.pagination {
  text-align: center;
  margin-top: 15px;
  user-select: none;
  padding-bottom: 20px;
}

.pagination button {
  background-color: #004a56c2;
  font-weight: bold;
  height: 30px;
  width: 30px;
  border: none;
  cursor: pointer;
  color: #fff;
}

.page-button {
  height: 30px;
  width: 30px;
  cursor: pointer;
  color: #fff;
}

.page-numbers button.active {
  background-color: #007f8e;
  height: 35px;
  width: 35px;
  color: #fff;
}

.page-button:hover {
  background-color: #007f8e;
}

.page-button:disabled {
  cursor: not-allowed;
  color: #ccc;
}

/* ... estilos de navbar ... */
.navBar {
  user-select: none;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: space-between;
}

.title {
  transform: translate(60%);
  color: #05FF04;
}

.search-input-container {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-right: 150px;
}

.search-icon {
  font-size: 20px;
  margin-right: 5px; 
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  padding: 5px;
  height: 30px;
  width: 400px;
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
  margin-top: -35px;
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
  color: #000000;
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
