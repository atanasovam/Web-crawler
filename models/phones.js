module.exports = (sequelize, DataTypes) => {
    const Phone = sequelize.define('Phone', {
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

    Phone.associate = (models) => {
    };

    return Phone;
};
