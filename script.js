// Define the function to change background color
function BackgroundChangeColor(color) {
  var body = document.body;
  var text1 = document.getElementById("text1");
  var text2 = document.getElementById("text2");
  var question = document.getElementById("textASKQUESTION");
  var theme = document.getElementById("idTheme");
  document.body.style.backgroundColor = color;
  if (color == "white") {
    body.style.backgroundColor = "white";
    text1.style.color = "black";
    text2.style.color = "black";
    question.style.color = "black";
    theme.style.color = "black";
  }
  if (color == "grey") {
    body.style.backgroundColor = "grey";
    text1.style.color = "white";
    text2.style.color = "white";
    question.style.color = "white";
    theme.style.color = "black";
  }
  if (color == "pink") {
    body.style.backgroundColor = "pink";
    text1.style.color = "black";
    text2.style.color = "black";
    question.style.color = "black";
    theme.style.color = "black";
  } else if (color == "black") {
    body.style.backgroundColor = "black";
    text1.style.color = "white";
    text2.style.color = "white";
    question.style.color = "white";
    theme.style.color = "white";
  }
}

// Define the function to fetch information from Wikipedia
async function fetchWikipediaSummary(question) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${question}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Wikipedia summary");
    }
    const data = await response.json();
    return data.extract;
  } catch (error) {
    console.error(error);
    return "Sorry, I couldn't find information related to your question on Internet.";
  }
}

// Add event listener for the form submission
const questionForm = document.getElementById("questionForm");
questionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userInput = document.getElementById("userInput");
  const question = userInput.value.trim();
  if (question === "") return;

  try {
    // Fetch the Wikipedia summary
    const summary = await fetchWikipediaSummary(question);

    // Add the answer to the chat window
    addMessage(`Bot: ${summary}`);
  } catch (error) {
    console.error(error);
    addMessage("Bot: Error fetching answer");
    addMessage(`Bot: ${summary}`, "red");
  }
});

// Function to add a message to the chat window
function addMessage(message, color) {
  const chatWindow = document.getElementById("chatWindow");
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageElement.style.color = color;
  chatWindow.appendChild(messageElement);

  // Speak the message
  speakMessage(message);
}

// Function to speak a message aloud
function speakMessage(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  speechSynthesis.speak(utterance);
}
