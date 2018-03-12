/* globals Set */
const {
    extractUrls,
} = require('./pages');

const extractPagesUrls = async (url, selector) => {
    return await extractUrls(url, selector, []);
};

const extractPhones = async (devicesUrls) => {
    const phoneSelector = '.product-box .box .text h2 a';

    const phonesUrl = await Promise.all(
        await devicesUrls.map(
            async (url) => await extractUrls(url, phoneSelector)
        ),
    );

    return phonesUrl.reduce((a, b) => [...new Set(a)].concat([...new Set(b)]));
};

module.exports = {
    extractPagesUrls,
    extractPhones,
};
