'use strict';


function ErrorHandler() {}


ErrorHandler.prototype.defaultHandler = function(err, req, res){



};

ErrorHandler.prototype.badRequestHandler = function(err, req, res) {


};

ErrorHandler.prototype.unauthorizeHandler = function(err, res) {


};

ErrorHandler.prototype.internalServerErrorHandler = function(err, req, res) {

};


module.exports = ErrorHandler;
