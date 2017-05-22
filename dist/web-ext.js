require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 78);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consoleStream = exports.ConsoleStream = undefined;

var _classCallCheck2 = __webpack_require__(10);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.createLogger = createLogger;

var _bunyan = __webpack_require__(141);

var _bunyan2 = _interopRequireDefault(_bunyan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Bunyan-related Flow types

// ConsoleStream types and implementation.

var ConsoleStream = exports.ConsoleStream = function () {
  function ConsoleStream() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$verbose = _ref.verbose,
        verbose = _ref$verbose === undefined ? false : _ref$verbose;

    (0, _classCallCheck3.default)(this, ConsoleStream);

    this.verbose = verbose;
    this.isCapturing = false;
    this.capturedMessages = [];
  }

  (0, _createClass3.default)(ConsoleStream, [{
    key: 'format',
    value: function format(_ref2) {
      var name = _ref2.name,
          msg = _ref2.msg,
          level = _ref2.level;

      var prefix = this.verbose ? '[' + name + '][' + _bunyan.nameFromLevel[level] + '] ' : '';
      return '' + prefix + msg + '\n';
    }
  }, {
    key: 'makeVerbose',
    value: function makeVerbose() {
      this.verbose = true;
    }
  }, {
    key: 'write',
    value: function write(packet) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$localProcess = _ref3.localProcess,
          localProcess = _ref3$localProcess === undefined ? process : _ref3$localProcess;

      var thisLevel = this.verbose ? _bunyan2.default.TRACE : _bunyan2.default.INFO;
      if (packet.level >= thisLevel) {
        var _msg = this.format(packet);
        if (this.isCapturing) {
          this.capturedMessages.push(_msg);
        } else {
          localProcess.stdout.write(_msg);
        }
      }
    }
  }, {
    key: 'startCapturing',
    value: function startCapturing() {
      this.isCapturing = true;
    }
  }, {
    key: 'stopCapturing',
    value: function stopCapturing() {
      this.isCapturing = false;
      this.capturedMessages = [];
    }
  }, {
    key: 'flushCapturedLogs',
    value: function flushCapturedLogs() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$localProcess = _ref4.localProcess,
          localProcess = _ref4$localProcess === undefined ? process : _ref4$localProcess;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.capturedMessages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _msg2 = _step.value;

          localProcess.stdout.write(_msg2);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.capturedMessages = [];
    }
  }]);
  return ConsoleStream;
}();

var consoleStream = exports.consoleStream = new ConsoleStream();

// createLogger types and implementation.

function createLogger(filename) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$createBunyanLog = _ref5.createBunyanLog,
      createBunyanLog = _ref5$createBunyanLog === undefined ? _bunyan.createLogger : _ref5$createBunyanLog;

  return createBunyanLog({
    // Strip the leading src/ from file names (which is in all file names) to
    // make the name less redundant.
    name: filename.replace(/^src\//, ''),
    // Capture all log levels and let the stream filter them.
    level: _bunyan2.default.TRACE,
    streams: [{
      type: 'raw',
      stream: consoleStream
    }]
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(44)('wks')
  , uid        = __webpack_require__(29)
  , Symbol     = __webpack_require__(3).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoteTempInstallNotSupported = exports.InvalidManifest = exports.UsageError = exports.WebExtError = undefined;

var _classCallCheck2 = __webpack_require__(10);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(94);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(93);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.onlyInstancesOf = onlyInstancesOf;
exports.onlyErrorsWithCode = onlyErrorsWithCode;
exports.isErrorWithCode = isErrorWithCode;

var _es6Error = __webpack_require__(144);

var _es6Error2 = _interopRequireDefault(_es6Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Base error for all custom web-ext errors.
 */
var WebExtError = exports.WebExtError = function (_ExtendableError) {
  (0, _inherits3.default)(WebExtError, _ExtendableError);

  function WebExtError(message) {
    (0, _classCallCheck3.default)(this, WebExtError);
    return (0, _possibleConstructorReturn3.default)(this, (WebExtError.__proto__ || Object.getPrototypeOf(WebExtError)).call(this, message));
  }

  return WebExtError;
}(_es6Error2.default);

/*
 * The class for errors that can be fixed by the developer.
 */


var UsageError = exports.UsageError = function (_WebExtError) {
  (0, _inherits3.default)(UsageError, _WebExtError);

  function UsageError(message) {
    (0, _classCallCheck3.default)(this, UsageError);
    return (0, _possibleConstructorReturn3.default)(this, (UsageError.__proto__ || Object.getPrototypeOf(UsageError)).call(this, message));
  }

  return UsageError;
}(WebExtError);

/*
 * The manifest for the extension is invalid (or missing).
 */


var InvalidManifest = exports.InvalidManifest = function (_UsageError) {
  (0, _inherits3.default)(InvalidManifest, _UsageError);

  function InvalidManifest(message) {
    (0, _classCallCheck3.default)(this, InvalidManifest);
    return (0, _possibleConstructorReturn3.default)(this, (InvalidManifest.__proto__ || Object.getPrototypeOf(InvalidManifest)).call(this, message));
  }

  return InvalidManifest;
}(UsageError);

/*
 * The remote Firefox does not support temporary add-on installation.
 */


var RemoteTempInstallNotSupported = exports.RemoteTempInstallNotSupported = function (_WebExtError2) {
  (0, _inherits3.default)(RemoteTempInstallNotSupported, _WebExtError2);

  function RemoteTempInstallNotSupported(message) {
    (0, _classCallCheck3.default)(this, RemoteTempInstallNotSupported);
    return (0, _possibleConstructorReturn3.default)(this, (RemoteTempInstallNotSupported.__proto__ || Object.getPrototypeOf(RemoteTempInstallNotSupported)).call(this, message));
  }

  return RemoteTempInstallNotSupported;
}(WebExtError);

/*
 * Sugar-y way to catch only instances of a certain error.
 *
 * Usage:
 *
 *  Promise.reject(SyntaxError)
 *    .catch(onlyInstancesOf(SyntaxError, (error) => {
 *      // error is guaranteed to be an instance of SyntaxError
 *    }))
 *
 * All other errors will be re-thrown.
 *
 */


function onlyInstancesOf(predicate, errorHandler) {
  return function (error) {
    if (error instanceof predicate) {
      return errorHandler(error);
    } else {
      throw error;
    }
  };
}

/*
 * Sugar-y way to catch only errors having certain code(s).
 *
 * Usage:
 *
 *  Promise.resolve()
 *    .catch(onlyErrorsWithCode('ENOENT', (error) => {
 *      // error.code is guaranteed to be ENOENT
 *    }))
 *
 *  or:
 *
 *  Promise.resolve()
 *    .catch(onlyErrorsWithCode(['ENOENT', 'ENOTDIR'], (error) => {
 *      // ...
 *    }))
 *
 * All other errors will be re-thrown.
 *
 */
function onlyErrorsWithCode(codeWanted, errorHandler) {
  return function (error) {
    var throwError = true;

    if (Array.isArray(codeWanted)) {
      if (codeWanted.indexOf(error.code) !== -1 || codeWanted.indexOf(error.errno) !== -1) {
        throwError = false;
      }
    } else if (error.code === codeWanted || error.errno === codeWanted) {
      throwError = false;
    }

    if (throwError) {
      throw error;
    }

    return errorHandler(error);
  };
}

function isErrorWithCode(codeWanted, error) {
  if (Array.isArray(codeWanted) && codeWanted.indexOf(error.code) !== -1) {
    return true;
  } else if (error.code === codeWanted) {
    return true;
  }

  return false;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(90);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(154);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(22)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(5)
  , IE8_DOM_DEFINE = __webpack_require__(57)
  , toPrimitive    = __webpack_require__(46)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(3)
  , core      = __webpack_require__(2)
  , ctx       = __webpack_require__(21)
  , hide      = __webpack_require__(13)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(9)
  , createDesc = __webpack_require__(27);
module.exports = __webpack_require__(8) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(58)
  , defined = __webpack_require__(38);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(88);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("mz");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(36);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(62)
  , enumBugKeys = __webpack_require__(40);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(6);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.getManifestId = getManifestId;

var _path = __webpack_require__(19);

var _path2 = _interopRequireDefault(_path);

var _mz = __webpack_require__(18);

var _parseJson = __webpack_require__(70);

var _parseJson2 = _interopRequireDefault(_parseJson);

var _errors = __webpack_require__(4);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

// getValidatedManifest helper types and implementation

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(sourceDir) {
    var manifestFile, manifestContents, manifestData, errors;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            manifestFile = _path2.default.join(sourceDir, 'manifest.json');

            log.debug('Validating manifest at ' + manifestFile);

            manifestContents = void 0;
            _context.prev = 3;
            _context.next = 6;
            return _mz.fs.readFile(manifestFile);

          case 6:
            manifestContents = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](3);
            throw new _errors.InvalidManifest('Could not read manifest.json file at ' + manifestFile + ': ' + _context.t0);

          case 12:
            manifestData = void 0;
            _context.prev = 13;

            manifestData = (0, _parseJson2.default)(manifestContents, manifestFile);
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t1 = _context['catch'](13);
            throw new _errors.InvalidManifest('Error parsing manifest.json at ' + manifestFile + ': ' + _context.t1);

          case 20:
            errors = [];
            // This is just some basic validation of what web-ext needs, not
            // what Firefox will need to run the extension.
            // TODO: integrate with the addons-linter for actual validation.

            if (!manifestData.name) {
              errors.push('missing "name" property');
            }
            if (!manifestData.version) {
              errors.push('missing "version" property');
            }

            if (manifestData.applications && !manifestData.applications.gecko) {
              // Since the applications property only applies to gecko, make
              // sure 'gecko' exists when 'applications' is defined. This should
              // make introspection of gecko properties easier.
              errors.push('missing "applications.gecko" property');
            }

            if (!errors.length) {
              _context.next = 26;
              break;
            }

            throw new _errors.InvalidManifest('Manifest at ' + manifestFile + ' is invalid: ' + errors.join('; '));

          case 26:
            return _context.abrupt('return', manifestData);

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 9], [13, 17]]);
  }));

  function getValidatedManifest(_x) {
    return _ref.apply(this, arguments);
  }

  return getValidatedManifest;
}();

function getManifestId(manifestData) {
  return manifestData.applications ? manifestData.applications.gecko.id : undefined;
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/manifest.js"))

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f
  , has = __webpack_require__(12)
  , TAG = __webpack_require__(1)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(127)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(59)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131);
var global        = __webpack_require__(3)
  , hide          = __webpack_require__(13)
  , Iterators     = __webpack_require__(17)
  , TO_STRING_TAG = __webpack_require__(1)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("es6-promisify");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFileFilter = exports.FileFilter = exports.isSubPath = undefined;

var _classCallCheck2 = __webpack_require__(10);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = __webpack_require__(19);

var _path2 = _interopRequireDefault(_path);

var _minimatch = __webpack_require__(148);

var _minimatch2 = _interopRequireDefault(_minimatch);

var _fs = __webpack_require__(33);

var _fs2 = _interopRequireDefault(_fs);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

// check if target is a sub directory of src
var isSubPath = exports.isSubPath = function isSubPath(src, target) {
  var relate = _path2.default.relative(src, target);
  // same dir
  if (!relate) {
    return false;
  }
  if (relate === '..') {
    return false;
  }
  return !relate.startsWith('..' + _path2.default.sep);
};

// FileFilter types and implementation.

/*
 * Allows or ignores files.
 */
