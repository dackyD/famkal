/**
 * Created by hdd on 14/03/15.
 */

var getAttributes = function (DataTypes) {

    return {
        name: {
            type: DataTypes.ENUM,
            values: ['daily', 'weekly', 'monthly', 'yearly']
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                isInt: true
            }
        },
        limit: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        }
    }
};


var getClassMethods = function () {
    return {};
};

var getInstanceMethods = function () {
    return {};
};


exports.getAttributes = getAttributes;
exports.getClassMethods = getClassMethods;
exports.getInstanceMethods = getInstanceMethods;

