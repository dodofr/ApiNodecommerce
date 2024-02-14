module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Photo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "le nom est prise",
      },
    },
    fichier: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: "cela doit étre une url" },
        notNull: { msg: "nous en avons besoin" },
      },
    },
    alt: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
