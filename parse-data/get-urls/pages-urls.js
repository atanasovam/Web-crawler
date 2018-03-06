const {
    extractUrls,
} = require('./extract-urls');

const extractPagesUrls = async (url, selector) => {
    const pages = await extractUrls(url, selector);
    return pages;
};

module.exports = {
    extractPagesUrls,
};
