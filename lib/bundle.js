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
	  new _game_view2.default(game, ctx).init();
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
	
	    this.lives = -1;
	    this.border = 24;
	    this.dimX = 552;
	    this.dimY = 625;
	    this.spriteHeight = 12;
	    this.lvlMap = new _map2.default(this, _maze4.default);
	    this.snackman = [new _snackman2.default(this)];
	    this.ghosts = [].concat([new _g4.default(this), new _g2.default(this), new _g6.default(this), new _g8.default(this)]);
	    this.eaten = 0;
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
	      this.remainingLives(ctx);
	
	      this.allMovingObjects().forEach(function (obj) {
	        obj.draw(ctx);
	      });
	    }
	  }, {
	    key: 'reset',
	    value: function reset(ctx) {
	      ctx.clearRect(this.border, this.border, this.dimX, this.dimY);
	      ctx.fillStyle = '#ffffff';
	      ctx.fillRect(this.border, this.border, this.dimX, this.dimY);
	      //
	      this.allMovingObjects().forEach(function (obj) {
	        obj.reset();
	      });
	    }
	  }, {
	    key: 'newMap',
	    value: function newMap() {
	      this.lives = 3;
	      this.resetLocs();
	      this.lvlMap.mazeNodes.forEach(function (arr) {
	        arr.forEach(function (node) {
	          return node.visited = false;
	        });
	      });
	    }
	  }, {
	    key: 'resetLocs',
	    value: function resetLocs() {
	      this.allMovingObjects().forEach(function (obj) {
	        obj.resetLoc();
	        obj.inJail = true;
	      });
	    }
	  }, {
	    key: 'moveObjects',
	    value: function moveObjects(ctx) {
	      this.allMovingObjects().forEach(function (obj) {
	        obj.move();
	      });
	    }
	  }, {
	    key: 'snackmanDead',
	    value: function snackmanDead() {
	      var _this = this;
	
	      var dead = false;
	
	      this.ghosts.forEach(function (ghost) {
	        if (_this.snackman[0].isTouching(ghost)) {
	          if (_this.snackman[0].invincible) {
	            ghost.inJail = true;
	            ghost.isEaten();
	          } else {
	            dead = true;
	          }
	        }
	      });
	
	      return dead;
	    }
	  }, {
	    key: 'checkWon',
	    value: function checkWon() {
	      return this.eaten === this.lvlMap.edibles;
	    }
	  }, {
	    key: 'isOutOfBounds',
	    value: function isOutOfBounds(pos) {
	      return pos[0] < this.border || pos[1] < this.border || pos[0] > this.xBounds || pos[1] > this.yBounds;
	    }
	  }, {
	    key: 'remainingLives',
	    value: function remainingLives(ctx) {
	      var r = this.snackman[0].radius;
	
	      for (var x = 0; x < this.lives; x++) {
	        ctx.fillStyle = '#fffac1';
	        ctx.beginPath();
	        ctx.arc(this.dimX - 2.5 * x * r - r, this.dimY, r, 0, 2 * Math.PI, true);
	        ctx.fill();
	        ctx.fillStyle = "#1a1a1a";
	        ctx.beginPath();
	        ctx.moveTo(this.dimX - 2.5 * x * r - r, this.dimY);
	        ctx.lineTo(this.dimX - 2.5 * x * r + 1, this.dimY - r);
	        ctx.lineTo(this.dimX - 2.5 * x * r + 1, this.dimY);
	        ctx.fill();
	      }
	    }
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
	    _this.invincible = false;
	    _this.timer = null;
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
	    key: 'resetLoc',
	    value: function resetLoc() {
	      this.location = [16, 10];
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      var _this2 = this;
	
	      this.checkDir();
	      var newLoc = Util.checkNewLoc(this.location, this.dir);
	
	      if (this.node(newLoc).snackmanPassageway()) {
	        this.pos = this.node(newLoc).centerPos();
	        this.location = newLoc;
	
	        if (this.node(newLoc).sym === "O" && !this.node(newLoc).visited) {
	          this.game.ghosts.forEach(function (ghost) {
	            _this2.invincible = true;
	            ghost.weak = true;
	            ghost.color = 'blue';
	            ghost.flashing = false;
	            ghost.flash = false;
	
	            setTimeout(function () {
	              ghost.flashing = true;
	            }, 3000);
	
	            _this2.timer = setTimeout(function () {
	              ghost.color = ghost.strColor;
	              ghost.weak = false;
	              ghost.flash = false;
	              ghost.flashing = false;
	              _this2.invincible = false;
	            }, 5000);
	          });
	        }
	
	        if (this.node(newLoc).visited === false) {
	          this.node(newLoc).visited = true;
	          this.game.eaten += 1;
	        }
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
	          ctx.arc(x - 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          ctx.moveTo(x, y);
	          ctx.lineTo(x + this.radius, y - 6.5);
	          ctx.lineTo(x + this.radius, y + 6.5);
	          break;
	        case "left":
	          ctx.arc(x + 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          ctx.moveTo(x, y);
	          ctx.lineTo(x - this.radius, y - 6.5);
	          ctx.lineTo(x - this.radius, y + 6.5);
	          break;
	        case "down":
	          ctx.arc(x + 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          ctx.moveTo(x, y);
	          ctx.lineTo(x - 6.5, y + this.radius);
	          ctx.lineTo(x + 6.5, y + this.radius);
	          break;
	        case "up":
	          ctx.arc(x + 3, y + 2, 1.5, 0, 2 * Math.PI, true);
	          ctx.moveTo(x, y);
	          ctx.lineTo(x + 6.5, y - this.radius);
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
	          ctx.arc(x - 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          break;
	        case "left":
	          ctx.arc(x + 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          break;
	        case "down":
	          ctx.arc(x + 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	          break;
	        case "up":
	          ctx.arc(x + 3, y + 2, 1.5, 0, 2 * Math.PI, true);
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
	      return this.location[0] === obj.location[0] && this.location[1] === obj.location[1] || this.location[1] === obj.location[1] + 1 && this.location[0] === obj.location[0] && this.dir === 'left' && obj.dir === 'right' || this.location[1] === obj.location[1] - 1 && this.location[0] === obj.location[0] && this.dir === 'right' && obj.dir === 'left' || this.location[0] === obj.location[0] - 1 && this.location[1] === obj.location[1] && this.dir === 'down' && obj.dir === 'up' || this.location[0] === obj.location[0] + 1 && this.location[1] === obj.location[1] && this.dir === 'up' && obj.dir === 'down';
	    }
	  }, {
	    key: 'nearbySqs',
	    value: function nearbySqs(location) {
	      var _this = this;
	
	      var row = location[0];
	      var col = location[1];
	
	      var maxRowIdx = this.mazeNodes[0].length - 1;
	
	      var moves = [[row + 1, col], [row, (col + 1) % 21], [row - 1, col], [row, (col - 1) % 21]];
	
	      return moves.map(function (move) {
	        return _this.node(move);
	      });
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
	
	    _this.color = _this.weak ? 'blue' : '#f79a7e';
	    _this.strColor = '#f79a7e';
	    _this.pos = _this.node([8, 10]).centerPos();
	    _this.dir = "up";
	    return _this;
	  }
	
	  _createClass(g1, [{
	    key: 'reset',
	    value: function reset() {
	      this.pos = this.node([8, 10]).centerPos();
	    }
	  }, {
	    key: 'resetLoc',
	    value: function resetLoc() {
	      this.location = [8, 10];
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
	    _this.weak = false;
	    _this.flash = false;
	    _this.flashing = false;
	    _this.inJail = true;
	    _this.color = "white";
	    _this.strColor = "black";
	    return _this;
	  }
	
	  _createClass(Ghost, [{
	    key: 'potentialMoves',
	    value: function potentialMoves(location) {
	      return this.nearbySqs(location).filter(function (loc) {
	        return loc.ghostPassageway();
	      });
	    }
	  }, {
	    key: 'leavePen',
	    value: function leavePen() {
	      var _this2 = this;
	
	      if (this.location[0] === 10) {
	        if (this.location[1] === 10) {
	          setTimeout(function () {
	            _this2.pos = _this2.node(_this2.location).centerPos();
	            _this2.location = [9, 10];
	          }, 500);
	        } else if (this.location[1] === 9) {
	          setTimeout(function () {
	            _this2.pos = _this2.node(_this2.location).centerPos();
	            _this2.location = [10, 10];
	          }, 1000);
	        } else if (this.location[1] === 11) {
	          setTimeout(function () {
	            _this2.pos = _this2.node(_this2.location).centerPos();
	            _this2.location = [10, 10];
	          }, 2000);
	        }
	      } else {
	        this.inJail = false;
	      }
	    }
	  }, {
	    key: 'moveRegularly',
	    value: function moveRegularly() {
	      var newLoc = Util.checkNewLoc(this.location, this.dir);
	
	      if (this.node(newLoc).ghostPassageway()) {
	        this.pos = this.node(newLoc).centerPos();
	        this.location = newLoc;
	      } else {
	        this.changeDir(this.dir);
	      }
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      if (this.inJail) {
	        this.leavePen();
	      } else {
	        this.moveRegularly();
	      }
	    }
	  }, {
	    key: 'changeDir',
	    value: function changeDir(dir) {
	      var newDirs = void 0;
	      var randDir = void 0;
	      switch (dir) {
	        case 'left':
	        case 'right':
	          newDirs = ['up', 'down'];
	          randDir = Math.random() > 0.5 ? newDirs.pop() : newDirs.shift();
	          var possibleLoc = Util.checkNewLoc(this.location, randDir);
	          this.dir = this.node(possibleLoc).ghostPassageway() ? randDir : newDirs[0];
	          break;
	        case 'up':
	        case 'down':
	          newDirs = ['left', 'right'];
	          randDir = Math.random() > 0.5 ? newDirs.pop() : newDirs.shift();
	          possibleLoc = Util.checkNewLoc(this.location, randDir);
	          this.dir = this.node(possibleLoc).ghostPassageway() ? randDir : newDirs[0];
	          break;
	        default:
	          console.log(':C');
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      var x = this.pos[0];
	      var y = this.pos[1];
	      var r = this.radius;
	
	      ctx.fillStyle = this.flash ? 'white' : this.color;
	
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
	
	      if (this.flashing) {
	        this.flash = !this.flash;
	      }
	    }
	  }, {
	    key: 'isEaten',
	    value: function isEaten() {
	      this.location = [10, 10];
	      this.pos = this.node(this.location).centerPos();
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
	
	    _this.color = _this.weak ? 'blue' : '#7a9175';
	    _this.strColor = '#7a9175';
	    _this.pos = _this.node([10, 9]).centerPos();
	    _this.visitedPositions = {};
	    _this.visitedPositions[_this.node(_this.location).toString()] = true;
	
	    _this.dir = 'right';
	    return _this;
	  }
	
	  // move() {
	  //   const newLoc = Util.checkNewLoc(this.location, this.dir);
	  //   if (this.node(newLoc).ghostPassageway()) {
	  //     this.pos = this.node(newLoc).centerPos();
	  //     this.location = newLoc;
	  //   } else {
	  //     this.buildMoveTree();
	  //     this.findDir();
	  //   }
	  // }
	  //
	  // findDir() {
	  //   const snackMan = this.findSnackman();
	  //   if(!snackMan)
	  //     return;
	  //   const nodeLoc = snackMan.location;
	  //   const x = nodeLoc[0];
	  //   const y = nodeLoc[1];
	  //
	  //   switch (nodeLoc) {
	  //     case x < this.location[0]:
	  //       this.dir = 'left';
	  //       break;
	  //     case x > this.location[0]:
	  //       this.dir = 'right';
	  //       break;
	  //     case y < this.location[1]:
	  //       this.dir = 'up';
	  //       break;
	  //     case y > this.location[1]:
	  //       this.dir = 'down';
	  //       break;
	  //     default:
	  //       console.log(":C");
	  //   }
	  // }
	
	  // buildMoveTree() {
	  //   this.visitedPositions = {};
	  //   const rootNode = this.node(this.location);
	  //   let nodes = [rootNode];
	  //   let currNode;
	  //   let newNode;
	  //
	  //   while (nodes.length > 0) {
	  //     currNode = nodes.shift();
	  //     const newMoves = this.potentialMoves(this.location).filter((loc) => {
	  //       const curPos = !this.visitedPositions[loc.toString()];
	  //       this.visitedPositions[loc.toString()] = true;
	  //
	  //       return curPos;
	  //     });
	  //
	  //     // this.visitedPostions = this.visitedPostions.concat(newMoves);
	  //     newMoves.forEach((newMove) => {
	  //       currNode.addChild(newMove);
	  //       nodes.push(newMove);
	  //     });
	  //   }
	  // }
	  //
	  // findSnackman() {
	  //   const target = this.node(this.snackman.location);
	  //   const endNode = this.node(this.location).bfs(target);
	  //   const nodes = [];
	  //
	  //   let currentNode = endNode;
	  //   while (currentNode) {
	  //     nodes.push(currentNode);
	  //     currentNode = currentNode.parent;
	  //   }
	  //   if(nodes.length === 0)
	  //     return false;
	  //
	  //   return nodes[(nodes.length) - 1];
	  // }
	
	  _createClass(g2, [{
	    key: 'reset',
	    value: function reset() {
	      this.pos = this.node([10, 9]).centerPos();
	    }
	  }, {
	    key: 'resetLoc',
	    value: function resetLoc() {
	      this.location = [10, 9];
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
	
	var _util = __webpack_require__(4);
	
	var Util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//another random
	
	var g3 = function (_Ghost) {
	  _inherits(g3, _Ghost);
	
	  function g3(game) {
	    _classCallCheck(this, g3);
	
	    var _this = _possibleConstructorReturn(this, (g3.__proto__ || Object.getPrototypeOf(g3)).call(this, game, [10, 10]));
	
	    _this.color = _this.weak ? 'blue' : '#917591';
	    _this.strColor = '#917591';
	    _this.pos = _this.node([10, 10]).centerPos();
	    _this.dir = "right";
	    return _this;
	  }
	
	  _createClass(g3, [{
	    key: 'reset',
	    value: function reset() {
	      this.pos = this.node([10, 10]).centerPos();
	      this.weak = false;
	      this.inJail = true;
	      this.flashing = false;
	    }
	  }, {
	    key: 'resetLoc',
	    value: function resetLoc() {
	      this.location = [10, 10];
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
	
	//alex's ghost
	
	var g4 = function (_Ghost) {
	  _inherits(g4, _Ghost);
	
	  function g4(game) {
	    _classCallCheck(this, g4);
	
	    var _this = _possibleConstructorReturn(this, (g4.__proto__ || Object.getPrototypeOf(g4)).call(this, game, [10, 11]));
	
	    _this.color = _this.weak ? 'blue' : '#b3bdce';
	    _this.strColor = '#b3bdce';
	    _this.pos = _this.node([10, 11]).centerPos();
	    _this.dir = "left";
	    return _this;
	  }
	
	  // move() {
	  //   if (this.weak && this.isTouching(this.snackman)) {
	  //     this.reset();
	  //     this.resetLoc();
	  //   }
	  //
	  //   if (this.location[0] === 10 && this.location[1] === 11) {
	  //     setTimeout(() => {
	  //       this.pos = this.node(this.location).centerPos();
	  //       this.location = [10, 10];
	  //     }, 120);
	  //   } else if (this.location[0] === 10 && this.location[1] === 10) {
	  //     setTimeout(() => {
	  //       this.pos = this.node(this.location).centerPos();
	  //       this.location = [9, 10];
	  //     }, 240);
	  //   } else if (this.location[0] === 9 && this.location[1] === 10) {
	  //     setTimeout(() => {
	  //       this.pos = this.node(this.location).centerPos();
	  //       this.location = [8, 10];
	  //     }, 360);
	  //   } else if (this.location[0] === 8 && this.location[1] === 10) {
	  //     setTimeout(() => {
	  //       this.pos = this.node(this.location).centerPos();
	  //       this.location = [8, 9];
	  //     }, 480);
	  //   } else {
	  //     this.pos = this.node(this.location).centerPos();
	  //     const tube = this.potentialMoves(this.location).length === 2 ? true : false;
	  //     const newLoc = Util.checkNewLoc(this.location, this.dir);
	  //
	  //     if (this.node(newLoc).ghostPassageway()) {
	  //       this.pos = this.node(newLoc).centerPos();
	  //       this.location = newLoc;
	  //     } else if (!this.node(newLoc).ghostPassageway()){
	  //       this.changeDir(this.dir);
	  //     } else if (this.node(newLoc).ghostPassageway() && !tube) {
	  //       if (Math.random() > 0.5) this.changeDir(this.dir);
	  //     }
	  //   }
	  // }
	  //
	  // changeDir(dir) {
	  //   // debugger
	  //   const target = this.snackman.location;
	  //   let newDirs, newDir, possibleLoc, randChange;
	  //   switch(Math.abs(this.location[0] - target[0]) > Math.abs(this.location[1] - target[1])) {
	  //     case true:
	  //       newDirs = (this.dir === 'left' || this.dir === 'right') ? ['up', 'down'] : ['left', 'right'];
	  //       newDir = this.location[1] > target[1] ? newDirs.pop() : newDirs.shift();
	  //       possibleLoc = Util.checkNewLoc(this.location, newDir);
	  //       this.dir = this.node(possibleLoc).ghostPassageway() ? newDir : newDirs[0];
	  //       break;
	  //     case false:
	  //       newDirs = (this.dir === 'up' || this.dir === 'down') ? ['left', 'right'] : ['up', 'down'];
	  //       newDir = this.location[0] > target[0] ? newDirs.pop() : newDirs.shift();
	  //       possibleLoc = Util.checkNewLoc(this.location, newDir);
	  //       this.dir = this.node(possibleLoc).ghostPassageway() ? newDir : newDirs[0];
	  //       break;
	  //     default:
	  //       console.log(':bad');
	  //   }
	  // }
	
	  _createClass(g4, [{
	    key: 'reset',
	    value: function reset() {
	      this.pos = this.node([10, 11]).centerPos();
	    }
	  }, {
	    key: 'resetLoc',
	    value: function resetLoc() {
	      this.location = [10, 11];
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
	    this.edibles = 0;
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
	      var _this = this;
	
	      this.edibles = 0;
	      this.mazeNodes.forEach(function (row) {
	        row.forEach(function (mazeNode) {
	          mazeNode.draw(ctx);
	          if (mazeNode.sym === '.' || mazeNode.sym === 'O') {
	            _this.edibles += 1;
	          }
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
	    key: "toString",
	    value: function toString() {
	      return this.location[0] + "-" + this.location[1];
	    }
	  }, {
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
	      var currNode = this;
	      var nodes = [currNode];
	
	      while (nodes.length > 0) {
	        var node = nodes.shift();
	        if (node.toString() === target.toString()) {
	          return nodes;
	        }
	
	        nodes = nodes.concat(node.children);
	      }
	
	      return null;
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
	          return true;
	        case "Q":
	        case "p":
	        case "=":
	        case "x":
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
	          gradDoor.addColorStop(1, "pink");
	          ctx.fillStyle = gradDoor;
	          ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
	          break;
	        case "P":
	          ctx.beginPath();
	          ctx.fillStyle = "blue";
	          ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
	          ctx.clearRect(x + 1, y + 1, sqHeight, sqHeight);
	          ctx.fillStyle = "black";
	          ctx.fillRect(x, y + 1, sqHeight, sqHeight);
	          break;
	        case "=":
	          ctx.beginPath();
	          ctx.fillStyle = "blue";
	          ctx.fillRect(x, y, sqHeight + 2, sqHeight + 2);
	          ctx.clearRect(x + 1, y + 1, sqHeight, sqHeight);
	          ctx.fillStyle = "black";
	          ctx.fillRect(x + 1, y + 1, sqHeight, sqHeight);
	          break;
	        case "B":
	          ctx.beginPath();
	          ctx.fillStyle = "blue";
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
	    this.timer = 3;
	    this.ticker = false;
	  }
	
	  _createClass(GameView, [{
	    key: "init",
	    value: function init() {
	      this.bindKeyHandlers();
	      this.drawStatic();
	
	      this.dialog('press N to start a new game');
	    }
	  }, {
	    key: "drawStatic",
	    value: function drawStatic() {
	      this.game.reset(this.ctx);
	      this.game.lvlMap.drawMaze(this.ctx);
	      this.game.draw(this.ctx);
	      this.game.remainingLives(this.ctx);
	    }
	  }, {
	    key: "dialog",
	    value: function dialog(text, bottomtext) {
	      this.ctx.fillStyle = "#fff";
	      this.ctx.font = "24px Courier New";
	      var width = this.ctx.measureText(text).width;
	      this.ctx.fillText(text, this.game.border + (this.game.dimX - width) / 2, this.game.dimY / 2);
	
	      if (bottomtext) {
	        var btmwidth = this.ctx.measureText(bottomtext).width;
	        this.ctx.fillText(bottomtext, this.game.border + (this.game.dimX - btmwidth) / 2, this.game.dimY / 2 + 30);
	      }
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      if (this.game.checkWon()) {
	        this.winScreen();
	        this.lives = -1;
	      } else if (this.game.snackmanDead()) {
	        if (this.game.lives > 0) {
	          clearInterval(this.ticker);
	          this.game.reset(this.ctx);
	          this.game.lives -= 1;
	          this.timer = 3;
	          this.drawStatic();
	          this.countdown();
	          this.start();
	        } else {
	          clearInterval(this.ticker);
	          this.game.lives -= 1;
	          this.deathScreen();
	        }
	      } else if (this.game.lives >= 0) {
	        this.game.moveObjects(this.ctx);
	        this.game.draw(this.ctx);
	      }
	    }
	  }, {
	    key: "deathScreen",
	    value: function deathScreen() {
	      this.ctx.clearRect(this.game.border, this.game.border, this.game.dimX, this.game.dimY);
	      this.ctx.fillStyle = 'black';
	      this.ctx.fillRect(this.game.border, this.game.border, this.game.dimX, this.game.dimY);
	      this.dialog(':(', 'press N to try again');
	      this.game.eaten = 0;
	    }
	  }, {
	    key: "winScreen",
	    value: function winScreen() {
	      this.ctx.clearRect(this.game.border, this.game.border, this.game.dimX, this.game.dimY);
	      this.ctx.fillStyle = 'blue';
	      this.ctx.fillRect(this.game.border, this.game.border, this.game.dimX, this.game.dimY);
	      this.dialog(':)', 'press N to play again');
	    }
	  }, {
	    key: "bindKeyHandlers",
	    value: function bindKeyHandlers() {
	      var _this = this;
	
	      var snackman = this.game.snackman[0];
	
	      Object.keys(GameView.NEW).forEach(function (n) {
	        key(n, function () {
	          if (_this.game.lives < 0) {
	            _this.timer = 3;
	            _this.game.newMap();
	            _this.countdown();
	            _this.start();
	          }
	        });
	      });
	
	      Object.keys(GameView.MOVES).forEach(function (k) {
	        var dir = GameView.MOVES[k];
	        key(k, function () {
	          snackman.logNextDir(dir);
	        });
	      });
	    }
	  }, {
	    key: "countdown",
	    value: function countdown() {
	      var _this2 = this;
	
	      var id = setInterval(function () {
	        _this2.drawStatic();
	        _this2.dialog("game starting in " + _this2.timer);
	        _this2.timer -= 1;
	        if (_this2.timer <= 0) clearInterval(id);
	      }, 800);
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      var _this3 = this;
	
	      setTimeout(function () {
	        _this3.game.resetLocs();
	        clearInterval(_this3.ticker);
	        _this3.ticker = setInterval(function () {
	          _this3.update();
	        }, 160);
	      }, 3000);
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
	
	GameView.NEW = {
	  "n": "new",
	  "N": "new"
	};
	
	exports.default = GameView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map