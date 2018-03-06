'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "Brands"
 * addColumn "brand" to table "Phones"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2018-03-06T10:08:23.469Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "dropTable",
        params: ["Brands"]
    },
    {
        fn: "addColumn",
        params: [
            "Phones",
            "brand",
            {
                "type": Sequelize.STRING(20),
                "validate": {
                    "notNull": true,
                    "min": 5,
                    "max": 20
                },
                "allowNull": false
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
