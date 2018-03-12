const {
    runTechnopolis,
    runSmartphonebg,
} = require('./run-crawlers/run');

// const sequelizeDbWrapper = require('./models/index');

(async () => {
    await runTechnopolis();
    await runSmartphonebg();

    // await sequelizeDbWrapper.sequelize.close();
})();
