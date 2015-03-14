/**
 * Created by hdd on 14/03/15.
 */

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};


var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require('../config/environment');
var sequelize = null;


var db = {
    models: {}
};

var dburl = config.postgres.dburl;
var match = dburl.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
var options = {
    dialect: config.postgres.dialect,
    protocol: config.postgres.protocol,
    port: match[4],
    host: match[3],
    logging: config.postgres.logging,
    dialectOptions: {
        ssl: config.postgres.ssl
    }
};
sequelize = new Sequelize(match[5], match[1], match[2], options);

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        //var model = sequelize["import"](path.join(__dirname, file));
        var modelStr = file.toString().slice(0, -3);
        file = require(path.join(__dirname, file));
        var model = sequelize.import(modelStr.capitalizeFirstLetter(), function (sequelize, DataTypes) {

            return sequelize.define(modelStr.capitalizeFirstLetter(),
                file.getAttributes(DataTypes),
                {
                    underscored: true,
                    freezeTableName: true,
                    tableName: modelStr,
                    timestamps: true,
                    paranoid: true,
                    classMethods: file.getClassMethods(),
                    instanceMethods: file.getInstanceMethods()
                });


        });
        db.models[model.name] = model;
    });

Object.keys(db.models).forEach(function (modelName) {
    if ("associate" in db.models[modelName]) {
        db.models[modelName].associate(db.models);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
