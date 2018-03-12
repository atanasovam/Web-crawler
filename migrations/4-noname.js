'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "model" on table "Phones"
 *
 **/

var info = {
    "revision": 4,
    "name": "noname",
    "created": "2018-03-11T20:45:57.017Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "Phones",
        "model",
        {
            "type": Sequelize.STRING,
            "allowNull": false,
            "unique": false
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
