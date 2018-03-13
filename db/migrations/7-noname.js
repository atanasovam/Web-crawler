'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "os" on table "Details"
 * changeColumn "ram" on table "Details"
 * changeColumn "cpu" on table "Details"
 * changeColumn "price" on table "Details"
 *
 **/

var info = {
    "revision": 7,
    "name": "noname",
    "created": "2018-03-11T21:33:31.959Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "Details",
            "os",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Details",
            "ram",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Details",
            "cpu",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Details",
            "price",
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
