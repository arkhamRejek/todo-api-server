'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('users', 'email', { type: Sequelize.STRING });
    await queryInterface.addColumn('users', 'password', { type: Sequelize.STRING });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('users', 'email', { /* query options */ });
    await queryInterface.removeColumn('users', 'password', { /* query options */ });
  }
};
