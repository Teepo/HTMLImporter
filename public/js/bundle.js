var HTMLImporter =
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _app = __webpack_require__(1);

	document.addEventListener('DOMContentLoaded', function () {

	    var templates = document.querySelectorAll('template');

	    new _app.HTMLImporter(templates);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HTMLImporter = exports.HTMLImporter = function () {

	    /**
	     * @param {NodeList} nodes
	     *
	     * @description Iterale all nodes, and store them.
	     */
	    function HTMLImporter(nodes) {
	        _classCallCheck(this, HTMLImporter);

	        this.templates = Object.keys(nodes).map(function (key) {
	            return nodes[key];
	        });

	        this.process();
	    }

	    /**
	     * @method
	     *
	     * @description Iterate all stored templates, and load them.
	     */


	    _createClass(HTMLImporter, [{
	        key: 'process',
	        value: function process() {

	            this.template = this.templates.shift();

	            if (this.template == null) return false;

	            try {

	                this.link = this.emulateLink();
	            } catch (e) {
	                console.error(new Error('HTMLImporter > emulateLink'));
	            }
	        }

	        /**
	         * @method
	         *
	         * @description Create and append in document fake link node
	         *
	         */

	    }, {
	        key: 'emulateLink',
	        value: function emulateLink() {

	            var link = document.createElement('link');

	            link.rel = "import";
	            link.href = this.template.getAttribute('url');

	            link.onload = this.onload.bind(this);
	            link.onerror = this.onerror.bind(this);

	            document.head.appendChild(link);

	            return link;
	        }

	        /**
	         * @description Test import supports in link node
	         *
	         * @return boolean
	         */

	    }, {
	        key: 'isSupportingImport',
	        value: function isSupportingImport() {

	            return 'import' in document.createElement('link');
	        }

	        /**
	         * @method
	         *
	         * @description Fired when link node is loaded
	         *
	         * @fires HTMLImporter#load
	         */

	    }, {
	        key: 'onload',
	        value: function onload() {

	            if (this.link.import === null) return false;

	            this.template.outerHTML = this.link.import.documentElement.outerHTML;

	            this.process();
	        }

	        /**
	         * @param {Object} event
	         *
	         * @fires HTMLImporter#error
	         */

	    }, {
	        key: 'onerror',
	        value: function onerror(event) {
	            console.error(new Error('HTMLImporter > error', event));
	        }
	    }]);

	    return HTMLImporter;
	}();

/***/ }
/******/ ]);