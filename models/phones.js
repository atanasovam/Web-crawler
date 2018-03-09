module.exports = (sequelize, DataTypes) => {
    const Phones = sequelize.define('Phones', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});

    Phones.associate = (models) => {
        const {
            Store,
            Details,
        } = models;

        Phones.belongsTo(Details, {
            foreignKey: {
                foreignKey: 'fk_details',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });

        Phones.belongsTo(Store, {
            foreignKey: {
                foreignKey: 'fk_store',
                allowNull: false,
            },
            through: 'phonesStores',
            onDelete: 'CASCADE',
        });
    };

    return Phones;
};
