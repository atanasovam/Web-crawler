const {
    extractPagesUrls,
} = require('./parse-data/get-urls/pages-urls');

const {
    extractDetails,
} = require('./parse-data/get-urls/phones-urls');

const {
    extractPhoneDetails,
} = require('./parse-data/get-phone-details/phone-details-data');

const technopolisUrl = 'http://www.technopolis.bg/en//%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8-%D0%B8-%D0%A2%D0%B0%D0%B1%D0%BB%D0%B5%D1%82%D0%B8/%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8/c/P11040101?pageselect=1000&page=200&q=:price-asc&text=&layout=List&sort=price-asc';
const technomarketUrl = 'https://www.technomarket.bg/product/filter?filter_form%5Bsort%5D=default&filter_form%5Bprice%5D%5Bmin%5D=39&filter_form%5Bprice%5D%5Bmax%5D=2599&filter_form%5Bspec_gsm_display%5D%5Bmin%5D=&filter_form%5Bspec_gsm_display%5D%5Bmax%5D=&filter_form%5Bspec_gsm_battery%5D%5Bmin%5D=&filter_form%5Bspec_gsm_battery%5D%5Bmax%5D=&filter_key=%2Ftelefoni%7Cstatic%7Cstatic&from=0&size=9999999';

const pageLinksSelectorTechnopolis = '.paging a';
const pageLinksSelectorTechnomarket = '.col-md-4 figure figcaption h3 a';

(async () => {
    const [, , ...technopolisPages] =
        await extractPagesUrls(technopolisUrl, pageLinksSelectorTechnopolis);
    const technopolisPhones = await extractDetails(technopolisPages);

    // const technomarketPhones =
    // await extractPagesUrls(technomarketUrl, pageLinksSelectorTechnomarket);

    // technomarketPhones.forEach((e) => console.log(e));
    // technopolisPhones.forEach((e) => console.log(e));

    const technopolisPhoneDetails =
        await extractPhoneDetails(technopolisPhones, true);
    // const technomarketPhoneDetails =
    // await extractPhoneDetails(technomarketPhones, false);
})();
