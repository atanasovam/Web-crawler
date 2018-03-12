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

    const checkExistance = async (phoneObj) => {
        const res = await Phones.findOne({
            where: {
                url: phoneObj.url,
            },
        });

        if (res) {
            return false;
        }
        return true;
    };

    const addNewData = (async (dataToAdd) => {
        try {
            if (!checkExistance(dataToAdd)) {
                console.log('AAAA'.repeat(30));
                return;
            }

            const details = (await Details.create(deltailsModelObj));
            await details.save();

            let storeId = await Store.findCreateFind({
                where: {
                    name: storeModelObj.name,
                },
            });
            storeId = storeId[0].dataValues.id;

            phonesModelObj.fk_store = storeId;
            phonesModelObj.fk_details = details.id;

            const phones = (await Phones.create(phonesModelObj));
            await phones.save();

            const exists = (await Store.findOne({
                where: {
                    id: storeModelObj.id,
                },
            }));

            if (exists) {
                // return;
            }

            const store = (await Store.create({
                name: storeModelObj.name,
            }));

            await store.save();

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
