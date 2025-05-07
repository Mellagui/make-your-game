export class ElementAnimator {
    constructor(element) {
        this.element = element;
        this.animations = {
            path: 'assets/character/pacman-frames.png',
            frameWidth: 20, // Width of one Pac-Man frame
            totalFrames: 6, // frameCount
        }

        this.frameIndex = 0;
        this.currentAnimation = null;

        this.animationFrameId = null;
        this.isAnimating = false;
    }

    setAnimation() {
        this.element.style.backgroundImage = `url('${this.animations.path}')`;
        this.element.style.backgroundSize = `${this.animations.frameWidth * this.animations.totalFrames}px 20px`;
    }

    start() {
        if (this.isAnimating) return
        this.isAnimating = true;
        this.animate();
    }

    stop() {
        if (!this.isAnimating) return
        this.isAnimating = false;
        cancelAnimationFrame(this.animationFrameId);
    }

    animate = () => {
        if (!this.isAnimating) return

        this.frameIndex = (this.frameIndex + 1) % this.animations.totalFrames;
        this.element.style.backgroundPosition = `-${this.frameIndex * this.animations.frameWidth}px 0px`;

        this.animationFrameId = requestAnimationFrame(() => {
            setTimeout(this.animate, 60); // You can tweak this for speed (e.g. 100ms/frame)
        });
    }
}
