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
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        });

    Store.associate = (models) => {
    };

    return Store;
};
