'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Details", deps: []
 * createTable "Stores", deps: []
 * createTable "Phones", deps: [Details, Stores]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2018-03-10T20:49:36.831Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Details",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "price": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "cpu": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "ram": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "os": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Stores",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Phones",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "brand": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "model": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "fk_details": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Details",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "fk_store": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Stores",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
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
