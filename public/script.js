document
  .getElementById("shorten-button")
  .addEventListener("click", async () => {
    const urlInput = document.getElementById("url-input").value.trim();
    const resultContainer = document.getElementById("result-container");
    const shortenedUrl = document.getElementById("shortened-url");

    if (!urlInput) {
      alert("Please enter a URL to shorten.");
      return;
    }

    try {
      // Make a POST request to the backend
      const response = await fetch("http://localhost:5000/v1/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlInput }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Something went wrong");
      }

      const data = await response.json();

      // Display the shortened URL
      shortenedUrl.href = data.shortUrl;
      shortenedUrl.textContent = data.shortUrl;
      resultContainer.classList.remove("hidden");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
