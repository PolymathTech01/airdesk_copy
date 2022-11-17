/* eslint-disable prettier/prettier */
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Desks', {
      Identifier: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      deskId: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      deskData: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Desks');
  },
};
