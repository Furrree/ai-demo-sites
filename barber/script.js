document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  const header = document.querySelector('.barber-header');
  if(window.scrollY > 40){
    header.style.background = 'rgba(10,10,10,0.9)';
    header.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
  } else {
    header.style.background = 'rgba(20,20,20,0.9)';
  }
});
