export class ElementAnimator {
    constructor(element, animations) {
        this.element = element;
        this.animations = animations;
        this.currentAnimation = null;

        this.frameIndex = 0;
        this.frameWidth = 20; // Width of one Pac-Man frame
        this.totalFrames = 6;

        this.animationFrameId = null; // To stop animation
        this.isAnimating = false;
    }

    setAnimation(name) {
        this.currentAnimation = this.animations[name];
        this.totalFrames = this.currentAnimation.frameCount;

        this.element.style.backgroundImage = `url('${this.currentAnimation.path}')`;
        this.element.style.backgroundSize = `${this.frameWidth * this.totalFrames}px 20px`;
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.backgroundPosition = '0px 0px';
    }

    start() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.animate();
    }

    stop() {
        if (!this.isAnimating) return;
        this.isAnimating = false;
        cancelAnimationFrame(this.animationFrameId);
    }

    animate = () => {
        if (!this.isAnimating) return;

        this.frameIndex = (this.frameIndex + 1) % this.totalFrames;
        this.element.style.backgroundPosition = `-${this.frameIndex * this.frameWidth}px 0px`;

        this.animationFrameId = requestAnimationFrame(() => {
            setTimeout(this.animate, 60); // You can tweak this for speed (e.g. 100ms/frame)
        });
    }
}
