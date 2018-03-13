'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "fk_store" to table "Phones"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2018-03-11T18:56:03.751Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Phones",
        "fk_store",
        {
            "type": Sequelize.INTEGER,
            "onUpdate": "CASCADE",
            "onDelete": "CASCADE",
            "references": {
                "model": "Stores",
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
