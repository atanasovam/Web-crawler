'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "brand" on table "Phones"
 * changeColumn "model" on table "Phones"
 * changeColumn "name" on table "Stores"
 *
 **/

var info = {
    "revision": 4,
    "name": "noname",
    "created": "2018-03-10T22:17:08.698Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "Phones",
            "brand",
            {
                "type": Sequelize.STRING,
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Phones",
            "model",
            {
                "type": Sequelize.STRING,
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Stores",
            "name",
            {
                "type": Sequelize.STRING,
                "allowNull": true,
                "unique": true
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
