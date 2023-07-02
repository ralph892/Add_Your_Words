'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Words extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Words.init({
    word: DataTypes.STRING,
    phonetic: DataTypes.STRING,
    wordType: DataTypes.STRING,
    idUser: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Words',
  });
  return Words;
};