var FileFilter = exports.FileFilter = function () {
  function FileFilter() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$baseIgnoredPatte = _ref.baseIgnoredPatterns,
        baseIgnoredPatterns = _ref$baseIgnoredPatte === undefined ? ['**/*.xpi', '**/*.zip', '**/.*', // any hidden file and folder
    '**/.*/**/*', // and the content inside hidden folder
    '**/node_modules', '**/node_modules/**/*'] : _ref$baseIgnoredPatte,
        _ref$ignoreFiles = _ref.ignoreFiles,
        ignoreFiles = _ref$ignoreFiles === undefined ? [] : _ref$ignoreFiles,
        sourceDir = _ref.sourceDir,
        artifactsDir = _ref.artifactsDir;

    (0, _classCallCheck3.default)(this, FileFilter);

    sourceDir = _path2.default.resolve(sourceDir);

    this.filesToIgnore = [];
    this.sourceDir = sourceDir;

    if (sourceDir) {
      var ignoreFilePath = _path2.default.join(sourceDir, '.wextignore');

      if (_fs2.default.existsSync(ignoreFilePath)) {
        try {
          var text = _fs2.default.readFileSync(ignoreFilePath, 'utf8');
          var filesToIgnore = text.split('\n');
          this.addToIgnoreList(filesToIgnore);
        } catch (e) {
          // ignore
        }
      }
    }

    this.addToIgnoreList(baseIgnoredPatterns);

    if (ignoreFiles) {
      this.addToIgnoreList(ignoreFiles);
    }

    if (artifactsDir && isSubPath(sourceDir, artifactsDir)) {
      artifactsDir = _path2.default.resolve(artifactsDir);
      log.debug('Ignoring artifacts directory "' + artifactsDir + '" ' + 'and all its subdirectories');
      this.addToIgnoreList([artifactsDir, _path2.default.join(artifactsDir, '**', '*')]);
    }
  }

  /**
   *  Resolve relative path to absolute path with sourceDir.
   */


  (0, _createClass3.default)(FileFilter, [{
    key: 'resolveWithSourceDir',
    value: function resolveWithSourceDir(file) {
      var resolvedPath = _path2.default.resolve(this.sourceDir, file);
      log.debug('Resolved path ' + file + ' with sourceDir ' + this.sourceDir + ' ' + ('to ' + resolvedPath));
      return resolvedPath;
    }

    /**
     *  Insert more files into filesToIgnore array.
     */

  }, {
    key: 'addToIgnoreList',
    value: function addToIgnoreList(files) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var file = _step.value;

          this.filesToIgnore.push(this.resolveWithSourceDir(file));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /*
     * Returns true if the file is wanted.
     *
     * If filePath does not start with a slash, it will be treated as a path
     * relative to sourceDir when matching it against all configured
     * ignore-patterns.
     *
     * Example: this is called by zipdir as wantFile(filePath) for each
     * file in the folder that is being archived.
     */

  }, {
    key: 'wantFile',
    value: function wantFile(filePath) {
      var resolvedPath = this.resolveWithSourceDir(filePath);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.filesToIgnore[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var test = _step2.value;

          if ((0, _minimatch2.default)(resolvedPath, test)) {
            log.debug('FileFilter: ignoring file ' + resolvedPath + ' (it matched ' + test + ')');
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    }
  }]);
  return FileFilter;
}();

// a helper function to make mocking easier

var createFileFilter = exports.createFileFilter = function createFileFilter(params) {
  return new FileFilter(params);
};
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/file-filter.js"))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(86);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(20)
  , TAG = __webpack_require__(1)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16)
  , document = __webpack_require__(3).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(5)
  , dPs         = __webpack_require__(120)
  , enumBugKeys = __webpack_require__(40)
  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(39)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(56).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(44)('keys')
  , uid    = __webpack_require__(29);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(3)
  , core           = __webpack_require__(2)
  , LIBRARY        = __webpack_require__(25)
  , wksExt         = __webpack_require__(48)
  , defineProperty = __webpack_require__(9).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultLocalizedName = undefined;

var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(6);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getDefaultLocalizedName = exports.getDefaultLocalizedName = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var messageFile = _ref2.messageFile,
        manifestData = _ref2.manifestData;
    var messageData, messageContents, extensionName;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            messageData = void 0;
            messageContents = void 0;
            extensionName = manifestData.name;
            _context.prev = 3;
            _context.next = 6;
            return _mz.fs.readFile(messageFile);

          case 6:
            messageContents = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](3);
            throw new _errors.UsageError('Error reading messages.json file at ' + messageFile + ': ' + _context.t0);

          case 12:
            _context.prev = 12;

            messageData = (0, _parseJson2.default)(messageContents, messageFile);
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t1 = _context['catch'](12);
            throw new _errors.UsageError('Error parsing messages.json ' + _context.t1);

          case 19:

            extensionName = manifestData.name.replace(/__MSG_([A-Za-z0-9@_]+?)__/g, function (match, messageName) {
              if (!(messageData[messageName] && messageData[messageName].message)) {
                var error = new _errors.UsageError('The locale file ' + messageFile + ' ' + ('is missing key: ' + messageName));
                throw error;
              } else {
                return messageData[messageName].message;
              }
            });
            return _context.abrupt('return', Promise.resolve(extensionName));

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 9], [12, 16]]);
  }));

  return function getDefaultLocalizedName(_x) {
    return _ref.apply(this, arguments);
  };
}();

var defaultPackageCreator = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
    var manifestData = _ref4.manifestData,
        sourceDir = _ref4.sourceDir,
        fileFilter = _ref4.fileFilter,
        artifactsDir = _ref4.artifactsDir,
        showReadyMessage = _ref4.showReadyMessage;

    var id, buffer, extensionName, _messageFile, packageName, extensionPath, stream;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = void 0;

            if (!manifestData) {
              _context2.next = 6;
              break;
            }

            id = (0, _manifest.getManifestId)(manifestData);
            log.debug('Using manifest id=' + (id || '[not specified]'));
            _context2.next = 9;
            break;

          case 6:
            _context2.next = 8;
            return (0, _manifest2.default)(sourceDir);

          case 8:
            manifestData = _context2.sent;

          case 9:
            _context2.next = 11;
            return (0, _zipDir.zipDir)(sourceDir, {
              filter: function filter() {
                return fileFilter.wantFile.apply(fileFilter, arguments);
              }
            });

          case 11:
            buffer = _context2.sent;
            extensionName = manifestData.name;

            if (!manifestData.default_locale) {
              _context2.next = 19;
              break;
            }

            _messageFile = _path2.default.join(sourceDir, '_locales', manifestData.default_locale, 'messages.json');

            log.debug('Manifest declared default_locale, localizing extension name');
            _context2.next = 18;
            return getDefaultLocalizedName({ messageFile: _messageFile, manifestData: manifestData });

          case 18:
            extensionName = _context2.sent;

          case 19:
            packageName = safeFileName(extensionName + '-' + manifestData.version + '.zip');
            extensionPath = _path2.default.join(artifactsDir, packageName);
            stream = (0, _fs.createWriteStream)(extensionPath);


            stream.write(buffer, function () {
              return stream.end();
            });

            _context2.next = 25;
            return (0, _eventToPromise2.default)(stream, 'close');

          case 25:

            if (showReadyMessage) {
              log.info('Your web extension is ready: ' + extensionPath);
            }
            return _context2.abrupt('return', { extensionPath: extensionPath });

          case 27:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function defaultPackageCreator(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

// Build command types and implementation.

exports.safeFileName = safeFileName;

var _path = __webpack_require__(19);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(33);

var _mz = __webpack_require__(18);

var _parseJson = __webpack_require__(70);

var _parseJson2 = _interopRequireDefault(_parseJson);

var _eventToPromise = __webpack_require__(69);

var _eventToPromise2 = _interopRequireDefault(_eventToPromise);

var _watcher = __webpack_require__(53);

var _watcher2 = _interopRequireDefault(_watcher);

var _zipDir = __webpack_require__(83);

var _manifest = __webpack_require__(24);

var _manifest2 = _interopRequireDefault(_manifest);

var _artifacts = __webpack_require__(52);

var _logger = __webpack_require__(0);

var _errors = __webpack_require__(4);

var _fileFilter = __webpack_require__(34);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import flow types.
var log = (0, _logger.createLogger)(__filename);

function safeFileName(name) {
  return name.toLowerCase().replace(/[^a-z0-9\.-]+/g, '_');
}

// defaultPackageCreator types and implementation.

// This defines the _locales/messages.json type. See:
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Internationalization#Providing_localized_strings_in__locales

exports.default = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref6) {
    var sourceDir = _ref6.sourceDir,
        artifactsDir = _ref6.artifactsDir,
        _ref6$asNeeded = _ref6.asNeeded,
        asNeeded = _ref6$asNeeded === undefined ? false : _ref6$asNeeded,
        _ref6$ignoreFiles = _ref6.ignoreFiles,
        ignoreFiles = _ref6$ignoreFiles === undefined ? [] : _ref6$ignoreFiles;

    var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        manifestData = _ref7.manifestData,
        _ref7$createFileFilte = _ref7.createFileFilter,
        createFileFilter = _ref7$createFileFilte === undefined ? _fileFilter.createFileFilter : _ref7$createFileFilte,
        _ref7$fileFilter = _ref7.fileFilter,
        fileFilter = _ref7$fileFilter === undefined ? createFileFilter({
      sourceDir: sourceDir,
      artifactsDir: artifactsDir,
      ignoreFiles: ignoreFiles
    }) : _ref7$fileFilter,
        _ref7$onSourceChange = _ref7.onSourceChange,
        onSourceChange = _ref7$onSourceChange === undefined ? _watcher2.default : _ref7$onSourceChange,
        _ref7$packageCreator = _ref7.packageCreator,
        packageCreator = _ref7$packageCreator === undefined ? defaultPackageCreator : _ref7$packageCreator,
        _ref7$showReadyMessag = _ref7.showReadyMessage,
        showReadyMessage = _ref7$showReadyMessag === undefined ? true : _ref7$showReadyMessag;

    var rebuildAsNeeded, createPackage, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            rebuildAsNeeded = asNeeded; // alias for `build --as-needed`

            log.info('Building web extension from ' + sourceDir);

            createPackage = function createPackage() {
              return packageCreator({
                manifestData: manifestData, sourceDir: sourceDir, fileFilter: fileFilter, artifactsDir: artifactsDir, showReadyMessage: showReadyMessage
              });
            };

            _context3.next = 5;
            return (0, _artifacts.prepareArtifactsDir)(artifactsDir);

          case 5:
            _context3.next = 7;
            return createPackage();

          case 7:
            result = _context3.sent;


            if (rebuildAsNeeded) {
              log.info('Rebuilding when files change...');
              onSourceChange({
                sourceDir: sourceDir,
                artifactsDir: artifactsDir,
                onChange: function onChange() {
                  return createPackage().catch(function (error) {
                    log.error(error.stack);
                    throw error;
                  });
                },
                shouldWatchFile: function shouldWatchFile() {
                  return fileFilter.wantFile.apply(fileFilter, arguments);
                }
              });
            }

            return _context3.abrupt('return', result);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function build(_x3) {
    return _ref5.apply(this, arguments);
  }

  return build;
}();
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/build.js"))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nonOverridablePreferences = undefined;

var _extends2 = __webpack_require__(35);

var _extends3 = _interopRequireDefault(_extends2);

exports.getPrefs = getPrefs;
exports.coerceCLICustomPreference = coerceCLICustomPreference;

var _errors = __webpack_require__(4);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);
var nonOverridablePreferences = exports.nonOverridablePreferences = ['devtools.debugger.remote-enabled', 'devtools.debugger.prompt-connection', 'xpinstall.signatures.required'];

// Flow Types

// Preferences Maps

var prefsCommon = {
  // Allow debug output via dump to be printed to the system console
  'browser.dom.window.dump.enabled': true,
  // Warn about possibly incorrect code.
  'javascript.options.strict': true,
  'javascript.options.showInConsole': true,

  // Allow remote connections to the debugger.
  'devtools.debugger.remote-enabled': true,
  // Disable the prompt for allowing connections.
  'devtools.debugger.prompt-connection': false,

  // Turn off platform logging because it is a lot of info.
  'extensions.logging.enabled': false,

  // Disable extension updates and notifications.
  'extensions.checkCompatibility.nightly': false,
  'extensions.update.enabled': false,
  'extensions.update.notifyUser': false,

  // From:
  // http://hg.mozilla.org/mozilla-central/file/1dd81c324ac7/build/automation.py.in//l372
  // Only load extensions from the application and user profile.
  // AddonManager.SCOPE_PROFILE + AddonManager.SCOPE_APPLICATION
  'extensions.enabledScopes': 5,
  // Disable metadata caching for installed add-ons by default.
  'extensions.getAddons.cache.enabled': false,
  // Disable intalling any distribution add-ons.
  'extensions.installDistroAddons': false,
  // Allow installing extensions dropped into the profile folder.
  'extensions.autoDisableScopes': 10,

  // Disable app update.
  'app.update.enabled': false,

  // Allow unsigned add-ons.
  'xpinstall.signatures.required': false
};

// Prefs specific to Firefox for Android.
var prefsFennec = {
  'browser.console.showInPanel': true,
  'browser.firstrun.show.uidiscovery': false
};

// Prefs specific to Firefox for desktop.
var prefsFirefox = {
  'browser.startup.homepage': 'about:blank',
  'startup.homepage_welcome_url': 'about:blank',
  'startup.homepage_welcome_url.additional': '',
  'devtools.errorconsole.enabled': true,
  'devtools.chrome.enabled': true,

  // From:
  // http://hg.mozilla.org/mozilla-central/file/1dd81c324ac7/build/automation.py.in//l388
  // Make url-classifier updates so rare that they won't affect tests.
  'urlclassifier.updateinterval': 172800,
  // Point the url-classifier to a nonexistent local URL for fast failures.
  'browser.safebrowsing.provider.0.gethashURL': 'http://localhost/safebrowsing-dummy/gethash',
  'browser.safebrowsing.provider.0.keyURL': 'http://localhost/safebrowsing-dummy/newkey',
  'browser.safebrowsing.provider.0.updateURL': 'http://localhost/safebrowsing-dummy/update',

  // Disable self repair/SHIELD
  'browser.selfsupport.url': 'https://localhost/selfrepair',
  // Disable Reader Mode UI tour
  'browser.reader.detectedFirstArticle': true
};

var prefs = {
  common: prefsCommon,
  fennec: prefsFennec,
  firefox: prefsFirefox
};

// Module exports

function getPrefs() {
  var app = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'firefox';

  var appPrefs = prefs[app];
  if (!appPrefs) {
    throw new _errors.WebExtError('Unsupported application: ' + app);
  }
  return (0, _extends3.default)({}, prefsCommon, appPrefs);
}

