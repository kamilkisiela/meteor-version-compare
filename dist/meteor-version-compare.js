var versionCompare =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var versionCompare = (function () {
	    function versionCompare() {
	        _classCallCheck(this, versionCompare);
	    }

	    _createClass(versionCompare, null, [{
	        key: 'gt',

	        /**
	         * First greater then second
	         * @param {string} first
	         * @param {string} second
	         * @returns {boolean}
	         */
	        value: function gt(first, second) {
	            return versionCompare.compare(first, '>', second);
	        }

	        /**
	         * First equal or greater then second
	         * @param {string} first
	         * @param {string} second
	         * @returns {boolean}
	         */
	    }, {
	        key: 'gte',
	        value: function gte(first, second) {
	            return !versionCompare.lt(first, second);
	        }

	        /**
	         * First lower then second
	         * @param {string} first
	         * @param {string} second
	         * @returns {boolean}
	         */
	    }, {
	        key: 'lt',
	        value: function lt(first, second) {
	            return versionCompare.compare(first, '<', second);
	        }

	        /**
	         * First equal or lower then second
	         * @param {string} first
	         * @param {string} second
	         * @returns {boolean}
	         */
	    }, {
	        key: 'lte',
	        value: function lte(first, second) {
	            return !versionCompare.gt(first, second);
	        }

	        /**
	         * First equal second
	         * @param {string} first
	         * @param {string} second
	         * @returns {boolean}
	         */
	    }, {
	        key: 'eq',
	        value: function eq(first, second) {
	            return versionCompare.compare(first, '=', second);
	        }

	        /**
	         * Compare two version using >, <, = operators
	         * @param {string} first
	         * @param {string} operator
	         * @param {string} second
	         * @returns {boolean}
	         */
	    }, {
	        key: 'compare',
	        value: function compare(first, operator, second) {
	            var _versionCompare$parse = versionCompare.parse(first, second);

	            var a = _versionCompare$parse.a;
	            var b = _versionCompare$parse.b;

	            switch (operator) {
	                case '=':
	                    return a === b;
	                case '>':
	                    return a > b;
	                case '<':
	                    return a < b;
	                default:
	                    return;
	            }
	        }

	        /**
	         *
	         * @param {string} a
	         * @param {string} b
	         * @returns {Object|undefined}
	         */
	    }, {
	        key: 'parse',
	        value: function parse(a, b) {
	            if (typeof a + typeof b !== 'stringstring') {
	                return undefined;
	            }

	            var digits = /^\d+/;

	            // remove prefix with @ at the ent
	            a = a.substr(a.indexOf('@') + 1)
	            // split by dot
	            .split('.')
	            // leave only numbers
	            .map(function (v) {
	                return digits.exec(v)[0];
	            });

	            b = b.substr(b.indexOf('@') + 1).split('.').map(function (v) {
	                return digits.exec(v)[0];
	            });

	            var len = Math.max(a.length, b.length);
	            var i = 0;

	            // add missing splits (as string!)
	            while (a.length < len) {
	                a.push("0");
	            }
	            while (b.length < len) {
	                b.push("0");
	            }

	            // add leading zeros
	            for (i = 0; i < len; i++) {
	                while (b[i].length < a[i].length) {
	                    b[i] = "0" + b[i];
	                }
	                while (a[i].length < b[i].length) {
	                    a[i] = "0" + a[i];
	                }
	            }

	            // output as integers
	            return {
	                a: parseInt(a.join("")),
	                b: parseInt(b.join(""))
	            };
	        }
	    }]);

	    return versionCompare;
	})();

	exports['default'] = versionCompare;
	module.exports = exports['default'];

/***/ }
/******/ ]);
meteorVersionCompare = {
    gt: function (version) {
        return versionCompare.gt(Meteor.release, version);
    },
    gte: function (version) {
        return versionCompare.gte(Meteor.release, version);
    },
    lt: function (version) {
        return versionCompare.lt(Meteor.release, version);
    },
    lte: function (version) {
        return versionCompare.lte(Meteor.release, version);
    }
};