/**
 * Created by hdd on 14/03/15.
 */

var getAttributes = function(DataTypes){

    return {
        name: {
            type: DataTypes.ENUM,
            values: ['minutes', 'hours', 'days', 'weeks']
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        }
    }
};


var getClassMethods = function() {
    return {};
};

var getInstanceMethods = function(){
    return {};
};


exports.getAttributes = getAttributes;
exports.getClassMethods = getClassMethods;
exports.getInstanceMethods = getInstanceMethods;