/* globals process */

const {
    Details,
    Phones,
    Store,
} = require('../models');

(async () => {
    let parameter = process.argv[2].split(':')[1];

    parameter = parameter
        .split('GB')[0]
        .split('MB')[0];

    let matchingIdArr = await Details.findAll({
        where: {
            ram: {
                $like: `%${parameter}%`,
            },
        },
    });

    matchingIdArr = matchingIdArr.map((e) => e.dataValues.id);

    if (matchingIdArr.length === 0) {
        console.log(' '.repeat(200));
        console.log(`We don't have any phones with this parameter. :(`);
        console.log(' '.repeat(200));

        return;
    }

    console.log(' '.repeat(200));
    console.log('Your results...');
    console.log(' '.repeat(200));

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

            console.log('-'.repeat(50) + '|');
            console.log(result.brand + ' ' + result.model + ' ' + result.store);
            console.log('-'.repeat(50) + '|');
        } catch (err) {
            console.log('');
        }
    }));
})();
