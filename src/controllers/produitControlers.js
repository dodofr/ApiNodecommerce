const { Produit } = require("../db/sequelize");
const { Op } = require("sequelize");
//gestion des validateur ou unique
const { ValidationError, UniqueConstraintError } = require("sequelize");

async function createProduitControlers(req, res) {
  const { titre, fichier, alt, prix, description, temps, fk_categorie } =
    req.body;
  try {
    const produit = await Produit.create({
      titre: titre,
      fichier: fichier,
      alt: alt,
      prix: prix,
      description: description,
      temps: temps,
      fk_categorie: fk_categorie,
    });

    const message = `Le produit ${titre} a bien été crée.`;
    return res.json({ message, data: produit });
  } catch (error) {
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

async function deleteProduitControlers(req, res) {
  try {
    const produit = await Produit.findByPk(req.params.id);

    if (produit === null) {
      const message = "le produit est introuvable";
      return res.status(404).json({ message });
    }
    await Produit.destroy({
      where: { id: produit.id },
    });
    const message = `${produit.titre} avec l'identifiant n°${produit.id} a bien été supprimé.`;
    res.json({ message, data: produit });
  } catch (error) {
    const message = "erreur serveur";
    return res.status(500).json({ message, data: error });
  }
}

async function updateProduitControlers(req, res) {
  const { id } = req.params;

  const { titre, fichier, alt, prix, description, temps, fk_categorie } =
    req.body;
  try {
    await Produit.update(
      {
        titre: titre,
        fichier: fichier,
        alt: alt,
        prix: prix,
        description: description,
        temps: temps,
        fk_categorie: fk_categorie,
      },
      {
        where: { id },
      }
    );
    const produit = await Produit.findByPk(id);
    if (produit === null) {
      const message = "le produit est introuvable";
      return res.status(404).json({ message });
    }
    const message = `Le produit ${titre} a bien été modifié.`;
    return res.json({ message, data: produit });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    const message = `Le produit n'a pas été modifié `;
    return res.status(500).json({ message, data: error });
    //  res.status(500) //erreur côté serveur
  }
}

async function findAllProduitControlers(req, res) {
  try {
    //debut recherche produit recherche
    if (req.query.titre) {
      const titre = req.query.titre;
      const limit = parseInt(req.query.limit) || 7;
      //au moins deux caractere

      if (titre.length < 2) {
        const message = "le terme demandé doit contenir au moins 2 caracteres";
        return res.status(400).json({ message });
      }

      //methode simple
      // return Pokemon.findAll({where: {name :name}})
      //creation de son op pour rechercher
      const produitName = await Produit.findAndCountAll({
        where: {
          titre: {
            // name c'est la propriété du model
            //  [Op.eq]: name // name est ici le critére de recherche
            [Op.like]: `%${titre}%`,
          },
        },
        order: [["titre", "ASC"]],
        limit: limit,
      });
      //console.log(produitName.count,produitName.rows.length)

      const message = `nous avons trouvé ${produitName.count} produits correspondant à ${titre}, nous vous en affichons ${produitName.rows.length}`;
      return res.json({ message, data: produitName });
    }
    //fin recherche name produit

    const produit = await Produit.findAll();

    const message = "La liste des produits a bien été récupérée.";
    return res.json({ message, data: produit });
  } catch (error) {
    const message = "la liste des produits n'a pas été trouvée";
    return res.status(500).json({ message, data: error });
  }
}

async function FindOneProduitControlers(req, res) {
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (produit === null) {
      const message = "le produit est introuvable";
      return res.status(404).json({ message });
    }
    const message = "le produit a bien été trouvé.";
    return res.json({ message, data: produit });
  } catch (error) {
    const message = "le produit n'a pas été trouvé";
    return res.status(500).json({ message, data: error });
  }
}
module.exports = {
  createProduitControlers,
  deleteProduitControlers,
  updateProduitControlers,
  findAllProduitControlers,
  FindOneProduitControlers,
};
