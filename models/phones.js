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
            // indexes: [{
            //     unique: true,
            //     fields: ['url'],
            // }],
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        });

    Phones.associate = (models) => {
        const {
            Details,
            Store,
        } = models;

        Phones.belongsTo(Details, {
            foreignKey: 'fk_details',
            onDelete: 'CASCADE',
        });

        Phones.belongsTo(Store, {
            foreignKey: 'fk_store',
            onDelete: 'CASCADE',
        });
    };

    return Phones;
};
