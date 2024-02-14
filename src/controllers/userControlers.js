const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
//gestion des validateur ou unique
const { ValidationError, UniqueConstraintError } = require("sequelize");

async function createUserControlers(req, res) {
  //operateur de decomposition, qui me permet d'eviter d'ecrire const username = req.body.username et recuperer les propriété de l'objet body
  const { username, name, firstname, password, email, acceptedPrivacyPolicy } = req.body;
  
  try {
    //nous hachons le password avant sa mise en bdd
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      name: name,
      firstname: firstname,
      password: hashPassword,
      email: email,
      acceptedPrivacyPolicy:acceptedPrivacyPolicy,
    });
    //nos retournons la data en Json avec un message de confirmation
    const message = `L'utilisateur ${req.body.username} a bien été crée.`;
    return res.json({ message, data: user });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    const message = "veuillez réessayer ultérieurement";
    res.status(500).json({ message, data: error });
  }
}

async function deleteUserControlers(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (user === null) {
      const message = "le user est introuvable";
      return res.status(404).json({ message });
    }
    const userDeleted = user;
    await User.destroy({
      where: { id: user.id },
    });
    const message = `${userDeleted.name} avec l'identifiant n°${userDeleted.id} a bien été supprimé.`;
    return res.json({ message, data: userDeleted });
  } catch (error) {
    const message = "le user n'a pas pu étre supprimé";
    return res.status(500).json({ message, data: error });
  }
}

async function updateUserControlers(req, res) {
  // Destructuration d'objects
  // permet de ne pas avoir a ecrire a chaque fois req.params ou req.body
  // tu récupères direct les propriétés que tu as besoin
  const { id } = encodeURI(req.params);

  const { username, name, firstname, password, email } = req.body;
  try {
    // si pas de nouveau mot de passe
    if (!password) {
      await User.update(
        {
          username: username,
          name: name,
          firstname: firstname,
          email: email,
        },
        {
          where: { id },
        }
      );
      const user = await User.findByPk(id);

      if (user === null) {
        const message = "l'utilisteur' est introuvable";
        return res.status(404).json({ message });
      }

      const message = `L'utilisateur' ${username} a bien été modifié.`;
      return res.json({ message, data: user });
    }

    // si nouveau mot de passe

    // au lieu de .then ...
    const hashPassword = await bcrypt.hash(password, 10);

    await User.update(
      {
        username: username,
        name: name,
        firstname: firstname,
        password: hashPassword,
        email: email,
      },
      {
        where: { id },
      }
    );
    const user = await User.findByPk(id);
    if (user === null) {
      const message = "l'utilisteur' est introuvable";
      return res.status(404).json({ message });
    }
    const message = `L'utilisateur' ${username} a bien été modifié.`;
    return res.json({ message, data: user });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    const message = `L'utilisateur n'a pas été modifié`;
    return res.status(500).json({ message, data: error });
    //  res.status(500) //erreur côté serveur
  }
}

async function findAllUsersControlers(req, res) {
  try {
    const user = await User.findAll();

    const message = "La liste des utilisateurs a bien été récupérée.";
    return res.json({ message, data: user });
  } catch (error) {
    const message = "la liste des utilisateurs n'a pas été trouvée";
    return res.status(500).json({ message, data: error });
  }
}

async function FindOneUserControlers(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (user === null) {
      const message = "l'utilisateur' est introuvable";
      return res.status(404).json({ message });
    }
    const message = "l'utilisateur a bien été trouvé.";
    return res.json({ message, data: user });
  } catch (error) {
    const message = "le produit n'a pas été trouvé";
    return res.status(500).json({ message, data: error });
  }
}

module.exports = {
  createUserControlers,
  deleteUserControlers,
  updateUserControlers,
  findAllUsersControlers,
  FindOneUserControlers,
};

