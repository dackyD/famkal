/**
 * Created by hdd on 14/03/15.
 */

var getAttributes = function(DataTypes){

    return {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        status: {
            type: DataTypes.ENUM,
            values: ['pending', 'active', 'inactive'],
            defaultValue: 'inactive'
        }
    };
};

var getClassMethods = function() {
    return {
        associate: function(models) {
            console.log('======== running member associate');
            models.Member.belongsToMany(models.Event, {through: 'member_event'});
        }
    };
};


var getInstanceMethods = function(){
    return {};
};




exports.getAttributes = getAttributes;
exports.getClassMethods = getClassMethods;
exports.getInstanceMethods = getInstanceMethods;