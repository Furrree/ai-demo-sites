const form = document.getElementById("leadForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => (data[key] = value));

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (result.success) {
      successMsg.style.display = "block";
      form.reset();
    } else {
      alert("Error submitting form: " + result.error);
    }
  } catch (err) {
    alert("Network error: " + err.message);
  }
});
