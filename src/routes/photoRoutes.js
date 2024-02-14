//le jeton d'authentification
const auth = require('../auth/auth')

const {
    createPhotoControlers,
    deletePhotoControlers,
    updatePhotoControlers,
    findAllPhotoControlers,
    FindOnePhotoControlers,
    
  } = require("../controllers/photoControlers");
  
  module.exports = (app) => {
    app.post("/api/photos",auth, createPhotoControlers)
    app.delete("/api/photos/:id",auth, deletePhotoControlers)
    app.put("/api/photos/:id",auth, updatePhotoControlers)
    app.get("/api/photos",/*auth,*/ findAllPhotoControlers)
    app.get("/api/photos/:id",/*auth,*/ FindOnePhotoControlers)
  };