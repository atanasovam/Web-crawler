const {
    extractPagesUrls,
    // extractPhones,
} = require('./parse-data/extract-urls/phones');

const { extractPhoneDetails } =
    require('./parse-data/get-phone-details/smartphonebg');
// const {
//     extractPhoneDetails,
// } = require('./parse-data/get-phone-details/technopolis-data');

// const technopolisUrl = 'http://www.technopolis.bg/en//%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8-%D0%B8-%D0%A2%D0%B0%D0%B1%D0%BB%D0%B5%D1%82%D0%B8/%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8/c/P11040101?pageselect=1000&page=200&q=:price-asc&text=&layout=List&sort=price-asc';
const smartphonebgUrl = 'https://smartphone.bg/smartphones-all?utf8=%E2%9C%93&price_btw_all=all&search%5Bprice_gte%5D=&search%5Bprice_lte%5D=&brand_id_in_all=all&basic_color_id_in_all=all&cpu_type_id_in_all=all&storage_size_id_in_all=all&ram_size_id_in_all=all&display_size_type_btw_all=all&display_type_id_in_all=all&display_dimension_id_in_all=all&camera_resolution_id_in_all=all&talking_time_type_btw_all=all&standby_time_type_btw_all=all&battery_type_btw_all=all&os_type_id_in_all=all&weight_type_btw_all=all&warranty_size_btw_all=all&per_page=111&search%5Bs%5D=promo_asc';
// const pageLinksSelectorTechnopolis = '.paging a';
const pageLinksSelectorTechnomarket = '.products li article div:not([class]) a';

(async () => {
    /** Technopolis */

    // const [, , ...technopolisPages] =
    //     await extractPagesUrls(technopolisUrl, pageLinksSelectorTechnopolis);

    // const technopolisPhones = await extractPhones(technopolisPages);

    // const technopolisPhoneDetails =
    //     await extractPhoneDetails(technopolisPhones, true);


    /** Smartphone.bg */

    const smartphonebgPhones =
        await extractPagesUrls(smartphonebgUrl, pageLinksSelectorTechnomarket);
    console.log(smartphonebgPhones.length);

    const technomarketPhoneDetails =
        await extractPhoneDetails(smartphonebgPhones);
})();
