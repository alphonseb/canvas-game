'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
    function Canvas(_params) {
        _classCallCheck(this, Canvas);

        this.$container = document.querySelector(_params.container);
        this.getCursor();
        this.initCanvas();
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
            var _this2 = this;

            this.$canvas.width = this.$container.offsetWidth;
            this.$canvas.height = this.$container.offsetHeight;

            window.addEventListener('resize', function () {
                _this2.$canvas.width = _this2.$container.offsetWidth;
                _this2.$canvas.height = _this2.$container.offsetHeight;
            });
        }
    }, {
        key: 'loop',
        value: function loop() {
            window.requestAnimationFrame(this.loop.bind(this));

            if (this.cursor.isDown) {
                this.context.beginPath();
                this.context.arc(this.cursor.x, this.cursor.y, 20, 0, Math.PI * 2);
                this.context.fill();
            }

            this.context.fillStyle = 'hsl(' + Math.random() * 360 + ',100%,50%)';
            // this.context.fillRect(0, 0, this.$canvas.width, this.$canvas.height)
        }
    }]);

    return Canvas;
}();
'use strict';

var canvas = new Canvas({
    container: '.canvas-container'
});