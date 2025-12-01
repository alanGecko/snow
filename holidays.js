const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];


const imageSources = ['snowflake1.png', 'snowflake2.png', 'snowflake3.png', 'snowflake4.png', 'snowflake5.webp', 'snowflake6.png'];
const particleImages = [];

imageSources.forEach(src => {
    const img = new Image();
    img.src = src;
    particleImages.push(img);
});


class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.size = Math.random() * 40 + 10;
        this.speedY = Math.random() * 2 + 1;

        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() + 0.5) * 0.02;

        this.image = particleImages[Math.floor(Math.random() * particleImages.length)];
    }

    update() {
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}



function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.1) {
        particlesArray.push(new Particle());
    }

    for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        p.update();
        p.draw();

        if (p.y > canvas.height) {
            particlesArray.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animate);
}


let loadedCount = 0;
particleImages.forEach(img => {
    img.onload = () => {
        loadedCount++;
        if (loadedCount === particleImages.length) animate();
    };
});


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
