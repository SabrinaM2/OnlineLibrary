<!-- Composant article que l'on va utiliser dans le catalogue -->

<template>
  <div class="container">
    <div class="card">
      <div class="article-img">
        <div :style="{ backgroundImage: 'url(' + article.image + ')' }">
        </div>
      </div>
      <div class="card_right">
        <h3><strong>{{article.titre}}</strong></h3>
        <p>Auteur: <strong>{{article.auteur}}</strong></p>
        <p>Nb pages: <strong>{{article.nb_pages}}</strong></p>
        <div>
          <p v-if="article.nb_exemplaires>0"><strong>{{article.nb_exemplaires}} exemplaires restants</strong></p>
          <p v-else><strong>Indisponible</strong></p>
        </div>
        <p>{{article.description}}</p>
      </div>
      <div class="right_container">
        <div class="quantity_select">
          <p>Quantité:</p>
          <input type="number" min="1" max="{{article.nb_exemplaires}}">
        </div>
        <div class="add_button">
          <button>Ajouter au panier</button>
        </div>
      </div>
    </div>
    <div class="button_admin">
      <button v-if="isAdmin">Supprimer le livre du catalogue</button>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "ItemCard",
  props: {
    article: { type: Object }
  },
  data() {
    return {

    }
  },
  methods: {
    isAdmin() {

    }
  }
}
</script>

<style scoped>

.container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  border-bottom: 1px solid black;
}

.card {
  display: flex;
  flex-direction: row;
  padding: 20px;
  align-items: center;
}

.article-img {
  margin-right: 20px;
  padding-right: 50px;
}

.article-img div {
  background-size: cover;
}

.card_right {
  max-width: 600px;
  justify-content: left;
  text-align: left;
}

.right_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 40px;
  margin-left: 50px;
}

.quantity_select {
  margin-bottom: 20px;
}

.quantity_select input {
  width: 50px;
  height: 30px;
  margin-top: -10px;
}

.add_button button {
  height: 30px;
  background-color: #ffcb01;
  border-radius: 5px;
  font-size: 15px;
  border: none;
}

.button_admin {
  display: flex;
  align-items: center;
}

.button_admin button {
  height: 30px;
  background-color: #ff4114;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  border: none;
}

</style>