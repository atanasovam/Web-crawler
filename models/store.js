module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});

    Store.associate = (models) => {
        const {
            Phones,
        } = models;

        Store.belongsTo(Phones, {
            foreignKey: 'fk_phones',
            onDelete: 'CASCADE',
        });
    };

    return Store;
};
