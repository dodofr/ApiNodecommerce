//le jeton d'authentification
const auth = require('../auth/auth')

const {
    createCategorieControlers,
    deleteCategorieControlers,
    updateCategorieControlers,
    findAllCategorieControlers,
    FindOneCategorieControlers,
    
  } = require("../controllers/categorieControlers");
  
  module.exports = (app) => {
    app.post("/api/categories",auth, createCategorieControlers)
    app.delete("/api/categories/:id",auth, deleteCategorieControlers)
    app.put("/api/categories/:id",auth, updateCategorieControlers)
    app.get("/api/categories",/*auth,*/ findAllCategorieControlers)
    app.get("/api/categories/:id",/*auth,*/ FindOneCategorieControlers)
  };