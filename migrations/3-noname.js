'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "name" on table "Stores"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2018-03-10T21:06:42.583Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "Stores",
        "name",
        {
            "type": Sequelize.STRING,
            "allowNull": false,
            "unique": true
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
