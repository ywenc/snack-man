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
	
	var _game_view = __webpack_require__(4);
	
	var _game_view2 = _interopRequireDefault(_game_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasElement = document.getElementsByTagName('canvas')[0];
	  canvasElement.width = 1500;
	  canvasElement.height = 1000;
	
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
	
	var _g = __webpack_require__(16);
	
	var _g2 = _interopRequireDefault(_g);
	
	var _g3 = __webpack_require__(17);
	
	var _g4 = _interopRequireDefault(_g3);
	
	var _g5 = __webpack_require__(18);
	
	var _g6 = _interopRequireDefault(_g5);
	
	var _g7 = __webpack_require__(19);
	
	var _g8 = _interopRequireDefault(_g7);
	
	var _map = __webpack_require__(14);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _maze = __webpack_require__(15);
	
	var _maze2 = _interopRequireDefault(_maze);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.lives = 3;
	    this.border = 15;
	    this.dimX = 538;
	    this.dimY = 623;
	    this.spriteHeight = 9;
	    this.lvlMap = new _map2.default(this, _maze2.default);
	    this.snackman = [new _snackman2.default(this)];
	    this.ghosts = [].concat(new _g2.default(this));
	    this.ghosts = [].concat(new _g2.default(this), new _g4.default(this), new _g6.default(this), new _g8.default(this));
	  }
	
	  _createClass(Game, [{
	    key: 'allMovingObjects',
	    value: function allMovingObjects() {
	      return [].concat(this.snackman, this.ghosts);
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.clearRect(this.border, this.border, this.dimX, this.dimY);
	      ctx.fillStyle = '#ffffff';
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
	      this.lives -= 1;
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
	        obj.wrap();
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(5);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SnackMan = function (_MovingObject) {
	  _inherits(SnackMan, _MovingObject);
	
	  function SnackMan(game) {
	    _classCallCheck(this, SnackMan);
	
	    var _this = _possibleConstructorReturn(this, (SnackMan.__proto__ || Object.getPrototypeOf(SnackMan)).call(this, game));
	
	    _this.color = '#000000';
	    _this.pos = [game.dimX / 2, 425];
	    _this.radius = game.spriteHeight;
	    _this.mouthOpen = true;
	    _this.dir = "right";
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
	      this.pos = [250, 435];
	      this.mouthOpen = true;
	      this.dir = "right";
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      var offsetX = this.vel[0] * 1000 / 60;
	      var offsetY = this.vel[1] * 1000 / 60;
	
	      switch (this.dir) {
	        case "right":
	          this.pos = [this.pos[0] + offsetX, this.pos[1]];
	          break;
	        case "left":
	          this.pos = [this.pos[0] - offsetX, this.pos[1]];
	          break;
	        case "up":
	          this.pos = [this.pos[0], this.pos[1] - offsetY];
	          break;
	        case "down":
	          this.pos = [this.pos[0], this.pos[1] + offsetY];
	          break;
	        default:
	          console.log(':(');
	      }
	    }
	  }, {
	    key: 'changeDir',
	    value: function changeDir(dir) {
	      this.vel = [1, 1];
	      this.dir = dir;
	    }
	  }, {
	    key: 'openMouth',
	    value: function openMouth(ctx) {
	      var x = this.pos[0];
	      var y = this.pos[1];
	      var r = this.radius;
	
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	      ctx.arc(x, y, r, 0, 2 * Math.PI, true);
	      ctx.fill();
	
	      ctx.fillStyle = "white";
	      ctx.beginPath();
	      ctx.arc(x - 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	      ctx.moveTo(x - 1, y);
	      ctx.lineTo(x + 11, y - 3.5);
	      ctx.lineTo(x + 11, y);
	      ctx.fill();
	    }
	  }, {
	    key: 'closeMouth',
	    value: function closeMouth(ctx) {
	      var x = this.pos[0];
	      var y = this.pos[1];
	      var r = this.radius;
	
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	      ctx.arc(x, y, r, 0, 2 * Math.PI, true);
	      ctx.fill();
	
	      ctx.fillStyle = "white";
	      ctx.beginPath();
	      ctx.arc(x - 3, y - 2, 1.5, 0, 2 * Math.PI, true);
	      ctx.fill();
	    }
	  }]);
	
	  return SnackMan;
	}(_moving_object2.default);
	
	exports.default = SnackMan;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(5);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ghost = function (_MovingObject) {
	  _inherits(Ghost, _MovingObject);
	
	  function Ghost(game) {
	    _classCallCheck(this, Ghost);
	
	    var _this = _possibleConstructorReturn(this, (Ghost.__proto__ || Object.getPrototypeOf(Ghost)).call(this, game));
	
	    _this.radius = game.spriteHeight;
	    return _this;
	  }
	
	  _createClass(Ghost, [{
	    key: "draw",
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
	
	//
	// class ghost1 extends Ghost {
	//   constructor() {
	//     super();
	//     this.pos = [230, 300];
	//   }
	//
	// }
	//
	// class ghost2 extends Ghost {
	//   constructor() {
	//     super();
	//     this.pos = [250, 300];
	//   }
	//
	//
	// }
	//
	// class ghost3 extends Ghost {
	//   constructor() {
	//     super();
	//     this.pos = [270, 300];
	//   }
	//
	//
	// }

/***/ },
/* 4 */
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
	      // this.game.moveObjects();
	      this.game.draw(this.ctx);
	
	      if (this.game.checkTouching() && this.game.lives >= 0) {
	        this.game.reset(this.ctx);
	      } else if (this.game.checkTouching() && this.game.lives < 0) {
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
	          snackman.changeDir(dir);
	        });
	      });
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      this.bindKeyHandlers();
	      setInterval(this.update, 100);
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MovingObject = function () {
	  function MovingObject(game) {
	    _classCallCheck(this, MovingObject);
	
	    this.vel = [1, 1];
	    this.game = game;
	    this.isWrappable = false;
	    this.mazeNodes = game.lvlMap.mazeNodes;
	  }
	
	  _createClass(MovingObject, [{
	    key: 'wrap',
	    value: function wrap() {
	      var xBounds = this.game.dimX;
	      var yBounds = this.game.dimY;
	      var border = this.game.border;
	
	      if (this.pos[1] === yBounds / 2) {
	        this.isWrappable = true;
	      } else {
	        this.isWrappable = false;
	      }
	
	      if (this.isWrappable) {
	        if (this.pos[0] < border + 2 * this.radius) {
	          this.pos[0] = xBounds - this.pos[0] - 2 * this.radius;
	        } else if (this.pos[0] > xBounds - this.radius) {
	          this.pos[0] = border + 2 * this.radius + (this.pos[0] + this.radius) % xBounds;
	        }
	      } else {
	        if (this.pos[0] < border + 2 * this.radius) {
	          this.pos[0] = border + 2 * this.radius;
	        } else if (this.pos[0] > xBounds - 2 * this.radius) {
	          this.pos[0] = xBounds - 2 * this.radius;
	        } else if (this.pos[1] > yBounds - 2 * this.radius) {
	          this.pos[1] = yBounds - 2 * this.radius;
	        } else if (this.pos[1] < border + 2 * this.radius) {
	          this.pos[1] = border + 2 * this.radius;
	        }
	      }
	    }
	  }, {
	    key: 'isTouching',
	    value: function isTouching(obj) {
	      return Math.abs(this.pos[0] - obj.pos[0]) <= this.radius + obj.radius && this.pos[1] === obj.pos[1] || Math.abs(this.pos[1] - obj.pos[1]) <= this.radius + obj.radius && this.pos[0] === obj.pos[0];
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	exports.default = MovingObject;

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
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
	  }
	
	  _createClass(mazeNode, [{
	    key: "sideL",
	    value: function sideL() {
	      return this.spriteHeight * 2 + 2;
	    }
	  }, {
	    key: "ghostPos",
	    value: function ghostPos() {
	      var x = this.pos[0];
	      var y = this.pos[1];
	
	      return [x, y + 1 / 2 * this.sideL()];
	    }
	  }, {
	    key: "isPassageway",
	    value: function isPassageway() {
	      switch (this.sym) {
	        case ".":
	        case "O":
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
	    key: "draw",
	    value: function draw(ctx) {
	      var x = this.pos[0];
	      var y = this.pos[1];
	      var spriteHeight = this.spriteHeight;
	
	      switch (this.sym) {
	        case "=":
	        case "x":
	        case "p":
	        case "P":
	          ctx.beginPath();
	          ctx.fillStyle = "gray";
	          ctx.fillRect(x, y, 2 * spriteHeight + 2, 2 * spriteHeight + 2);
	          ctx.clearRect(x + 1, y + 1, 2 * spriteHeight, 2 * spriteHeight);
	          ctx.fillStyle = "black";
	          ctx.fillRect(x + 1, y + 1, 2 * spriteHeight, 2 * spriteHeight);
	          break;
	        case ".":
	          ctx.beginPath();
	          ctx.fillStyle = "white";
	
	          ctx.fillRect(x, y, 2 * spriteHeight + 2, 2 * spriteHeight + 2);
	          ctx.fillStyle = "black";
	          ctx.arc(x + spriteHeight, y + spriteHeight, 1, 0, 2 * Math.PI, true);
	          ctx.fill();
	          break;
	        case "O":
	          ctx.beginPath();
	          ctx.fillStyle = "white";
	          ctx.fillRect(x, y, 2 * spriteHeight + 5, 2 * spriteHeight + 5);
	          ctx.fillStyle = "gray";
	          ctx.arc(x + spriteHeight, y + spriteHeight, 6, 0, 2 * Math.PI, true);
	          ctx.fill();
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _maze_node = __webpack_require__(13);
	
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
	      var xStart = 30;
	      var yStart = 36;
	
	      for (var x = 0; x < this.maze.length; x++) {
	        for (var y = 0; y < this.maze[0].length; y++) {
	          this.mazeNodes.push(new _maze_node2.default([x, y], [xStart, yStart], this.maze[x][y], spriteHeight));
	
	          xStart += 2 * spriteHeight;
	        }
	        xStart = 30;
	        yStart += 2 * spriteHeight + 1;
	      }
	    }
	  }, {
	    key: 'drawMaze',
	    value: function drawMaze(ctx) {
	      this.mazeNodes.forEach(function (mazeNode) {
	        mazeNode.draw(ctx);
	      });
	    }
	  }]);
	
	  return Map;
	}();
	
	exports.default = Map;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Maze0 = ["============================", "=............==............=", "=.====.=====.==.=====.====.=", "=O====.=====.==.=====.====O=", "=.====.=====.==.=====.====.=", "=..........................=", "=.====.==.========.==.====.=", "=.====.==.========.==.====.=", "=......==....==....==......=", "======.=====.==.=====.======", "xxxxx=.=====.==.=====.=xxxxx", "xxxxx=.==..........==.=xxxxx", "xxxxx=.==.===pp===.==.=xxxxx", "======.==.=PPPPPP=.==.======", "..........=PPPPPP=..........", "======.==.=PPPPPP=.==.======", "xxxxx=.==.========.==.=xxxx=", "xxxxx=.==..........==.=xxxx=", "xxxxx=.==.========.==.=xxxx=", "======.==.========.==.======", "=............==............=", "=.====.=====.==.=====.====.=", "=.====.=====.==.=====.====.=", "=O..==................==..O=", "===.==.==.========.==.==.===", "===.==.==.========.==.==.===", "=......==....==....==......=", "=.==========.==.==========.=", "=.==========.==.==========.=", "=..........................=", "============================"];
	
	exports.default = Maze0;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ghost = __webpack_require__(3);
	
	var _ghost2 = _interopRequireDefault(_ghost);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//stupid ghost
	
	var g1 = function (_Ghost) {
	  _inherits(g1, _Ghost);
	
	  function g1(game) {
	    _classCallCheck(this, g1);
	
	    var _this = _possibleConstructorReturn(this, (g1.__proto__ || Object.getPrototypeOf(g1)).call(this, game));
	
	    _this.color = '#66846c';
	    _this.pos = _this.mazeNodes[378].ghostPos();
	    return _this;
	  }
	
	  _createClass(g1, [{
	    key: 'move',
	    value: function move() {
	      var potentialMoves = [];
	
	      var offsetX = this.vel[0] * 1000 / 60;
	      var offsetY = this.vel[1] * 1000 / 60;
	      this.pos = [this.pos[0] + offsetX, this.pos[1]];
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.pos = [game.dimX / 2, game.dimY / 2 - this.radius * 2.5];
	    }
	  }]);
	
	  return g1;
	}(_ghost2.default);
	
	exports.default = g1;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ghost = __webpack_require__(3);
	
	var _ghost2 = _interopRequireDefault(_ghost);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//bfs ghost
	
	var g2 = function (_Ghost) {
	  _inherits(g2, _Ghost);
	
	  function g2(game) {
	    _classCallCheck(this, g2);
	
	    var _this = _possibleConstructorReturn(this, (g2.__proto__ || Object.getPrototypeOf(g2)).call(this, game));
	
	    _this.color = '#5b6887';
	    _this.pos = [game.dimX / 2 - 2.5 * _this.radius, game.dimY / 2];
	    return _this;
	  }
	
	  _createClass(g2, [{
	    key: 'move',
	    value: function move() {
	      var offsetX = this.vel[0] * 1000 / 60;
	      var offsetY = this.vel[1] * 1000 / 60;
	      this.pos = [this.pos[0] + offsetX, this.pos[1]];
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.pos = [225, game.dimY / 2];
	    }
	  }]);
	
	  return g2;
	}(_ghost2.default);
	
	exports.default = g2;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ghost = __webpack_require__(3);
	
	var _ghost2 = _interopRequireDefault(_ghost);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//euclidean ghost
	
	var g3 = function (_Ghost) {
	  _inherits(g3, _Ghost);
	
	  function g3(game) {
	    _classCallCheck(this, g3);
	
	    var _this = _possibleConstructorReturn(this, (g3.__proto__ || Object.getPrototypeOf(g3)).call(this, game));
	
	    _this.color = '#846680';
	    _this.pos = [game.dimX / 2, game.dimY / 2];
	    return _this;
	  }
	
	  _createClass(g3, [{
	    key: 'move',
	    value: function move() {
	      var offsetX = this.vel[0] * 1000 / 60;
	      var offsetY = this.vel[1] * 1000 / 60;
	      this.pos = [this.pos[0] + offsetX, this.pos[1]];
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.pos = [250, game.dimY / 2];
	    }
	  }]);
	
	  return g3;
	}(_ghost2.default);
	
	exports.default = g3;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ghost = __webpack_require__(3);
	
	var _ghost2 = _interopRequireDefault(_ghost);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//A* ghost
	
	var g4 = function (_Ghost) {
	  _inherits(g4, _Ghost);
	
	  function g4(game) {
	    _classCallCheck(this, g4);
	
	    var _this = _possibleConstructorReturn(this, (g4.__proto__ || Object.getPrototypeOf(g4)).call(this, game));
	
	    _this.color = '#874e4d';
	    _this.pos = [game.dimX / 2 + 2.5 * _this.radius, game.dimY / 2];
	    return _this;
	  }
	
	  _createClass(g4, [{
	    key: 'move',
	    value: function move() {
	      var offsetX = this.vel[0] * 1000 / 60;
	      var offsetY = this.vel[1] * 1000 / 60;
	      this.pos = [this.pos[0] + offsetX, this.pos[1]];
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.pos = [this.game.dimY / 2 + 2.5 * this.radius, game.dimY / 2];
	    }
	  }]);
	
	  return g4;
	}(_ghost2.default);
	
	exports.default = g4;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map