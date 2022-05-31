<template>
  <form @submit.prevent="addArticle">
    <h2>Nouveau livre à ajouter</h2>
    <input type="text" v-model="newArticle.titre" placeholder="Titre du livre" required>
    <input type="text" v-model="newArticle.image" placeholder="Lien de l'image du livre" required>
    <input type="text" v-model="newArticle.auteur" placeholder="Auteur du livre" required>
    <input type="number" v-model="newArticle.nb_pages" min="0" placeholder="Nombre de pages du livre" required>
    <textarea type="text" v-model="newArticle.description" placeholder="Description du livre" required></textarea>
    <input type="number" v-model="newArticle.nb_exemplaires" min="0" placeholder="Nombre d'exemplaires du livre" required>
    <button type="submit">Ajouter</button>
  </form>
</template>

<script>
module.exports = {
  data(){
    return {
      newArticle: {
        titre: '',
        image: '',
        auteur: '',
        nb_pages: 0,
        description: '',
        nb_exemplaires: 0
      }
    }
  },

  methods: {
    addArticle () {
      this.$emit('add-article', this.newArticle)
    }
  }

}
</script>

<style scoped>

form {
  border: 1px solid black;
  width: 1000px;
}

</style>