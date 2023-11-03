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
        <button class="favPage-button">
        Favorites
        </button>
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
      <i class="bx bxs-left-arrow"></i>
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
      <i class="bx bxs-right-arrow"></i>
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
  background-color: #111;
  border-radius: 50%;
  font-weight: bold;
  height: 30px;
  width: 30px;
  border: none;
  cursor: pointer;
  color: #05ff04;
  margin: 5px;
}

.page-button {
  height: 30px;
  width: 30px;
  cursor: pointer;
}

.page-numbers button.active {
  height: 35px;
  width: 35px;
  border: #05FF04 1px solid;
}

.page-button:hover {
  background-color: black;
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

.link {
  text-decoration: none;
  color: #05ff04;
}
.favPage-button {
  position: absolute;
  top: 10px;
  right: 40px;
  padding: 20px 60px;
  text-transform: uppercase;
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
.favPage-button::before {
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

.favPage-button:hover {
  cursor: pointer;
}

.favPage-button:hover::before {
  transform: translate(140px);
}
</style>
