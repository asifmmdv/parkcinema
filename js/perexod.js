
  document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a');
    const loader = document.querySelector('.loader');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        if (link.href.includes('detail') || link.href.includes('index.html')) {
          loader.style.display = 'flex';
        }
      });
    });
    
    window.addEventListener('load', function() {
      loader.style.display = 'none';
    });
  });