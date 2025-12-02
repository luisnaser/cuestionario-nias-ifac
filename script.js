document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;

    const correctAnswers = {
        q1: 'b', q2: 'b', q3: 'b', q4: 'b', q5: 'b', q6: 'b',
        q7: 'seguridad', q8: 'ifac', q9: 'verdadero', q10: 'falso'
    };

    let score = 0;
    let total = 10;

    for (let key in correctAnswers) {
        let userAnswer;
        if (key === 'q7' || key === 'q8') {
            userAnswer = document.querySelector(`[name="${key}"]`).value.trim().toLowerCase();
            if (userAnswer === correctAnswers[key]) score++;
        } else {
            userAnswer = document.querySelector(`[name="${key}"]:checked`);
            if (userAnswer && userAnswer.value === correctAnswers[key]) score++;
        }
    }

    const percentage = (score / total) * 100;
    alert(`Tu puntaje: ${score}/${total} (${percentage.toFixed(2)}%)`);

    if (percentage >= 70) {
        generarInsignia(name, id);
    } else {
        alert('No alcanzaste el 70%. ¡Intenta nuevamente!');
    }
});

function generarInsignia(name, id) {
    const canvas = document.getElementById('badgeCanvas');
    const ctx = canvas.getContext('2d');
    canvas.classList.remove('hidden');

    ctx.fillStyle = '#004080';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const logo = new Image();
    logo.crossOrigin = 'anonymous';
    logo.src = 'https://www.unicafam.edu.co/wp-content/uploads/2021/06/logo-unicafam.png';
    logo.onload = function() {
        ctx.drawImage(logo, 20, 20, 100, 100);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 28px Arial';
        ctx.fillText('Insignia de Aprobación', 180, 60);
        ctx.font = '20px Arial';
        ctx.fillText('Curso: Auditoría y Aseguramiento en NIAS-IFAC', 50, 150);
        ctx.fillText(`Nombre: ${name}`, 50, 200);
        ctx.fillText(`ID: ${id}`, 50, 240);
        ctx.fillText('Programa de Contaduría Pública - Unicafam', 50, 280);

        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 10;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        const link = document.getElementById('downloadLink');
        link.href = canvas.toDataURL();
        link.classList.remove('hidden');
    };
}