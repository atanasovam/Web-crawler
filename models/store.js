module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});

    Store.associate = (models) => {
        const {
            Phones,
        } = models;

        Store.belongsToMany(Phones, {
            foreignKey: {
                foreignKey: 'fk_phones',
                allowNull: false,
                unique: true,
            },
            through: 'phonesStores',
            onDelete: 'CASCADE',
        });
    };

    return Store;
};
