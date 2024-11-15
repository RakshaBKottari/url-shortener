// Fetch joke from the local API
function getPersonalizedJoke() {
  fetch("/v1/personalized")
    .then((response) => response.json())
    .then((joke) => {
      document.getElementById(
        "joke-display"
      ).innerText = `${joke.setup} - ${joke.punchline}`;
    })
    .catch((error) => {
      document.getElementById("joke-display").innerText =
        "Failed to fetch locally joke!";
      console.error(error);
    });
}

// Fetch joke from the public API
function getOnlineJoke() {
  fetch("/v1/online")
    .then((response) => response.json())
    .then((joke) => {
      document.getElementById(
        "joke-display"
      ).innerText = `${joke.setup} - ${joke.punchline}`;
    })
    .catch((error) => {
      document.getElementById("joke-display").innerText =
        "Failed to fetch public joke!";
      console.error(error);
    });
}
