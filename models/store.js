module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
            indexes: [{
                unique: true,
                fields: ['name'],
            }],
        });

    Store.associate = (models) => {
    };

    return Store;
};
