const {
    extractUrls,
} = require('../parse-data/extract-urls');

const extractDetails = async (devicesUrls) => {
    const phoneSelector = '.product-box .box .text h2 a';

    const phonesUrl = await Promise.all(
        await devicesUrls.map((url) => extractUrls(url, phoneSelector))
    );

    return phonesUrl;
};

module.exports = {
    extractDetails,
};
