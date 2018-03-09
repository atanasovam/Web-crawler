module.exports = (sequelize, DataTypes) => {
    const Details = sequelize.define('Details', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
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
            foreignKey: {
                foreignKey: 'fk_phones',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
    };

    return Details;
};
