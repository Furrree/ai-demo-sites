const form = document.getElementById("leadForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      body: new URLSearchParams(data), // send as URL-encoded
    });

    const result = await response.json(); // safe now
    console.log("Server response:", result);

    if (result.success) {
      successMsg.style.display = "block";
      form.reset();
    } else {
      alert("Server error: " + result.error);
    }
  } catch (err) {
    console.error("Form submission error:", err);
    alert("Something went wrong. Please try again.");
  }
});
