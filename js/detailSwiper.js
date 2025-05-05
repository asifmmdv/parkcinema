const swiper = new Swiper('.mySwiper', {
    slidesPerView: 'auto',
    spaceBetween: 5,
    centeredSlides: false,
    loop: false,
    navigation: {
        nextEl: '.text-white.absolute.-right-4',
        prevEl: '.text-white.flex.absolute.-left-6',
    },
});

const swiperWrapper = document.querySelector('.swiper-wrapper');
const today = new Date();
let slidesHTML = '';

for (let i = 0; i < 6; i++) {
const date = new Date();
date.setDate(today.getDate() + i);

const day = date.getDate();
const month = date.toLocaleString('default', { month: 'short' }); 

slidesHTML += `
    <div class="swiper-slide min-w-[60px]" style="width: 76px; margin-right: 5px;">
        <div class="flex flex-col items-center w-[60px] h-[100px] rounded-[40px] duration-200 cursor-pointer justify-between py-3 ${i === 0 ? 'bg-[#D9DADB]' : 'bg-[#474747]'}">
            <span class="text-[16px] ${i === 0 ? 'text-black' : 'text-[#D9DADB]'}">${month}</span>
            <div class="rounded-full duration-200 text-white text-[16px] w-[48px] h-[48px] flex justify-center items-center ${i === 0 ? 'bg-[#353535]' : 'bg-[#606060]'}">${day}</div>
        </div>
    </div>
    `;
}

swiperWrapper.innerHTML = slidesHTML;