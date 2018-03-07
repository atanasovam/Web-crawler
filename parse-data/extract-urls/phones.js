const {
    extractUrls,
} = require('./pages');

const extractPagesUrls = async (url, selector) => {
    const pages = await extractUrls(url, selector);
    return pages;
};

const extractPhones = async (devicesUrls) => {
    const phoneSelector = '.product-box .box .text h2 a';

    const phonesUrl = await Promise.all(
        await devicesUrls.map((url) => extractUrls(url, phoneSelector)),
    );

    return phonesUrl.reduce((a, b) => a.concat(b));
};

module.exports = {
    extractPagesUrls,
    extractPhones,
};
