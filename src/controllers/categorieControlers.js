const { Categorie } = require("../db/sequelize");
//gestion des validateur ou unique
const { ValidationError, UniqueConstraintError } = require("sequelize");

async function createCategorieControlers(req, res) {
  const { name } = req.body;
  try {
    const categorie = await Categorie.create({
      name: name,
    });

    const message = `La categorie ${name} a bien été crée.`;
    return res.json({ message, data: categorie });
  } catch (error) {
    console.log("ok");
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    const message = "erreur serveur";
    return res.status(500).json({ message, data: error });
  }
}
async function deleteCategorieControlers(req, res) {
  try {
    const categorie = await Categorie.findByPk(req.params.id);

    if (categorie === null) {
      const message = "la categorie est introuvable";
      return res.status(404).json({ message });
    }
    await Categorie.destroy({
      where: { id: categorie.id },
    });
    const message = `${categorie.name} avec l'identifiant n°${categorie.id} a bien été supprimé.`;
    res.json({ message, data: categorie });
  } catch (error) {
    const message = "erreur serveur";
    return res.status(500).json({ message, data: error });
  }
}
async function updateCategorieControlers(req, res) {
  // Destructuration d'objects
  // permet de ne pas avoir a ecrire a chaque fois req.params ou req.body
  // tu récupères direct les propriétés que tu as besoin
  const { id } = req.params;

  const { name } = req.body;
  try {
    // si pas de nouveau mot de passe

    await Categorie.update(
      {
        name: name,
      },
      {
        where: { id },
      }
    );
    const categorie = await Categorie.findByPk(id);

    if (categorie === null) {
      const message = "la categorie est introuvable";
      return res.status(404).json({ message });
    }

    const message = `La categorie ${name} a bien été modifié.`;
    return res.json({ message, data: categorie });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    const message = `La categorie n'a pas été modifié`;
    return res.status(500).json({ message, data: error });
    //  res.status(500) //erreur côté serveur
  }
}
async function findAllCategorieControlers(req, res) {
  try {
    const categorie = await Categorie.findAll();

    const message = "La liste des categories a bien été récupérée.";
    return res.json({ message, data: categorie });
  } catch (error) {
    const message = "la liste des categories n'a pas été trouvé";
    return res.status(500).json({ message, data: error });
  }
}
async function FindOneCategorieControlers(req, res) {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (categorie === null) {
      const message = "la categorie est introuvable";
      return res.status(404).json({ message });
    }
    const message = "la categorie a bien été trouvé.";
    return res.json({ message, data: categorie });
  } catch (error) {
    const message = "la liste des categorie n'a pas été trouvé";
    return res.status(500).json({ message, data: error });
  }
}

module.exports = {
  createCategorieControlers,
  deleteCategorieControlers,
  updateCategorieControlers,
  findAllCategorieControlers,
  FindOneCategorieControlers,
};
