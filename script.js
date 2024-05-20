function checkAnswers() {
    const answers = document.querySelectorAll(".blank");
    const feedback = document.getElementById("feedback");
    let correct = 0;
    const correctAnswers = ["clap", "clap", "clap", "stomp", "stomp", "stomp", "shout", "shout", "shout", "clap-clap, stomp-stomp, hoo-ray!", "clap-clap, stomp-stomp, hoo-ray!", "clap-clap, stomp-stomp, hoo-ray!"];
    
    answers.forEach((input, index) => {
        if (input.value.trim().toLowerCase() === correctAnswers[index]) {
            correct++;
        }
    });

    if (correct === answers.length) {
        feedback.innerHTML = "¡Excelente! Todas tus respuestas son correctas.";
    } else {
        feedback.innerHTML = `Tienes ${correct} respuestas correctas de ${answers.length}. ¡Intenta nuevamente escuchando la canción!`;
    }
}

function agregarRegla() {
    var input = document.getElementById('sugerenciaRegla');
    var lista = document.getElementById('listaReglas');
    var respuesta = document.getElementById('respuestaRegla');
    if (input.value.trim() !== "") {
        var nuevaRegla = document.createElement('li');
        nuevaRegla.innerHTML = '<strong>Nueva Regla:</strong> ' + input.value;
        lista.appendChild(nuevaRegla);
        respuesta.innerHTML = "¡Regla añadida exitosamente!";
        input.value = ""; // Limpiar el campo de texto después del envío
    } else {
        respuesta.innerHTML = "Por favor, escribe una regla antes de enviar.";
    }
}



const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));