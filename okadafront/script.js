function fetchCompletion(inputId, suggestionId) {
  let inputText = document.getElementById(inputId).value;
  if (inputText.length < 5) return;

  fetch("http://127.0.0.1:8000/complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: inputText })
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById(suggestionId).textContent = data.補完;
    })
    .catch(error => console.error("Error fetching completion:", error));
}

function confirmCompletion(event, inputId, suggestionId) {
  if (event.key === "Tab") {
    event.preventDefault();
    let inputField = document.getElementById(inputId);
    inputField.value += document.getElementById(suggestionId).textContent;
    document.getElementById(suggestionId).textContent = "";
  }
}

function goToStep2() {
  window.location.href = "step2.html";
}
