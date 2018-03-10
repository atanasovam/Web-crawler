'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "PhoneId" to table "Stores"
 *
 **/

var info = {
    "revision": 6,
    "name": "noname",
    "created": "2018-03-10T11:43:42.908Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Stores",
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
