const keySignatures = {
    "C Major / A Minor": [],
    "G Major / E Minor": ["F#"],
    "D Major / B Minor": ["F#", "C#"],
    "A Major / F# Minor": ["F#", "C#", "G#"],
    "E Major / C# Minor": ["F#", "C#", "G#", "D#"],
    "B Major / G# Minor": ["F#", "C#", "G#", "D#", "A#"],
    "F# Major / D# Minor": ["F#", "C#", "G#", "D#", "A#", "E#"],
    "C# Major / A# Minor": ["F#", "C#", "G#", "D#", "A#", "E#", "B#"],
    "F Major / D Minor": ["Bb"],
    "Bb Major / G Minor": ["Bb", "Eb"],
    "Eb Major / C Minor": ["Bb", "Eb", "Ab"],
    "Ab Major / F Minor": ["Bb", "Eb", "Ab", "Db"],
    "Db Major / Bb Minor": ["Bb", "Eb", "Ab", "Db", "Gb"],
    "Gb Major / Eb Minor": ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"],
    "Cb Major / Ab Minor": ["Bb", "Eb", "Ab", "Db", "Gb", "Cb", "Fb"]
};

const sharpPositions = {
    "F": 1.5,
    "C": 3,
    "G": 2,
    "D": 4,
    "A": 2.5,
    "E": 3.5,
    "B": 1
};

const flatPositions = {
    "B": 1,
    "E": 3.5,
    "A": 2.5,
    "D": 4,
    "G": 2,
    "C": 3,
    "F": 1.5
};

// Select a random key signature to display
let currentKeySignature = getRandomKeySignature();
drawKeySignature(currentKeySignature);
displayOptions(currentKeySignature);

function getRandomKeySignature() {
    const keys = Object.keys(keySignatures);
    return keys[Math.floor(Math.random() * keys.length)];
}

function drawKeySignature(key) {
    const canvas = document.getElementById("staff-canvas");
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the staff lines
    drawStaff(ctx);

    // Draw sharps or flats based on the key signature
    const signature = keySignatures[key];
    signature.forEach((note, index) => {
        if (note.endsWith("#")) {
            drawSharp(ctx, index, note[0]);
        } else if (note.endsWith("b")) {
            drawFlat(ctx, index, note[0]);
        }
    });
}

function drawStaff(ctx) {
    const staffTop = 50;
    const lineSpacing = 20;

    ctx.lineWidth = 2;

    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(50, staffTop + i * lineSpacing);
        ctx.lineTo(550, staffTop + i * lineSpacing);
        ctx.stroke();
    }
}

function drawSharp(ctx, index, note) {
    const x = 100 + index * 30;
    const y = getNotePosition(sharpPositions[note]);

    ctx.font = "24px Arial";
    ctx.fillText("#", x, y);
}

function drawFlat(ctx, index, note) {
    const x = 100 + index * 30;
    const y = getNotePosition(flatPositions[note]);

    ctx.font = "24px Arial";
    ctx.fillText("b", x, y);
}

function getNotePosition(position) {
    const lineSpacing = 20;
    const staffTop = 50;

    return staffTop + (position * (lineSpacing / 2));
}

function displayOptions(correctKey) {
    const optionsContainer = document.getElementById("quiz-options");
    optionsContainer.innerHTML = ''; // Clear previous options

    const keys = Object.keys(keySignatures);
    const shuffledKeys = keys.sort(() => 0.5 - Math.random()); // Shuffle the keys

    // Pick the correct answer and two random wrong answers
    const options = [correctKey];
    while (options.length < 3) {
        const randomKey = shuffledKeys.pop();
        if (!options.includes(randomKey)) {
            options.push(randomKey);
        }
    }

    // Shuffle the options
    options.sort(() => 0.5 - Math.random());

    // Display the options as buttons with full names
    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option, correctKey));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedKey, correctKey) {
    const resultDiv = document.getElementById("result");
    if (selectedKey === correctKey) {
        resultDiv.textContent = "Correct!";
        resultDiv.style.color = "green";
    } else {
        resultDiv.textContent = `Incorrect. The correct answer was ${correctKey}.`;
        resultDiv.style.color = "red";
    }

    // Display a new random key signature after 2 seconds
    setTimeout(() => {
        resultDiv.textContent = "";
        currentKeySignature = getRandomKeySignature();
        drawKeySignature(currentKeySignature);
        displayOptions(currentKeySignature);
    }, 2000);
}
