const express = require('express')
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets')
const app = require('../app.js')
const router = express.Router()
const articles = require('../data/articles.js')
const mysql = require('mysql2')
const {json} = require("express");

const db = mysql.createConnection({
    host: "localhost",
    user: "sab_web",
    password: "azerty",
    database: "projet_web"
});

db.connect(function(err) {
    if(err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.articles = []
  }
}

/**
 * Dans ce fichier, vous trouverez des exemples de requêtes GET, POST, PUT et DELETE
 * Ces requêtes concernent l'ajout ou la suppression d'articles sur le site
 * Votre objectif est, en apprenant des exemples de ce fichier, de créer l'API pour le panier de l'utilisateur
 *
 * Notre site ne contient pas d'authentification, ce qui n'est pas DU TOUT recommandé.
 * De même, les informations sont réinitialisées à chaque redémarrage du serveur, car nous n'avons pas de système de base de données pour faire persister les données
 */

/**
 * Notre mécanisme de sauvegarde des paniers des utilisateurs sera de simplement leur attribuer un panier grâce à req.session, sans authentification particulière
 */
router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})


/*

 */
router.get('/', function(req, res){
  //res.cookie('name', 'express').send('cookie set'); //Sets name = express
});


/*
 * Cette route doit retourner le panier de l'utilisateur, grâce à req.session
 */
router.get('/panier', (req, res) => {
  
  if(typeof req.session.panier !== 'undefined') {
    res.json(req.session.panier)

    db.query(`SELECT id_item FROM panier WHERE ('` + req.session.userId + `' LIKE id_user_panier)`, function(err, result) {
      if(err) {
        throw err;
      };

      if (result==null || result.length<1) {
        console.log('Impossible de récupérer le panier de la session.')
        res.status(400).json({message : 'Impossible de récupérer le panier de la session.' })
        return
      }

      db.query(`SELECT * FROM panier WHERE ('` + req.session.userId + `' LIKE id_user_panier)`, function(err, result) {
        if(err) {
          throw err;
        };

        req.session.panier
      })

      //console.log(resultat);



      res.json(result[0])
    })

    return
  }
  res.status(501).json({ message: 'Erreur' })
})

/*
 * Cette route doit ajouter un article au panier, puis retourner le panier modifié à l'utilisateur
 * Le body doit contenir l'id de l'article, ainsi que la quantité voulue
 */
router.post('/panier', (req, res) => {

  const idArticle = parseInt(req.body.id)
  const quantityArticle = req.body.quantity

  if(!articles.find(a => a.id === idArticle)) {
    res.status(400).json({ message: 'Erreur: l\'article n\'existe pas' })
    return
  }

  if(req.session.panier.articles.find(a => parseInt(a.id) === idArticle)) {
    res.status(400).json({ message: 'Erreur: article déjà présent dans le panier' })
    return
  }

  if(quantityArticle<=0) {
    res.status(400).json({ message: 'Erreur: quantitée insuffisante' })
    return
  }

  const article = articles.find(a => parseInt(a.id) === idArticle)

  const myArticle = {
    idPanier: req.session.panier.articles.length,
    id: idArticle,
    name: article.name,
    description: article.description,
    image: article.image,
    price: article.price,
    quantity: quantityArticle
  }

  req.session.panier.articles.push(myArticle)
  // on envoie l'article ajouté à l'utilisateur
  res.json({message: 'L\'article a ete ajoute au panier'})
  //res.json(article)
})

/*
 * Cette route doit permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
 * Le panier est ensuite supprimé grâce à req.session.destroy()
 */
router.post('/panier/pay', (req, res) => {
  const prenomCli = req.body.prenom
  const nomCli = req.body.nom

  req.session.destroy()

  res.json({message: 'Merci ' + prenomCli + ' ' + nomCli + ' pour votre achat'})
})

/*
 * Cette route doit permettre de changer la quantité d'un article dans le panier
 * Le body doit contenir la quantité voulue
 */
router.put('/panier/:articleId', (req, res) => {

  const idArticle = parseInt(req.body.id)
  const quantityArticle = req.body.quantity

  if(quantityArticle<=0) {
    res.status(400).json({ message: 'Erreur: quantitée insuffisante' })
    return
  }

  const article = req.session.panier.articles.find(a => parseInt(a.id) === idArticle)

  if(!article) {
    res.status(404).json({ message: 'L\'article avec l\'id ' + idArticle + ' n\'est pas present dans le panier' })
    return
  }
  
  article.quantity = quantityArticle

  req.article = article

  res.json({message: 'La quantité a été modifiée'})

  res.send()
})

/*
 * Cette route doit supprimer un article dans le panier
 */
