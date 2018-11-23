class Character {
    constructor(
        context,
        $canvas,
        pressedKey,
        position = { x: 0, y: 150 },
        isJumping = false,
        jumpSpeed = 6
    ) {
        this.context = context
        this.pressedKey = pressedKey
        this.size = { width: 20, height: 150 }
        this.position = {
            x: position.x,
            y: position.y
        }
        this.isJumping = isJumping
        this.jumpSpeed = jumpSpeed

        this.init()
    }

    init() {
        this.draw()
        this.move()
    }

    draw() {
        this.context.fillStyle = 'blue'
        this.context.fillRect(
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        )
    }

    move() {
        if (this.pressedKey === 68) {
            this.position.x += 5
        }
        if (this.pressedKey === 81) {
            this.position.x -= 5
        }
        if (this.pressedKey === 90) {
            this.isJumping = true
        }
        if (this.isJumping) {
            this.position.y > 5
                ? (this.position.y -= this.jumpSpeed -= 0.1)
                : (this.isJumping = false)
        }
    }
}
