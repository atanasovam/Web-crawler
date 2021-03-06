const { JSDOM } = require('jsdom');
const $init = require('jquery');

const { extractCharacteristics } = require('./parameters');
const { formatedDataForDB } = require('../format-data-for-db');
const { addEntries } = require('../../db/insert-data/insert-data.js');

const extractPhoneDetailsT = async (url) => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);

    let price = $('.price.new-price .priceValue')[0]
        .textContent;
    price = price.replace(/\s+/g, '');

    const characteristicsObj = {
        price: price,
        url: url,
    };

    const characteristicsList = Array.from(
        $('.tab.tab-characteristics .table-characteristics tr')
    );

    ((list) => {
        characteristicsList.forEach((characteristics) => {
            const params = extractCharacteristics([
                $(characteristics).children()[0].innerHTML,
                $(characteristics).children()[1].innerHTML,
            ], 'technopolis');

            if (params) {
                characteristicsObj[params[0]] = params[1];
            }
        });
    })(characteristicsList);

    const formatedData =
        formatedDataForDB(characteristicsObj, 'Technopolis');

    addEntries(formatedData);
    return;
};

module.exports = {
    extractPhoneDetailsT,
};
