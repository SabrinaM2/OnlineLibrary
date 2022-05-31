<!-- Composant pour le formulaire de connexion -->

<template>
  <div class="container">
    <form v-on:submit.prevent="login">
      <h1>Veuillez vous connecter</h1>
      <input id="mail" type="email" placeholder="Entrez votre mail..." v-model="user.email">
      <input id="mdp" type="text" placeholder="Entrez votre mot de passe..." v-model="user.password">
      <button v-on:click="login">Connexion</button>
    </form>
  </div>
</template>

<script>

module.exports = {
  name: "Login",
  data: function () {
    return {
      user : {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      this.$emit('login', this.user)
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    margin-left: 500px;
    width: 500px;
    justify-content: center;
    margin-top: 150px;
  }
  form {
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    border: 1px solid black;
    padding: 10px;
  }
  form input {
    margin-bottom: 25px;
  }
  button {
    width: 80px;
    margin-left: 120px;
    border-radius: 5px;
  }
</style>