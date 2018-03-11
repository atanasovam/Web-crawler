module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        name: {
            type: DataTypes.STRING,
            // unique: true,
            allowNull: false,
        },
    }, {});

    Store.associate = (models) => {
    };

    return Store;
};
