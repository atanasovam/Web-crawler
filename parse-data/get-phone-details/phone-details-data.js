const { JSDOM } = require('jsdom');
const $init = require('jquery');
const { extractCharacteristics } = require('./get-phone-parameters');
const {
    addEntries,
} = require('../../insert-data/insert-data.js');

const extractPhoneDetails = async (phoneUrls) => {
    const characteristicsToInsert =
        await Promise.all(phoneUrls.map(async (url) => {
            const dom = await JSDOM.fromURL(url);
            const $ = $init(dom.window);

            const price = $('.price.new-price .priceValue').text();
            const characteristicsObj = { price: price };

            const characteristicsList = Array.from(
                $('.tab.tab-characteristics .table-characteristics tr')
            );

            characteristicsList.forEach((characteristics, indx) => {
                const tokens = extractCharacteristics([
                    $(characteristics).children()[0].innerHTML,
                    $(characteristics).children()[1].innerHTML,
                ]);
                if (tokens) {
                    characteristicsObj[tokens[0]] = tokens[1];
                }
            });
            return characteristicsObj;
        }));

    addEntries(characteristicsToInsert);
    return;
};

module.exports = {
    extractPhoneDetails,
};
