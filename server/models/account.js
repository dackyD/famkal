/**
 * Created by hdd on 14/03/15.
 */

var crypto = require('crypto');

var getAttributes = function(DataTypes) {

    return {
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        address: {
            type: DataTypes.STRING
        },
        zipcode: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.STRING
        },
        salt: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
};


var getClassMethods = function() {
    return {
        associate: function(models){
            console.log('============ running account associate');
            models.Account.belongsToMany(models.Calendar, {through: 'calendar_account', as: 'Calendars'});
            models.Account.hasMany(models.Member, {foreignKey: 'account_id', as: 'Members'});
        }
    }
};


var getInstanceMethods = function() {
    return {
        doHashPassword: function (password) {
            return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
        },
        hashPassword: function () {
            this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
            this.password = this.doHashPassword(this.password);
            return this;
        },
        authenticate: function (password) {
            return this.password == this.doHashPassword(password);
        }
    };
};


exports.getAttributes = getAttributes;
exports.getClassMethods = getClassMethods;
exports.getInstanceMethods = getInstanceMethods;





