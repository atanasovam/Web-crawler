module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brands', {
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

    Brand.associate = (models) => {
    };

    return Brand;
};
