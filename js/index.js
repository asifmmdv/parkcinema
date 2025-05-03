
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