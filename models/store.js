module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        name: {
            type: DataTypes.STRING(20),
            // unique: true,
            allowNull: false,
            validate: {
                notNull: true,
                min: 5,
                max: 20,
            },
        },
    });

    Store.associate = (models) => {
    };

    return Store;
};
