const {
    runTechnopolis,
    runSmartphonebg,
} = require('./run-crawlers/run');

(async () => {
    await runTechnopolis();
    await runSmartphonebg();
})();
