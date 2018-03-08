const formatedDataForDB = (obj, store) => {
    const deltailsModelObj = {
        price: obj.price,
        cpu: obj.cpu,
        ram: obj.ram,
        os: obj.os,
    };

    const phonesModelObj = {
        brand: obj.brand,
        model: obj.model,
    };

    const storeModelObj = {
        name: store,
    };

    return {
        deltailsModelObj,
        phonesModelObj,
        storeModelObj,
    };
};

module.exports = { formatedDataForDB };
