window.onload = function () {
    const ticketData = JSON.parse(localStorage.getItem("ticketData"));
    if (!ticketData) return;

    const ticketSummary = document.getElementById("ticketSummary");

    const seatInfo = ticketData.seats.map(
        s => `<p class="flex gap-6">Sıra ${s.row}, Yer ${s.seat} (${s.label})</p>`
    ).join("");

    ticketSummary.innerHTML = `
        <div class="flex flex-col gap-2">
            <h2 class="text-xl font-medium">${ticketData.movie}</h2>
            <p>${ticketData.theatre}</p>
            <p class="flex gap-4">
                <span>${ticketData.date} ${ticketData.time}</span>
                <span>${ticketData.hall}</span>
            </p>
            ${seatInfo}
        </div>
        <p class="font-semibold mt-3">Ümumi: ${ticketData.total} AZN</p>
    `;
};

const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const checkbox = document.getElementById('checkbox');
const submitBtn = document.getElementById('submitBtn');

function validateForm() {
    const emailFilled = emailInput.value.trim() !== '';
    const phoneFilled = phoneInput.value.trim() !== '';
    const checkboxChecked = checkbox.checked;

    if (emailFilled && phoneFilled && checkboxChecked) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-30');
        submitBtn.classList.add('opacity-65');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-30');
        submitBtn.classList.remove('opacity-65');
    }
}

emailInput.addEventListener('input', validateForm);
phoneInput.addEventListener('input', validateForm);
checkbox.addEventListener('change', validateForm);

function generateWhatsAppLink() {
    let phoneNumber = phoneInput.value.trim();
    if (!phoneNumber) return;

    if (!phoneNumber.startsWith('+994')) {
        phoneNumber = '+994' + phoneNumber.replace(/^\+994?/, ''); 
    }

    const ticketData = JSON.parse(localStorage.getItem("ticketData"));
    if (!ticketData) return;

    const message = `
        **Bilet Detalları**\n
        **Film:** ${ticketData.movie}\n
        **Teatr:** ${ticketData.theatre}\n
        **Tarix və Saat:** ${ticketData.date} ${ticketData.time}\n
        **Zal:** ${ticketData.hall}\n
        **Sıra və Yer:**\n
        ${ticketData.seats.map(s => `Sıra ${s.row}, Yer ${s.seat} (${s.label})`).join("\n")}\n
        **Ümumi:** ${ticketData.total} AZN
    `;

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

submitBtn.addEventListener('click', generateWhatsAppLink);

let totalTime = 2 * 60 + 13; 
const progressBar = document.getElementById('progressBar');
const timerElement = document.getElementById('timer');

function updateTimer() {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    let progress = (totalTime / (2 * 60 + 13)) * 100;
    progressBar.style.width = progress + '%';

    totalTime--;

    if (totalTime < 0) {
        clearInterval(timerInterval);
        window.location.href = "./detail2.html"; 
    }
}
const timerInterval = setInterval(updateTimer, 1000);

