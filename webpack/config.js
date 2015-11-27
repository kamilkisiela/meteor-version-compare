var _ = require('lodash');
var test = require('./test');
var dist = require('./dist');
var prod = require('./prod');
var common = {
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        extensions: ["", ".js"]
    }
};

module.exports = {
    test: _.merge({}, common, test),
    dist: _.merge({}, common, dist),
    prod: _.merge({}, common, prod)
};