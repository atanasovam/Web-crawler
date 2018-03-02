const { JSDOM } = require('jsdom');
const $init = require('jquery');
const { Characteristics } = require('./characteristics-constructor');
const { extractCharacteristics } = require('./get-phone-parameters');

const extractPhoneDetails = async (phoneUrls) => {
    console.log('extractPhoneDetails '.repeat(5));
    return (await Promise.all(phoneUrls.map(async (url) => {
        try {
            const dom = await JSDOM.fromURL(url);
            const $ = $init(dom.window);

            const price = $('.price.new-price .priceValue').text();
            const characteristicsList = Array.from(
                $('.tab.tab-characteristics .table-characteristics tr')
            );

            characteristicsList.forEach((characteristics, indx) => {
                const tokens = extractCharacteristics([
                    $(characteristics).children()[0].innerHTML,
                    $(characteristics).children()[1].innerHTML,
                ]);

                if (tokens) {
                    console.log(tokens.join(' '));
                }
            });

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

const test = () => {
    /* const characteristics =
    new Characteristics
    ( procuctBrand, model, price, ram, os, displaySize );
     new Characteristics instead of ...
    const characteristics = {
        price: price,
        ram: {
            title: ram.title,
            params: ram.params,
        },
        os: {
            title: os.title,
            params: os.params,
        },
        displaySize: {
            title: size.title,
            params: size.params,
        },
    };

     const [size, ram, os] = [
        generateParams($(characteristicsList[2])),
        generateParams($(characteristicsList[8])),
        generateParams($(characteristicsList[17])),
    ]; */
};
