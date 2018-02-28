const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const extractPhoneDetails = async (phoneUrls) => {
    const getCharacteristics = (characteristics) => {
        const key = [...characteristics.children()][0].innerHTML;
        const val = [...characteristics.children()][1].innerHTML;

        return {
            title: key.trim().toLowerCase().split(' ').join('_'),
            params: val.split(' "')[0],
        };
    };

    const generateParams = function* generate(characteristics) {
        yield getCharacteristics(characteristics);
        yield getCharacteristics(characteristics);
        yield getCharacteristics(characteristics);
    };

    return (await Promise.all(phoneUrls.map(async (url) => {
        const dom = await JSDOM.fromURL(url);
        const $ = $init(dom.window);

        const price = $('.price.new-price .priceValue').text();
        const characteristicsList = Array.from(
            $('.tab.tab-characteristics .table-characteristics tr')
        );
        /* const [size, ram, os] = [
            generateParams($(characteristicsList[2])),
            generateParams($(characteristicsList[8])),
            generateParams($(characteristicsList[17])),
        ]; */
        const size = getCharacteristics($(characteristicsList[2]));
        const ram = getCharacteristics($(characteristicsList[8]));
        const os = getCharacteristics($(characteristicsList[17]));

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
        console.log(characteristics);
        return characteristics;
    })))();
};

module.exports = {
    extractPhoneDetails,
};
