'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Brands", deps: []
 * createTable "Details", deps: []
 * createTable "Phones", deps: []
 * createTable "Stores", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2018-03-02T15:40:28.449Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Brands",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING(20),
                    "validate": {
                        "notNull": true,
                        "min": 5,
                        "max": 20
                    },
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
            "Details",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "validate": {
                        "notNull": true,
                        "min": 2,
                        "max": 10
                    },
                    "allowNull": false
                },
                "cpu": {
                    "type": Sequelize.STRING(10),
                    "validate": {
                        "notNull": true,
                        "min": 2,
                        "max": 10
                    },
                    "allowNull": false
                },
                "ram": {
                    "type": Sequelize.STRING(10),
                    "validate": {
                        "notNull": true,
                        "min": 2,
                        "max": 10
                    },
                    "allowNull": false
                },
                "os": {
                    "type": Sequelize.STRING(10),
                    "validate": {
                        "notNull": true,
                        "min": 2,
                        "max": 10
                    },
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
                "model": {
                    "type": Sequelize.STRING(10),
                    "validate": {
                        "notNull": true,
                        "min": 2,
                        "max": 10
                    },
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
                    "type": Sequelize.STRING(20),
                    "validate": {
                        "notNull": true,
                        "min": 5,
                        "max": 20
                    },
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
