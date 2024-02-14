const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../models/user");
const PhotoModel = require("../models/photo");
const CategorieModel = require("../models/categorie");
const ProduitModel = require("../models/produit");
const bcrypt = require("bcrypt");

// const sequelize = new Sequelize('celianode', 'root', '', {
//   host: 'localhost',
//   dialect: "mariadb",
//   dialectOptions: {
//     timezone: "Etc/GMT-2",
//   },
// //  logging: false,
// });


//nous stockons les information de connection
const sequelize = new Sequelize(`mariadb://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3305/${process.env.DB_USERNAME}`)


// Après avoir importé UserModel nous lui indiquons en paramètre sequelize ainsi que Datatypes pour permettre la creation d'une table en bdd  
// Nous la stockons dans une constante pour pouvoir l'exporter et l'utiliser lors de la création des controlers
const User = UserModel(sequelize, DataTypes);
const Photo = PhotoModel(sequelize, DataTypes);
const Categorie = CategorieModel(sequelize, DataTypes);
const Produit = ProduitModel(sequelize, DataTypes);

//initialisation/syncronisation de la base de données grace à la methode sync()
const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => { //{ alter: true } => voit les changements

    bcrypt
      .hash(process.env.DB_INIT_PASSWORD, 10)
      .then((hash) => {
        User.create({
          username: process.env.DB_INIT_ADMIN,
          name:'adm',
          firstname:'in',
          email:'admin@admin.com',
          password: hash,
          isAdmin:true,
          acceptedPrivacyPolicy:true
        }).then((user) => console.log(user.toJSON()));
      })
     
      

    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  User,
  Photo,
  Produit,
  Categorie,
};
