const { JSDOM } = require('jsdom');
const $init = require('jquery');

const { extractCharacteristics } = require('./parameters');
const { formatedDataForDB } = require('../format-data-for-db');
const { addEntries } = require('../../insert-data/insert-data.js');

const extractPhoneDetailsS = async (url) => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);

    const price = $('.price-container.update-price')
        .attr('data-original-price');

    const brand = $($('#content article meta')[1])
        .attr('content');

    const displaySize = (val) => {
        return /(^\d\.\d)|(^\d)/g.exec(val)[0];
    };

    const characteristicsObj = {
        url: url,
        price: price,
        brand: brand,
    };

    const characteristicsList = Array.from(
        $('.product-characteristics tbody tr')
    );

    ((list) => {
        list.forEach((characteristics) => {
            const params = [
                $(characteristics).children()[0].innerHTML.trim(),
                $(characteristics).children()[1].innerHTML.trim(),
            ];

            const filteredParams =
                extractCharacteristics(params, 'Smartphonebg');

            if (filteredParams[0] === 'display_size') {
                characteristicsObj.display_size =
                    displaySize(filteredParams[1]);
            } else {
                if (filteredParams) {
                    characteristicsObj[filteredParams[0]] =
                        filteredParams[1];
                }
            }
        });
    })(characteristicsList);

    const formatedData =
        formatedDataForDB(characteristicsObj, 'SmartphoneBg');

    addEntries(formatedData);
    return;
};

module.exports = {
    extractPhoneDetailsS,
};
