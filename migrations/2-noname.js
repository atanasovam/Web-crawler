'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "fk_phones" to table "Details"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2018-03-11T18:55:47.218Z",
    "comment": ""
};

var migrationCommands = [{
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
