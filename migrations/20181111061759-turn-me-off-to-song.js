'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Songs',
      'turnMeOff',
      Sequelize.INTEGER
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'Songs',
      'turnMeOff'
    );
  }
};
