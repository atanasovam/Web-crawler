'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "PhoneId" from table "Details"
 * addColumn "fk_phones" to table "Details"
 *
 **/

var info = {
    "revision": 5,
    "name": "noname",
    "created": "2018-03-10T11:43:03.738Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Details", "PhoneId"]
    },
    {
        fn: "addColumn",
        params: [
            "Details",
            "fk_phones",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Phones",
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
