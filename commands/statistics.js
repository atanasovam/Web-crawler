/* globals process */
const {
    Details,
    Phones,
    Store,
} = require('../db/models');

const search = async (col, parameter) => {
    let matchingIdArr;

    if (col === 'ram') {
        parameter = parameter
            .split('gb')[0]
            .split('mb')[0];

        matchingIdArr = await Details.findAll({
            where: {
                ram: {
                    $like: `%${parameter}%`,
                },
            },
        });
    } else if (col === 'os') {
        matchingIdArr = await Details.findAll({
            where: {
                os: parameter,
            },
        });
    } else if (col === 'price') {
        matchingIdArr = await Details.findAll({
            where: {
                price: parameter,
            },
        });
    }

    matchingIdArr = matchingIdArr.map((e) => e.dataValues.id);

    if (matchingIdArr.length === 0) {
        console.log('');
        console.log(`We don't have any phones with this parameter. :(`);
        console.log('');

        return;
    }

    console.log(' ');
    console.log(' '.repeat(12) + 'Your results...');
    console.log('-'.repeat(40));

    Promise.all(matchingIdArr.map(async (id) => {
        try {
            const matchedPhone = await Phones.findOne({
                where: {
                    id: id,
                },
            });

            if (matchedPhone.dataValues === null) {
                return;
            }

            const store = await Store.findOne({
                where: {
                    id: matchedPhone.dataValues.fk_store,
                },
            });

            const result = {
                brand: matchedPhone.dataValues.brand,
                model: matchedPhone.dataValues.model,
                store: store.dataValues.name,
            };

            console.log(' '.repeat(9) + 'Brand: ' + result.brand);
            console.log(' '.repeat(9) + 'Model: ' + result.model);
            console.log(' '.repeat(9) + 'Store: ' + result.store);

            console.log('-'.repeat(40));
        } catch (err) {
            console.log(
                `We don't have mobile phones with this parameters.. :(`
            );
        }
    }));
};

const filter = async () => {
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;

    const [, col, method, value] = process.argv[2].split(':');
    let matchingIdArr;

    if (method === 'gt') {
        matchingIdArr = await Details.findAll({
            where: {
                ram: {
                    [Op.gt]: value,
                },
            },
        });
    } else if (method === 'lt') {
        matchingIdArr = await Details.findAll({
            where: {
                ram: {
                    [Op.lt]: value,
                },
            },
        });
    }

    const idArr = matchingIdArr.map((e) => {
        if (e !== 'no') {
            return e.dataValues.id;
        }
        return false;
    });

    if (idArr.length === 0) {
        console.log('');
        console.log(`We don't have any phones with this parameter. :(`);
        console.log('');

        return;
    }

    console.log('');
    console.log(
        `   Your results for ${col} with '${method}' ` +
        `operator and value ${value}`
    );

    Promise.all(idArr.map(async (id) => {
        try {
            const matchedPhone = await Phones.findOne({
                where: {
                    id: id,
                },
            });

            const store = await Store.findOne({
                where: {
                    id: matchedPhone.dataValues.fk_store,
                },
            });

            const ram = await Details.findOne({
                where: {
                    id: id,
                },
            });

            if (
                ram.dataValues.ram === 'no' ||
                ram.dataValues.ram[ram.dataValues.ram.length - 2]
                    .toLowerCase() === 'm'
            ) {
                return;
            }

            const result = {
                brand: matchedPhone.dataValues.brand,
                model: matchedPhone.dataValues.model,
                ram: ram.dataValues.ram,
                store: store.dataValues.name,
            };

            console.log('-'.repeat(60));

            console.log(' '.repeat(19) + 'RAM: ' + result.ram);
            console.log('');
            console.log(' '.repeat(19) + 'Brand: ' + result.brand);
            console.log(' '.repeat(19) + 'Model: ' + result.model);
            console.log(' '.repeat(19) + 'Store: ' + result.store);
        } catch (err) {
            console.log(' ');
        }
    }));
};

const order = async (parameter) => {
    const matchingIdArr = await Phones.findAll({
        order: [
            ['brand', parameter],
        ],
    });

    console.log('');
    console.log(' '.repeat(5) + `Your results ordered by ${parameter}...`);
    console.log('-'.repeat(40));

    Promise.all(matchingIdArr.map(async (id) => {
        try {
            const result = {
                brand: id.dataValues.brand,
                model: id.dataValues.model,
            };

            console.log(' '.repeat(9) + 'Brand: ' + result.brand + '\n');
            console.log(' '.repeat(9) + 'Model: ' + result.model + '\n');

            console.log('-'.repeat(40));
        } catch (err) {
            console.log('');
        }
    }));
};

const showAllData = async () => {
    const phoneArr = await Phones.findAll();

    console.log(' ');
    console.log(' '.repeat(12) + 'All available data:');
    console.log('-'.repeat(40));

    Promise.all(phoneArr.map(async (phone) => {
        try {
            const currDetails = await Details.findOne({
                where: {
                    id: phone.dataValues.id,
                },
            });

            const currStore = await Store.findOne({
                where: {
                    id: phone.dataValues.fk_store,
                },
            });

            const result = {
                brand: phone.dataValues.brand,
                model: phone.dataValues.model,
                price: currDetails.dataValues.price,
                cpu: currDetails.dataValues.cpu,
                os: currDetails.dataValues.os,
                store: currStore.dataValues.name,
            };

            console.log(' '.repeat(9) + 'Brand: ' + result.brand);
            console.log(' '.repeat(9) + 'Model: ' + result.model);
            console.log(' '.repeat(9) + 'Price: ' + result.price);
            console.log(' '.repeat(9) + 'CPU: ' + result.cpu);
            console.log(' '.repeat(9) + 'OS: ' + result.os);
            console.log(' '.repeat(9) + 'Store: ' + result.store);

            console.log('-'.repeat(40));
        } catch (err) {
            console.log('');
        }
    }));
};

(async () => {
    let parameters = process.argv[2];

    if (/^filter:/g.test(parameters)) {
        filter();
    } else if (/^search:/g.test(parameters)) {
        parameters = parameters.split('search:')[1];
        const [col, val] = parameters.split(':');

        search(col, val);
    } else if (/^order-by-brand:/g.test(parameters)) {
        parameters = parameters
            .split('order-by-brand:')[1]
            .toUpperCase();

        order(parameters);
    } else if (parameters === 'show-data') {
        showAllData();
    } else {
        console.log('Please, enter valid command!');
    }
})();
