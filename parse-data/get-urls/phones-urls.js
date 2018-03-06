const {
    extractUrls,
} = require('./extract-urls');

const extractDetails = async (devicesUrls) => {
    const phoneSelector = '.product-box .box .text h2 a';

    const phonesUrl = await Promise.all(
        await devicesUrls.map((url) => extractUrls(url, phoneSelector)),
    );

    return phonesUrl.reduce((a, b) => a.concat(b));
};

module.exports = {
    extractDetails,
};
