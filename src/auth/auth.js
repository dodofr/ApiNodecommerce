// const jwt = require('jsonwebtoken')
// const privateKey = require('../auth/private_key')
// //modif
// const { User } = require("../db/sequelize");
  
// module.exports = (req, res, next) => {
//   const authorizationHeader = req.headers.authorization
  
//   if(!authorizationHeader) {
//     const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
//     return res.status(401).json({ message })
//   }
//     //enleve le mot Bearer
//     const token = authorizationHeader.split(' ')[1]
//     const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
//     if(error) {
//       const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
//       return res.status(401).json({ message, data: error })
//     }
   
//     const userId = decodedToken.userId

//      //modif
//      User.findOne({ where: { id: userId, isAdmin: true } })
//      .then(user => {
//        if (!user) {
//          const message = `L'Utilisateur n'est pas autorisé à accéder à cette ressource.`
//          res.status(401).json({ message })
//        } 
//       })
//        //modif

//     if (req.body.userId && req.body.userId !== userId) {
//       const message = `L'identifiant de l'utilisateur est invalide.`
//       res.status(401).json({ message })
//     } else {
//       next()
//     }
//   })
// }
//meilleur code 
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
const { User } = require("../db/sequelize");

module.exports = async (req, res, next) => {
const authorizationHeader = req.headers.authorization

if(!authorizationHeader) {
const message = "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête."
return res.status(401).json({ message })
}

//enleve le mot Bearer
const token = authorizationHeader.split(' ')[1]

try {
const decodedToken = jwt.verify(token, privateKey)
const userId = decodedToken.userId


const user = await User.findOne({ where: { id: userId, isAdmin: true } })

if (!user) {
  const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`
  return res.status(401).json({ message })
}

if (req.body.userId && req.body.userId !== userId) {
  const message = `L'identifiant de l'utilisateur est invalide.`
  return res.status(401).json({ message })
} else {
  next()
}
} catch (error) {
const message = "L'utilisateur n'est pas autorisé à accéder à cette ressource."
return res.status(401).json({ message, data: error })
}
}
//