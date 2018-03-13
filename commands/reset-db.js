const sequelizeDbWrapper = require('../db/models/index');

const {
    Details,
    Phones,
    Store,
} = require('../db/models');

const resetDB = async () => {
    await Phones.destroy({
        truncate: {
            cascade: true,
        },
    });

    await Details.destroy({
        truncate: {
            cascade: true,
        },
    });

    await Store.destroy({
        truncate: {
            cascade: true,
        },
    });

    console.log('DB is empty!');

    await sequelizeDbWrapper.sequelize.close();
};

resetDB();
