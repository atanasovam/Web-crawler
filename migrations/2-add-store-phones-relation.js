'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "phonesStores", deps: [Stores, Phones]
 * addColumn "StoreId" to table "Phones"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2018-03-09T13:51:36.999Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "phonesStores",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "undefined": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Stores",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": true,
                    "allowNull": false,
                    "foreignKey": "fk_phones"
                },
                "PhoneId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Phones",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Phones",
            "StoreId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Stores",
                    "key": "id"
                },
                "allowNull": false,
                "foreignKey": "fk_store"
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
