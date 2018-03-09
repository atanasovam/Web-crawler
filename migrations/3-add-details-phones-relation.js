'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "DetailId" to table "Phones"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2018-03-09T13:52:40.518Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Phones",
        "DetailId",
        {
            "type": Sequelize.INTEGER,
            "onUpdate": "CASCADE",
            "onDelete": "CASCADE",
            "references": {
                "model": "Details",
                "key": "id"
            },
            "allowNull": false,
            "foreignKey": "fk_details"
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
