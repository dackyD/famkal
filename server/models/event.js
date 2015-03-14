/**
 * Created by hdd on 14/03/15.
 */

var getAttributes = function (DataTypes) {

    return {
        title: {
            type: DataTypes.STRING
        },
        calendar_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        location: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        starts_at: {
            type: DataTypes.DATE,
            validate: {
                isDate: true
            }
        },
        ends_at: {
            type: DataTypes.DATE,
            validate: {
                isDate: true
            }
        }
    };

};

var getClassMethods = function () {
    return {
        associate: function(models){
            console.log('============ running event associate');
            models.Event.hasMany(models.Reminder, {foreignKey: 'event_id'});
            models.Event.hasOne(models.Replication, {foreignKey: 'event_id'});
            models.Event.belongsToMany(models.Member, {through: 'member_event', as: 'Members'});
        }
    }
};

var getInstanceMethods = function () {
    return {};
};


exports.getAttributes = getAttributes;
exports.getClassMethods = getClassMethods;
exports.getInstanceMethods = getInstanceMethods;