module.exports = (sequelize, DataTypes) => {
    return sequelize.define('categorie', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate :{
          notNull: {msg: 'la categorie ne peut étre nul'},
          notEmpty: {msg: 'la categorie doit avoir un nom'},
        } ,
        unique:{
            msg: 'le nom est deja pris'
        }
      },
    })
  }