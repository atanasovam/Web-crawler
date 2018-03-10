'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "StoreId" to table "Phones"
 * addColumn "DetailId" to table "Phones"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2018-03-10T11:40:34.139Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Phones",
            "StoreId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Stores",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Phones",
            "DetailId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Details",
                    "key": "id"
                },
                "allowNull": true
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
