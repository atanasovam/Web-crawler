'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "fk_phones" from table "Details"
 * addColumn "fk_details" to table "Phones"
 *
 **/

var info = {
    "revision": 8,
    "name": "noname",
    "created": "2018-03-11T21:54:07.054Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Details", "fk_phones"]
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
