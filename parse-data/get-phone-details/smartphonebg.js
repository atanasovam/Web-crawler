const { JSDOM } = require('jsdom');
const $init = require('jquery');

const extractPhoneDetails = async (phonesUrls) => {
    const characteristicsToInsert =
        await Promise.all(phonesUrls.map(async (url) => {
            const dom = await JSDOM.fromURL(url);
            const $ = $init(dom.window);

            const price = $('.price-container.update-price')
                .attr('data-original-price');
            const characteristicsObj = { price: price };
            console.log(price);

            const characteristicsList = Array.from(
                $('.tab.tab-characteristics .table-characteristics tr')
            );

            characteristicsList.forEach((characteristics) => {
                const params = [
                    $(characteristics).children()[0].innerHTML,
                    $(characteristics).children()[1].innerHTML,
                ];

                console.log(params);
            });
            return characteristicsObj;
        }));

    return characteristicsToInsert;
};

module.exports = {
    extractPhoneDetails,
};
