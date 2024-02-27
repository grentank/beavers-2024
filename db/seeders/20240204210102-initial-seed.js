const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { email: '1@1', hashpass: bcrypt.hashSync('1', 10), name: 'Alex' },
      { email: '2@2', hashpass: bcrypt.hashSync('2', 10), name: 'Bob' },
    ], {});

    await queryInterface.bulkInsert('Tweets', [
      { body: 'Всем привет, это бот ферма', authorId: 1 },
      { body: 'Я камень', authorId: 2 },
      { body: 'Я ножницы', authorId: 1 },
      { body: 'Я бумага', authorId: 2 },
      { body: 'Ящерица и спок будут?', authorId: 2 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
