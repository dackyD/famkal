/**
 * Created by hdd on 14/03/15.
 */

var getAttributes = function (DataTypes) {

    return {
        name: {
            type: DataTypes.STRING

        },
        display_name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        timezone: {
            type: DataTypes.STRING
        }
    }

};

var getClassMethods = function () {
    return {
        associate: function (models) {
            console.log('============ running calendar associate');
            models.Calendar.hasMany(models.Event, {foreignKey: 'calendar_id', as: 'Events'});
            models.Calendar.belongsToMany(models.Account, {through: 'calendar_account', as: 'Accounts'});
        }
    }
};

var getInstanceMethods = function () {
    return {};
};


exports.getAttributes = getAttributes;
exports.getClassMethods = getClassMethods;
exports.getInstanceMethods = getInstanceMethods;