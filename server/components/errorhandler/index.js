'use strict';


function ErrorHandler() {}


ErrorHandler.prototype.defaultHandler = function(err, res){



};

ErrorHandler.prototype.badRequestHandler = function(err, res) {


};

ErrorHandler.prototype.unauthorizeHandler = function(err, res) {


};

ErrorHandler.prototype.internalServerErrorHandler = function(err, res) {
    return res.status(500).json({error: err});
};


module.exports = ErrorHandler;
