const {
    runTechnopolis,
    runSmartphonebg,
} = require('./run-crawlers/run');
// const sequelizeDbWrapper = require('./db/models/index');

(async () => {
    await runTechnopolis();
    await runSmartphonebg();
})();

// sequelizeDbWrapper.sequelize.close();
