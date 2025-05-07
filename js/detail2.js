const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get("id");
const sessionDetails = document.getElementById("sessionDetails");
const sessionDetails2 = document.getElementById("sessionDetails2");
const seatNumber = document.getElementById("seatNumber");
const total = document.getElementById("total");

const data4 = [];
const selectedSeats = []; // Store selected seat info

function getSessionDetails() {
    fetch(`https://data-pink-nine.vercel.app/detail/${sessionId}`)
        .then(res => res.json())
        .then(session => {
            data4.length = 0;
            data4.push(session);
            showSessionDetail();
            showSessionDetail2();
        });
}
getSessionDetails();

function showSessionDetail() {
    sessionDetails.innerHTML = "";
    const formattedDuration = `${Math.floor(110 / 60).toString().padStart(2, '0')}:${(110 % 60).toString().padStart(2, '0')}:00`;

    data4.map(item => {
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
                        <p class="text-[#D9DADB] !text-[16px] font-normal">Dil: ${item.language}</p>
                        <p class="text-[#D9DADB] !text-[16px] font-normal">Kinoteatr: ${item.theatreTitle}</p>
                        <p class="text-[#D9DADB] !text-[16px] font-normal">${item.hallTitle}</p>
                        <p class="text-[#D9DADB] !text-[16px] font-normal">Müddət: ${formattedDuration}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

function showSessionDetail2() {
    sessionDetails2.innerHTML = "";
    data4.forEach(item => {
        const discounts = item.price[0]?.discounts || [];
        discounts.forEach(discount => {
            sessionDetails2.innerHTML += `
                <li class="max-md:min-w-max">
                    ${discount.discountType === "FAMILY" ? "Ailə" :
                    discount.discountType === "ADULT" ? "Böyük" :
                    discount.discountType === "DOUBLE" ? "İkili" : ""}
                    <strong class="font-semibold">${discount.discountValue} azn</strong>
                </li>
            `;
        });
    });
}

const rows = 12;
const seatsPerRow = 17;
let cinemaHTML = '';

function createSeat(seatCount, rowNum) {
    return `
        <div class="seat-container min-w-8 min-h-8 w-10 h-10 flex rounded-lg duration-200 justify-center items-center text-xl cursor-pointer 
            bg-[#C7C7C7] text-[#353535] border border-gray-600 hover:bg-gray-300 relative"
            data-seat="${seatCount}" data-row="${rowNum}"
            onclick="toggleSeatMenu(event, this)">
            ${seatCount}
            <div class="seat-menu absolute duration-200 text-black bg-[#FFFFFFCC] dark:bg-[#FFFFFFCC] backdrop-blur-sm rounded-lg overflow-hidden flex flex-col gap-4 opacity-0 invisible z-10 top-full mt-1">
                <p onclick="selectSeat(event, this, 'FAMILY')" class="text-base text-center py-3 px-8 hover:bg-[#D52B1E] hover:text-white">Ailə</p>
                <p onclick="selectSeat(event, this, 'ADULT')" class="text-base text-center py-3 px-8 hover:bg-[#D52B1E] hover:text-white">Böyük</p>
            </div>
        </div>
    `;
}

for (let i = 0; i < rows; i++) {
    let rowHTML = `<div class="flex gap-1 items-center w-full">
        <span class="min-w-8 min-h-8 w-10 h-10 text-white font-bold flex items-center justify-center rounded-sm mr-20 text-xl">
            ${rows - i}
        </span>`;

    if (i === 0) {
        for (let j = 0; j < seatsPerRow; j++) {
            rowHTML += createSeat(j + 1, rows - i);
        }
    } else if (i >= 1 && i <= 5) {
        let seatCount = 1;
        for (let j = 0; j < seatsPerRow; j++) {
            if (j >= seatsPerRow - 2 || (j >= 2 && j < 4)) {
                rowHTML += `<span class="min-w-8 min-h-8 w-10 h-10 opacity-0"></span>`;
            } else {
                rowHTML += createSeat(seatCount++, rows - i);
            }
        }
    } else if (i >= 6 && i <= 10) {
        let seatCount = 1;
        for (let j = 0; j < seatsPerRow; j++) {
            if (j < 4 || j >= seatsPerRow - 2) {
                rowHTML += `<span class="min-w-8 min-h-8 w-10 h-10 opacity-0"></span>`;
            } else {
                rowHTML += createSeat(seatCount++, rows - i);
            }
        }
    } else if (i === 11) {
        let seatCount = 2;
        for (let j = 0; j < seatsPerRow; j++) {
            if (j < 5 || j >= seatsPerRow - 3) {
                rowHTML += `<span class="min-w-8 min-h-8 w-10 h-10 opacity-0"></span>`;
            } else {
                rowHTML += createSeat(seatCount++, rows - i);
            }
        }
    }

    rowHTML += `</div>`;
    cinemaHTML += rowHTML;
}

document.getElementById('cinemaContainer').innerHTML = cinemaHTML;

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

document.onclick = function () {
    document.querySelectorAll('.seat-menu').forEach(menu => {
        menu.classList.add('opacity-0', 'invisible');
        menu.classList.remove('opacity-100', 'visible');
    });
};

function selectSeat(e, el, type) {
    e.stopPropagation();
    const seatDiv = el.closest('.seat-container');
    const seat = seatDiv.dataset.seat;
    const row = seatDiv.dataset.row;

    const seatIndex = selectedSeats.findIndex(s => s.seat === seat && s.row === row);

    if (seatIndex > -1) {
        // Seat is already selected — remove it
        selectedSeats.splice(seatIndex, 1);
        seatDiv.classList.remove('bg-red-400');
        seatDiv.classList.add('hover:bg-gray-300');  // Re-enable hover on deselect
    } else {
        // Seat is not selected — add it
        const discounts = data4[0].price[0].discounts;
        const discount = discounts.find(d => d.discountType === type);
        const label = type === 'FAMILY' ? 'Ailə' : type === 'ADULT' ? 'Böyük' : 'N/A';

        selectedSeats.push({
            seat,
            row,
            label,
            price: discount?.discountValue || 0
        });

        seatDiv.classList.add('bg-red-400');
        seatDiv.classList.remove('hover:bg-gray-300');  // Disable hover when selected
    }

    updateSeatSummary();
}

function updateSeatSummary() {
    seatNumber.innerHTML = selectedSeats
        .map(s => `Sıra ${s.row}, Yer ${s.seat} (${s.label})`)
        .join("&nbsp;&nbsp;&nbsp;&nbsp;");
    const sum = selectedSeats.reduce((acc, s) => acc + s.price, 0);
    total.innerHTML = `Ümumi: ${sum} azn`;
}



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