function coerceCLICustomPreference(cliPrefs) {
  var customPrefs = {};

  if (!Array.isArray(cliPrefs)) {
    cliPrefs = [cliPrefs];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cliPrefs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pref = _step.value;

      var prefsAry = pref.split('=');

      if (prefsAry.length < 2) {
        throw new _errors.UsageError('Incomplete custom preference: "' + pref + '". ' + 'Syntax expected: "prefname=prefvalue".');
      }

      var _key = prefsAry[0];
      var value = prefsAry.slice(1).join('=');

      if (/[^\w{@}.-]/.test(_key)) {
        throw new _errors.UsageError('Invalid custom preference name: ' + _key);
      }

      if (value === '' + parseInt(value)) {
        value = parseInt(value, 10);
      } else if (value === 'true' || value === 'false') {
        value = value === 'true';
      }

      if (nonOverridablePreferences.includes(_key)) {
        log.warn('\'' + _key + '\' preference cannot be customized.');
        continue;
      }
      customPrefs['' + _key] = value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return customPrefs;
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/firefox/preferences.js"))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoteFirefox = exports.REMOTE_PORT = undefined;

var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(6);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(10);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _nodeFirefoxConnect = __webpack_require__(150);

var _nodeFirefoxConnect2 = _interopRequireDefault(_nodeFirefoxConnect);

var _logger = __webpack_require__(0);

var _errors = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//eslint-disable-line import/no-extraneous-dependencies

// RemoteFirefox types and implementation
var log = (0, _logger.createLogger)(__filename);

// The default port that Firefox's remote debugger will listen on and the
// client will connect to.

var REMOTE_PORT = exports.REMOTE_PORT = 6005;

// NOTE: this type aliases Object to catch any other possible response.

var RemoteFirefox = exports.RemoteFirefox = function () {
  function RemoteFirefox(client) {
    (0, _classCallCheck3.default)(this, RemoteFirefox);

    this.client = client;
    this.checkedForAddonReloading = false;

    client.client.on('disconnect', function () {
      log.debug('Received "disconnect" from Firefox client');
    });
    client.client.on('end', function () {
      log.debug('Received "end" from Firefox client');
    });
    client.client.on('message', function (info) {
      // These are arbitrary messages that the client library ignores.
      log.debug('Received message from client: ' + JSON.stringify(info));
    });
  }

  (0, _createClass3.default)(RemoteFirefox, [{
    key: 'disconnect',
    value: function disconnect() {
      this.client.disconnect();
    }
  }, {
    key: 'addonRequest',
    value: function addonRequest(addon, request) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.client.client.makeRequest({ to: addon.actor, type: request }, function (response) {
          if (response.error) {
            var _error = response.error + ': ' + response.message;
            log.debug('Client responded to \'' + request + '\' request with error:', _error);
            reject(new _errors.WebExtError(_error));
          } else {
            resolve(response);
          }
        });
      });
    }
  }, {
    key: 'installTemporaryAddon',
    value: function installTemporaryAddon(addonPath) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.client.request('listTabs', function (error, tabsResponse) {
          if (error) {
            return reject(new _errors.WebExtError('Remote Firefox: listTabs() error: ' + error));
          }
          if (!tabsResponse.addonsActor) {
            log.debug('listTabs returned a falsey addonsActor: ' + ('' + tabsResponse.addonsActor));
            return reject(new _errors.RemoteTempInstallNotSupported('This is an older version of Firefox that does not provide an ' + 'add-ons actor for remote installation. Try Firefox 49 or ' + 'higher.'));
          }

          _this2.client.client.makeRequest({
            to: tabsResponse.addonsActor,
            type: 'installTemporaryAddon',
            addonPath: addonPath
          }, function (installResponse) {
            if (installResponse.error) {
              return reject(new _errors.WebExtError('installTemporaryAddon: Error: ' + (installResponse.error + ': ' + installResponse.message)));
            }
            log.debug('installTemporaryAddon: ' + JSON.stringify(installResponse));
            log.info('Installed ' + addonPath + ' as a temporary add-on');
            resolve(installResponse);
          });
        });
      });
    }
  }, {
    key: 'getInstalledAddon',
    value: function getInstalledAddon(addonId) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.client.request('listAddons', function (error, response) {
          if (error) {
            reject(new _errors.WebExtError('Remote Firefox: listAddons() error: ' + error));
          } else {
            resolve(response.addons);
          }
        });
      }).then(function (addons) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = addons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _addon = _step.value;

            if (_addon.id === addonId) {
              return _addon;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        log.debug('Remote Firefox has these addons: ' + addons.map(function (a) {
          return a.id;
        }));
        throw new _errors.WebExtError('The remote Firefox does not have your extension installed');
      });
    }
  }, {
    key: 'checkForAddonReloading',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(addon) {
        var response, supportedRequestTypes;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.checkedForAddonReloading) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', addon);

              case 4:
                _context.next = 6;
                return this.addonRequest(addon, 'requestTypes');

              case 6:
                response = _context.sent;

                if (!(response.requestTypes.indexOf('reload') === -1)) {
                  _context.next = 13;
                  break;
                }

                supportedRequestTypes = JSON.stringify(response.requestTypes);

                log.debug('Remote Firefox only supports: ' + supportedRequestTypes);
                throw new _errors.UsageError('This Firefox version does not support add-on reloading. ' + 'Re-run with --no-reload');

              case 13:
                this.checkedForAddonReloading = true;
                return _context.abrupt('return', addon);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkForAddonReloading(_x) {
        return _ref.apply(this, arguments);
      }

      return checkForAddonReloading;
    }()
  }, {
    key: 'reloadAddon',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(addonId) {
        var addon;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getInstalledAddon(addonId);

              case 2:
                addon = _context2.sent;
                _context2.next = 5;
                return this.checkForAddonReloading(addon);

              case 5:
                _context2.next = 7;
                return this.addonRequest(addon, 'reload');

              case 7:
                process.stdout.write('\rLast extension reload: ' + new Date().toTimeString());
                log.debug('\n');

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function reloadAddon(_x2) {
        return _ref2.apply(this, arguments);
      }

      return reloadAddon;
    }()
  }]);
  return RemoteFirefox;
}();

// Connect types and implementation

// NOTE: this fixes an issue with flow and default exports (which currently
// lose their type signatures) by explicitly declaring the default export
// signature. Reference: https://github.com/facebook/flow/issues/449
// eslint-disable-next-line no-shadow


exports.default = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : REMOTE_PORT;

    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref4$connectToFirefo = _ref4.connectToFirefox,
        connectToFirefox = _ref4$connectToFirefo === undefined ? _nodeFirefoxConnect2.default : _ref4$connectToFirefo;

    var client;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            log.debug('Connecting to Firefox on port ' + port);
            _context3.next = 3;
            return connectToFirefox(port);

          case 3:
            client = _context3.sent;

            log.debug('Connected to the remote Firefox debugger on port ' + port);
            return _context3.abrupt('return', new RemoteFirefox(client));

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function connect() {
    return _ref3.apply(this, arguments);
  }

  return connect;
}();
/* WEBPACK VAR INJECTION */}.call(exports, "src/firefox/remote.js"))

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareArtifactsDir = undefined;

var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(6);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var prepareArtifactsDir = exports.prepareArtifactsDir = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(artifactsDir) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$asyncMkdirp = _ref2.asyncMkdirp,
        asyncMkdirp = _ref2$asyncMkdirp === undefined ? defaultAsyncMkdirp : _ref2$asyncMkdirp;

    var stats;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mz.fs.stat(artifactsDir);

          case 3:
            stats = _context.sent;

            if (stats.isDirectory()) {
              _context.next = 6;
              break;
            }

            throw new _errors.UsageError('--artifacts-dir="' + artifactsDir + '" exists but it is not a directory.');

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return _mz.fs.access(artifactsDir, _mz.fs.W_OK);

          case 9:
            _context.next = 18;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](6);

            if (!(0, _errors.isErrorWithCode)('EACCES', _context.t0)) {
              _context.next = 17;
              break;
            }

            throw new _errors.UsageError('--artifacts-dir="' + artifactsDir + '" exists but the user lacks ' + 'permissions on it.');

          case 17:
            throw _context.t0;

          case 18:
            _context.next = 43;
            break;

          case 20:
            _context.prev = 20;
            _context.t1 = _context['catch'](0);

            if (!(0, _errors.isErrorWithCode)('EACCES', _context.t1)) {
              _context.next = 26;
              break;
            }

            throw new _errors.UsageError('Cannot access --artifacts-dir="' + artifactsDir + '" because the user ' + ('lacks permissions: ' + _context.t1));

          case 26:
            if (!(0, _errors.isErrorWithCode)('ENOENT', _context.t1)) {
              _context.next = 42;
              break;
            }

            _context.prev = 27;

            log.debug('Creating artifacts directory: ' + artifactsDir);
            _context.next = 31;
            return asyncMkdirp(artifactsDir);

          case 31:
            _context.next = 40;
            break;

          case 33:
            _context.prev = 33;
            _context.t2 = _context['catch'](27);

            if (!(0, _errors.isErrorWithCode)('EACCES', _context.t2)) {
              _context.next = 39;
              break;
            }

            throw new _errors.UsageError('Cannot create --artifacts-dir="' + artifactsDir + '" because the ' + ('user lacks permissions: ' + _context.t2));

          case 39:
            throw _context.t2;

          case 40:
            _context.next = 43;
            break;

          case 42:
            throw _context.t1;

          case 43:
            return _context.abrupt('return', artifactsDir);

          case 44:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 20], [6, 11], [27, 33]]);
  }));

  return function prepareArtifactsDir(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _mz = __webpack_require__(18);

var _mkdirp = __webpack_require__(149);

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _es6Promisify = __webpack_require__(32);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _errors = __webpack_require__(4);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

var defaultAsyncMkdirp = (0, _es6Promisify2.default)(_mkdirp2.default);
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/artifacts.js"))

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onSourceChange;
exports.proxyFileChanges = proxyFileChanges;

var _watchpack = __webpack_require__(159);

var _watchpack2 = _interopRequireDefault(_watchpack);

var _debounce = __webpack_require__(143);

var _debounce2 = _interopRequireDefault(_debounce);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

// onSourceChange types and implementation

// NOTE: this fix an issue with flow and default exports (which currently
// lose their type signatures) by explicitly declare the default export
// signature. Reference: https://github.com/facebook/flow/issues/449
// eslint-disable-next-line no-shadow

function onSourceChange(_ref) {
  var sourceDir = _ref.sourceDir,
      artifactsDir = _ref.artifactsDir,
      onChange = _ref.onChange,
      shouldWatchFile = _ref.shouldWatchFile;

  // TODO: For network disks, we would need to add {poll: true}.
  var watcher = new _watchpack2.default();

  var executeImmediately = true;
  onChange = (0, _debounce2.default)(onChange, 1000, executeImmediately);

  watcher.on('change', function (filePath) {
    proxyFileChanges({ artifactsDir: artifactsDir, onChange: onChange, filePath: filePath, shouldWatchFile: shouldWatchFile });
  });

  log.debug('Watching for file changes in ' + sourceDir);
  watcher.watch([], [sourceDir], Date.now());

  // TODO: support interrupting the watcher on Windows.
  // https://github.com/mozilla/web-ext/issues/225
  process.on('SIGINT', function () {
    return watcher.close();
  });
  return watcher;
}

// proxyFileChanges types and implementation.

function proxyFileChanges(_ref2) {
  var artifactsDir = _ref2.artifactsDir,
      onChange = _ref2.onChange,
      filePath = _ref2.filePath,
      shouldWatchFile = _ref2.shouldWatchFile;

  if (filePath.indexOf(artifactsDir) === 0 || !shouldWatchFile(filePath)) {
    log.debug('Ignoring change to: ' + filePath);
  } else {
    log.debug('Changed: ' + filePath);
    log.debug('Last change detection: ' + new Date().toTimeString());
    onChange();
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/watcher.js"))

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(85);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(84);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(92);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(91);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3).document && document.documentElement;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(22)(function(){
  return Object.defineProperty(__webpack_require__(39)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(25)
  , $export        = __webpack_require__(11)
  , redefine       = __webpack_require__(63)
  , hide           = __webpack_require__(13)
  , has            = __webpack_require__(12)
  , Iterators      = __webpack_require__(17)
  , $iterCreate    = __webpack_require__(113)
  , setToStringTag = __webpack_require__(28)
  , getPrototypeOf = __webpack_require__(122)
  , ITERATOR       = __webpack_require__(1)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(26)
  , createDesc     = __webpack_require__(27)
  , toIObject      = __webpack_require__(14)
  , toPrimitive    = __webpack_require__(46)
  , has            = __webpack_require__(12)
  , IE8_DOM_DEFINE = __webpack_require__(57)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(62)
  , hiddenKeys = __webpack_require__(40).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(12)
  , toIObject    = __webpack_require__(14)
  , arrayIndexOf = __webpack_require__(106)(false)
  , IE_PROTO     = __webpack_require__(43)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(21)
  , invoke             = __webpack_require__(109)
  , html               = __webpack_require__(56)
  , cel                = __webpack_require__(39)
  , global             = __webpack_require__(3)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(20)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(45)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(38);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(37)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(17);
module.exports = __webpack_require__(2).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 68 */
/***/ (function(module, exports) {



/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("event-to-promise");

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("parse-json");

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Program = undefined;

var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(6);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(35);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(10);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.defaultVersionGetter = defaultVersionGetter;
exports.main = main;

var _path = __webpack_require__(19);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(33);

var _gitRevSync = __webpack_require__(147);

var _gitRevSync2 = _interopRequireDefault(_gitRevSync);

var _yargs = __webpack_require__(160);

var _yargs2 = _interopRequireDefault(_yargs);

var _camelcase = __webpack_require__(142);

var _camelcase2 = _interopRequireDefault(_camelcase);

var _cmd = __webpack_require__(73);

var _cmd2 = _interopRequireDefault(_cmd);

var _errors = __webpack_require__(4);

var _logger = __webpack_require__(0);

var _preferences = __webpack_require__(50);

var _updates = __webpack_require__(82);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);
var envPrefix = 'WEB_EXT';

// TODO: add pipes to Flow type after https://github.com/facebook/flow/issues/2405 is fixed

/*
 * The command line program.
 */
var Program = exports.Program = function () {
  function Program(argv) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$absolutePackageD = _ref.absolutePackageDir,
        absolutePackageDir = _ref$absolutePackageD === undefined ? process.cwd() : _ref$absolutePackageD;

    (0, _classCallCheck3.default)(this, Program);

    // This allows us to override the process argv which is useful for
    // testing.
    // NOTE: process.argv.slice(2) removes the path to node and web-ext
    // executables from the process.argv array.
    argv = argv || process.argv.slice(2);

    // NOTE: always initialize yargs explicitly with the package dir
    // so that we are sure that it is going to load the 'boolean-negation: false'
    // config (See web-ext#469 for rationale).
    var yargsInstance = (0, _yargs2.default)(argv, absolutePackageDir);

    this.shouldExitProgram = true;
    this.yargs = yargsInstance;
    this.yargs.strict();

    this.commands = {};
    this.defaultValues = {};
  }

  (0, _createClass3.default)(Program, [{
    key: 'command',
    value: function command(name, description, executor) {
      var _this = this;

      var commandOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      this.defaultValues[name] = setDefaultValues(commandOptions);
      this.yargs.command(name, description, function (yargsForCmd) {
        if (!commandOptions) {
          return;
        }
        return yargsForCmd
        // Make sure the user does not add any extra commands. For example,
        // this would be a mistake because lint does not accept arguments:
        // web-ext lint ./src/path/to/file.js
        .demandCommand(0, 0, undefined, 'This command does not take any arguments').strict().exitProcess(_this.shouldExitProgram)
        // Calling env() will be unnecessary after
        // https://github.com/yargs/yargs/issues/486 is fixed
        .env(envPrefix).options(commandOptions);
      });
      this.commands[name] = executor;
      return this;
    }
  }, {
    key: 'setGlobalOptions',
    value: function setGlobalOptions(options) {
      // This is a convenience for setting global options.
      // An option is only global (i.e. available to all sub commands)
      // with the `global` flag so this makes sure every option has it.
      this.defaultValues = (0, _extends3.default)({}, this.defaultValues, setDefaultValues(options));
      Object.keys(options).forEach(function (key) {
        options[key].global = true;
        if (options[key].demand === undefined) {
          // By default, all options should be "demanded" otherwise
          // yargs.strict() will think they are missing when declared.
          options[key].demand = true;
        }
      });
      this.yargs.options(options);
      return this;
    }
  }, {
    key: 'execute',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(absolutePackageDir) {
        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref3$checkForUpdates = _ref3.checkForUpdates,
            checkForUpdates = _ref3$checkForUpdates === undefined ? _updates.checkForUpdates : _ref3$checkForUpdates,
            _ref3$systemProcess = _ref3.systemProcess,
            systemProcess = _ref3$systemProcess === undefined ? process : _ref3$systemProcess,
            _ref3$logStream = _ref3.logStream,
            logStream = _ref3$logStream === undefined ? _logger.consoleStream : _ref3$logStream,
            _ref3$getVersion = _ref3.getVersion,
            getVersion = _ref3$getVersion === undefined ? defaultVersionGetter : _ref3$getVersion,
            _ref3$shouldExitProgr = _ref3.shouldExitProgram,
            shouldExitProgram = _ref3$shouldExitProgr === undefined ? true : _ref3$shouldExitProgr,
            _ref3$globalEnv = _ref3.globalEnv,
            globalEnv = _ref3$globalEnv === undefined ? "development" : _ref3$globalEnv;

        var argv, cmd, runCommand, prefix;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:

                this.shouldExitProgram = shouldExitProgram;
                this.yargs.exitProcess(this.shouldExitProgram);

                argv = this.yargs.argv;
                cmd = argv._[0];

                // Command line option (pref) renamed for internal use (customPref).

                argv.customPrefs = argv.pref;

                runCommand = this.commands[cmd];


                if (argv.verbose) {
                  logStream.makeVerbose();
                  log.info('Version:', getVersion(absolutePackageDir));
                }

                _context.prev = 7;

                if (!(cmd === undefined)) {
                  _context.next = 10;
                  break;
                }

                throw new _errors.UsageError('No sub-command was specified in the args');

              case 10:
                if (runCommand) {
                  _context.next = 12;
                  break;
                }

                throw new _errors.UsageError('Unknown command: ' + cmd);

              case 12:
                if (globalEnv === 'production') {
                  checkForUpdates({
                    version: getVersion(absolutePackageDir)
                  });
                }

                _context.next = 15;
                return runCommand(argv, { shouldExitProgram: shouldExitProgram });

              case 15:
                _context.next = 27;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](7);
                prefix = cmd ? cmd + ': ' : '';

                if (!(_context.t0 instanceof _errors.UsageError) || argv.verbose) {
                  log.error('\n' + prefix + _context.t0.stack + '\n');
                } else {
                  log.error('\n' + prefix + _context.t0 + '\n');
                }
                if (_context.t0.code) {
                  log.error(prefix + 'Error code: ' + _context.t0.code + '\n');
                }

                if (!this.shouldExitProgram) {
                  _context.next = 26;
                  break;
                }

                systemProcess.exit(1);
                _context.next = 27;
                break;

              case 26:
                throw _context.t0;

              case 27:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 17]]);
      }));

      function execute(_x3) {
        return _ref2.apply(this, arguments);
      }

      return execute;
    }()
  }]);
  return Program;
}();

