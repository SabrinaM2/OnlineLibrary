<!-- Composant pour un élément du panier -->

<template>
  <div class="card">
    <div class="article-img">
      <div :style="{ backgroundImage: 'url(' + article.image + ')' }">
      </div>
    </div>
    <div class="card_right">
      <h3><strong>{{article.titre}}</strong></h3>
      <div>
        <p>Quantité : {{quantity}}</p>
      </div>
    </div>
  </div>
</template>

<script>

module.exports = {
  name: "PanierItem",
  props: {
    article: {type: Object},
    quantity: {type: Number}
  }
}

</script>

<style scoped>

</style>