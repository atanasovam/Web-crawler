const formatedDataForDB = (obj, store) => {
    const idObj = {
        'Technopolis': 1,
        'Smartphonebg': 2,
    };
    const deltailsModelObj = {
        price: obj.price,
        cpu: obj.cpu,
        ram: obj.ram,
        os: obj.os,
    };

    const phonesModelObj = {
        url: obj.url,
        brand: obj.brand,
        model: obj.model,
    };

    const storeModelObj = {
        id: idObj[store],
        name: store,
    };

    const vals = [
        ...Object.values(deltailsModelObj),
        ...Object.values(phonesModelObj),
        ...Object.values(storeModelObj),
    ]
        .map((v) => v !== 'undefined')
        .filter((v) => v !== true);

    if (vals.length > 0) {
        return false;
    }

    return {
        deltailsModelObj,
        phonesModelObj,
        storeModelObj,
    };
};

module.exports = { formatedDataForDB };
