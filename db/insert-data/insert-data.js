const {
    Details,
    Phones,
    Store,
} = require('../models');

const addEntries = async (obj) => {
    const {
        deltailsModelObj,
        phonesModelObj,
        storeModelObj,
    } = obj;


    (async (dataToAdd) => {
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

            await Phones.create(phonesModelObj);

            await Store.findOne({
                where: {
                    id: storeModelObj.id,
                },
            });

            await Store.findCreateFind({
                where: {
                    name: storeModelObj.name,
                },
            });

            return;
        } catch (error) {
            console.log(
                'Failed to add! --------------->>>' + phonesModelObj.url
            );
            console.warn(error);
        }
    })(obj);
};

module.exports = {
    addEntries,
};
