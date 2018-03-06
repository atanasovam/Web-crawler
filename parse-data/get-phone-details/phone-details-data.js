const { JSDOM } = require('jsdom');
const $init = require('jquery');
const { Characteristics } = require('./characteristics-constructor');
const { extractCharacteristics } = require('./get-phone-parameters');
const {
    addEntries,
} = require('../../insert-data/insert-data.js');

const extractPhoneDetails = async (phoneUrls) => {
    console.log('extractPhoneDetails '.repeat(5));

    return (await Promise.all(phoneUrls.map(async (url) => {
        try {
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
            addEntries(characteristicsObj);
            return;
        } catch (err) {
            console.log('-'.repeat(30));
            console.log(err);
            console.log('-'.repeat(30));
        }
    })))();
};

module.exports = {
    extractPhoneDetails,
};
