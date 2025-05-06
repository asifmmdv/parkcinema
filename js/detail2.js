const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get("id");
const sessionDetails = document.getElementById("sessionDetails");
const sessionDetails2 = document.getElementById("sessionDetails2");
const data4 = [];

function getSessionDetails() {
    fetch(`https://data-pink-nine.vercel.app/detail/${sessionId}`)
        .then(res => res.json())
        .then(session => {
            data4.length = 0;
            data4.push(session);
            showSessionDetail();
            showSessionDetail2()
        })
}
getSessionDetails();

function showSessionDetail() {
    sessionDetails.innerHTML = "";
    const formattedDuration = `${Math.floor(110/60).toString().padStart(2,'0')}:${(110%60).toString().padStart(2,'0')}:00`;
    data4.map(item => {
        sessionDetails.innerHTML += `
       <div class="text-[#D9DADB] duration-200 p-3 max-lg:w-full md:w-1/2 lg:w-1/3 h-full flex gap-4">
            <div class="h-full max-md:w-[50%] md:w-[40%] rounded-xl overflow-hidden">
            <img alt="${item.name || 'movie'}" width="500" height="500" class="w-full h-full object-cover" src="https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${item.movie.image}&w=640&q=75">
                src="/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${item.movie.image}&amp;w=640&amp;q=75" style="color: transparent;"></div>
            <div class="flex flex-col justify-between max-md:w-[50%]">
                <div class="flex flex-col max-md:gap-2 md:gap-3 max-sm:text-[15px]">
                    <h1 class="text-nowrap truncate">${item.movie.name}</h1>
                    <div class="flex items-center gap-3">
                        <div class="text-[18px] mt-[1px] font-semibold">
                            <div>${item.type.slice(1)}</div>
                        </div>
                    </div>
                    <p class="flex items-center gap-2"><img alt="date" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" class="w-[14px]" src="/img/date.svg" style="color: transparent;">04.05.2025</p>
                    <p class="flex items-center gap-2"><img alt="date" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" class="w-[14px]" src="/img/time.svg" style="color: transparent;">${item.time}</p>
                </div>
                <div class="flex flex-col max-md:gap-1 md:gap-2  max-sm:text-[13px]">
                    <p class="text-[#D9DADB] !text-[16px] font-normal"><span class="!text-[16px]">Dil: ${item.language}</p>
                    <p class="text-[#D9DADB] !text-[16px] font-normal"><span class="!text-[16px]">Kinoteatr:</span> ${item.theatreTitle}</p>
                    <p class="text-[#D9DADB] !text-[16px] font-normal"><span class="!text-[16px]">${item.hallTitle}</p>
                    <p class="text-[#D9DADB] !text-[16px] font-normal"><span class="!text-[16px]">Müddət: ${formattedDuration}</span> </p>
                </div>
            </div>
        </div>
        `;
    });
}

function showSessionDetail2() {
    sessionDetails2.innerHTML = ""; 
    data4.forEach(item => {
        const discounts = item.price[0]?.discounts
        discounts.forEach(discount => {
            sessionDetails2.innerHTML += `
                <li class="max-md:min-w-max">
                    ${discount.discountType == "FAMILY" ? "Ailə" :
                    discount.discountType == "ADULT" ? "Böyük" :
                    discount.discountType == "DOUBLE" ? "İkili" : ""}
                    <strong class="font-semibold">${discount.discountValue} azn</strong>
                </li>
            `;
        });
    });
}


const rows = 12;
const seatsPerRow = 17;

let cinemaHTML = '';

for (let i = 0; i < rows; i++) {
    let rowHTML = '<div class="flex gap-1 items-center w-full">';

    rowHTML += `
        <span class="min-w-8 min-h-8 w-10 h-10 text-white  font-bold flex items-center justify-center desktop:ml-30 rounded-sm mr-20 text-xl">
            ${rows - i}
        </span>`;

    if (i === 0) {
        for (let j = 0; j < seatsPerRow; j++) {
            rowHTML += `
                <span class="min-w-8 min-h-8 w-10 h-10 flex rounded-lg duration-200 justify-center items-center text-xl cursor-pointer 
                bg-[#C7C7C7] text-[#353535] border border-gray-600 hover:bg-gray-300">
                    ${j + 1}
                </span>`;
        }
    } else if (i >= 1 && i <= 5) {
        let seatCount = 1;
        for (let j = 0; j < seatsPerRow; j++) {
            if (j >= seatsPerRow - 2) {
                rowHTML += '<span class="min-w-8 min-h-8 w-10 h-10 opacity-0"></span>';
            } else if (j < 2) {
                rowHTML += `
                    <span class="min-w-8 min-h-8 w-10 h-10 flex rounded-lg duration-200 justify-center items-center text-xl cursor-pointer 
                    bg-[#C7C7C7] text-[#353535] border border-gray-600 hover:bg-gray-300">
                        ${seatCount++}
                    </span>`;
            } else if (j >= 2 && j < 4) {
                rowHTML += '<span class="min-w-8 min-h-8 w-10 h-10 opacity-0"></span>';
            } else {
                rowHTML += `
                    <span class="min-w-8 min-h-8 w-10 h-10 flex rounded-lg duration-200 justify-center items-center text-xl cursor-pointer 
                    bg-[#C7C7C7] text-[#353535] border border-gray-600 hover:bg-gray-300">
                        ${seatCount++}
                    </span>`;
            }
        }
    } else if (i >= 6 && i <= 10) {
        let seatCount = 1;
        for (let j = 0; j < seatsPerRow; j++) {
            if (j >= seatsPerRow - 2) {
                rowHTML += '<span class="min-w-8 min-h-8 w-10 h-10 opacity-0"></span>';
            } else if (j < 4) {
                rowHTML += '<span class="min-w-8 min-h-8 w-10 h-10 opacity-0"></span>';
            } else {
                rowHTML += `
                    <span class="min-w-8 min-h-8 w-10 h-10 flex rounded-lg duration-200 justify-center items-center text-xl cursor-pointer 
                    bg-[#C7C7C7] text-[#353535] border border-gray-600 hover:bg-gray-300">
                        ${seatCount++}
                    </span>`;
            }
        }
    } else if (i === 11) {
        let seatCount = 2;
        for (let j = 0; j < seatsPerRow; j++) {
            if (j < 5 || j >= seatsPerRow - 3) {
                rowHTML += '<span class="min-w-8 min-h-8 w-10 h-10 opacity-0"></span>';
            } else {
                rowHTML += `
                    <span class="min-w-8 min-h-8 w-10 h-10 flex rounded-lg duration-200 justify-center items-center text-xl cursor-pointer 
                    bg-[#C7C7C7] text-[#353535] border border-gray-600 hover:bg-gray-300">
                        ${seatCount++}
                    </span>`;
            }
        }
    }

    rowHTML += '</div>';
    cinemaHTML += rowHTML;
}

document.getElementById('cinemaContainer').innerHTML = cinemaHTML;