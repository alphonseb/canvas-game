class Canvas {
    constructor(_params) {
        this.$container = document.querySelector(_params.container)
        this.getCursor()
        this.getKeyboard()
        this.initCanvas()
        this.color = 360
        this.frameCount = 0
        this.characterPosition = {
            x: 10,
            y: 300
        }
    }

    getCursor() {
        this.cursor = {}
        window.addEventListener('mousemove', _event => {
            this.cursor.x = _event.clientX
            this.cursor.y = _event.clientY
        })
        window.addEventListener('mousedown', () => {
            this.cursor.isDown = true
        })
        window.addEventListener('mouseup', () => {
            this.cursor.isDown = false
        })
    }

    getKeyboard() {
        window.addEventListener('keydown', _event => {
            this.pressedKey = _event.keyCode
        })
        window.addEventListener('keyup', _event => {
            this.pressedKey = null
        })
    }

    initCanvas() {
        this.createCanvas()
        this.sizeCanvas()
        this.loop()
    }

    createCanvas() {
        this.$canvas = document.createElement('canvas')
        this.context = this.$canvas.getContext('2d')
        this.$container.appendChild(this.$canvas)
    }

    sizeCanvas() {
        this.$canvas.width = this.$container.offsetWidth
        this.$canvas.height = this.$container.offsetHeight

        window.addEventListener('resize', () => {
            this.$canvas.width = this.$container.offsetWidth
            this.$canvas.height = this.$container.offsetHeight
        })
    }

    loop() {
        window.requestAnimationFrame(this.loop.bind(this))

        // if (this.cursor.isDown) {
        //     this.context.beginPath()
        //     this.context.arc(this.cursor.x, this.cursor.y, 20, 0, Math.PI * 2)
        //     this.context.fill()
        // }
        this.frameCount++
        if (this.frameCount === 10) {
            this.color > 0 ? this.color-- : (this.color = 360)
            this.frameCount = 0
        }

        this.context.fillStyle = `hsl(${this.color},100%,30%)`
        this.context.fillRect(0, 0, this.$canvas.width, this.$canvas.height)

        this.context.fillStyle = 'black'
        this.context.fillRect(
            0,
            this.$canvas.height / 4 - 5,
            this.$canvas.width,
            10
        )
        this.context.fillRect(
            0,
            (2 * this.$canvas.height) / 4 - 5,
            this.$canvas.width,
            10
        )
        this.context.fillRect(
            0,
            (3 * this.$canvas.height) / 4 - 5,
            this.$canvas.width,
            10
        )

        const character = new Character(
            this.context,
            this.$canvas,
            this.pressedKey,
            this.characterPosition,
            this.characterIsJumping,
            this.characterJumpSpeed
        )

        this.characterPosition = character.position
        this.characterIsJumping = character.isJumping
        this.characterJumpSpeed = character.jumpSpeed
    }
}
