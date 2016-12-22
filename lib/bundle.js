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
	  canvasElement.width = 600;
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
	
	var _ghost = __webpack_require__(3);
	
	var _ghost2 = _interopRequireDefault(_ghost);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.snackman = new _snackman2.default(this);
	    this.ghost = new _ghost2.default(this);
	  }
	
	  _createClass(Game, [{
	    key: 'allObjects',
	    value: function allObjects() {
	      return [].concat(this.snackman, this.ghost);
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.clearRect(0, 0, 1500, 1000);
	      ctx.fillStyle = '#ffffff';
	      ctx.fillRect(50, 50, Game.DIM_X, Game.DIM_Y);
	
	      this.allObjects().forEach(function (obj) {
	        obj.draw(ctx);
	      });
	    }
	  }, {
	    key: 'moveObjects',
	    value: function moveObjects() {
	      this.allObjects().forEach(function (obj) {
	        return obj.move();
	      });
	    }
	  }, {
	    key: 'isOutOfBounds',
	    value: function isOutOfBounds(pos) {
	      return pos[0] < 60 || pos[1] < 60 || pos[0] > 430 || pos[1] > 540;
	    }
	  }]);
	
	  return Game;
	}();
	
	Game.BORDER = 50;
	Game.DIM_X = 400;
	Game.DIM_Y = 500;
	
	exports.default = Game;

/***/ },
/* 2 */
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
	
	var SnackMan = function (_MovingObject) {
	  _inherits(SnackMan, _MovingObject);
	
	  function SnackMan(game) {
	    _classCallCheck(this, SnackMan);
	
	    var _this = _possibleConstructorReturn(this, (SnackMan.__proto__ || Object.getPrototypeOf(SnackMan)).call(this, game));
	
	    _this.pos = [250, 425];
	    _this.radius = 10;
	    _this.mouthOpen = true;
	    return _this;
	  }
	
	  _createClass(SnackMan, [{
	    key: "draw",
	    value: function draw(ctx) {
	      if (this.mouthOpen) {
	        this.openMouth(ctx);
	      } else {
	        this.closeMouth(ctx);
	      }
	
	      this.mouthOpen = !this.mouthOpen;
	    }
	  }, {
	    key: "openMouth",
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
	    key: "closeMouth",
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
	
	    _this.pos = [250, 300];
	    _this.radius = 10;
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
	      this.game.moveObjects();
	      this.game.draw(this.ctx);
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      setInterval(this.update, 135);
	    }
	  }]);
	
	  return GameView;
	}();
	
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
	
	    this.color = '#000000';
	    this.vel = [1, 1];
	    this.game = game;
	    this.isWrappable = false;
	  }
	
	  _createClass(MovingObject, [{
	    key: 'move',
	    value: function move() {
	      var offsetX = this.vel[0] * 1000 / 60;
	      var offsetY = this.vel[1] * 1000 / 60;
	      this.pos = [this.pos[0] + offsetX, this.pos[1]];
	      this.wrap();
	    }
	  }, {
	    key: 'wrap',
	    value: function wrap() {
	      if (this.pos[1] === 300) {
	        this.isWrappable = true;
	      } else {
	        this.isWrappable = false;
	      }
	
	      if (this.game.isOutOfBounds(this.pos)) {
	        if (this.isWrappable) {
	          if (this.pos[0] < 60) {
	            this.pos[0] = 430 - this.pos[0];
	          } else if (this.pos[0] > 440) {
	            this.pos[0] = 60 + (this.pos[0] + 10) % 450;
	          }
	        } else {
	          this.vel = [0, 0];
	        }
	      }
	    }
	  }, {
	    key: 'touch',
	    value: function touch() {}
	  }, {
	    key: 'isTouched',
	    value: function isTouched() {}
	  }]);
	
	  return MovingObject;
	}();
	
	exports.default = MovingObject;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map