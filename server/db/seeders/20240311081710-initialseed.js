/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data = await res.json();
    await queryInterface.bulkInsert(
      "Characters",
      data.results.map(({ name, image, type, status }) => ({
        name,
        image,
        type,
        alive: status === "Alive",
      })),
      {}
    );
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
