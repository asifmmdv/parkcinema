
function openModal() {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modalContent.classList.remove('translate-y-full');
    } else {
        modalContent.classList.add('translate-y-full');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}
const flags = document.querySelectorAll('.flags')
function openFlags(){
    flags.forEach(element => {
        element.classList.toggle("hidden")
    });
}

let flag1 = true;
function openDD1() {
  const dropdowncont1 = document.getElementById('dropdowncont1');
  const svg1 = document.getElementById('svg1');
  const underline1 = document.getElementById('underline1');

  dropdowncont1.classList.toggle('hidden');
  flag1 = !flag1;

  if (!flag1) {
    svg1.classList.add('rotate-180');
    underline1.classList.add('w-full');
  } else {
    svg1.classList.remove('rotate-180');
    underline1.classList.remove('w-full');
  }
}
let flag2 = true;
function openDD2() {
  const dropdowncont2 = document.getElementById('dropdowncont2');
  const svg2 = document.getElementById('svg2');
  const underline2 = document.getElementById('underline2');

  dropdowncont2.classList.toggle('hidden');
  flag2 = !flag2;

  if (!flag2) {
    svg2.classList.add('rotate-180');
    underline2.classList.add('w-full');
  } else {
    svg2.classList.remove('rotate-180');
    underline2.classList.remove('w-full');
  }
}

const data = []
const films = document.getElementById('films')

function getAllFims(){
    useGetAllFilms()
      .then(mel => {
        data.length = 0
        data.push(...mel)
        showAllFilms()
      })
}
getAllFims()

function showAllFilms(){
  films.innerHTML = ""
  data.map(item => {
      films.innerHTML += `
         <div class="group">
              <a href="/pages/detail.html?id=${item.id}">
                  <div class="aspect-[290/480] max-tablet:w-full rounded-[18px] shadow-box relative cursor-pointer flex items-center overflow-hidden">
                      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00000000] via-[#0000004E] to-[#000000] z-[10]"></div>
                      <img alt="movie" class="absolute top-0 left-0 object-cover scale-100 group-hover:scale-105 duration-300 z-0 w-full h-full" src="https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${item.image}&w=640&q=75" alt="${item.name}">
                      <div class="absolute bottom-0 left-0 w-full px-3 pb-4 z-10">
                          <h2 class="mb-3 text-white text-[22px] font-semibold">${item.name}</h2>
                          <div class="text-[#D9DADB] text-[14px]">${new Date(item.firstScreeningDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')}</div>
                          <div class="flex items-center justify-between">
                              <div class="text-[#D9DADB]">${item.ageLimit === 'SIXTEEN' ? '16+' : item.ageLimit === 'EIGHTEEN' ? '18+' : '12+'}</div>
                              <div class="flex items-center gap-2">
                                  ${item.languages.map(lang => `
                                      <div class="w-6 h-6">
                                          <img alt="${lang} flag" loading="lazy" width="24" height="24" class="w-full h-full" src="/img/${lang.toLowerCase()}-flag.svg">
                                      </div>
                                  `).join('')}
                              </div>
                          </div>
                      </div>
                  </div>
              </a>
          </div>
      `
  })
}