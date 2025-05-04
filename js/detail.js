const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const filmDetails = document.getElementById("filmDetails");

const data2 = [];

function getFilmDetails() {
    fetch(`https://data-pink-nine.vercel.app/landing/${id}`)
        .then(res => res.json())
        .then(film => {
            data2.length = 0;
            data2.push(film); 
            showDetail();
        })
}
getFilmDetails();

function showDetail() {
    filmDetails.innerHTML = "";
    data2.map(item => {
        filmDetails.innerHTML += `
        <div class="grid grid-cols-2 max-md:flex max-md:flex-col-reverse gap-5 my-10 h-full">
            <div>
                <div class="grid grid-cols-2 max-md:grid-cols-1 gap-8">
                    <div class="rounded-[30px] overflow-hidden max-lg:hidden">
                        <img alt="${item.name || 'movie'}" width="500" height="500" class="w-full h-full object-cover" src="https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${item.image}&w=640&q=75">
                    </div>
                    <div class="flex flex-col">
                        <h1 class="text-[#D9DADB] text-xl font-semibold mt-2">${item.name || 'Film Adı yoxdur'}</h1>
                        <div class="flex text-[#D9DADB] text-sm items-center gap-0.5 my-2">
                            <span>${item.genres?.[0]?.title || 'Janr yoxdur'}</span>
                        </div>
                        <p class="text-[#D9DADB] !text-[16px] font-semibold mb-1">Dil</p>
                        <ul class="flex items-center gap-2 mb-4">
                            ${(item.languages || []).map(lang => `
                                <li>
                                    <img alt="${lang} flag" width="24" height="24" src="/img/${lang.toLowerCase()}-flag.svg">
                                </li>
                            `).join('')}
                        </ul>
                        <div class="mb-4">
                            <p class="text-[#D9DADB] !text-[16px] font-semibold">Altyazı</p>
                            <ul class="flex items-center gap-2">
                                ${(item.subtitles || []).map(sub => `
                                    <li>
                                        <img alt="${sub} subtitle" width="24" height="24" src="../img/${sub.toLowerCase()}-flag.svg">
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="flex flex-col gap-2 max-md:flex-row max-md:justify-between w-full">
                            <div class="flex flex-1 flex-col gap-2">
                                <p class="text-[#D9DADB] !text-[16px] font-normal"><span class="font-semibold">Müddət:</span> ${item.duration ? `${Math.floor(item.duration / 60)} saat ${item.duration % 60} dəq` : 'Məlumat yoxdur'}</p>
                                <p class="text-[#D9DADB] !text-[16px] font-normal"><span class="font-semibold">İl:</span> ${item.year || '2024'}</p>
                                <p class="text-[#D9DADB] !text-[16px] font-normal"><span class="font-semibold">Ölkə:</span> ${item.country || 'Məlumat yoxdur'}</p>
                                <p class="text-[#D9DADB] !text-[16px] font-normal"><span class="font-semibold">Rejissor:</span> ${item.director || 'Naməlum'}</p>
                            </div>
                            <div class="flex flex-col flex-1 gap-2">
                                <p class="text-[#D9DADB] font-normal"><span class="text-[16px] font-semibold">Aktyorlar:</span> ${item.actors?.join(', ') || 'Məlumat yoxdur'}</p>
                                <p class="text-[#D9DADB] !text-[16px] font-normal"><span class="font-semibold">Yaş Həddi:</span> ${item.ageLimit === 'SIXTEEN' ? '16+' : item.ageLimit === 'EIGHTEEN' ? '18+' : '12+'}</p>
                                <p class="text-[#D9DADB] !text-[16px] font-normal"><span class="font-semibold">Nümayiş Tarixi:</span> ${item.firstScreeningDate?.split('T')[0] || 'Naməlum'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-10">
                    <h2 class="text-[#D9DADB]">${item.description || 'Film haqqında məlumat yoxdur.'}</h2>
                </div>
            </div>
            <div class="max-ld:row-span-1">
                <div class="w-full aspect-video relative z-10 bg-cover rounded-3xl overflow-hidden">
                    ${item.youtubeUrl ? `<iframe class="absolute top-0 left-0 w-full h-full" src="${item.youtubeUrl.replace('watch?v=', 'embed/')}"  frameborder="0" allowfullscreen></iframe>` : `<div class="text-white p-4">Video yoxdur</div>`}
                </div>
            </div>
        </div>`;
    });
}
const tableBody = document.querySelector("#table tbody");
const data3 = [];

function getFilmDetails2() {
    fetch(`https://data-pink-nine.vercel.app/detail`)
        .then(res => res.json())
        .then(mel => {
            data3.length = 0;
            data3.push(...mel); 
            showDetail2();
        })
}
getFilmDetails2();

function showDetail2() {
    let rowsHTML = "";
    data3.forEach(item => {
        rowsHTML += `
            <tr class="border-b border-[#D9DADB] bg-[#383838] transition">
                <td class="py-4 px-2 text-sm max-sm:p-1 text-[#FFFFFF]">${item.time}</td>
                <td class="py-4 px-2 text-sm max-sm:p-1 text-[#FFFFFF] max-sm:hidden"></td>
                <td class="py-4 px-2 text-sm max-sm:p-1 text-[#FFFFFF] max-sm:text-[12px]">
                    <div class="flex justify-center items-center gap-2 max-xxs:leading-none">
                        <span class="max-xxs:text-[8px] max-xxs:leading-none">${item.theatreTitle} | ${item.hallTitle}</span>
                    </div>
                </td>
                <td class="py-4 px-2 text-sm max-sm:p-1 text-[#FFFFFF]">
                    <div class="flex flex-col leading-none gap-1">${item.type.slice(1)}</div>
                </td>
                <td class="py-4 px-2 max-sm:p-1 text-center">
                    <img alt="flag" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" src="/img/${item.language.toLowerCase()}-flag.svg"">
                </td>
                <td class="py-4 px-2 text-sm text-[#FFFFFF] max-sm:p-1">
                    <div class="flex items-center justify-center">
                        <div class="border border-solid border-[#D9DADB] min-h-[40px] rounded-[10px] flex flex-col gap-1 p-0.5 max-xxs:px-[1px] py-1 min-w-[20px] max-xxxs:leading-none max-md:leading-[13px] md:leading-[16px] max-w-[100px] justify-center items-center !w-max px-4">
                            <span class="text-[12px] max-xs:text-[10px] max-xxs:text-[8px] text-wrap whitespace-pre">${item.subtitle !== "NONE" ? (item.subtitle === "AZ" ? "AZE<br>sub" : `${item.subtitle}<br>sub`) : "Alt yazı <br> yoxdur"}</span>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-2 text-end max-sm:p-1">
                    <a class="md:!w-max inline-block text-end" href="/az/movie/seat-selection/298851?theatreId=675aea0a2acad3103ea740db&amp;movieId=67ef8e906f500c02f5d9181f&amp;sessionId=6816a0206ea7da51861b1d3a">
                        <button class="flex items-center justify-center bg-[#D52B1E] opacity-65 hover:opacity-100 duration-200 rounded-[20px] w-[170px] h-[36px] px-4 py-2 bg-[#C02020] text-white text-sm rounded hover:bg-[#A81A1A] transition md:!w-[160px] !w-[100px] max-sm:!w-[60px] max-sm:!p-0 max-sm:!text-[12px] max-sm:leading-3">Bilet Al</button>
                    </a>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = rowsHTML;
}
