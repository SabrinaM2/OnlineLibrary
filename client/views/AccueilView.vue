<template>
  <form v-on:submit.prevent="login" class="card">
    <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="card__title" v-else>Inscription</h1>
    <p class="card__subtitle" v-if="mode == 'login'">Tu es étudiant(e) et tu n'as pas encore de compte ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
    <p class="card__subtitle" v-else>Tu as déjà un compte ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
    <div class="form-row">
      <input v-model="user.email" class="form-row__input" type="text" placeholder="Adresse mail"/>
    </div>
    <div class="form-row" v-if="mode == 'create'">
      <input v-model="user.prenom" class="form-row__input" type="text" placeholder="Prénom"/>
      <input v-model="user.nom" class="form-row__input" type="text" placeholder="Nom"/>
    </div>
    <div class="form-row">
      <input v-model="user.password" class="form-row__input" type="password" placeholder="Mot de passe"/>
    </div>
    <div class="form-row">
      <button v-on:click="login" class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">Connexion
      </button>
      <button v-on:click="signin" class="button" :class="{'button--disabled' : !validatedFields}" v-else>Créer mon compte
      </button>
    </div>
  </form>
</template>

<script>

module.exports = {
  name: 'AccueilView',
  data: function () {
    return {
      mode: 'login',
      user: {
        nom: '',
        prenom: '',
        email: '',
        password: ''
      },
    }
  },
  mounted: function () {

  },
  computed: {
    validatedFields: function () {
      if (this.mode == 'create') {
        if (this.email != "" && this.prenom != "" && this.nom != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },

  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
    async login () {
      this.$emit('login', {email: this.user.email, password: this.user.password})
    },
    async signin() {
      this.$emit('signin', this.user)
    }
    /*createAccount: function () {
      const self = this;
      this.$store.dispatch('createAccount', {
        email: this.email,
        nom: this.nom,
        prenom: this.prenom,
        password: this.password,
      }).then(function () {
        self.login();
      }, function (error) {
        console.log(error);
      })
    },*/
  }
}
</script>

<style scoped>

.card {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  padding: 10px;
  border-radius: 20px;
  margin-top: 130px;
  background-color: white;
}
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}
.form-row__input {
  padding:8px;
  border: none;
  border-radius: 8px;
  background:#f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex:1;
  min-width: 100px;
  color: black;
}
.form-row__input::placeholder {
  color:#aaaaaa;
}
button {
  height: 30px;
  border-radius: 20px;
  background-color: #04729d;
  border: none;
  color: white;
  font-size: 17px;
}
</style>