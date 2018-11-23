'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
    function Canvas(_params) {
        _classCallCheck(this, Canvas);

        this.$container = document.querySelector(_params.container);
        this.getCursor();
        this.getKeyboard();
        this.initCanvas();
        this.color = 360;
        this.frameCount = 0;
        this.characterPosition = {
            x: 10,
            y: 300
        };
    }

    _createClass(Canvas, [{
        key: 'getCursor',
        value: function getCursor() {
            var _this = this;

            this.cursor = {};
            window.addEventListener('mousemove', function (_event) {
                _this.cursor.x = _event.clientX;
                _this.cursor.y = _event.clientY;
            });
            window.addEventListener('mousedown', function () {
                _this.cursor.isDown = true;
            });
            window.addEventListener('mouseup', function () {
                _this.cursor.isDown = false;
            });
        }
    }, {
        key: 'getKeyboard',
        value: function getKeyboard() {
            var _this2 = this;

            window.addEventListener('keydown', function (_event) {
                _this2.pressedKey = _event.keyCode;
            });
            window.addEventListener('keyup', function (_event) {
                _this2.pressedKey = null;
            });
        }
    }, {
        key: 'initCanvas',
        value: function initCanvas() {
            this.createCanvas();
            this.sizeCanvas();
            this.loop();
        }
    }, {
        key: 'createCanvas',
        value: function createCanvas() {
            this.$canvas = document.createElement('canvas');
            this.context = this.$canvas.getContext('2d');
            this.$container.appendChild(this.$canvas);
        }
    }, {
        key: 'sizeCanvas',
        value: function sizeCanvas() {
            var _this3 = this;

            this.$canvas.width = this.$container.offsetWidth;
            this.$canvas.height = this.$container.offsetHeight;

            window.addEventListener('resize', function () {
                _this3.$canvas.width = _this3.$container.offsetWidth;
                _this3.$canvas.height = _this3.$container.offsetHeight;
            });
        }
    }, {
        key: 'loop',
        value: function loop() {
            window.requestAnimationFrame(this.loop.bind(this));

            // if (this.cursor.isDown) {
            //     this.context.beginPath()
            //     this.context.arc(this.cursor.x, this.cursor.y, 20, 0, Math.PI * 2)
            //     this.context.fill()
            // }
            this.frameCount++;
            if (this.frameCount === 10) {
                this.color > 0 ? this.color-- : this.color = 360;
                this.frameCount = 0;
            }

            this.context.fillStyle = 'hsl(' + this.color + ',100%,30%)';
            this.context.fillRect(0, 0, this.$canvas.width, this.$canvas.height);

            this.context.fillStyle = 'black';
            this.context.fillRect(0, this.$canvas.height / 4 - 5, this.$canvas.width, 10);
            this.context.fillRect(0, 2 * this.$canvas.height / 4 - 5, this.$canvas.width, 10);
            this.context.fillRect(0, 3 * this.$canvas.height / 4 - 5, this.$canvas.width, 10);

            var character = new Character(this.context, this.$canvas, this.pressedKey, this.characterPosition, this.characterIsJumping, this.characterJumpSpeed);

            this.characterPosition = character.position;
            this.characterIsJumping = character.isJumping;
            this.characterJumpSpeed = character.jumpSpeed;
        }
    }]);

    return Canvas;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Character = function () {
    function Character(context, $canvas, pressedKey) {
        var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { x: 0, y: 150 };
        var isJumping = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var jumpSpeed = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 6;

        _classCallCheck(this, Character);

        this.context = context;
        this.pressedKey = pressedKey;
        this.size = { width: 20, height: 150 };
        this.position = {
            x: position.x,
            y: position.y
        };
        this.isJumping = isJumping;
        this.jumpSpeed = jumpSpeed;

        this.init();
    }

    _createClass(Character, [{
        key: 'init',
        value: function init() {
            this.draw();
            this.move();
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.context.fillStyle = 'blue';
            this.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }, {
        key: 'move',
        value: function move() {
            if (this.pressedKey === 68) {
                this.position.x += 5;
            }
            if (this.pressedKey === 81) {
                this.position.x -= 5;
            }
            if (this.pressedKey === 90) {
                this.isJumping = true;
            }
            if (this.isJumping) {
                this.position.y > 5 ? this.position.y -= this.jumpSpeed -= 0.1 : this.isJumping = false;
            }
        }
    }]);

    return Character;
}();
'use strict';

var canvas = new Canvas({
    container: '.canvas-container'
});