// A global variable generated by DefinePlugin, generated in webpack.config.js


function setDefaultValues(options) {
  var defaultValues = {};
  Object.keys(options).forEach(function (key) {
    var camelCasedKey = (0, _camelcase2.default)(key);
    if (options[key].type === 'boolean') {
      defaultValues[camelCasedKey] = false;
    }
    if (typeof options[key].default !== 'undefined') {
      defaultValues[camelCasedKey] = options[key].default;
    }
  });
  return defaultValues;
}

//A defintion of type of argument for defaultVersionGetter
function defaultVersionGetter(absolutePackageDir) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref4$globalEnv = _ref4.globalEnv,
      globalEnv = _ref4$globalEnv === undefined ? "development" : _ref4$globalEnv;

  if (globalEnv === 'production') {
    log.debug('Getting the version from package.json');
    var packageData = (0, _fs.readFileSync)(_path2.default.join(absolutePackageDir, 'package.json'));
    return JSON.parse(packageData).version;
  } else {
    log.debug('Getting version from the git revision');
    return _gitRevSync2.default.branch(absolutePackageDir) + '-' + _gitRevSync2.default.long(absolutePackageDir);
  }
}

// TODO: add pipes to Flow type after https://github.com/facebook/flow/issues/2405 is fixed

function main(absolutePackageDir) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$getVersion = _ref5.getVersion,
      getVersion = _ref5$getVersion === undefined ? defaultVersionGetter : _ref5$getVersion,
      _ref5$commands = _ref5.commands,
      commands = _ref5$commands === undefined ? _cmd2.default : _ref5$commands,
      argv = _ref5.argv,
      _ref5$runOptions = _ref5.runOptions,
      runOptions = _ref5$runOptions === undefined ? {} : _ref5$runOptions;

  var program = new Program(argv, { absolutePackageDir: absolutePackageDir });

  // yargs uses magic camel case expansion to expose options on the
  // final argv object. For example, the 'artifacts-dir' option is alternatively
  // available as argv.artifactsDir.
  program.yargs.usage('Usage: $0 [options] command\n\nOption values can also be set by declaring an environment variable prefixed\nwith $' + envPrefix + '_. For example: $' + envPrefix + '_SOURCE_DIR=/path is the same as\n--source-dir=/path.\n\nTo view specific help for any given command, add the command name.\nExample: $0 --help run.\n').help('help').alias('h', 'help').env(envPrefix).version(function () {
    return getVersion(absolutePackageDir);
  }).demandCommand(1, 'You must specify a command').strict();

  program.setGlobalOptions({
    'source-dir': {
      alias: 's',
      describe: 'Web extension source directory.',
      default: process.cwd(),
      requiresArg: true,
      type: 'string',
      coerce: _path2.default.resolve
    },
    'artifacts-dir': {
      alias: 'a',
      describe: 'Directory where artifacts will be saved.',
      default: _path2.default.join(process.cwd(), 'web-ext-artifacts'),
      normalize: true,
      requiresArg: true,
      type: 'string'
    },
    'verbose': {
      alias: 'v',
      describe: 'Show verbose output',
      type: 'boolean'
    },
    'ignore-files': {
      alias: 'i',
      describe: 'A list of glob patterns to define which files should be ' + 'ignored. (Example: --ignore-files=path/to/first.js ' + 'path/to/second.js "**/*.log")',
      demand: false,
      requiresArg: true,
      type: 'array'
    }
  });

  program.command('build', 'Create a web extension package from source', commands.build, {
    'as-needed': {
      describe: 'Watch for file changes and re-build as needed',
      type: 'boolean'
    }
  }).command('sign', 'Sign the web extension so it can be installed in Firefox', commands.sign, {
    'api-key': {
      describe: 'API key (JWT issuer) from addons.mozilla.org',
      demand: true,
      type: 'string'
    },
    'api-secret': {
      describe: 'API secret (JWT secret) from addons.mozilla.org',
      demand: true,
      type: 'string'
    },
    'api-url-prefix': {
      describe: 'Signing API URL prefix',
      default: 'https://addons.mozilla.org/api/v3',
      demand: true,
      type: 'string'
    },
    'api-proxy': {
      describe: 'Use a proxy to access the signing API. ' + 'Example: https://yourproxy:6000 ',
      demand: false,
      type: 'string'
    },
    'id': {
      describe: 'A custom ID for the extension. This has no effect if the ' + 'extension already declares an explicit ID in its manifest.',
      demand: false,
      type: 'string'
    },
    'timeout': {
      describe: 'Number of milliseconds to wait before giving up',
      type: 'number'
    }
  }).command('run', 'Run the web extension', commands.run, {
    'firefox': {
      alias: ['f', 'firefox-binary'],
      describe: 'Path or alias to a Firefox executable such as firefox-bin ' + 'or firefox.exe. ' + 'If not specified, the default Firefox will be used. ' + 'You can specify the following aliases in lieu of a path: ' + 'firefox, beta, nightly, firefoxdeveloperedition.',
      demand: false,
      type: 'string'
    },
    'firefox-profile': {
      alias: 'p',
      describe: 'Run Firefox using a copy of this profile. The profile ' + 'can be specified as a directory or a name, such as one ' + 'you would see in the Profile Manager. If not specified, ' + 'a new temporary profile will be created.',
      demand: false,
      type: 'string'
    },
    'keep-profile-changes': {
      describe: 'Run Firefox directly in custom profile. Any changes to ' + 'the profile will be saved.',
      demand: false,
      type: 'boolean'
    },
    'no-reload': {
      describe: 'Do not reload the extension when source files change',
      demand: false,
      type: 'boolean'
    },
    'pre-install': {
      describe: 'Pre-install the extension into the profile before ' + 'startup. This is only needed to support older versions ' + 'of Firefox.',
      demand: false,
      type: 'boolean'
    },
    'pref': {
      describe: 'Launch firefox with a custom preference ' + '(example: --pref=general.useragent.locale=fr-FR). ' + 'You can repeat this option to set more than one ' + 'preference.',
      demand: false,
      requiresArg: true,
      type: 'string',
      coerce: _preferences.coerceCLICustomPreference
    },
    'start-url': {
      alias: ['u', 'url'],
      describe: 'Launch firefox at specified page',
      demand: false,
      requiresArg: true,
      type: 'string'
    },
    'browser-console': {
      alias: ['bc'],
      describe: 'Open the DevTools Browser Console.',
      demand: false,
      type: 'boolean'
    }
  }).command('lint', 'Validate the web extension source', commands.lint, {
    'output': {
      alias: 'o',
      describe: 'The type of output to generate',
      type: 'string',
      default: 'text',
      choices: ['json', 'text']
    },
    'metadata': {
      describe: 'Output only metadata as JSON',
      type: 'boolean',
      default: false
    },
    'warnings-as-errors': {
      describe: 'Treat warnings as errors by exiting non-zero for warnings',
      alias: 'w',
      type: 'boolean',
      default: false
    },
    'pretty': {
      describe: 'Prettify JSON output',
      type: 'boolean',
      default: false
    },
    'self-hosted': {
      describe: 'Your extension will be self-hosted. This disables messages ' + 'related to hosting on addons.mozilla.org.',
      type: 'boolean',
      default: false
    },
    'boring': {
      describe: 'Disables colorful shell output',
      type: 'boolean',
      default: false
    }
  }).command('docs', 'Open the web-ext documentation in a browser', commands.docs, {});

  return program.execute(absolutePackageDir, runOptions);
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/program.js"))

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.url = undefined;
exports.default = docs;

