module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});

    Store.associate = (models) => {
    };

    return Store;
};
