const { Photo } = require("../db/sequelize");
//gestion des validateur ou unique
const { ValidationError, UniqueConstraintError } = require("sequelize");

async function createPhotoControlers(req, res) {
  const { name, fichier, alt } = req.body;
  try {
    const photo = await Photo.create({
      name: name,
      fichier: fichier,
      alt: alt,
    });

    const message = `La photo ${name} a bien été crée.`;
    return res.json({ message, data: photo });
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

async function deletePhotoControlers(req, res) {
  try {
    const photo = await Photo.findByPk(req.params.id);

    if (photo === null) {
      const message = "la photo est introuvable";
      return res.status(404).json({ message });
    }
    await Photo.destroy({
      where: { id: photo.id },
    });
    const message = `${photo.name} avec l'identifiant n°${photo.id} a bien été supprimé.`;
    res.json({ message, data: photo });
  } catch (error) {
    const message = "erreur serveur";
    return res.status(500).json({ message, data: error });
  }
}

async function updatePhotoControlers(req, res) {
  const { id } = req.params;

  const { name, fichier, alt } = req.body;
  try {
    await Photo.update(
      {
        name: name,
        fichier: fichier,
        alt: alt,
      },
      {
        // Where:{id :id}
        where: { id },
      }
    );
    const photo = await Photo.findByPk(id);
    if (photo === null) {
      const message = "la photo est introuvable";
      return res.status(404).json({ message });
    }
    const message = `La photo ${photo.name} a bien été modifié.`;
    return res.json({ message, data: photo });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    const message = `La photo n'a pas été modifié `;
    return res.status(500).json({ message, data: error });
    //  res.status(500) //erreur côté serveur
  }
}

async function findAllPhotoControlers(req, res) {
  try {
    const photos = await Photo.findAll();

    const message = "La liste des photo a bien été récupérée.";
    return res.json({ message, data: photos });
  } catch (error) {
    const message = "la liste des photo n'a pas été trouvé";
    return res.status(500).json({ message, data: error });
  }
}

async function FindOnePhotoControlers(req, res) {
  try {
    const photo = await Photo.findByPk(req.params.id);
    if (photo === null) {
      const message = "la photo est introuvable";
      return res.status(404).json({ message });
    }
    const message = "la photo a bien été trouvé.";
    return res.json({ message, data: photo });
  } catch (error) {
    const message = "la liste des photo n'a pas été trouvé";
    return res.status(500).json({ message, data: error });
  }
}

module.exports = {
  createPhotoControlers,
  deletePhotoControlers,
  updatePhotoControlers,
  findAllPhotoControlers,
  FindOnePhotoControlers,
};