var _open = __webpack_require__(152);

var _open2 = _interopRequireDefault(_open);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

var url = exports.url = 'https://developer.mozilla.org/en-US/Add-ons' + '/WebExtensions/Getting_started_with_web-ext';

function docs(params) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$openUrl = _ref.openUrl,
      openUrl = _ref$openUrl === undefined ? _open2.default : _ref$openUrl;

  return new Promise(function (resolve, reject) {
    openUrl(url, function (error) {
      if (error) {
        log.debug('Encountered an error while opening URL ' + url, error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/docs.js"))

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _build = __webpack_require__(49);

var _build2 = _interopRequireDefault(_build);

var _lint = __webpack_require__(74);

var _lint2 = _interopRequireDefault(_lint);

var _run = __webpack_require__(75);

var _run2 = _interopRequireDefault(_run);

var _sign = __webpack_require__(76);

var _sign2 = _interopRequireDefault(_sign);

var _docs = __webpack_require__(72);

var _docs2 = _interopRequireDefault(_docs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { build: _build2.default, lint: _lint2.default, run: _run2.default, sign: _sign2.default, docs: _docs2.default };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lint;

var _addonsLinter = __webpack_require__(140);

var _logger = __webpack_require__(0);

var _fileFilter = __webpack_require__(34);

// import flow types
var log = (0, _logger.createLogger)(__filename);

// Define the needed 'addons-linter' module flow types.

// Lint command types and implementation.

function lint(_ref) {
  var verbose = _ref.verbose,
      sourceDir = _ref.sourceDir,
      selfHosted = _ref.selfHosted,
      boring = _ref.boring,
      output = _ref.output,
      metadata = _ref.metadata,
      pretty = _ref.pretty,
      warningsAsErrors = _ref.warningsAsErrors,
      ignoreFiles = _ref.ignoreFiles,
      artifactsDir = _ref.artifactsDir;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$createLinter = _ref2.createLinter,
      createLinter = _ref2$createLinter === undefined ? _addonsLinter.createInstance : _ref2$createLinter,
      _ref2$createFileFilte = _ref2.createFileFilter,
      createFileFilter = _ref2$createFileFilte === undefined ? _fileFilter.createFileFilter : _ref2$createFileFilte,
      _ref2$shouldExitProgr = _ref2.shouldExitProgram,
      shouldExitProgram = _ref2$shouldExitProgr === undefined ? true : _ref2$shouldExitProgr;

  var fileFilter = createFileFilter({ sourceDir: sourceDir, ignoreFiles: ignoreFiles, artifactsDir: artifactsDir });

  log.debug('Running addons-linter on ' + sourceDir);
  var linter = createLinter({
    config: {
      logLevel: verbose ? 'debug' : 'fatal',
      stack: Boolean(verbose),
      pretty: pretty,
      warningsAsErrors: warningsAsErrors,
      metadata: metadata,
      output: output,
      boring: boring,
      selfHosted: selfHosted,
      shouldScanFile: function shouldScanFile(fileName) {
        return fileFilter.wantFile(fileName);
      },
      // This mimics the first command line argument from yargs,
      // which should be the directory to the extension.
      _: [sourceDir]
    },
    runAsBinary: shouldExitProgram
  });
  return linter.run();
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/lint.js"))

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtensionRunner = exports.defaultAddonReload = undefined;

var _classCallCheck2 = __webpack_require__(10);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(6);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var defaultAddonReload = exports.defaultAddonReload = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
    var addonId = _ref3.addonId,
        client = _ref3.client,
        _ref3$desktopNotifica = _ref3.desktopNotifications,
        desktopNotifications = _ref3$desktopNotifica === undefined ? _desktopNotifier.showDesktopNotification : _ref3$desktopNotifica;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            log.debug('Reloading add-on ID ' + addonId);
            _context.prev = 1;
            _context.next = 4;
            return client.reloadAddon(addonId);

          case 4:
            _context.next = 12;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](1);

            log.error('\n');
            log.error(_context.t0.stack);
            desktopNotifications({
              title: 'web-ext run: error occurred',
              message: _context.t0.message
            });
            throw _context.t0;

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 6]]);
  }));

  return function defaultAddonReload(_x) {
    return _ref2.apply(this, arguments);
  };
}();

// defaultReloadStrategy types and implementation.

exports.defaultWatcherCreator = defaultWatcherCreator;
exports.defaultReloadStrategy = defaultReloadStrategy;
exports.defaultFirefoxClient = defaultFirefoxClient;

var _readline = __webpack_require__(153);

var _readline2 = _interopRequireDefault(_readline);

var _tty = __webpack_require__(157);

var _tty2 = _interopRequireDefault(_tty);

var _desktopNotifier = __webpack_require__(79);

var _firefox = __webpack_require__(77);

var defaultFirefoxApp = _interopRequireWildcard(_firefox);

var _remote = __webpack_require__(51);

var _remote2 = _interopRequireDefault(_remote);

var _errors = __webpack_require__(4);

var _logger = __webpack_require__(0);

var _manifest = __webpack_require__(24);

var _manifest2 = _interopRequireDefault(_manifest);

var _watcher = __webpack_require__(53);

var _watcher2 = _interopRequireDefault(_watcher);

var _fileFilter = __webpack_require__(34);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import objects that are only used as Flow types.
var log = (0, _logger.createLogger)(__filename);

// defaultWatcherCreator types and implementation.

function defaultWatcherCreator(_ref) {
  var addonId = _ref.addonId,
      addonReload = _ref.addonReload,
      client = _ref.client,
      sourceDir = _ref.sourceDir,
      artifactsDir = _ref.artifactsDir,
      ignoreFiles = _ref.ignoreFiles,
      _ref$onSourceChange = _ref.onSourceChange,
      onSourceChange = _ref$onSourceChange === undefined ? _watcher2.default : _ref$onSourceChange,
      _ref$createFileFilter = _ref.createFileFilter,
      createFileFilter = _ref$createFileFilter === undefined ? _fileFilter.createFileFilter : _ref$createFileFilter;

  var fileFilter = createFileFilter({ sourceDir: sourceDir, artifactsDir: artifactsDir, ignoreFiles: ignoreFiles });
  return onSourceChange({
    sourceDir: sourceDir,
    artifactsDir: artifactsDir,
    onChange: function onChange() {
      return addonReload({ addonId: addonId, client: client });
    },
    shouldWatchFile: function shouldWatchFile(file) {
      return fileFilter.wantFile(file);
    }
  });
}

function defaultReloadStrategy(_ref4) {
  var addonId = _ref4.addonId,
      firefoxProcess = _ref4.firefoxProcess,
      client = _ref4.client,
      profile = _ref4.profile,
      sourceDir = _ref4.sourceDir,
      artifactsDir = _ref4.artifactsDir,
      ignoreFiles = _ref4.ignoreFiles;

  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$addonReload = _ref5.addonReload,
      addonReload = _ref5$addonReload === undefined ? defaultAddonReload : _ref5$addonReload,
      _ref5$createWatcher = _ref5.createWatcher,
      createWatcher = _ref5$createWatcher === undefined ? defaultWatcherCreator : _ref5$createWatcher,
      _ref5$stdin = _ref5.stdin,
      stdin = _ref5$stdin === undefined ? process.stdin : _ref5$stdin;

  var watcher = createWatcher({
    addonId: addonId, addonReload: addonReload, client: client, sourceDir: sourceDir, artifactsDir: artifactsDir, ignoreFiles: ignoreFiles
  });

  firefoxProcess.on('close', function () {
    client.disconnect();
    watcher.close();
    stdin.pause();
  });

  if (stdin.isTTY && stdin instanceof _tty2.default.ReadStream) {
    _readline2.default.emitKeypressEvents(stdin);
    stdin.setRawMode(true);

    // NOTE: this `Promise.resolve().then(...)` is basically used to spawn a "co-routine" that is executed
    // before the callback attached to the Promise returned by this function (and it allows the `run` function
    // to not be stuck in the while loop).
    Promise.resolve().then((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var userExit, keyPressed;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              log.info('Press R to reload (and Ctrl-C to quit)');

              userExit = false;

            case 2:
              if (userExit) {
                _context2.next = 16;
                break;
              }

              _context2.next = 5;
              return new Promise(function (resolve) {
                stdin.once('keypress', function (str, key) {
                  return resolve(key);
                });
              });

            case 5:
              keyPressed = _context2.sent;

              if (!(keyPressed.ctrl && keyPressed.name === 'c')) {
                _context2.next = 10;
                break;
              }

              userExit = true;
              _context2.next = 14;
              break;

            case 10:
              if (!(keyPressed.name === 'r' && addonId)) {
                _context2.next = 14;
                break;
              }

              log.debug('Reloading extension on user request');
              _context2.next = 14;
              return addonReload({ addonId: addonId, client: client });

            case 14:
              _context2.next = 2;
              break;

            case 16:

              log.info('\nExiting web-ext on user request');
              firefoxProcess.kill();

            case 18:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
  }
}

// defaultFirefoxClient types and implementation.

function defaultFirefoxClient() {
  var establishConnection = function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var lastError, retries;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              retries = 0;

            case 1:
              if (!(retries <= maxRetries)) {
                _context3.next = 22;
                break;
              }

              _context3.prev = 2;
              _context3.next = 5;
              return connectToFirefox(port);

            case 5:
              return _context3.abrupt('return', _context3.sent);

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3['catch'](2);

              if (!(0, _errors.isErrorWithCode)('ECONNREFUSED', _context3.t0)) {
                _context3.next = 17;
                break;
              }

              _context3.next = 13;
              return new Promise(function (resolve) {
                setTimeout(resolve, retryInterval);
              });

            case 13:

              lastError = _context3.t0;
              log.debug('Retrying Firefox (' + retries + '); connection error: ' + _context3.t0);
              _context3.next = 19;
              break;

            case 17:
              log.error(_context3.t0.stack);
              throw _context3.t0;

            case 19:
              retries++;
              _context3.next = 1;
              break;

            case 22:

              log.debug('Connect to Firefox debugger: too many retries');
              throw lastError;

            case 24:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[2, 8]]);
    }));

    return function establishConnection() {
      return _ref8.apply(this, arguments);
    };
  }();

  var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref7$connectToFirefo = _ref7.connectToFirefox,
      connectToFirefox = _ref7$connectToFirefo === undefined ? _remote2.default : _ref7$connectToFirefo,
      _ref7$maxRetries = _ref7.maxRetries,
      maxRetries = _ref7$maxRetries === undefined ? 250 : _ref7$maxRetries,
      _ref7$retryInterval = _ref7.retryInterval,
      retryInterval = _ref7$retryInterval === undefined ? 120 : _ref7$retryInterval,
      port = _ref7.port;

  log.debug('Connecting to the remote Firefox debugger');
  return establishConnection();
}

// Run command types and implementation.

