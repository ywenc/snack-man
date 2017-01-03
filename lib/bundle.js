/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _game_view = __webpack_require__(14);
	
	var _game_view2 = _interopRequireDefault(_game_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasElement = document.getElementsByTagName('canvas')[0];
	  canvasElement.width = 600;
	  canvasElement.height = 800;
	
	  var ctx = canvasElement.getContext('2d');
	  var game = new _game2.default();
	  new _game_view2.default(game, ctx).start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _snackman = __webpack_require__(2);
	
	var _snackman2 = _interopRequireDefault(_snackman);
	
	var _g = __webpack_require__(5);
	
	var _g2 = _interopRequireDefault(_g);
	
	var _g3 = __webpack_require__(7);
	
	var _g4 = _interopRequireDefault(_g3);
	
	var _g5 = __webpack_require__(8);
	
	var _g6 = _interopRequireDefault(_g5);
	
	var _g7 = __webpack_require__(9);
	
	var _g8 = _interopRequireDefault(_g7);
	
	var _map = __webpack_require__(10);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _maze = __webpack_require__(12);
	
	var _maze2 = _interopRequireDefault(_maze);
	
	var _maze3 = __webpack_require__(13);
	
	var _maze4 = _interopRequireDefault(_maze3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.lives = 3;
	    this.border = 24;
	    this.dimX = 552;
	    this.dimY = 600;
	    this.spriteHeight = 12;
	    this.lvlMap = new _map2.default(this, _maze4.default);
	    this.snackman = [new _snackman2.default(this)];
	    this.ghosts = [].concat(new _g4.default(this)); //, new g1(this), new g3(this), new g4(this));
	  }
	
	  _createClass(Game, [{
	    key: 'mapCenter',
	    value: function mapCenter() {
	      return this.lvlMap.mazeNodes[10][0].centerPos()[1];
	    }
	  }, {
	    key: 'allMovingObjects',
	    value: function allMovingObjects() {
	      return [].concat(this.snackman, this.ghosts);
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.clearRect(this.border, this.border, this.dimX, this.dimY);
	      ctx.fillStyle = "#1a1a1a";
	      ctx.fillRect(this.border, this.border, this.dimX, this.dimY);
	
	      this.lvlMap.drawMaze(ctx);
	      this.allMovingObjects().forEach(function (obj) {
	        obj.draw(ctx);
	      });
	    }
	  }, {
	    key: 'deathScreen',
	    value: function deathScreen(ctx) {
	      ctx.clearRect(this.border, this.border, this.dimX, this.dimY);
	      ctx.fillStyle = 'black';
	      ctx.fillRect(this.border, this.border, this.dimX, this.dimY);
	    }
	  }, {
	    key: 'reset',
	    value: function reset(ctx) {
	      ctx.clearRect(this.border, this.border, this.dimX, this.dimY);
	      ctx.fillStyle = '#ffffff';
	      ctx.fillRect(this.border, this.border, this.dimX, this.dimY);
	
	      this.allMovingObjects().forEach(function (obj) {
	        obj.reset();
	      });
	    }
	  }, {
	    key: 'moveObjects',
	    value: function moveObjects() {
	      this.allMovingObjects().forEach(function (obj) {
	        obj.move();
	      });
	    }
	  }, {
	    key: 'checkTouching',
	    value: function checkTouching() {
	      var _this = this;
	
	      var touching = false;
	
	      this.ghosts.forEach(function (ghost) {
	        if (ghost.isTouching(_this.snackman[0])) {
	          touching = true;
	          _this.lives -= 1;
	        }
	      });
	
	      return touching;
	    }
	  }, {
	    key: 'isOutOfBounds',
	    value: function isOutOfBounds(pos) {
	      return pos[0] < this.border || pos[1] < this.border || pos[0] > this.xBounds || pos[1] > this.yBounds;
	    }
	
	    // remainingLives() {
	    //   for (x = this.lives; x )
	    //
	    //   ctx.fillStyle = '#ffffff';
	    //   const r = this.snackman.radius;
	    //   ctx.beginPath();
	    //   ctx.arc(Game.border,
	    //     (Game.dimY + 10),
	    //     this.snackman.radius,
	    //     0, 2 * Math.PI, true);
	    //   ctx.fill();
	    //   ctx.fillStyle = "black";
	    //   ctx.beginPath();
	    //   ctx.moveTo(x - 1, y);
	    //   ctx.lineTo(x + 11, y - 3.5);
	    //   ctx.lineTo(x + 11, y);
	    //   ctx.fill();
	    // }
	
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(3);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _util = __webpack_require__(4);
	
	var Util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SnackMan = function (_MovingObject) {
	  _inherits(SnackMan, _MovingObject);
	
	  function SnackMan(game) {
	    _classCallCheck(this, SnackMan);
	
	    var _this = _possibleConstructorReturn(this, (SnackMan.__proto__ || Object.getPrototypeOf(SnackMan)).call(this, game, [16, 10]));
	
	    _this.color = '#fffac1';
	    _this.pos = _this.node([16, 10]).centerPos();
	    _this.radius = game.spriteHeight - 1;
	    _this.mouthOpen = true;
	    _this.dir = "left";
	    _this.nextDir = "left";
	    return _this;
	  }
	
	  _createClass(SnackMan, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      if (this.mouthOpen) {
	        this.openMouth(ctx);
	      } else {
	        this.closeMouth(ctx);
	      }
	
	      this.mouthOpen = !this.mouthOpen;
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.pos = this.node([16, 10]).centerPos();
	      this.mouthOpen = true;
	      this.dir = "right";
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      this.checkDir();
	      var newLoc = Util.checkNewLoc(this.location, this.dir);
	
	      if (this.node(newLoc).snackmanPassageway()) {
	        this.pos = this.node(newLoc).centerPos();
	        this.location = newLoc;
	        this.node(newLoc).visited = true;
	      }
	    }
	  }, {
	    key: 'logNextDir',
	    value: function logNextDir(dir) {
	      this.nextDir = dir;
	    }
	  }, {
	    key: 'checkDir',
	    value: function checkDir() {
	      var _location = _slicedToArray(this.location, 2),
	          row = _location[0],
	          col = _location[1];
	
	      var potentialLoc = void 0;
	
	      var newLoc = Util.checkNewLoc(this.location, this.nextDir);
	
	      if (this.node(newLoc).snackmanPassageway()) {
	        this.dir = this.nextDir;
	      }
	    }
	  }, {
	    key: 'openMouth',
	    value: function openMouth(ctx, mouth, eye) {
	      var x = this.pos[0];
	      var y = this.pos[1];
	      var r = this.radius;
	
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	      ctx.arc(x, y, r, 0, 2 * Math.PI, true);
	      ctx.fill();
	
	      ctx.fillStyle = "#1a1a1a";
	      ctx.beginPath();
	      switch (this.dir) {
	        case "right":
	          ctx.moveTo(x - 1, y);
	          ctx.arc(x - 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          ctx.moveTo(x, y);
	          ctx.lineTo(x + this.radius, y - 6.5);
	          ctx.lineTo(x + this.radius, y);
	          break;
	        case "left":
	          ctx.moveTo(x + 1, y);
	          ctx.arc(x + 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          ctx.moveTo(x, y);
	          ctx.lineTo(x - this.radius, y - 6.5);
	          ctx.lineTo(x - this.radius, y);
	          break;
	        case "down":
	          ctx.moveTo(x, y - 1);
	          ctx.arc(x + 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          ctx.moveTo(x, y);
	          ctx.lineTo(x - 2, y + this.radius);
	          ctx.lineTo(x + 6.5, y + this.radius);
	          break;
	        case "up":
	          ctx.moveTo(x, y + 1);
	          ctx.arc(x + 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          ctx.moveTo(x, y);
	          ctx.lineTo(x + 2, y - this.radius);
	          ctx.lineTo(x - 6.5, y - this.radius);
	          break;
	        default:
	          console.log(":(");
	      }
	      ctx.fill();
	    }
	  }, {
	    key: 'closeMouth',
	    value: function closeMouth(ctx, mouth, eye) {
	      var x = this.pos[0];
	      var y = this.pos[1];
	      var r = this.radius;
	
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	      ctx.arc(x, y, r, 0, 2 * Math.PI, true);
	      ctx.fill();
	
	      ctx.fillStyle = "#1a1a1a";
	      ctx.beginPath();
	      switch (this.dir) {
	        case "right":
	          ctx.moveTo(x - 1, y);
	          ctx.arc(x - 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          break;
	        case "left":
	          ctx.moveTo(x + 1, y);
	          ctx.arc(x + 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          break;
	        case "down":
	          ctx.moveTo(x, y - 1);
	          ctx.arc(x + 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          break;
	        case "up":
	          ctx.moveTo(x, y + 1);
	          ctx.arc(x + 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          break;
	        default:
	          console.log(":(");
	      }
	
	      ctx.fill();
	    }
	  }]);
	
	  return SnackMan;
	}(_moving_object2.default);
	
	exports.default = SnackMan;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MovingObject = function () {
	  function MovingObject(game, location) {
	    _classCallCheck(this, MovingObject);
	
	    this.vel = [1, 1];
	    this.game = game;
	    this.location = location;
	    this.isWrappable = false;
	    this.mazeNodes = game.lvlMap.mazeNodes;
	  }
	
	  _createClass(MovingObject, [{
	    key: 'node',
	    value: function node(loc) {
	      var _loc = _slicedToArray(loc, 2),
	          row = _loc[0],
	          col = _loc[1];
	
	      return this.mazeNodes[row][col];
	    }
	  }, {
	    key: 'isTouching',
	    value: function isTouching(obj) {
	      return Math.abs(this.pos[0] - obj.pos[0]) <= this.radius + obj.radius && this.pos[1] === obj.pos[1] || Math.abs(this.pos[1] - obj.pos[1]) <= this.radius + obj.radius && this.pos[0] === obj.pos[0];
	    }
	  }, {
	    key: 'nearbySqs',
	    value: function nearbySqs(location) {
	      var row = location[0];
	      var col = location[1];
	
	      var maxRowIdx = this.mazeNodes[0].length - 1;
	
	      return [[row + 1, col], [row, (col + 1) % 21], [row - 1, col], [row, (col - 1) % 21]];
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	exports.default = MovingObject;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var checkNewLoc = exports.checkNewLoc = function checkNewLoc(location, direction) {
	  var _location = _slicedToArray(location, 2),
	      row = _location[0],
	      col = _location[1];
	
	  var newLoc = void 0;
	
	  switch (direction) {
	    case "right":
	      newLoc = [row, (col + 1) % 21];
	      break;
	    case "left":
	      if (col - 1 < 0) {
	        newLoc = [row, 20];
	      } else {
	        newLoc = [row, col - 1];
	      }
	      break;
	    case "up":
	      newLoc = [row - 1, col];
	      break;
	    case "down":
	      newLoc = [row + 1, col];
	      break;
	    default:
	      console.log(':(');
	  }
	
	  return newLoc;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ghost = __webpack_require__(6);
	
	var _ghost2 = _interopRequireDefault(_ghost);
	
	var _util = __webpack_require__(4);
	
	var Util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//stupid ghost
	
	var g1 = function (_Ghost) {
	  _inherits(g1, _Ghost);
	
	  function g1(game) {
	    _classCallCheck(this, g1);
	
	    var _this = _possibleConstructorReturn(this, (g1.__proto__ || Object.getPrototypeOf(g1)).call(this, game, [8, 10]));
	
	    _this.color = '#f79a7e';
	    _this.pos = _this.node([8, 10]).centerPos();
	    _this.dir = "up";
	    return _this;
	  }
	
	  _createClass(g1, [{
	    key: 'move',
	    value: function move() {
	      var newLoc = Util.checkNewLoc(this.location, this.dir);
	      if (this.node(newLoc).ghostPassageway()) {
	        this.pos = this.node(newLoc).centerPos();
	        this.location = newLoc;
	      } else {
	        this.changeDir(this.dir);
	      }
	    }
	  }, {
	    key: 'changeDir',
	    value: function changeDir(dir) {
	      var newDirs = void 0;
	      switch (dir) {
	        case 'left':
	        case 'right':
	          newDirs = ['up', 'down'];
	          break;
	        case 'up':
	        case 'down':
	          newDirs = ['left', 'right'];
	          break;
	        default:
	          console.log(':C');
	      }
	
	      this.dir = newDirs[Math.floor(Math.random() * 2)];
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.location = [8, 10];
	      this.pos = this.node([8, 10]).centerPos();
	    }
	  }]);
	
	  return g1;
	}(_ghost2.default);
	
	exports.default = g1;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(3);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _util = __webpack_require__(4);
	
	var Util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ghost = function (_MovingObject) {
	  _inherits(Ghost, _MovingObject);
	
	  function Ghost(game, location) {
	    _classCallCheck(this, Ghost);
	
	    var _this = _possibleConstructorReturn(this, (Ghost.__proto__ || Object.getPrototypeOf(Ghost)).call(this, game, location));
	
	    _this.radius = game.spriteHeight - 1;
	    _this.snackman = _this.game.snackman[0];
	    _this.maze = _this.game.maze;
	    return _this;
	  }
	
	  _createClass(Ghost, [{
	    key: 'potentialMoves',
	    value: function potentialMoves(location) {
	      var _this2 = this;
	
	      return this.nearbySqs(location).filter(function (sq) {
	        return _this2.node(sq).ghostPassageway();
	      });
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      var x = this.pos[0];
	      var y = this.pos[1];
	      var r = this.radius;
	
	      ctx.fillStyle = this.color;
	
	      ctx.beginPath();
	      ctx.arc(x, y, r, 0, Math.PI, true);
	      ctx.lineTo(x - r, y + r);
	      ctx.lineTo(x - 2 / 3 * r, y + 2 / 3 * r);
	      ctx.lineTo(x - 1 / 3 * r, y + r);
	      ctx.lineTo(x, y + 2 / 3 * r);
	      ctx.lineTo(x + 1 / 3 * r, y + r);
	      ctx.lineTo(x + 2 / 3 * r, y + 2 / 3 * r);
	      ctx.lineTo(x + r, y + r);
	      ctx.fill();
	
	      ctx.fillStyle = "white";
	
	      ctx.beginPath();
	      ctx.arc(x - 7, y - 2, 2.1, 2 * Math.PI, 0, true);
	      ctx.arc(x + 5, y - 2, 2.1, 0, 2 * Math.PI, true);
	      ctx.fill();
	    }
	  }]);
	
	  return Ghost;
	}(_moving_object2.default);
	
	exports.default = Ghost;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ghost = __webpack_require__(6);
	
	var _ghost2 = _interopRequireDefault(_ghost);
	
	var _util = __webpack_require__(4);
	
	var Util = _interopRequireWildcard(_util);
	
	var _g = __webpack_require__(5);
	
	var _g2 = _interopRequireDefault(_g);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//bfs ghost
	
	var g2 = function (_Ghost) {
	  _inherits(g2, _Ghost);
	
	  function g2(game) {
	    _classCallCheck(this, g2);
	
	    var _this = _possibleConstructorReturn(this, (g2.__proto__ || Object.getPrototypeOf(g2)).call(this, game, [10, 9]));
	
	    _this.color = '#7a9175';
	    _this.pos = _this.node(_this.location).centerPos();
	    _this.visitedPostions = [_this.location];
	    _this.dir = 'up';
	
	    _this.buildMoveTree();
	    return _this;
	  }
	
	  _createClass(g2, [{
	    key: 'move',
	    value: function move() {
	      var newLoc = Util.checkNewLoc(this.location, this.dir);
	      if (this.node(newLoc).ghostPassageway()) {
	        this.pos = this.node(newLoc).centerPos();
	        this.location = newLoc;
	      } else {
	        this.findDir();
	      }
	    }
	  }, {
	    key: 'findDir',
	    value: function findDir() {
	      var nodeLoc = this.findSnackman().location;
	      var x = nodeLoc[0];
	      var y = nodeLoc[1];
	
	      switch (nodeLoc) {
	        case x < this.location[0]:
	          this.dir = 'left';
	          break;
	        case x > this.location[0]:
	          this.dir = 'right';
	          break;
	        case y < this.location[1]:
	          this.dir = 'up';
	          break;
	        case y > this.location[1]:
	          this.dir = 'down';
	          break;
	        default:
	          console.log(":C");
	      }
	    }
	  }, {
	    key: 'buildMoveTree',
	    value: function buildMoveTree() {
	      var _this2 = this;
	
	      var rootNode = this.node(this.location);
	      var nodes = [rootNode];
	      var currNode = void 0;
	      var currLoc = void 0;
	      var newNode = void 0;
	
	      while (nodes.length !== 0) {
	        currNode = nodes.shift();
	        currLoc = currNode.location;
	        var newMoves = this.potentialMoves(this.location).filter(function (el) {
	          return _this2.visitedPostions.indexOf(el) === -1;
	        });
	
	        this.visitedPostions = this.visitedPostions.concat(newMoves);
	        debugger;
	        newMoves.forEach(function (newMove) {
	          newNode = _this2.node(newMove);
	          currNode.addChild(newNode);
	          nodes.push(newNode);
	        });
	      }
	    }
	  }, {
	    key: 'findSnackman',
	    value: function findSnackman() {
	      var target = this.node(this.snackman.location);
	      var endNode = this.node(this.location).bfs(target);
	      var nodes = [];
	
	      var currentNode = endNode;
	      while (currentNode) {
	        nodes.push(currentNode);
	        currentNode = currentNode.parent;
	      }
	
	      return nodes[nodes.length - 1];
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.location = [10, 9];
	      this.pos = this.node([10, 9]).centerPos();
	    }
	  }]);
	
	  return g2;
	}(_ghost2.default);
	
	exports.default = g2;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ghost = __webpack_require__(6);
	
	var _ghost2 = _interopRequireDefault(_ghost);
	
	var _g = __webpack_require__(5);
	
	var _g2 = _interopRequireDefault(_g);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//euclidean ghost
	
	var g3 = function (_Ghost) {
	  _inherits(g3, _Ghost);
	
	  function g3(game) {
	    _classCallCheck(this, g3);
	
	    var _this = _possibleConstructorReturn(this, (g3.__proto__ || Object.getPrototypeOf(g3)).call(this, game, [10, 10]));
	
	    _this.color = '#917591';
	    _this.pos = _this.node([10, 10]).centerPos();
	    return _this;
	  }
	
	  _createClass(g3, [{
	    key: 'move',
	    value: function move() {}
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.location = [10, 10];
	      this.pos = this.node([10, 10]).centerPos();
	    }
	  }]);
	
	  return g3;
	}(_ghost2.default);
	
	exports.default = g3;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ghost = __webpack_require__(6);
	
	var _ghost2 = _interopRequireDefault(_ghost);
	
	var _util = __webpack_require__(4);
	
	var Util = _interopRequireWildcard(_util);
	
	var _g = __webpack_require__(5);
	
	var _g2 = _interopRequireDefault(_g);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//A* ghost
	
	var g4 = function (_Ghost) {
	  _inherits(g4, _Ghost);
	
	  function g4(game) {
	    _classCallCheck(this, g4);
	
	    var _this = _possibleConstructorReturn(this, (g4.__proto__ || Object.getPrototypeOf(g4)).call(this, game, [10, 11]));
	
	    _this.color = '#b3bdce';
	    _this.pos = _this.mazeNodes[10][11].centerPos();
	    return _this;
	  }
	
	  _createClass(g4, [{
	    key: 'move',
	    value: function move() {
	      // const offsetX = this.vel[0] * 1000/60;
	      // const offsetY = this.vel[1] * 1000/60;
	      // this.pos = [this.pos[0] + offsetX, this.pos[1]];
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.location = [10, 11];
	      this.pos = this.node([10, 11]).centerPos();
	    }
	  }]);
	
	  return g4;
	}(_ghost2.default);
	
	exports.default = g4;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _maze_node = __webpack_require__(11);
	
	var _maze_node2 = _interopRequireDefault(_maze_node);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Map = function () {
	  function Map(game, maze) {
	    _classCallCheck(this, Map);
	
	    this.game = game;
	    this.maze = maze;
	    this.mazeNodes = [];
	
	    this.setUpMaze();
	  }
	
	  _createClass(Map, [{
	    key: 'setUpMaze',
	    value: function setUpMaze() {
	      var spriteHeight = this.game.spriteHeight;
	      var xStart = 48;
	      var yStart = 48;
	
	      for (var x = 0; x < this.maze.length; x++) {
	        var row = [];
	        for (var y = 0; y < this.maze[0].length; y++) {
	          row.push(new _maze_node2.default([x, y], [xStart, yStart], this.maze[x][y], spriteHeight));
	
	          xStart += 2 * spriteHeight;
	        }
	        this.mazeNodes.push(row);
	        xStart = 48;
	        yStart += 2 * spriteHeight + 1;
	      }
	    }
	  }, {
	    key: 'drawMaze',
	    value: function drawMaze(ctx) {
	      this.mazeNodes.forEach(function (row) {
	        row.forEach(function (mazeNode) {
	          mazeNode.draw(ctx);
	        });
	      });
	    }
	  }]);
	
	  return Map;
	}();
	
	exports.default = Map;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var mazeNode = function () {
	  function mazeNode(location, pos, sym, spriteHeight) {
	    _classCallCheck(this, mazeNode);
	
	    this.location = location;
	    this.pos = pos;
	    this.spriteHeight = spriteHeight;
	    this.sym = sym;
	    this.visited = false;
	    this.children = [];
	    this.parent = null;
	  }
	
	  _createClass(mazeNode, [{
	    key: "addChild",
	    value: function addChild(child) {
	      child.setParent(this);
	    }
	  }, {
	    key: "removeChild",
	    value: function removeChild(child) {
	      if (child && this.children.indexOf(child) > -1) {
	        child.setParent(null);
	      }
	    }
	  }, {
	    key: "setParent",
	    value: function setParent(parent) {
	      if (this.parent) {
	        this.parent.children.splice(this.parent.children.indexOf(this), 1);
	      }
	
	      this.parent = parent;
	
	      if (this.parent) {
	        this.parent.children.push(this);
	      }
	
	      return this;
	    }
	  }, {
	    key: "bfs",
	    value: function bfs(target) {
	      var nodes = [this];
	      var node = void 0;
	      while (nodes.length !== 0) {
	        node = nodes.shift();
	        if (node === target) {
	          return node;
	        }
	
	        nodes = nodes.concat(node.children);
	      }
	    }
	  }, {
	    key: "sideL",
	    value: function sideL() {
	      return this.spriteHeight * 2 + 2;
	    }
	  }, {
	    key: "centerPos",
	    value: function centerPos() {
	      var x = this.pos[0];
	      var y = this.pos[1];
	
	      return [x + 1 / 2 * this.sideL(), y + 1 / 2 * this.sideL()];
	    }
	  }, {
	    key: "ghostPassageway",
	    value: function ghostPassageway() {
	      switch (this.sym) {
	        case ".":
	        case "O":
	        case "Q":
	          return true;
	        case "=":
	        case "x":
	        case "p":
	        case "P":
	          return false;
	        default:
	          return false;
	      }
	    }
	  }, {
	    key: "ghostDoor",
	    value: function ghostDoor() {
	      switch (this.sym) {
	        case "p":
	          return true;
	        default:
	          return false;
	      }
	    }
	  }, {
	    key: "snackmanPassageway",
	    value: function snackmanPassageway() {
	      switch (this.sym) {
	        case ".":
	        case "O":
	          return true;
	        case "=":
	        case "x":
	        case "Q":
	        case "p":
	        case "P":
	          return false;
	        default:
	          return false;
	      }
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      var x = this.pos[0];
	      var y = this.pos[1];
	      var sqHeight = this.spriteHeight * 2;
	      var spriteHeight = this.spriteHeight;
	
	      switch (this.sym) {
	        case "x":
	          ctx.beginPath();
	          ctx.fillStyle = "#1a1a1a";
	          ctx.fillRect(x + 1, y + 1, sqHeight + 2, sqHeight + 2);
	          break;
	        case "Q":
	          ctx.beginPath();
	          ctx.fillStyle = "#1a1a1a";
	          ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
	          break;
	        case "p":
	          ctx.beginPath();
	          var gradDoor = ctx.createLinearGradient(0, y, 0, y + sqHeight);
	          gradDoor.addColorStop(0.3, "#1a1a1a");
	          gradDoor.addColorStop(1, "#7c3953");
	          ctx.fillStyle = gradDoor;
	          ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
	          break;
	        case "P":
	          ctx.beginPath();
	          ctx.fillStyle = "#27F838";
	          ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
	          ctx.clearRect(x + 1, y + 1, sqHeight, sqHeight);
	          ctx.fillStyle = "black";
	          ctx.fillRect(x, y + 1, sqHeight, sqHeight);
	          break;
	        case "=":
	          ctx.beginPath();
	          ctx.fillStyle = "#27F838";
	          ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
	          ctx.clearRect(x + 1, y + 1, sqHeight, sqHeight);
	          ctx.fillStyle = "black";
	          ctx.fillRect(x + 1, y + 1, sqHeight, sqHeight);
	          break;
	        case "B":
	          ctx.beginPath();
	          ctx.fillStyle = "#27F838";
	          ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
	          ctx.clearRect(x + 1, y + 1, sqHeight, sqHeight);
	          ctx.fillStyle = "#1a1a1a";
	          ctx.fillRect(x + 1, y + 1, sqHeight, sqHeight);
	          break;
	        case ".":
	          ctx.beginPath();
	          ctx.fillStyle = "#1a1a1a";
	          ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
	
	          if (!this.visited) {
	            ctx.fillStyle = "white";
	            ctx.fillRect(x + 12, y + 12, 2, 2);
	            ctx.fill();
	          }
	          break;
	        case "O":
	          ctx.beginPath();
	          ctx.fillStyle = "#1a1a1a";
	          ctx.fillRect(x, y, sqHeight + 5, sqHeight + 5);
	
	          if (!this.visited) {
	            ctx.fillStyle = "white";
	            ctx.arc(x + spriteHeight, this.centerPos()[1], 4, 0, 2 * Math.PI, true);
	            ctx.fill();
	          }
	          break;
	        default:
	          console.log(':(');
	      }
	    }
	  }]);
	
	  return mazeNode;
	}();
	
	exports.default = mazeNode;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Maze0 = ["============================", "=............==............=", "=.====.=====.==.=====.====.=", "=.====.=====.==.=====.====.=", "=O====.=====.==.=====.====O=", "=..........................=", "=.====.==.========.==.====.=", "=.====.==.========.==.====.=", "=......==....==....==......=", "======.=====.==.=====.======", "xxxxx=.=====.==.=====.=xxxxx", "xxxxx=.==..........==.=xxxxx", "xxxxx=.==.===ppP==.==.=xxxxx", "======.==.=QQQQQQ=.==.======", "..........=QQQQQQ=..........", "======.==.=QQQQQQ=.==.======", "xxxxx=.==.========.==.=xxxxx", "xxxxx=.==..........==.=xxxxx", "xxxxx=.==.========.==.=xxxxx", "======.==.========.==.======", "=............==............=", "=.====.=====.==.=====.====.=", "=.====.=====.==.=====.====.=", "=O..==................==..O=", "===.==.==.========.==.==.===", "===.==.==.========.==.==.===", "=......==....==....==......=", "=.==========.==.==========.=", "=.==========.==.==========.=", "=..........................=", "============================"];
	
	exports.default = Maze0;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Maze1 = ["=====================", "=.........=.........=", "=.===.===.=.===.===.=", "=O===.===.=.===.===O=", "=...................=", "=.===.=.=====.=.===.=", "=.....=...=...=.....=", "=====.===.=.===.=====", "xxxx=.=.......=.=Bxxx", "=====.=.==pP=.=.=====", "........=QQQ=........", "=====.=.=====.=.=====", "xxxx=.=.......=.=Bxxx", "=====.=.=====.=.=====", "=.........=.........=", "=.===.===.=.===.===.=", "=O..=...........=..O=", "===.=.=.=====.=.=.===", "=.....=...=...=.....=", "=.=======.=.=======.=", "=...................=", "====================="];
	
	exports.default = Maze1;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameView = function () {
	  function GameView(game, ctx) {
	    _classCallCheck(this, GameView);
	
	    this.game = game;
	    this.ctx = ctx;
	
	    this.update = this.update.bind(this);
	  }
	
	  _createClass(GameView, [{
	    key: "update",
	    value: function update() {
	      this.game.moveObjects();
	      this.game.draw(this.ctx);
	      if (this.game.checkTouching() && this.game.lives > 0) {
	        this.game.reset(this.ctx);
	      } else if (this.game.checkTouching() && this.game.lives <= 0) {
	        this.game.deathScreen(this.ctx);
	      }
	    }
	  }, {
	    key: "bindKeyHandlers",
	    value: function bindKeyHandlers() {
	      var snackman = this.game.snackman[0];
	      Object.keys(GameView.MOVES).forEach(function (k) {
	        var dir = GameView.MOVES[k];
	        key(k, function () {
	          snackman.logNextDir(dir);
	        });
	      });
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      this.bindKeyHandlers();
	      setInterval(this.update, 120);
	    }
	  }]);
	
	  return GameView;
	}();
	
	GameView.MOVES = {
	  "w": "up",
	  "a": "left",
	  "s": "down",
	  "d": "right",
	  up: "up",
	  left: "left",
	  down: "down",
	  right: "right"
	};
	
	exports.default = GameView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map