router.delete('/panier/:articleId', (req, res) => {
  const idArticle = parseInt(req.body.id)

  const article = req.session.panier.articles.find(a => parseInt(a.id) === idArticle)

  if(!article) {
    res.status(404).json({ message: 'L\'article avec l\'id ' + idArticle + ' n\'est pas present dans le panier' })
    return
  }
  
  req.session.panier.articles.splice(parseInt(article.idPanier), 1)

  res.json({ message: 'L\'article a été supprimé' })

  res.send()
})


/**
 * Cette route envoie l'intégralité des articles du site
 */
router.get('/articles', (req, res) => {
  //res.json(articles)
  db.query("SELECT * FROM livre", function(err, result) {
    if(err) throw err;
    console.log(result);
    res.json(result)
  })
})

/**
 * Cette route crée un article.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'article ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
router.post('/article', (req, res) => {
  const livre_titre = req.body.titre
  const livre_image = req.body.image
  const livre_auteur = req.body.auteur
  const livre_nb_pages = parseInt(req.body.nb_pages)
  const livre_description = req.body.description
  const livre_nb_exemplaires = parseInt(req.body.nb_exemplaires)

  // vérification de la validité des données d'entrée
  if (typeof livre_titre !== 'string' || livre_titre === '' ||
      typeof livre_image !== 'string' || livre_image === '' ||
      typeof livre_auteur !== 'string' || livre_auteur === '' ||
      typeof livre_description !== 'string' || livre_description === '' ||
      isNaN(livre_nb_pages) || livre_nb_pages <= 0 ||
      isNaN(livre_nb_exemplaires) || livre_nb_exemplaires <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  const article = {
    id_livre: articles.length + 1,
    titre: livre_titre,
    image: livre_image,
    auteur: livre_auteur,
    nb_pages: livre_nb_pages,
    description: livre_description,
    nb_exemplaires: livre_nb_exemplaires
  }

  db.query(`INSERT INTO livre VALUES (0, "` + article.titre + `", "`+ article.image +`", "` + article.auteur + `", `+ article.nb_pages +`, "` + article.description + `", ` + article.nb_exemplaires + `)`, function(err, result) {
    if(err) throw err;
    console.log(result);
  })
  // on envoie l'article ajouté à l'utilisateur
  res.json(article)
})

/*
 * Cette route vérifie l'existence d'un utilisateur
 */
router.post('/login', (req, res) => {
  const user_email = req.body.email
  const user_mdp = req.body.password

  const user = {
    email: user_email,
    mdp: user_mdp
  }

  db.query(`SELECT id_user, nom, prenom, statut FROM user WHERE ('` + user.email + `' LIKE email) AND ('` + user.mdp + `' LIKE password)`, function(err, result) {
    if(err) {
      throw err;
    };

    //console.log(resultat);
    if (result==null || result.length<1) {
      console.log('L\'utilisateur n\'existe pas')
      res.status(400).json({message : 'La connexion a échoué' })
      return
    }
    req.session.userId = result[0].id_user
    req.session.nom = result[0].nom
    req.session.prenom = result[0].prenom
    req.session.statut = result[0].statut

    res.json(result[0])
  })

})

router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});


/*
* Cette route permet de rentrer un nouveau user en base de données
 */

router.post('/signin', (req, res) => {

  const user_nom = req.body.nom
  const user_prenom = req.body.prenom
  const user_email = req.body.email
  const user_mdp = req.body.password

  db.query(`INSERT INTO user VALUES (0,'` + user_nom + `', '`+ user_prenom +`', 'E', '`+ user_email +`', '` + user_mdp + `', true)`, function(err, result) {
    if(err) {
      throw err;
    };
  })

})

/**
 * Cette fonction fait en sorte de valider que l'article demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /article/:articleId
 * - PUT /article/:articleId
 * - DELETE /article/:articleId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */
function parseArticle (req, res, next) {
  const articleId = parseInt(req.params.articleId)

  // si articleId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(articleId)) {
    res.status(400).json({ message: 'articleId should be a number' })
    return
  }
  // on affecte req.articleId pour l'exploiter dans toutes les routes qui en ont besoin
  req.articleId = articleId

  const article = articles.find(a => a.id === req.articleId)
  if (!article) {
    res.status(404).json({ message: 'article ' + articleId + ' does not exist' })
    return
  }
  // on affecte req.article pour l'exploiter dans toutes les routes qui en ont besoin
  req.article = article
  next()
}

router.route('/article/:articleId')
  /**
   * Cette route envoie un article particulier
   */
  .get(parseArticle, (req, res) => {
    // req.article existe grâce au middleware parseArticle
    res.json(req.article)
  })

  /**
   * Cette route modifie un article.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'article disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parseArticle, (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)

    req.article.name = name
    req.article.description = description
    req.article.image = image
    req.article.price = price
    res.send()
  })

  .delete(parseArticle, (req, res) => {
    const index = articles.findIndex(a => a.id === req.articleId)

    articles.splice(index, 1) // remove the article from the array
    res.send()
  })

module.exports = router
