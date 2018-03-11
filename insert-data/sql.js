const mysql = require('mysql');
let connection = null;

const setup = (config) => {
    connection = mysql.createConnection(config);
    connection.connect();
};

const execute = (queryStr) => {
    return new Promise((resolve, reject) => {
        connection.query(queryStr, (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(result);
        });
    });
};

module.exports = {
    setup,
    execute,
};
