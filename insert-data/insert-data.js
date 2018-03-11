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

    let storeId = await Store.findCreateFind({
        where: {
            name: storeModelObj.name,
        },
    });
    storeId = storeId[0].dataValues.id;

    phonesModelObj.fk_store = storeId;

    const phone = await Phones.create(phonesModelObj);
    deltailsModelObj.fk_phones = phone.id;

    await Details.create(deltailsModelObj);
    await Store.create(storeModelObj);
};

module.exports = {
    addEntries,
};
