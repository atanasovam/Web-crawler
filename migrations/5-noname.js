'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "model" on table "Phones"
 * changeColumn "brand" on table "Phones"
 * changeColumn "name" on table "Stores"
 * changeColumn "name" on table "Stores"
 *
 **/

var info = {
    "revision": 5,
    "name": "noname",
    "created": "2018-03-10T23:48:18.585Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "Phones",
            "model",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Phones",
            "brand",
            {
                "type": Sequelize.STRING,
                "allowNull": false
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
                "allowNull": false
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
