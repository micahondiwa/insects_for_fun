const canvas = document.getElementById("insectCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let insectSize = 50;
let insectSpeed = 5;
let insectType = "ladybird";

// Insect images (use real URLs for insect images or GIFs)
const insectImages = {
    ladybird: "https://example.com/ladybird.png",
    beetle: "https://example.com/beetle.png",
    cockroach: "https://example.com/cockroach.png"
};

const insectImage = new Image();
insectImage.src = insectImages[insectType];

// Update settings from the UI
document.getElementById("insectSize").addEventListener("input", (e) => {
    insectSize = e.target.value;
});
document.getElementById("insectSpeed").addEventListener("input", (e) => {
    insectSpeed = e.target.value;
});
document.getElementById("insectType").addEventListener("change", (e) => {
    insectType = e.target.value;
    insectImage.src = insectImages[insectType];
});

const insects = [];

function Insect(x, y, speedX, speedY, size) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = size;
}

function spawnInsect() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * insectSpeed;
    const speedY = (Math.random() - 0.5) * insectSpeed;

    insects.push(new Insect(x, y, speedX, speedY, insectSize));
}

function updateInsects() {
    insects.forEach(insect => {
        insect.x += insect.speedX;
        insect.y += insect.speedY;

        // Keep insects within canvas bounds
        if (insect.x < 0 || insect.x > canvas.width) insect.speedX *= -1;
        if (insect.y < 0 || insect.y > canvas.height) insect.speedY *= -1;

        // Draw insect
        ctx.drawImage(insectImage, insect.x, insect.y, insect.size, insect.size);
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateInsects();
    requestAnimationFrame(animate);
}

setInterval(spawnInsect, 1000); // Spawn new insects every second
animate();
