module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Tasks', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        done: {
            type: Sequelize.BOOLEAN,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        userId: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id',
                as: 'userId',
            },
        },
    }),
    down: queryInterface => queryInterface.dropTable('Tasks'),
};
