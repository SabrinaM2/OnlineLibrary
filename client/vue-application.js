const CatalogueView = window.httpVueLoader('./views/CatalogueView.vue')
const PanierView = window.httpVueLoader('./views/PanierView.vue')
const AccueilView = window.httpVueLoader('./views/AccueilView.vue')

const routes = [
  { path: '/', component: AccueilView},
  { path: '/catalogue', component: CatalogueView },
  { path: '/panier', component: PanierView },
]

const router = new VueRouter({
  routes
})


var app = new Vue({
  router,
  el: '#app',
  data: {
    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    },
    user: undefined,
    invaliddata: false,
    connected: false
  },
  async mounted () {
    const res = await axios.get('/api/articles')
    this.articles = res.data

    // const res2 = await axios.get('/api/panier')
    // this.panier = res2.data
  },
  computed: {

  },
  methods: {
    async login(data) {
      await axios.post('/api/login', data).then(async response => {
        this.user = response.data
        //this.panier.articles = response.data.panier;
        console.log('test')
        console.log(data.session)
        console.log('test')
        this.connected = true
        router.replace({ path: '/catalogue' });
      }).catch(error => {
        alert('Informations non valides !')
        this.invaliddata = true
      });
    },
    async signin(data) {
      await axios.post('/api/signin', data).then(async response => {
        router.replace({ path: '/' });
      }).catch(error => {
        alert('Informations non valides !')
        this.invaliddata = true
      });
    },
    /*async login(data) {
      await axios.post('/api/login', data).then(async response => {
        this.user = response.data.data;
        this.panier.articles = response.data.panier;
        router.replace('/');
      }).catch(error => {
        alert('Informations non valides !')
        this.invaliddata = true
      });
    },*/
    async addArticle(article) {
      await axios.post('/api/article', article).then(async response => {
        alert("Le livre a été ajouté !")
        //router.replace({ path: '/' });
      }).catch(error => {
        alert('Informations non valides !')
        this.invaliddata = true
      });
    },
    async updateArticle (newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },
    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
    },
    async logout() {
      await axios.get('/api/logout').then(async response => {
        this.connected = false
        router.replace({ path: '/' });
      }).catch(error => {
        alert('Erreur')
      });
    }
  }
})
