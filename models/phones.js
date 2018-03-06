module.exports = (sequelize, DataTypes) => {
    const Phones = sequelize.define('Phones', {
        brand: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notNull: true,
                min: 5,
                max: 20,
            },
        },
        model: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notNull: true,
                min: 2,
                max: 10,
            },
        },
    });

    Phones.associate = (models) => {
        const {
            Store,
            Details,
        } = models;

        Phones.hasOne(Store);
        Store.hasMany(Phones);

        Phones.hasOne(Details);
    };

    return Phones;
};
