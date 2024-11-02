const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreBoard = document.getElementById('scoreBoard');

let catSize = 50; // Initial size of the cat
const growthRate = 0.5; // Continuous growth rate per second
let score = 0;
let imageLoaded = false; // Track if the image has loaded
let catImage = new Image(); // Initialize the cat image

// Function to fetch a random cat image
function getRandomCatImage() {
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => {
            catImage.src = data[0].url; // Set the image source to the URL from the API
            catImage.onload = () => {
                imageLoaded = true; // Set the image as loaded
                update(); // Start the update loop
            };
        })
        .catch(error => console.error('Error fetching cat image:', error));
}

// Draw the cat
function drawCat() {
    if (!imageLoaded) return; // Only draw if the image is loaded
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(catImage, (canvas.width / 2) - (catSize / 2), (canvas.height / 2) - (catSize / 2), catSize, catSize);
}

// Update function for continuous growth
function update() {
    if (imageLoaded) {
        catSize += growthRate * 0.016; // Grow the cat continuously over time
        drawCat();
    }
    requestAnimationFrame(update); // Continue the update loop
}

// Event listener for mouse down
canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (isClickOnCat(mouseX, mouseY)) {
        score += 1; // Increase score by 1 for each pet
        scoreBoard.textContent = `Points: ${score}`;
    }
});

// Check if the click is on the cat
function isClickOnCat(x, y) {
    const catX = (canvas.width / 2) - (catSize / 2);
    const catY = (canvas.height / 2) - (catSize / 2);
    return x >= catX && x <= catX + catSize && y >= catY && y <= catY + catSize;
}

// Start the game by fetching a random cat image
getRandomCatImage();