/**
 * @api {post} /api/users Créer un utilisateur
 * @apiName CreateUser
 * @apiGroup Utilisateurs
 *
 * @apiParam {String} username Nom d'utilisateur de l'utilisateur
 * @apiParam {String} name Nom de l'utilisateur
 * @apiParam {String} firstname Prénom de l'utilisateur
 * @apiParam {String} password Mot de passe de l'utilisateur
 * @apiParam {Email} email Adresse email de l'utilisateur
 * @apiParam {Boolean} acceptedPrivacyPolicy acceptedPrivacyPolicy acceptation RGPD de l'utilisateur
 * @apiParam {Boolean} isAdmin Admin grade de l'utilisateur
 *
 * @apiExample {json} "Creation d'un utilisateur"
 *    {
 *      "username": "johndoe",
 *      "name": "John",
 *      "firstname": "Doe",
 *      "password": "abc123",
 *      "email": "johndoe@example.com"
 *      "acceptedPrivacyPolicy": "true"
 *    }
 *
 * @apiSuccess {String} message Message de confirmation de création de l'utilisateur
 * @apiSuccess {Object} data Données de l'utilisateur créé
 * @apiSuccessExample {json} Exemple de réponse en cas de succès:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "L'utilisateur johndoe a bien été crée.",
 *      "data": {
 *        "id": 1,
 *        "username": "johndoe",
 *        "name": "John",
 *        "firstname": "Doe",
 *        "password": "$2b$10$Rd.f1GX9Q2oRd8bNlRlL1eN/2Q3qeYIH/n/nZhJ9Z/HnCmMv5F5AK",
 *        "email": "johndoe@example.com",
 *        "admin": "false"
 *        "acceptedPrivacyPolicy": "true"
 *        "createdAt": "2022-12-22T00:00:00.000Z",
 *        "updatedAt": "2022-12-22T00:00:00.000Z"
 *      }
 *    }
 *
 * @apiError {String} message Message d'erreur
 * @apiError {Object} data Données d'erreur
 * @apiErrorExample {json} Exemple de réponse en cas d'erreur:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "message": "Le champ username est obligatoire.",
 *      "data": {
 *        "name": "SequelizeValidationError",
 *        "errors": [
 *          {
 *            "message": "Le champ username est obligatoire.",
 *            "type": "Validation error",
 *            "path": "username",
 *            "value": "",
 *            "origin": "DB"
 *          }
 *        ]
 *      }
 *    }
 */




/**
 * @api {delete} /users/:id Supprimer un utilisateur
 * @apiName DeleteUser
 * @apiGroup Utilisateurs
 *
 * @apiParam {Number} id ID de l'utilisateur à supprimer
 *
 * @apiSuccess {String} message Message de confirmation de suppression de l'utilisateur
 * @apiSuccess {Object} data Données de l'utilisateur supprimé
 *
 * @apiError {String} message Message d'erreur
 * @apiError {Object} data Données d'erreur
 */


/**
 * @api {put} /users/:id Modifier un utilisateur
 * @apiName UpdateUser
 * @apiGroup Utilisateurs
 *
 * @apiParam {Number} id ID de l'utilisateur à modifier
 * @apiParam {String} [username] Nom d'utilisateur de l'utilisateur
 * @apiParam {String} [name] Nom de l'utilisateur
 * @apiParam {String} [firstname] Prénom de l'utilisateur
 * @apiParam {String} [password] Mot de passe de l'utilisateur
 * @apiParam {String} [email] Adresse email de l'utilisateur
 *
 * @apiSuccess {String} message Message de confirmation de modification de l'utilisateur
 * @apiSuccess {Object} data Données de l'utilisateur modifié
 *
 * @apiError {String} message Message d'erreur
 * @apiError {Object} data Données d'erreur
 */
/**
 * @api {get} /users Récupérer la liste des utilisateurs
 * @apiName FindAllUsers
 * @apiGroup Utilisateurs
 *
 * @apiSuccess {String} message Message de confirmation de récupération de la liste des utilisateurs
 * @apiSuccess {Object} data Données de la liste des utilisateurs
 *
 * @apiError {String} message Message d'erreur
 * @apiError {Object} data Données d'erreur
 */


/**
 * @api {get} /users/:id Récupérer un utilisateur par son ID
 * @apiName FindOneUser
 * @apiGroup Utilisateurs
 *
 * @apiParam {Number} id ID de l'utilisateur à récupérer
 *
 * @apiSuccess {String} message Message de confirmation de récupération de l'utilisateur
 * @apiSuccess {Object} data Données de l'utilisateur
 *
 * @apiError {String} message Message d'erreur
 * @apiError {Object} data Données d'erreur
 */


//le jeton d'authentification
const auth = require('../auth/auth')
const cache = require('../cache/cache')

const {
  createUserControlers,
  deleteUserControlers,
  updateUserControlers,
  findAllUsersControlers,
  FindOneUserControlers,
  
} = require("../controllers/userControlers");

module.exports = (app) => {
  app.post("/api/users",/*auth,*/ createUserControlers)
  app.delete("/api/users/:id",auth, deleteUserControlers)
  app.put("/api/users/:id",auth, updateUserControlers)
  app.get("/api/users",auth, findAllUsersControlers)
  app.get("/api/users/:id",auth, /*cache,*/ FindOneUserControlers)
};



