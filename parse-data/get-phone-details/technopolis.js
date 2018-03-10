const { JSDOM } = require('jsdom');
const $init = require('jquery');

const { extractCharacteristics } = require('./parameters');
const { formatedDataForDB } = require('../format-data-for-db');
const { addEntries } = require('../../insert-data/insert-data.js');

const extractPhoneDetailsT = async (phonesUrls) => {
    return await Promise.all(phonesUrls.map(async (url) => {
        const dom = await JSDOM.fromURL(url);
        const $ = $init(dom.window);

        const price = $('.price.new-price .priceValue')[0].textContent;
        const characteristicsObj = { price: price };

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
    }));
};

module.exports = {
    extractPhoneDetailsT,
};
