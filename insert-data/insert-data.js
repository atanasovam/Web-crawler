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

            console.log(storeModelObj.id + '-'.repeat(10) + storeModelObj.name);
            phonesModelObj.fk_store = storeModelObj.id;
            console.log(storeModelObj.id + '-'.repeat(10) + storeModelObj.name);

            const phones = (await Phones.create(phonesModelObj));
            console.log(storeModelObj.id + '-'.repeat(10) + storeModelObj.name, 'phones');

            await phones.save();
            console.log(storeModelObj.id + '-'.repeat(10) + storeModelObj.name);

            deltailsModelObj.fk_phones = phones.id;

            const details = (await Details.create(deltailsModelObj));
            await details.save();

            const exists = (await Store.findOne({
                where: {
                    id: storeModelObj.id,
                },
            }));

            if (exists) {
                return;
            }

            const store = (await Store.create({
                name: storeModelObj.name,
            }));

            await store.save();

            return;
        } catch (error) {
            console.log('Failed add! ' + phonesModelObj.url);
            console.log(error);
        }
    })(obj);
};

module.exports = {
    addEntries,
};
