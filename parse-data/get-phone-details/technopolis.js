const { JSDOM } = require('jsdom');
const $init = require('jquery');

const { extractCharacteristics } = require('./parameters');
const { formatedDataForDB } = require('../format-data-for-db');
const { addEntries } = require('../../insert-data/insert-data.js');

const extractPhoneDetails = async (phonesUrls) => {
    const characteristicsToInsert =
        await Promise.all(phonesUrls.map(async (url) => {
            const dom = await JSDOM.fromURL(url);
            const $ = $init(dom.window);

            const price = $('.price.new-price .priceValue').text();
            const characteristicsObj = { price: price };

            const characteristicsList = Array.from(
                $('.tab.tab-characteristics .table-characteristics tr')
            );

            ((list) => {
                characteristicsList.forEach((characteristics) => {
                    const params = extractCharacteristics([
                        $(characteristics).children()[0].innerHTML,
                        $(characteristics).children()[1].innerHTML,
                    ]);
                    if (params) {
                        characteristicsObj[params[0]] = params[1];
                    }
                });
            })(characteristicsList);

            return characteristicsObj;
        }));

    const formatedData = formatedDataForDB(characteristicsToInsert);
    console.log(formatedData);
    // addEntries(formatedData);
    return;
};

module.exports = {
    extractPhoneDetails,
};
