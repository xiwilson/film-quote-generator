function displayQuote(response) {
  new Typewriter("#quote", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generateQuote(event) {
  event.preventDefault();

  let instructionInput = document.querySelector("#user-instruction");

  let userKeyword = instructionInput.value.trim();

  if (!userKeyword) {
    alert("Please enter a keyword for the movie quote.");
    return;
  }

  let prompt = `You are an AI movie quote generator. Your task is to provide a famous movie quote that is strictly related to the topic or keyword given by the user. 

## Requirements:
- The quote must be directly related to the keyword: "${userKeyword}".
- If no exact match is found, choose the closest relevant quote.
- Include the full quote.
- Mention the character who said it and the movie title.
- Wrap each quote in a <p> element and separate multiple quotes with a <br> element.
- Do NOT add any extra text, explanations, or formatting instructions—just return the quotes.

Now, generate a maximum of 10 famous movie quotes based on the keyword: "${userKeyword}".`;

  let context = `Your mission is to generate film quotes and include the film they are from. The user instruction keyword "${userKeyword}" must be included in your output. Wrap each quote in a <p> element and separate multiple quotes with a <br> element. Do not include any additional formatting instructions. Sign the quote with 'SheCodes AI' inside a <strong> element at the end of the quotes list`;
  let apiKey = "3f47deba7d7o337tb76d054056f8cbe1";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  let quotesElement = document.querySelector("#quote");
  quotesElement.classList.remove("hidden");
  quotesElement.innerHTML = `<div class="generating"> ⏳ Generating film quotes about ${instructionInput.value}...</div>`;

  axios
    .get(apiUrl)
    .then(displayQuote)
    .catch((error) => {
      console.error("Error fetching AI-generated quote:", error);
      alert("Sorry, something went wrong. Please try again.");
    });
}

let filmFormElement = document.querySelector("#film-quote-generator");
filmFormElement.addEventListener("submit", generateQuote);
