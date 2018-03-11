module.exports = (sequelize, DataTypes) => {
    const Phones = sequelize.define('Phones', {
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

        Phones.belongsTo(Store, {
            foreignKey: 'fk_store',
            onDelete: 'CASCADE',
        });
    };

    return Phones;
};
