/* eslint-disable prettier/prettier */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Desk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Desk.init(
    {
      Identifier: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      deskId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      deskData: { type: DataTypes.TEXT, allowNull: true },
      image: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },

    {
      sequelize,
      modelName: 'Desk',
    }
  );
  return Desk;
};
