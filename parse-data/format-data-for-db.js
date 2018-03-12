const formatedDataForDB = (obj, store) => {
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
