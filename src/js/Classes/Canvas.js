class Canvas {
    constructor(_params) {
        this.$container = document.querySelector(_params.container)
        this.getCursor()
        this.initCanvas()
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

        if (this.cursor.isDown) {
            this.context.beginPath()
            this.context.arc(this.cursor.x, this.cursor.y, 20, 0, Math.PI * 2)
            this.context.fill()
        }

        this.context.fillStyle = `hsl(${Math.random() * 360},100%,50%)`
        // this.context.fillRect(0, 0, this.$canvas.width, this.$canvas.height)
    }
}
