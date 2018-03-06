module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notNull: true,
                min: 5,
                max: 20,
            },
        },
    });

    Store.associate = (models) => {
        const {
            Phones,
        } = models;

        Store.hasOne(Phones);
    };

    return Store;
};
