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
    }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        });

    Details.associate = (models) => {
    };

    return Details;
};
