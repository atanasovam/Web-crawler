const Sequelize = require('sequelize');

const {
    Details,
    Phones,
    Store,
} = require('../models');
// const { executeQuery } = require('./executeQuery');

const addEntries = async (obj) => {
    const {
        deltailsModelObj,
        phonesModelObj,
        storeModelObj,
    } = obj;


    const addNewData = (async (dataToAdd) => {
        try {
            phonesModelObj.url = decodeURIComponent(phonesModelObj.url);

            const details = (await Details.create(deltailsModelObj));

            let storeId = await Store.findCreateFind({
                where: {
                    name: storeModelObj.name,
                },
            });
            storeId = storeId[0].dataValues.id;

            phonesModelObj.fk_store = storeId;
            phonesModelObj.fk_details = details.id;

            const phones = (await Phones.create(phonesModelObj));

            const exists = (await Store.findOne({
                where: {
                    id: storeModelObj.id,
                },
            }));

            const store = (await Store.findCreateFind({
                where: {
                    name: storeModelObj.name,
                },
            }));

            return;
        } catch (error) {
            console.log('Failed to add! --------------->>>'
                + phonesModelObj.url);
            console.warn(error);
        }
    })(obj);
};

module.exports = {
    addEntries,
};
