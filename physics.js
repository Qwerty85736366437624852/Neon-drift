// Physics.js for Three Cats Air Hockey Game

class Physics {
    constructor() {
        // Initialize physics properties
        this.gravity = 9.81;
        this.friction = 0.1;
    }

    update(objects) {
        objects.forEach(object => {
            // Apply gravity
            object.velocity.y -= this.gravity;
            // Apply friction
            object.velocity.x *= (1 - this.friction);
            object.velocity.y *= (1 - this.friction);
            // Update position
            object.position.x += object.velocity.x;
            object.position.y += object.velocity.y;
        });
    }
}

export default Physics;