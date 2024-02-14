module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "le nom est déja pris",
      },
      validate: {
        notNull: { msg: "l'username ne peut étre nul" },
        notEmpty: { msg: "l'username doit avoir un nom" },
        is: {
          args: /^[a-zA-Z]{1,20}[0-9]{0,3}$/,
          msg: "Le nom que vous voulez entrer n'est pas correctement écrit. Il doit contenir uniquement des lettres et un maximum de 3 chiffres.",
        },
        is: {
          args: /^[^&<>"'/]+$/,
          msg: "Le nom que vous voulez entrer n'est pas correctement écrit. Il ne doit pas contenir de caractères spéciaux.",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "le name ne peut étre nul" },
        notEmpty: { msg: "le name doit avoir un nom" },
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "le name ne peut étre nul" },
        notEmpty: { msg: "le name doit avoir un nom" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "le password ne peut étre nul" },
        notEmpty: { msg: "Vous devez mettre un password" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "cela doit étre un email" },
        notNull: { msg: "nous avons besoin d'un email" },
      },
      unique: {
        msg: "email est deja pris",
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    acceptedPrivacyPolicy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: "L'acceptation de la politique de confidentialité ne peut être nulle",
        },
        isTrue(value) {
          if (value !== true) {
            throw new Error(
              "L'acceptation de la politique de confidentialité doit être accepté"
            );
          }
        },
      },
    },
  });
};
