module.exports = (sequelize, DataTypes) => {
    const Details = sequelize.define('Details', {
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                min: 2,
                max: 10,
            },
        },
        cpu: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notNull: true,
                min: 2,
                max: 10,
            },
        },
        ram: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notNull: true,
                min: 2,
                max: 10,
            },
        },
        os: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notNull: true,
                min: 2,
                max: 10,
            },
        },
    });

    Details.associate = (models) => {
        const {
            Phones,
        } = models;

        Details.hasOne(Phones);
    };

    return Details;
};
