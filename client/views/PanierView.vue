<template>
  <div class="container">
    <div class="router">
      <nav>
        <router-link to="/catalogue">Retour au catalogue</router-link>
      </nav>
    </div>
    <div class="titre">
      <h2>Mon Panier</h2>
    </div>
    <article class="panier" v-for="article in articles">
      <panier-item :article="article" :quantity=2></panier-item>
      <img src="../assets/trash.svg">
    </article>
  </div>
</template>

<script>

const PanierItem = window.httpVueLoader('./PanierItem')

module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object }
  },
  components: {
    PanierItem
  },
  data () {
    return {
    }
  },
  async mounted () {
    const res = await axios.get('/api/articles')
    this.articles = res.data
  },
  methods: {
  }
}
</script>

<style scoped>

.container {
  margin-top: 20px;
  margin-left: 20px;
}

.router {
  display: flex;
  justify-content: left;
}

.panier img {
  width: 15px;
  height: auto;
}

.titre {

}

</style>
