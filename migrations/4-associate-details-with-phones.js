'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "PhoneId" to table "Details"
 *
 **/

var info = {
    "revision": 4,
    "name": "noname",
    "created": "2018-03-10T11:42:15.961Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Details",
        "PhoneId",
        {
            "type": Sequelize.INTEGER,
            "onUpdate": "CASCADE",
            "onDelete": "SET NULL",
            "references": {
                "model": "Phones",
                "key": "id"
            },
            "allowNull": true
        }
    ]
}];

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
