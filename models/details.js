module.exports = (sequelize, DataTypes) => {
    const Details = sequelize.define('Details', {
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpu: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ram: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        os: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});

    Details.associate = (models) => {
        const {
            Phones,
        } = models;

        Details.belongsTo(Phones, {
            foreignKey: 'fk_phones',
            onDelete: 'CASCADE',
        });
    };

    return Details;
};