exports.default = function () {
  var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref10) {
    var sourceDir = _ref10.sourceDir,
        artifactsDir = _ref10.artifactsDir,
        firefox = _ref10.firefox,
        firefoxProfile = _ref10.firefoxProfile,
        _ref10$keepProfileCha = _ref10.keepProfileChanges,
        keepProfileChanges = _ref10$keepProfileCha === undefined ? false : _ref10$keepProfileCha,
        _ref10$preInstall = _ref10.preInstall,
        preInstall = _ref10$preInstall === undefined ? false : _ref10$preInstall,
        _ref10$noReload = _ref10.noReload,
        noReload = _ref10$noReload === undefined ? false : _ref10$noReload,
        _ref10$browserConsole = _ref10.browserConsole,
        browserConsole = _ref10$browserConsole === undefined ? false : _ref10$browserConsole,
        customPrefs = _ref10.customPrefs,
        startUrl = _ref10.startUrl,
        ignoreFiles = _ref10.ignoreFiles;

    var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref11$firefoxApp = _ref11.firefoxApp,
        firefoxApp = _ref11$firefoxApp === undefined ? defaultFirefoxApp : _ref11$firefoxApp,
        _ref11$firefoxClient = _ref11.firefoxClient,
        firefoxClient = _ref11$firefoxClient === undefined ? defaultFirefoxClient : _ref11$firefoxClient,
        _ref11$reloadStrategy = _ref11.reloadStrategy,
        reloadStrategy = _ref11$reloadStrategy === undefined ? defaultReloadStrategy : _ref11$reloadStrategy,
        _ref11$ExtensionRunne = _ref11.ExtensionRunnerClass,
        ExtensionRunnerClass = _ref11$ExtensionRunne === undefined ? ExtensionRunner : _ref11$ExtensionRunne;

    var requiresRemote, installed, client, addonId, manifestData, runner, profile, _ref12, runningFirefox, debuggerPort;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:

            log.info('Running web extension from ' + sourceDir);
            if (preInstall) {
              log.info('Disabled auto-reloading because it\'s not possible with ' + '--pre-install');
              noReload = true;
            }
            // When not pre-installing the extension, we require a remote
            // connection to Firefox.
            requiresRemote = !preInstall;
            installed = false;
            client = void 0;
            addonId = void 0;
            _context4.next = 8;
            return (0, _manifest2.default)(sourceDir);

          case 8:
            manifestData = _context4.sent;
            runner = new ExtensionRunnerClass({
              sourceDir: sourceDir,
              firefoxApp: firefoxApp,
              firefox: firefox,
              keepProfileChanges: keepProfileChanges,
              browserConsole: browserConsole,
              manifestData: manifestData,
              profilePath: firefoxProfile,
              customPrefs: customPrefs,
              startUrl: startUrl
            });
            _context4.next = 12;
            return runner.getProfile();

          case 12:
            profile = _context4.sent;

            if (preInstall) {
              _context4.next = 17;
              break;
            }

            log.debug('Deferring extension installation until after ' + 'connecting to the remote debugger');
            _context4.next = 22;
            break;

          case 17:
            log.debug('Pre-installing extension as a proxy file');
            _context4.next = 20;
            return runner.installAsProxy(profile);

          case 20:
            addonId = _context4.sent;

            installed = true;

          case 22:
            _context4.next = 24;
            return runner.run(profile);

          case 24:
            _ref12 = _context4.sent;
            runningFirefox = _ref12.firefox;
            debuggerPort = _ref12.debuggerPort;

            if (!installed) {
              _context4.next = 31;
              break;
            }

            log.debug('Not installing as temporary add-on because the ' + 'add-on was already installed');
            _context4.next = 57;
            break;

          case 31:
            if (!requiresRemote) {
              _context4.next = 57;
              break;
            }

            _context4.next = 34;
            return firefoxClient({ port: debuggerPort });

          case 34:
            client = _context4.sent;
            _context4.prev = 35;
            _context4.next = 38;
            return runner.installAsTemporaryAddon(client).then(function (installResult) {
              return installResult.addon.id;
            });

          case 38:
            addonId = _context4.sent;
            _context4.next = 49;
            break;

          case 41:
            _context4.prev = 41;
            _context4.t0 = _context4['catch'](35);

            if (!(_context4.t0 instanceof _errors.RemoteTempInstallNotSupported)) {
              _context4.next = 48;
              break;
            }

            log.debug('Caught: ' + _context4.t0);
            throw new _errors.WebExtError('Temporary add-on installation is not supported in this version ' + 'of Firefox (you need Firefox 49 or higher). For older Firefox ' + 'versions, use --pre-install');

          case 48:
            throw _context4.t0;

          case 49:
            if (!noReload) {
              _context4.next = 53;
              break;
            }

            log.info('Automatic extension reloading has been disabled');
            _context4.next = 57;
            break;

          case 53:
            if (addonId) {
              _context4.next = 55;
              break;
            }

            throw new _errors.WebExtError('Unexpected missing addonId in the installAsTemporaryAddon result');

          case 55:

            log.info('The extension will reload if any source file changes');
            reloadStrategy({
              firefoxProcess: runningFirefox,
              profile: profile,
              client: client,
              sourceDir: sourceDir,
              artifactsDir: artifactsDir,
              addonId: addonId,
              ignoreFiles: ignoreFiles
            });

          case 57:
            return _context4.abrupt('return', firefoxApp);

          case 58:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[35, 41]]);
  }));

  function run(_x4) {
    return _ref9.apply(this, arguments);
  }

  return run;
}();

// ExtensionRunner types and implementation.

var ExtensionRunner = exports.ExtensionRunner = function () {
  function ExtensionRunner(_ref13) {
    var firefoxApp = _ref13.firefoxApp,
        sourceDir = _ref13.sourceDir,
        manifestData = _ref13.manifestData,
        profilePath = _ref13.profilePath,
        keepProfileChanges = _ref13.keepProfileChanges,
        firefox = _ref13.firefox,
        browserConsole = _ref13.browserConsole,
        startUrl = _ref13.startUrl,
        _ref13$customPrefs = _ref13.customPrefs,
        customPrefs = _ref13$customPrefs === undefined ? {} : _ref13$customPrefs;
    (0, _classCallCheck3.default)(this, ExtensionRunner);

    this.sourceDir = sourceDir;
    this.manifestData = manifestData;
    this.profilePath = profilePath;
    this.keepProfileChanges = keepProfileChanges;
    this.firefoxApp = firefoxApp;
    this.firefox = firefox;
    this.browserConsole = browserConsole;
    this.customPrefs = customPrefs;
    this.startUrl = startUrl;
  }

  (0, _createClass3.default)(ExtensionRunner, [{
    key: 'getProfile',
    value: function getProfile() {
      var firefoxApp = this.firefoxApp,
          profilePath = this.profilePath,
          customPrefs = this.customPrefs,
          keepProfileChanges = this.keepProfileChanges;

      return new Promise(function (resolve) {
        if (profilePath) {
          if (keepProfileChanges) {
            log.debug('Using Firefox profile from ' + profilePath);
            resolve(firefoxApp.useProfile(profilePath, { customPrefs: customPrefs }));
          } else {
            log.debug('Copying Firefox profile from ' + profilePath);
            resolve(firefoxApp.copyProfile(profilePath, { customPrefs: customPrefs }));
          }
        } else {
          log.debug('Creating new Firefox profile');
          resolve(firefoxApp.createProfile({ customPrefs: customPrefs }));
        }
      });
    }
  }, {
    key: 'installAsTemporaryAddon',
    value: function installAsTemporaryAddon(client) {
      return client.installTemporaryAddon(this.sourceDir);
    }
  }, {
    key: 'installAsProxy',
    value: function installAsProxy(profile) {
      var firefoxApp = this.firefoxApp,
          sourceDir = this.sourceDir,
          manifestData = this.manifestData;

      return firefoxApp.installExtension({
        manifestData: manifestData,
        asProxy: true,
        extensionPath: sourceDir,
        profile: profile
      }).then(function () {
        return (0, _manifest.getManifestId)(manifestData);
      });
    }
  }, {
    key: 'run',
    value: function run(profile) {
      var binaryArgs = [];
      var firefoxApp = this.firefoxApp,
          firefox = this.firefox,
          startUrl = this.startUrl;

      if (this.browserConsole) {
        binaryArgs.push('-jsconsole');
      }
      if (startUrl) {
        var urls = Array.isArray(startUrl) ? startUrl : [startUrl];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = urls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var url = _step.value;

            binaryArgs.push('--url', url);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return firefoxApp.run(profile, {
        firefoxBinary: firefox, binaryArgs: binaryArgs
      });
    }
  }]);
  return ExtensionRunner;
}();
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/run.js"))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveIdToSourceDir = exports.getIdFromSourceDir = exports.extensionIdFile = undefined;

var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = __webpack_require__(54);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = __webpack_require__(6);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getIdFromSourceDir = exports.getIdFromSourceDir = function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(sourceDir) {
    var filePath, content, lines, id;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filePath = _path2.default.join(sourceDir, extensionIdFile);
            content = void 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _mz.fs.readFile(filePath);

          case 5:
            content = _context2.sent;
            _context2.next = 14;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](2);

            if (!(0, _errors.isErrorWithCode)('ENOENT', _context2.t0)) {
              _context2.next = 13;
              break;
            }

            log.debug('No ID file found at: ' + filePath);
            return _context2.abrupt('return');

          case 13:
            throw _context2.t0;

          case 14:
            lines = content.toString().split('\n');

            lines = lines.filter(function (line) {
              line = line.trim();
              if (line && !line.startsWith('#')) {
                return line;
              }
            });

            id = lines[0];

            log.debug('Found extension ID ' + id + ' in ' + filePath);

            if (id) {
              _context2.next = 20;
              break;
            }

            throw new _errors.UsageError('No ID found in extension ID file ' + filePath);

          case 20:
            return _context2.abrupt('return', id);

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[2, 8]]);
  }));

  return function getIdFromSourceDir(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

var saveIdToSourceDir = exports.saveIdToSourceDir = function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(sourceDir, id) {
    var filePath;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            filePath = _path2.default.join(sourceDir, extensionIdFile);
            _context3.next = 3;
            return _mz.fs.writeFile(filePath, ['# This file was created by https://github.com/mozilla/web-ext', '# Your auto-generated extension ID for addons.mozilla.org is:', id.toString()].join('\n'));

          case 3:

            log.debug('Saved auto-generated ID ' + id + ' to ' + filePath);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function saveIdToSourceDir(_x4, _x5) {
    return _ref7.apply(this, arguments);
  };
}();

exports.default = sign;

var _path = __webpack_require__(19);

var _path2 = _interopRequireDefault(_path);

var _mz = __webpack_require__(18);

var _signAddon = __webpack_require__(155);

var _signAddon2 = _interopRequireDefault(_signAddon);

var _build = __webpack_require__(49);

var _build2 = _interopRequireDefault(_build);

var _manifest = __webpack_require__(24);

var _manifest2 = _interopRequireDefault(_manifest);

var _tempDir = __webpack_require__(81);

var _errors = __webpack_require__(4);

var _artifacts = __webpack_require__(52);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);
var extensionIdFile = exports.extensionIdFile = '.web-extension-id';

// Sign command types and implementation.

function sign(_ref) {
  var verbose = _ref.verbose,
      sourceDir = _ref.sourceDir,
      artifactsDir = _ref.artifactsDir,
      _ref$ignoreFiles = _ref.ignoreFiles,
      ignoreFiles = _ref$ignoreFiles === undefined ? [] : _ref$ignoreFiles,
      apiKey = _ref.apiKey,
      apiSecret = _ref.apiSecret,
      apiUrlPrefix = _ref.apiUrlPrefix,
      apiProxy = _ref.apiProxy,
      id = _ref.id,
      timeout = _ref.timeout;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$build = _ref2.build,
      build = _ref2$build === undefined ? _build2.default : _ref2$build,
      _ref2$signAddon = _ref2.signAddon,
      signAddon = _ref2$signAddon === undefined ? _signAddon2.default : _ref2$signAddon,
      preValidatedManifest = _ref2.preValidatedManifest;

  return (0, _tempDir.withTempDir)(function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(tmpDir) {
      var manifestData, _ref4, _ref5, buildResult, idFromSourceDir, manifestId, signingResult;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _artifacts.prepareArtifactsDir)(artifactsDir);

            case 2:
              manifestData = void 0;

              if (!preValidatedManifest) {
                _context.next = 7;
                break;
              }

              manifestData = preValidatedManifest;
              _context.next = 10;
              break;

            case 7:
              _context.next = 9;
              return (0, _manifest2.default)(sourceDir);

            case 9:
              manifestData = _context.sent;

            case 10:
              _context.next = 12;
              return Promise.all([build({ sourceDir: sourceDir, ignoreFiles: ignoreFiles, artifactsDir: tmpDir.path() }, { manifestData: manifestData, showReadyMessage: false }), getIdFromSourceDir(sourceDir)]);

            case 12:
              _ref4 = _context.sent;
              _ref5 = (0, _slicedToArray3.default)(_ref4, 2);
              buildResult = _ref5[0];
              idFromSourceDir = _ref5[1];
              manifestId = (0, _manifest.getManifestId)(manifestData);

              if (!(id && manifestId)) {
                _context.next = 19;
                break;
              }

              throw new _errors.UsageError('Cannot set custom ID ' + id + ' because manifest.json ' + ('declares ID ' + manifestId));

            case 19:
              if (id) {
                log.debug('Using custom ID declared as --id=' + id);
              }

              if (manifestId) {
                id = manifestId;
              }

              if (!id && idFromSourceDir) {
                log.info('Using previously auto-generated extension ID: ' + idFromSourceDir);
                id = idFromSourceDir;
              }

              if (!id) {
                log.warn('No extension ID specified (it will be auto-generated)');
              }

              _context.next = 25;
              return signAddon({
                apiKey: apiKey,
                apiSecret: apiSecret,
                apiUrlPrefix: apiUrlPrefix,
                apiProxy: apiProxy,
                timeout: timeout,
                verbose: verbose,
                id: id,
                xpiPath: buildResult.extensionPath,
                version: manifestData.version,
                downloadDir: artifactsDir
              });

            case 25:
              signingResult = _context.sent;

              if (!signingResult.id) {
                _context.next = 29;
                break;
              }

              _context.next = 29;
              return saveIdToSourceDir(sourceDir, signingResult.id);

            case 29:
              if (!signingResult.success) {
                _context.next = 34;
                break;
              }

              log.info('Extension ID: ' + signingResult.id);
              log.info('SUCCESS');
              _context.next = 36;
              break;

            case 34:
              log.info('FAIL');
              throw new _errors.WebExtError('The WebExtension could not be signed');

            case 36:
              return _context.abrupt('return', signingResult);

            case 37:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/cmd/sign.js"))

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installExtension = exports.copyProfile = exports.createProfile = exports.useProfile = exports.run = exports.defaultRemotePortFinder = exports.defaultFirefoxEnv = undefined;

var _extends2 = __webpack_require__(35);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(7);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(6);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var defaultRemotePortFinder = exports.defaultRemotePortFinder = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$portToTry = _ref2.portToTry,
        portToTry = _ref2$portToTry === undefined ? _remote.REMOTE_PORT : _ref2$portToTry,
        _ref2$retriesLeft = _ref2.retriesLeft,
        retriesLeft = _ref2$retriesLeft === undefined ? 10 : _ref2$retriesLeft,
        _ref2$connectToFirefo = _ref2.connectToFirefox,
        connectToFirefox = _ref2$connectToFirefo === undefined ? _remote2.default : _ref2$connectToFirefo;

    var client;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            log.debug('Checking if remote Firefox port ' + portToTry + ' is available');

            client = void 0;

          case 2:
            if (!(retriesLeft >= 0)) {
              _context.next = 20;
              break;
            }

            _context.prev = 3;
            _context.next = 6;
            return connectToFirefox(portToTry);

          case 6:
            client = _context.sent;

            log.debug('Remote Firefox port ' + portToTry + ' is in use ' + ('(retries remaining: ' + retriesLeft + ')'));
            _context.next = 15;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](3);

            if (!(0, _errors.isErrorWithCode)('ECONNREFUSED', _context.t0)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt('return', portToTry);

          case 14:
            throw _context.t0;

          case 15:

            client.disconnect();
            portToTry++;
            retriesLeft--;
            _context.next = 2;
            break;

          case 20:
            throw new _errors.WebExtError('Too many retries on port search');

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 10]]);
  }));

  return function defaultRemotePortFinder() {
    return _ref.apply(this, arguments);
  };
}();

