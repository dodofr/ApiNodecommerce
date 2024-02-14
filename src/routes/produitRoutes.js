//le jeton d'authentification
const auth = require('../auth/auth')

const {
    createProduitControlers,
    deleteProduitControlers,
    updateProduitControlers,
    findAllProduitControlers,
    FindOneProduitControlers,
    
  } = require("../controllers/produitControlers");
  
  module.exports = (app) => {
    app.post("/api/produits",auth, createProduitControlers)
    app.delete("/api/produits/:id",auth, deleteProduitControlers)
    app.put("/api/produits/:id",auth, updateProduitControlers)
    app.get("/api/produits",/*auth,*/ findAllProduitControlers)
    app.get("/api/produits/:id",/*auth,*/ FindOneProduitControlers)
  };