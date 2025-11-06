const form = document.getElementById('leadForm');
const successMsg = document.getElementById('successMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // simple bot/spam check
  if (form.honeypot.value !== "") return;

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, { method: 'POST', body: formData });
    if (response.ok) {
      form.reset();
      successMsg.style.display = 'block';
      setTimeout(() => successMsg.style.display = 'none', 4000);
    } else {
      alert('There was an issue submitting the form. Please try again.');
    }
  } catch (err) {
    console.error('Form submission error:', err);
    alert('Network error. Please try again.');
  }
});
