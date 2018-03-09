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
    "created": "2018-03-09T13:53:27.384Z",
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
            "onDelete": "CASCADE",
            "references": {
                "model": "Phones",
                "key": "id"
            },
            "allowNull": false,
            "foreignKey": "fk_phones"
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
