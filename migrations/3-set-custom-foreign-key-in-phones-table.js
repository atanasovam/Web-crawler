'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "StoreId" from table "Phones"
 * removeColumn "DetailId" from table "Phones"
 * addColumn "fk_store" to table "Phones"
 * addColumn "fk_details" to table "Phones"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2018-03-10T11:41:23.843Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Phones", "StoreId"]
    },
    {
        fn: "removeColumn",
        params: ["Phones", "DetailId"]
    },
    {
        fn: "addColumn",
        params: [
            "Phones",
            "fk_store",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
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
            "fk_details",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
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
