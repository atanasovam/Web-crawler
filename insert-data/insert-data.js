const {
    details,
} = require('../models/details.js');
const {
    phones,
} = require('../models/phones.js');
const {
    store,
} = require('../models/store.js');

const addEntries = async (entriesObj) => {
    console.log(entriesObj);
};

module.exports = {
    addEntries,
};
