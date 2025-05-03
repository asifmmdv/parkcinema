
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