// Declare the needed 'fx-runner' module flow types.

// Run command types and implementaion.

/*
 * Runs Firefox with the given profile object and resolves a promise on exit.
 */
var run = exports.run = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(profile) {
    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref4$fxRunner = _ref4.fxRunner,
        fxRunner = _ref4$fxRunner === undefined ? _fxRunner2.default : _ref4$fxRunner,
        _ref4$findRemotePort = _ref4.findRemotePort,
        findRemotePort = _ref4$findRemotePort === undefined ? defaultRemotePortFinder : _ref4$findRemotePort,
        firefoxBinary = _ref4.firefoxBinary,
        binaryArgs = _ref4.binaryArgs;

    var remotePort, results, firefox;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:

            log.debug('Running Firefox with profile at ' + profile.path());

            _context2.next = 3;
            return findRemotePort();

          case 3:
            remotePort = _context2.sent;
            _context2.next = 6;
            return fxRunner({
              // if this is falsey, fxRunner tries to find the default one.
              'binary': firefoxBinary,
              'binary-args': binaryArgs,
              // This ensures a new instance of Firefox is created. It has nothing
              // to do with the devtools remote debugger.
              'no-remote': true,
              'listen': remotePort,
              'foreground': true,
              'profile': profile.path(),
              'env': (0, _extends3.default)({}, process.env, defaultFirefoxEnv),
              'verbose': true
            });

          case 6:
            results = _context2.sent;
            firefox = results.process;


            log.debug('Executing Firefox binary: ' + results.binary);
            log.debug('Firefox args: ' + results.args.join(' '));

            firefox.on('error', function (error) {
              // TODO: show a nice error when it can't find Firefox.
              // if (/No such file/.test(err) || err.code === 'ENOENT') {
              log.error('Firefox error: ' + error);
              throw error;
            });

            log.info('Use --verbose or open Tools > Web Developer > Browser Console ' + 'to see logging');

            firefox.stderr.on('data', function (data) {
              log.debug('Firefox stderr: ' + data.toString().trim());
            });

            firefox.stdout.on('data', function (data) {
              log.debug('Firefox stdout: ' + data.toString().trim());
            });

            firefox.on('close', function () {
              log.debug('Firefox closed');
            });

            return _context2.abrupt('return', { firefox: firefox, debuggerPort: remotePort });

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function run(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

// configureProfile types and implementation.

// Use the target path as a Firefox profile without cloning it

var useProfile = exports.useProfile = function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(profilePath) {
    var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        app = _ref7.app,
        _ref7$configureThisPr = _ref7.configureThisProfile,
        configureThisProfile = _ref7$configureThisPr === undefined ? configureProfile : _ref7$configureThisPr,
        _ref7$customPrefs = _ref7.customPrefs,
        customPrefs = _ref7$customPrefs === undefined ? {} : _ref7$customPrefs;

    var profile;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            profile = new _firefoxProfile2.default({ destinationDirectory: profilePath });
            _context3.next = 3;
            return configureThisProfile(profile, { app: app, customPrefs: customPrefs });

          case 3:
            return _context3.abrupt('return', _context3.sent);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function useProfile(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

// createProfile types and implementation.

/*
 * Creates a new temporary profile and resolves with the profile object.
 *
 * The profile will be deleted when the system process exits.
 */
var createProfile = exports.createProfile = function () {
  var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
    var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        app = _ref9.app,
        _ref9$configureThisPr = _ref9.configureThisProfile,
        configureThisProfile = _ref9$configureThisPr === undefined ? configureProfile : _ref9$configureThisPr,
        _ref9$customPrefs = _ref9.customPrefs,
        customPrefs = _ref9$customPrefs === undefined ? {} : _ref9$customPrefs;

    var profile;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            profile = new _firefoxProfile2.default();
            _context4.next = 3;
            return configureThisProfile(profile, { app: app, customPrefs: customPrefs });

          case 3:
            return _context4.abrupt('return', _context4.sent);

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function createProfile() {
    return _ref8.apply(this, arguments);
  };
}();

// copyProfile types and implementation.

/*
 * Copies an existing Firefox profile and creates a new temporary profile.
 * The new profile will be configured with some preferences required to
 * activate extension development.
 *
 * It resolves with the new profile object.
 *
 * The temporary profile will be deleted when the system process exits.
 *
 * The existing profile can be specified as a directory path or a name of
 * one that exists in the current user's Firefox directory.
 */
var copyProfile = exports.copyProfile = function () {
  var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(profileDirectory) {
    var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        app = _ref11.app,
        _ref11$configureThisP = _ref11.configureThisProfile,
        configureThisProfile = _ref11$configureThisP === undefined ? configureProfile : _ref11$configureThisP,
        _ref11$copyFromUserPr = _ref11.copyFromUserProfile,
        copyFromUserProfile = _ref11$copyFromUserPr === undefined ? _firefoxProfile.copyFromUserProfile : _ref11$copyFromUserPr,
        _ref11$customPrefs = _ref11.customPrefs,
        customPrefs = _ref11$customPrefs === undefined ? {} : _ref11$customPrefs;

    var copy, copyByName, dirExists, _profile;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            copy = (0, _es6Promisify2.default)(_firefoxProfile2.default.copy);
            copyByName = (0, _es6Promisify2.default)(copyFromUserProfile);
            _context5.prev = 2;
            _context5.next = 5;
            return (0, _isDirectory2.default)(profileDirectory);

          case 5:
            dirExists = _context5.sent;
            _profile = void 0;

            if (!dirExists) {
              _context5.next = 14;
              break;
            }

            log.debug('Copying profile directory from "' + profileDirectory + '"');
            _context5.next = 11;
            return copy({ profileDirectory: profileDirectory });

          case 11:
            _profile = _context5.sent;
            _context5.next = 18;
            break;

          case 14:
            log.debug('Assuming ' + profileDirectory + ' is a named profile');
            _context5.next = 17;
            return copyByName({ name: profileDirectory });

          case 17:
            _profile = _context5.sent;

          case 18:
            return _context5.abrupt('return', configureThisProfile(_profile, { app: app, customPrefs: customPrefs }));

          case 21:
            _context5.prev = 21;
            _context5.t0 = _context5['catch'](2);
            throw new _errors.WebExtError('Could not copy Firefox profile from ' + profileDirectory + ': ' + _context5.t0);

          case 24:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this, [[2, 21]]);
  }));

  return function copyProfile(_x8) {
    return _ref10.apply(this, arguments);
  };
}();

// installExtension types and implementation.

/*
 * Installs an extension into the given Firefox profile object.
 * Resolves when complete.
 *
 * The extension is copied into a special location and you need to turn
 * on some preferences to allow this. See extensions.autoDisableScopes in
 * ./preferences.js.
 *
 * When asProxy is true, a special proxy file will be installed. This is a
 * text file that contains the path to the extension source.
 */
var installExtension = exports.installExtension = function () {
  var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_ref13) {
    var _ref13$asProxy = _ref13.asProxy,
        asProxy = _ref13$asProxy === undefined ? false : _ref13$asProxy,
        manifestData = _ref13.manifestData,
        profile = _ref13.profile,
        extensionPath = _ref13.extensionPath;

    var id, isDir, destPath, writeStream, readStream, _destPath, _writeStream;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (profile.extensionsDir) {
              _context6.next = 2;
              break;
            }

            throw new _errors.WebExtError('profile.extensionsDir was unexpectedly empty');

          case 2:
            _context6.prev = 2;
            _context6.next = 5;
            return _mz.fs.stat(profile.extensionsDir);

          case 5:
            _context6.next = 16;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6['catch'](2);

            if (!(0, _errors.isErrorWithCode)('ENOENT', _context6.t0)) {
              _context6.next = 15;
              break;
            }

            log.debug('Creating extensions directory: ' + profile.extensionsDir);
            _context6.next = 13;
            return _mz.fs.mkdir(profile.extensionsDir);

          case 13:
            _context6.next = 16;
            break;

          case 15:
            throw _context6.t0;

          case 16:
            id = (0, _manifest.getManifestId)(manifestData);

            if (id) {
              _context6.next = 19;
              break;
            }

            throw new _errors.UsageError('An explicit extension ID is required when installing to ' + 'a profile (applications.gecko.id not found in manifest.json)');

          case 19:
            if (!asProxy) {
              _context6.next = 35;
              break;
            }

            log.debug('Installing as an extension proxy; source: ' + extensionPath);

            _context6.next = 23;
            return (0, _isDirectory2.default)(extensionPath);

          case 23:
            isDir = _context6.sent;

            if (isDir) {
              _context6.next = 26;
              break;
            }

            throw new _errors.WebExtError('proxy install: extensionPath must be the extension source ' + ('directory; got: ' + extensionPath));

          case 26:

            // Write a special extension proxy file containing the source
            // directory. See:
            // https://developer.mozilla.org/en-US/Add-ons/Setting_up_extension_development_environment#Firefox_extension_proxy_file
            destPath = _path2.default.join(profile.extensionsDir, '' + id);
            writeStream = _fs2.default.createWriteStream(destPath);

            writeStream.write(extensionPath);
            writeStream.end();
            _context6.next = 32;
            return (0, _eventToPromise2.default)(writeStream, 'close');

          case 32:
            return _context6.abrupt('return', _context6.sent);

          case 35:
            // Write the XPI file to the profile.
            readStream = _fs2.default.createReadStream(extensionPath);
            _destPath = _path2.default.join(profile.extensionsDir, id + '.xpi');
            _writeStream = _fs2.default.createWriteStream(_destPath);


            log.debug('Installing extension from ' + extensionPath + ' to ' + _destPath);
            readStream.pipe(_writeStream);

            _context6.next = 42;
            return Promise.all([(0, _eventToPromise2.default)(readStream, 'close'), (0, _eventToPromise2.default)(_writeStream, 'close')]);

          case 42:
            return _context6.abrupt('return', _context6.sent);

          case 43:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[2, 7]]);
  }));

  return function installExtension(_x10) {
    return _ref12.apply(this, arguments);
  };
}();

exports.configureProfile = configureProfile;

var _fs = __webpack_require__(33);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(19);

var _path2 = _interopRequireDefault(_path);

var _fxRunner = __webpack_require__(146);

var _fxRunner2 = _interopRequireDefault(_fxRunner);

var _firefoxProfile = __webpack_require__(145);

var _firefoxProfile2 = _interopRequireDefault(_firefoxProfile);

var _mz = __webpack_require__(18);

var _es6Promisify = __webpack_require__(32);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _eventToPromise = __webpack_require__(69);

var _eventToPromise2 = _interopRequireDefault(_eventToPromise);

var _isDirectory = __webpack_require__(80);

var _isDirectory2 = _interopRequireDefault(_isDirectory);

var _errors = __webpack_require__(4);

var _preferences = __webpack_require__(50);

var _manifest = __webpack_require__(24);

var _logger = __webpack_require__(0);

var _remote = __webpack_require__(51);

var _remote2 = _interopRequireDefault(_remote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import flow types
var log = (0, _logger.createLogger)(__filename);
var defaultFirefoxEnv = exports.defaultFirefoxEnv = {
  XPCOM_DEBUG_BREAK: 'stack',
  NS_TRACE_MALLOC_DISABLE_STACKS: '1'
};

// defaultRemotePortFinder types and implementation.

/*
 * Configures a profile with common preferences that are required to
 * activate extension development.
 *
 * Returns a promise that resolves with the original profile object.
 */
function configureProfile(profile) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$app = _ref5.app,
      app = _ref5$app === undefined ? 'firefox' : _ref5$app,
      _ref5$getPrefs = _ref5.getPrefs,
      getPrefs = _ref5$getPrefs === undefined ? _preferences.getPrefs : _ref5$getPrefs,
      _ref5$customPrefs = _ref5.customPrefs,
      customPrefs = _ref5$customPrefs === undefined ? {} : _ref5$customPrefs;

  // Set default preferences. Some of these are required for the add-on to
  // operate, such as disabling signatures.
  var prefs = getPrefs(app);
  Object.keys(prefs).forEach(function (pref) {
    profile.setPreference(pref, prefs[pref]);
  });
  if (Object.keys(customPrefs).length > 0) {
    var customPrefsStr = JSON.stringify(customPrefs, null, 2);
    log.info('Setting custom Firefox preferences: ' + customPrefsStr);
    Object.keys(customPrefs).forEach(function (custom) {
      profile.setPreference(custom, customPrefs[custom]);
    });
  }
  profile.updatePreferences();
  return Promise.resolve(profile);
}

