const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get("id");
const sessionDetails = document.getElementById("sessionDetails");
const sessionDetails2 = document.getElementById("sessionDetails2");
const seatNumber = document.getElementById("seatNumber");
const total = document.getElementById('total');
const data4 = [];
const selectedSeats = []; // Array to hold selected seats and their prices

function getSessionDetails() {
    fetch(`https://data-pink-nine.vercel.app/detail/${sessionId}`)
        .then(res => res.json())
        .then(session => {
            data4.length = 0;
            data4.push(session);
            showSessionDetail();
            showSessionDetail2();
            buildSeatLayout(session);
        });
}
getSessionDetails();

function showSessionDetail() {
    sessionDetails.innerHTML = "";
    const formattedDuration = `${Math.floor(110 / 60).toString().padStart(2, '0')}:${(110 % 60).toString().padStart(2, '0')}:00`;
    data4.forEach(item => {
        sessionDetails.innerHTML += `
        <div class="text-[#D9DADB] duration-200 p-3 max-lg:w-full md:w-1/2 lg:w-1/3 h-full flex gap-4">
            <div class="h-full max-md:w-[50%] md:w-[40%] rounded-xl overflow-hidden">
                <img alt="${item.name || 'movie'}" width="500" height="500" class="w-full h-full object-cover" src="https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${item.movie.image}&w=640&q=75">
            </div>
            <div class="flex flex-col justify-between max-md:w-[50%]">
                <div class="flex flex-col max-md:gap-2 md:gap-3 max-sm:text-[15px]">
                    <h1 class="text-nowrap truncate">${item.movie.name}</h1>
                    <div class="flex items-center gap-3">
                        <div class="text-[18px] mt-[1px] font-semibold">
                            <div>${item.type.slice(1)}</div>
                        </div>
                    </div>
                    <p class="flex items-center gap-2"><img alt="date" width="20" height="20" class="w-[14px]" src="/img/date.svg">04.05.2025</p>
                    <p class="flex items-center gap-2"><img alt="time" width="20" height="20" class="w-[14px]" src="/img/time.svg">${item.time}</p>
                </div>
                <div class="flex flex-col max-md:gap-1 md:gap-2 max-sm:text-[13px]">
                    <p>Dil: ${item.language}</p>
                    <p>Kinoteatr: ${item.theatreTitle}</p>
                    <p>${item.hallTitle}</p>
                    <p>Müddət: ${formattedDuration}</p>
                </div>
            </div>
        </div>`;
    });
}

function showSessionDetail2() {
    sessionDetails2.innerHTML = "";
    data4.forEach(item => {
        const discounts = item.price[0]?.discounts.filter(d => d.discountType !== "DOUBLE");
        discounts.forEach(discount => {
            sessionDetails2.innerHTML += `
                <li class="max-md:min-w-max">
                    ${discount.discountType === "FAMILY" ? "Ailə" :
                      discount.discountType === "ADULT" ? "Böyük" : ""}
                    <strong class="font-semibold">${discount.discountValue} azn</strong>
                </li>`;
        });
    });
}

