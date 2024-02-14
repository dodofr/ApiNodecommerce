const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

async function login(req, res) {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      const message = `L'utilisateur n'existe pas`;
      return res.status(404).json({ message });
    }
  
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
  
    if (!isPasswordValid) {
      const message = `le mot de pass est incorrect`;
      return res.status(404).json({ message });
    }
    if (isPasswordValid) {
      //JWT j'ajoute a la requete si il est admin
      const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, privateKey, {
        expiresIn: "24h",
      });
  
      const message = `L'utilisateur a été connecté avec succès`;
      return res.json({ message, data: user, token, isAdmin: user.isAdmin });
    }
  } catch (error) {
    const message = `retentez dans quelques instant`;
    return res.json({ message, data: error });
  }
}

module.exports = {
  login,
};