// useProfile types and implementation.
/* WEBPACK VAR INJECTION */}.call(exports, "src/firefox/index.js"))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = undefined;

var _program = __webpack_require__(71);

exports.main = _program.main;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showDesktopNotification = showDesktopNotification;

var _nodeNotifier = __webpack_require__(151);

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultLog = (0, _logger.createLogger)(__filename);

function showDesktopNotification(_ref) {
  var title = _ref.title,
      message = _ref.message,
      icon = _ref.icon;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$notifier = _ref2.notifier,
      notifier = _ref2$notifier === undefined ? _nodeNotifier2.default : _ref2$notifier,
      _ref2$log = _ref2.log,
      log = _ref2$log === undefined ? defaultLog : _ref2$log;

  return new Promise(function (resolve, reject) {
    notifier.notify({ title: title, message: message, icon: icon }, function (err, res) {
      if (err) {
        log.debug('Desktop notifier error: ' + err.message + ',' + (' response: ' + res));
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/desktop-notifier.js"))

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDirectory;

var _mz = __webpack_require__(18);

var _errors = __webpack_require__(4);

/*
 * Resolves true if the path is a readable directory.
 *
 * Usage:
 *
 * isDirectory('/some/path')
 *  .then((dirExists) => {
 *    // dirExists will be true or false.
 *  });
 *
 * */
function isDirectory(path) {
  return _mz.fs.stat(path).then(function (stats) {
    return stats.isDirectory();
  }).catch((0, _errors.onlyErrorsWithCode)(['ENOENT', 'ENOTDIR'], function () {
    return false;
  }));
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TempDir = undefined;

var _slicedToArray2 = __webpack_require__(54);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(10);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.withTempDir = withTempDir;

var _tmp = __webpack_require__(156);

var _tmp2 = _interopRequireDefault(_tmp);

var _es6Promisify = __webpack_require__(32);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _logger = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger.createLogger)(__filename);

/*
 * Work with a self-destructing temporary directory in a promise chain.
 *
 * The directory will be destroyed when the promise chain is finished
 * (whether there was an error or not).
 *
 * Usage:
 *
 * withTempDir(
 *   (tmpDir) =>
 *     doSomething(tmpDir.path())
 *     .then(...)
 * );
 *
 */

function withTempDir(makePromise) {
  var tmpDir = new TempDir();
  return tmpDir.create().then(function () {
    return makePromise(tmpDir);
  }).catch(tmpDir.errorHandler()).then(tmpDir.successHandler());
}

/*
 * Work with a self-destructing temporary directory object.
 *
 * It is safer to use withTempDir() instead but if you know
 * what you're doing you can use it directly like:
 *
 * let tmpDir = new TempDir();
 * tmpDir.create()
 *   .then(() => {
 *     // work with tmpDir.path()
 *   })
 *   .catch(tmpDir.errorHandler())
 *   .then(tmpDir.successHandler());
 *
 */

var TempDir = exports.TempDir = function () {
  function TempDir() {
    (0, _classCallCheck3.default)(this, TempDir);

    this._path = undefined;
    this._removeTempDir = undefined;
  }

  /*
   * Returns a promise that is fulfilled when the temp directory has
   * been created.
   */


  (0, _createClass3.default)(TempDir, [{
    key: 'create',
    value: function create() {
      var _this = this;

      var createTempDir = (0, _es6Promisify2.default)(_tmp2.default.dir, { multiArgs: true });
      return createTempDir({
        prefix: 'tmp-web-ext-',
        // This allows us to remove a non-empty tmp dir.
        unsafeCleanup: true
      }).then(function (args) {
        var _args = (0, _slicedToArray3.default)(args, 2),
            tmpPath = _args[0],
            removeTempDir = _args[1];

        _this._path = tmpPath;
        _this._removeTempDir = removeTempDir;
        log.debug('Created temporary directory: ' + _this.path());
        return _this;
      });
    }

    /*
     * Get the absolute path of the temp directory.
     */

  }, {
    key: 'path',
    value: function path() {
      if (!this._path) {
        throw new Error('You cannot access path() before calling create()');
      }
      return this._path;
    }

    /*
     * Returns a callback that will catch an error, remove
     * the temporary directory, and throw the error.
     *
     * This is intended for use in a promise like
     * Promise().catch(tmp.errorHandler())
     */

  }, {
    key: 'errorHandler',
    value: function errorHandler() {
      var _this2 = this;

      return function (error) {
        _this2.remove();
        throw error;
      };
    }

    /*
     * Returns a callback that will remove the temporary direcotry.
     *
     * This is intended for use in a promise like
     * Promise().then(tmp.successHandler())
     */

  }, {
    key: 'successHandler',
    value: function successHandler() {
      var _this3 = this;

      return function (promiseResult) {
        _this3.remove();
        return promiseResult;
      };
    }

    /*
     * Remove the temp directory.
     */

  }, {
    key: 'remove',
    value: function remove() {
      if (!this._removeTempDir) {
        return;
      }
      log.debug('Removing temporary directory: ' + this.path());
      this._removeTempDir && this._removeTempDir();
    }
  }]);
  return TempDir;
}();
/* WEBPACK VAR INJECTION */}.call(exports, "src/util/temp-dir.js"))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForUpdates = checkForUpdates;

var _updateNotifier = __webpack_require__(158);

var _updateNotifier2 = _interopRequireDefault(_updateNotifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkForUpdates(_ref) {
  var version = _ref.version,
      _ref$updateNotifier = _ref.updateNotifier,
      updateNotifier = _ref$updateNotifier === undefined ? _updateNotifier2.default : _ref$updateNotifier;

  var pkg = { name: 'web-ext', version: version };

  updateNotifier({
    pkg: pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 3 }).notify();
}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipDir = undefined;

var _zipDir = __webpack_require__(161);

var _zipDir2 = _interopRequireDefault(_zipDir);

var _es6Promisify = __webpack_require__(32);

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var zipDir = exports.zipDir = (0, _es6Promisify2.default)(_zipDir2.default);

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(97), __esModule: true };

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(98), __esModule: true };

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(89);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(87);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(55);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(55);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
__webpack_require__(30);
module.exports = __webpack_require__(129);

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
__webpack_require__(30);
module.exports = __webpack_require__(130);

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(132);
module.exports = __webpack_require__(2).Object.assign;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(133);
var $Object = __webpack_require__(2).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(134);
var $Object = __webpack_require__(2).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(135);
module.exports = __webpack_require__(2).Object.setPrototypeOf;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);
__webpack_require__(30);
__webpack_require__(31);
__webpack_require__(136);
module.exports = __webpack_require__(2).Promise;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(137);
__webpack_require__(68);
__webpack_require__(138);
__webpack_require__(139);
module.exports = __webpack_require__(2).Symbol;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30);
__webpack_require__(31);
module.exports = __webpack_require__(48).f('iterator');

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(14)
  , toLength  = __webpack_require__(65)
  , toIndex   = __webpack_require__(128);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(23)
  , gOPS    = __webpack_require__(42)
  , pIE     = __webpack_require__(26);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(21)
  , call        = __webpack_require__(112)
  , isArrayIter = __webpack_require__(110)
  , anObject    = __webpack_require__(5)
  , toLength    = __webpack_require__(65)
  , getIterFn   = __webpack_require__(67)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 109 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(17)
  , ITERATOR   = __webpack_require__(1)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(20);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(41)
  , descriptor     = __webpack_require__(27)
  , setToStringTag = __webpack_require__(28)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(13)(IteratorPrototype, __webpack_require__(1)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(1)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(23)
  , toIObject = __webpack_require__(14);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(29)('meta')
  , isObject = __webpack_require__(16)
  , has      = __webpack_require__(12)
  , setDesc  = __webpack_require__(9).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(22)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(3)
  , macrotask = __webpack_require__(64).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(20)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(23)
  , gOPS     = __webpack_require__(42)
  , pIE      = __webpack_require__(26)
  , toObject = __webpack_require__(66)
  , IObject  = __webpack_require__(58)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(22)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(9)
  , anObject = __webpack_require__(5)
  , getKeys  = __webpack_require__(23);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(14)
  , gOPN      = __webpack_require__(61).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(12)
  , toObject    = __webpack_require__(66)
  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(13);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(16)
  , anObject = __webpack_require__(5);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(21)(Function.call, __webpack_require__(60).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(3)
  , core        = __webpack_require__(2)
  , dP          = __webpack_require__(9)
  , DESCRIPTORS = __webpack_require__(8)
  , SPECIES     = __webpack_require__(1)('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(5)
  , aFunction = __webpack_require__(36)
  , SPECIES   = __webpack_require__(1)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(45)
  , defined   = __webpack_require__(38);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(45)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5)
  , get      = __webpack_require__(67);
module.exports = __webpack_require__(2).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(37)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(17);
module.exports = __webpack_require__(2).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(104)
  , step             = __webpack_require__(115)
  , Iterators        = __webpack_require__(17)
  , toIObject        = __webpack_require__(14);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(59)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(11);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(119)});

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(11)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(41)});

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(11);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', {defineProperty: __webpack_require__(9).f});

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(11);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(124).set});

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(25)
  , global             = __webpack_require__(3)
  , ctx                = __webpack_require__(21)
  , classof            = __webpack_require__(37)
  , $export            = __webpack_require__(11)
  , isObject           = __webpack_require__(16)
  , aFunction          = __webpack_require__(36)
  , anInstance         = __webpack_require__(105)
  , forOf              = __webpack_require__(108)
  , speciesConstructor = __webpack_require__(126)
  , task               = __webpack_require__(64).set
  , microtask          = __webpack_require__(118)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(123)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(28)($Promise, PROMISE);
__webpack_require__(125)(PROMISE);
Wrapper = __webpack_require__(2)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(114)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(3)
  , has            = __webpack_require__(12)
  , DESCRIPTORS    = __webpack_require__(8)
  , $export        = __webpack_require__(11)
  , redefine       = __webpack_require__(63)
  , META           = __webpack_require__(117).KEY
  , $fails         = __webpack_require__(22)
  , shared         = __webpack_require__(44)
  , setToStringTag = __webpack_require__(28)
  , uid            = __webpack_require__(29)
  , wks            = __webpack_require__(1)
  , wksExt         = __webpack_require__(48)
  , wksDefine      = __webpack_require__(47)
  , keyOf          = __webpack_require__(116)
  , enumKeys       = __webpack_require__(107)
  , isArray        = __webpack_require__(111)
  , anObject       = __webpack_require__(5)
  , toIObject      = __webpack_require__(14)
  , toPrimitive    = __webpack_require__(46)
  , createDesc     = __webpack_require__(27)
  , _create        = __webpack_require__(41)
  , gOPNExt        = __webpack_require__(121)
  , $GOPD          = __webpack_require__(60)
  , $DP            = __webpack_require__(9)
  , $keys          = __webpack_require__(23)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(61).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(26).f  = $propertyIsEnumerable;
  __webpack_require__(42).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(25)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47)('asyncIterator');

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47)('observable');

/***/ }),
/* 140 */
/***/ (function(module, exports) {

module.exports = require("addons-linter");

/***/ }),
/* 141 */
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),
/* 142 */
/***/ (function(module, exports) {

module.exports = require("camelcase");

/***/ }),
/* 143 */
/***/ (function(module, exports) {

module.exports = require("debounce");

/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports = require("es6-error");

/***/ }),
/* 145 */
/***/ (function(module, exports) {

module.exports = require("firefox-profile");

/***/ }),
/* 146 */
/***/ (function(module, exports) {

module.exports = require("fx-runner");

/***/ }),
/* 147 */
/***/ (function(module, exports) {

module.exports = require("git-rev-sync");

/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports = require("minimatch");

/***/ }),
/* 149 */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),
/* 150 */
/***/ (function(module, exports) {

module.exports = require("node-firefox-connect");

/***/ }),
/* 151 */
/***/ (function(module, exports) {

module.exports = require("node-notifier");

/***/ }),
/* 152 */
/***/ (function(module, exports) {

module.exports = require("open");

/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 155 */
/***/ (function(module, exports) {

module.exports = require("sign-addon");

/***/ }),
/* 156 */
/***/ (function(module, exports) {

module.exports = require("tmp");

/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 158 */
/***/ (function(module, exports) {

module.exports = require("update-notifier");

/***/ }),
/* 159 */
/***/ (function(module, exports) {

module.exports = require("watchpack");

/***/ }),
/* 160 */
/***/ (function(module, exports) {

module.exports = require("yargs");

/***/ }),
/* 161 */
/***/ (function(module, exports) {

module.exports = require("zip-dir");

/***/ })
/******/ ]);
//# sourceMappingURL=web-ext.js.map