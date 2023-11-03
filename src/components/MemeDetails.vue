<template>
  <div id="meme-detail">
    <router-link to="/" class="back-button">
      <button class="button"><i class="bx bxs-left-arrow"></i> Atrás</button>
    </router-link>

    <div class="meme-container" v-if="meme">
      <div class="datos-container">
        <h2 class="meme-title">{{ meme.name }}</h2>
        <div class="imagen-container">
          <img :src="meme.url" :alt="meme.name" class="meme-image" />
        </div>

        <a
          :href="meme.url"
          :download="`${meme.name}.jpg`"
          class="download-button"
          >Descargar Plantilla</a
        >
      </div>
    </div>
    <div v-else>
      <p>Cargando meme...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemeDetail",
  data() {
    return {
      meme: null,
    };
  },
  created() {
    // sacamos el parametro id de la ruta
    const memeId = this.$route.params.id;

    // llamada a la ip con el memeID
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        // Busca el meme específico por su id
        const meme = data.data.memes.find((meme) => meme.id === memeId);

        if (meme) {
          this.meme = meme;
        } else {
          console.error("Meme no encontrado");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el meme:", error);
      });
  },
};
</script>

<style scoped>
#meme-detail {
  height: 100vh;
}

p{
  color: #05ff04;
}
.datos-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.imagen-container {
  border: 2px solid #05ff04;
  border-radius: 20px;
  max-width: fit-content;
}

.meme-title {
  text-align: center;
  color: #05ff04;
}

.meme-image {
  max-height: 500px;
  margin: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.download-button {
  margin: 50px;
  padding: 10px 20px;
  background-color: #007f8e;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  border: 2px solid black;
  transition: background-color 0.3s;
}

.download-button:hover {
  background-color: #00565f;
}

.button {
  top: 50px;
  left: 100px;
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

.back-button {
  color: #05ff04;
  font-weight: bold;
  text-decoration: none;
  font-family: sans-serif;
}

@media screen and (max-width: 1081px) {
  .meme-image {
    max-height: 350px;
    margin: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  #meme-detail {
    overflow: hidden;
  }
}
</style>
