function sendMessage() {
    const input = document.getElementById("userInput").value;
    const chatbox = document.getElementById("chatbox");

    chatbox.innerHTML += `<div>User: ${input}</div>`;
    document.getElementById("userInput").value = "";


    fetch('/api/therapists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feeling: input })
    })
    .then(response => response.json())
    .then(data => {
        const therapists = data.therapists.map(therapist => `
            <div>Therapist: ${therapist.name}, Location: ${therapist.location}</div>
        `).join('');
        chatbox.innerHTML += therapists;
    });
}
