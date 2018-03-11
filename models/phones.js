module.exports = (sequelize, DataTypes) => {
    const Phones = sequelize.define('Phones', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
            indexes: [{
                unique: true,
                fields: ['url'],
            }],
        });

    Phones.associate = (models) => {
        const {
            Store,
        } = models;

        Phones.belongsTo(Store, {
            foreignKey: 'fk_store',
            onDelete: 'CASCADE',
        });
    };

    return Phones;
};
