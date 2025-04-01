export class ElementAnimator {
    constructor(element, animations) {
        this.element = element
        this.animations = animations
        this.currentAnimation = null
        // this.currentFrame = 0
        // this.lastAnimationStamp

        this.frameIndex = 0
        this.frameWidth = 20 // Width of one Pac-Man frame
        this.totalFrames = 6 // Number of frames in the sprite || 0 = last frame || 1 = first frame
        
    }

    setAnimation(name) {

        
        // if (this.currentAnimation === this.animations[name]) return
        
        this.currentAnimation = this.animations[name];
        // this.totalFrames = 0
        
        this.element.style.backgroundImage = "url('" + this.currentAnimation.path + "')";
        this.element.style.backgroundSize = '120px 20px';
        this.element.style.position = '20px 20px';
        
        // const img = document.createElement('img');
        // img.src = `${path}`;
        // this.element.appendChild(img);

        // if (name.includes('left') && !name.includes('fly')) {
        //     this.element.style.transform = "scaleX(-1)";
        //     name = name.replace('left', 'right')
        // }
        
    }

    animate() {
        this.frameIndex = (this.frameIndex + 1) % this.totalFrames;
        this.element.style.backgroundPosition = `-${this.frameIndex * this.frameWidth}px 0px`; 
        
        setTimeout(() => requestAnimationFrame(this.animate), 100);
    }
}