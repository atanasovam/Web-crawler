const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const extractUrls = async (jsDomUrl, selector) => {
    const dom = await JSDOM.fromURL(jsDomUrl);
    const $ = $init(dom.window);

    const urlsList = Array.from($(selector))
        .map((link) => link.href);

    return urlsList;
};

module.exports = {
    extractUrls,
};