function buildSeatLayout(session) {
    const container = document.getElementById("cinemaContainer");
    const discounts = session.price[0]?.discounts.filter(d => d.discountType !== "DOUBLE");
    const rows = 12;
    const seatsPerRow = 17;
    let cinemaHTML = '';

    for (let i = 0; i < rows; i++) {
        let rowHTML = '<div class="flex gap-1 items-center w-full">';
        rowHTML += `<span class="min-w-8 min-h-8 w-10 h-10 text-white font-bold flex items-center justify-center rounded-sm mr-20 text-xl">${rows - i}</span>`;
        let seatCount = 1;

        for (let j = 0; j < seatsPerRow; j++) {
            const isInvisible = (
                (i >= 1 && i <= 5 && (j < 2 || (j >= 2 && j < 4) || j >= seatsPerRow - 2)) ||
                (i >= 6 && i <= 10 && (j < 4 || j >= seatsPerRow - 2)) ||
                (i === 11 && (j < 5 || j >= seatsPerRow - 3))
            );
            if (i === 0 || !isInvisible) {
                rowHTML += `
                <div class="seat-container min-w-8 min-h-8 w-10 h-10 flex rounded-lg duration-200 justify-center items-center text-xl cursor-pointer 
                    bg-[#C7C7C7] text-[#353535] border border-gray-600 hover:bg-gray-300 relative" 
                    data-row="${rows - i}" data-seat="${seatCount}" onclick="toggleSeatMenu(event, this)">
                    ${seatCount++}
                    <div class="seat-menu absolute duration-200 text-black bg-[#ffffff7e] backdrop-blur-sm rounded-lg overflow-hidden flex flex-col gap-4 opacity-0 invisible z-10 top-full mt-1">
                        ${discounts.map(discount => 
                            `<p class="text-base text-center py-3 px-8 hover:bg-[#D52B1E] hover:text-white"
                               onclick="selectSeatType(event, '${discount.discountType === "FAMILY" ? "Ailə" : "Böyük"}', ${discount.discountValue})">
                               ${discount.discountType === "FAMILY" ? "Ailə" : "Böyük"}
                            </p>`
                        ).join('')}
                    </div>
                </div>`;
            } else {
                rowHTML += '<span class="min-w-8 min-h-8 w-10 h-10 opacity-0"></span>';
            }
        }
        rowHTML += '</div>';
        cinemaHTML += rowHTML;
    }

    container.innerHTML = cinemaHTML;
}

function toggleSeatMenu(e, seatElement) {
    document.querySelectorAll('.seat-menu').forEach(menu => {
        if (!seatElement.contains(menu)) {
            menu.classList.add('opacity-0', 'invisible');
            menu.classList.remove('opacity-100', 'visible');
        }
    });

    const menu = seatElement.querySelector('.seat-menu');
    menu.classList.toggle('opacity-0');
    menu.classList.toggle('invisible');
    menu.classList.toggle('opacity-100');
    menu.classList.toggle('visible');

    e.stopPropagation();
}

function selectSeatType(event, typeName, price) {
    const seatElement = event.target.closest('.seat-container');
    const seatNum = seatElement.getAttribute('data-seat');
    const rowNum = seatElement.getAttribute('data-row');

    // Check if the seat is already selected
    const seatIndex = selectedSeats.findIndex(seat => seat.seatNum === seatNum && seat.rowNum === rowNum);
    
    if (seatIndex === -1) {
        // If not selected, add it to the selectedSeats array
        selectedSeats.push({
            seatNum,
            rowNum,
            type: typeName,
            price
        });
    } else {
        // If already selected, remove it from the selectedSeats array
        selectedSeats.splice(seatIndex, 1);
    }

    // Update seat number and total price
    updateSeatDetails();
    updateTotalPrice();
    
    // Toggle the seat's background color based on selection
    // Hide the menu after selection
    const menu = seatElement.querySelector('.seat-menu');
    menu.classList.add('opacity-0', 'invisible');
    menu.classList.remove('opacity-100', 'visible');

    event.stopPropagation();
}

function updateSeatDetails() {
    seatNumber.innerHTML = ""; // Clear the seat number display
    const seatDetails = selectedSeats.map(seat => `Sıra: ${seat.rowNum}, Yer: ${seat.seatNum}`).join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
    seatNumber.innerHTML = seatDetails;
}

function updateTotalPrice() {
    const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
    total.innerHTML = `Ümumi: ${totalPrice} AZN`;
}

document.onclick = function () {
    document.querySelectorAll('.seat-menu').forEach(menu => {
        menu.classList.add('opacity-0', 'invisible');
        menu.classList.remove('opacity-100', 'visible');
    });
};


const container = document.getElementById('cinemaContainer');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');

let scale = 1;
const step = 0.1;
const minScale = 0.3;
const maxScale = 1.5;

function applyZoom() {
  container.style.transform = `scale(${scale})`;
}

function checkResponsiveZoom() {
  if (window.innerWidth <= 770) {
    scale = 0.5;
    applyZoom();
  } else {
    scale = 1; 
    applyZoom();
  }
}

zoomInBtn.onclick = function() {
  if (scale < maxScale) {
    scale += step;
    applyZoom();
  }
};

zoomOutBtn.onclick = function() {
  if (scale > minScale) {
    scale -= step;
    applyZoom();
  }
};

checkResponsiveZoom();

window.onresize = checkResponsiveZoom;






