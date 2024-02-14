module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Produit", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate :{
          notNull: {msg: 'le produit ne peut étre nul'},
          notEmpty: {msg: 'le produit doit avoir un nom'},
        } ,
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      prix:{
       type: DataTypes.DECIMAL(10, 2),
        validate:{
            isDecimal: true,
        }
        
      },
      description:{
        type: DataTypes.STRING,
      },
      temps:{
        type: DataTypes.INTEGER,
        validate:{
            isInt: true
        }
      },
      fk_categorie:{
        type: DataTypes.INTEGER,
        validate:{
            isInt: true
        }
      },
    });
  };